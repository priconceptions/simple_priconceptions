---
title: 'Comparing records in the same dataset and finding closest peers'
date: '2021-12-13'
category: 'Code diaries'
description: 'How do we create classes and objects in Javascript?'
publish: true
tags:
  - pyspark
  - datasets
  - databases
---

Recently, I was trying to solve this problem:

You have a dataset of companies that looks like this:

| company_id | AUM (assets under management) | fiscal_year_end |
| --- | --- | --- |
| 1 | 200,000 | 2020 |
| 2 | 300,000 | 2020 |

We need to add a column with a list of 8 peers that are similar to that particular company.

We define "similarity" as follows:

1. needs to have the same fiscal_year_end 
2. needs to have an AUM that is greater than 50% or less than 50% of the current company
3. then filter down the list so that you get 2 peers whose AUM is less than the current company's AUM and 2 peers whose AUM is greater than the current company's AUM

A neat technique I recently found out was that when you are comparing records in a dataset to other records in that same dataset, you can join the dataset to itself and specify the conditions of the join based on your criteria.

```python
df1 = companies.alias("df1").select(
    col("company_id"), 
    col("aum"), 
    col("fiscal_year_end"))
df2 = companies.alias("df2").select(
    col("company_id").alias("company_id_other"), 
    col("aum").alias("aum_other"), 
   col("fiscal_year_end").alias("fiscal_year_end_other"))

join_criteria = (df1["fiscal_year_end"] == df2["fiscal_year_end_other"]) & ((df2["aum_other"] >= 0.5*df1["aum"]) | (df2["aum_other"] <= 1.5*df1["aum"]))

df1.join(df2, join_criteria, "left").show()
```

This will give you a dataset where for each company, you would get similar companies:

| company_id | company_id_other | aum | aum_other | fiscal_year_end | fiscal_year_end_other |
| --- | --- | --- | --- | --- | --- |
| 1 | 1 | 200,000 | 200,000 | 2020 | 2020 |
| 1 | 2 | 200,000 | 90,000 | 2020 | 2020 |
| 1 | 3 | 200,000 | 100,000 | 2020 | 2020 |
| 1 | 4 | 200,000 | 300,000 | 2020 | 2020 |
| 1 | 5 | 200,000 | 350,000 | 2020 | 2020 |
| 1 | 6 | 200,000 | 400,000 | 2020 | 2020 |

Now, to find which companies are similar to my company in question--company_id=1, you would create another column that gives you the difference between the company_id in question and the other companies.

```python
similar_companies = similar_companies.withColumn(
    "aum_diff", 
    abs(df1["aum"] - df2["aum_other"]))

similar_companies.orderBy(col("aum_diff").asc()).show()
```

This would give you a table like this:

| company_id | company_id_other | aum | aum_other | fiscal_year_end | fiscal_year_end_other | aum_diff |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 200,000 | 200,000 | 2020 | 2020 | 0 |
| 1 | 3 | 200,000 | 100,000 | 2020 | 2020 | 100,000 |
| 1 | 4 | 200,000 | 300,000 | 2020 | 2020 | 100,000 |
| 1 | 2 | 200,000 | 90,000 | 2020 | 2020 | 110,000 |
| 1 | 5 | 200,000 | 350,000 | 2020 | 2020 | 150,000 |
| 1 | 6 | 200,000 | 400,000 | 2020 | 2020 | 200,000 |

The four closest companies are the four companies whose aum_diff is the closest to the company in question. So, how would you get these? Using a window function.

```python
similar_companies = similar_companies.withColumn(
    "similar_company_ids", 
    collect_list(df2["company_id_other"]).over(Window.partitionBy("company_id").orderBy(col("aum_diff").asc()).rowsBetween(0, 4)))
)
```

| company_id | company_id_other | aum | aum_other | fiscal_year_end | fiscal_year_end_other | aum_diff | similar_company_ids |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 200,000 | 200,000 | 2020 | 2020 | 0 | [3, 4, 2, 5, 6] |
| 1 | 3 | 200,000 | 100,000 | 2020 | 2020 | 100,000 | [4, 2, 5, 6] |
| 1 | 4 | 200,000 | 300,000 | 2020 | 2020 | 100,000 | [2, 5, 6] |
| 1 | 2 | 200,000 | 90,000 | 2020 | 2020 | 110,000 | [5, 6] |
| 1 | 5 | 200,000 | 350,000 | 2020 | 2020 | 150,000 | [6] |
| 1 | 6 | 200,000 | 400,000 | 2020 | 2020 | 200,000 | [] |

Now, just filter the data so that you only have the company in question and select the columns you care about.

```python
similar_companies = similar_companies.filter(
    col("company_id") == col("company_id_other")).select(
        "company_id", "aum", "fiscal_year_end", "similar_company_ids")
```

| company_id | aum | fiscal_year_end | similar_company_ids |
| --- | --- | --- | --- |
| 1 | 200,000 | 2020 | [3, 4, 2, 5, 6] |


## Takeaways

1. When you want to compare records in a dataset to other records in that dataset, join the dataframe on itself with the comparison criteria as the join criteria
2. Reframe the question "find 2 peers whose AUM is less than the current company's AUM and 2 peers whose AUM is greater than the current company's AUM" as "find 4 peers whose AUM is closest to the current company's AUM". Closest to  = absolute value of the difference