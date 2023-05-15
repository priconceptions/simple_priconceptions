---
title: 'When expression in Kotlin'
date: '2023-01-31'
category: 'android'
description: ''
tags:
  - kotlin
---

The `when` expression is like `switch` in Swift or C. It looks like this:

```kotlin
when(x) {
	1 -> print("x == 1")
	2 -> print("x == 2")
	else -> { print("x is neither 1 nor 2") }
}
```

Here, the `x` in the `when(x)` expression is called the **subject** of the `when` expression.

The `1 -> print("x == 1")` , `2 -> print("x == 2")`, and `else -> { print("x is neither 1 nor 2") }` are the **branches** of this `when` expression.

You ****need**** to have an `else` branch in a `when` expression unless all the possible cases are covered in the `when` expression.

For example:

```kotlin
enum class Direction {
    EAST, WEST, NORTH, SOUTH;
}

fun getRandomDirection(): Direction {
    return Direction.values().random()
}

when (getRandomDirection()) {
  Direction.EAST -> println("EAST")
  Direction.WEST -> println("WEST")
  Direction.NORTH -> println("NORTH")
  Direction.SOUTH -> println("SOUTH")
	// 'else' is not required because all cases are covered
}

when (getRandomDirection()) {
  Direction.EAST -> println("EAST") // no branches for WEST, SOUTH, and NORTH
  else -> println("not east") // 'else' is required
}
```

If you want to combine branches or perform the same operation for two different conditions, you would group them like this:

```kotlin
when (getRandomDirection()) {
  Direction.EAST, Direction.WEST -> println("EAST or WEST")
  else -> println("not east or west")
}
```

You could also check if the subject is in a range by using `in` and `!in`

```kotlin
when(x) {
	in 1..10 -> println("x is between 1 and 10")
	in validNumbers -> println("x is in the validNumbers list")
	!in 10..20 -> println("x is not between 10 and 20")
	else -> println("None of the above")
}
```

To check if the subject is a particular type, use `is` or `!is`

```kotlin
fun hasPrefix(x: Any) = when(x) {
    is String -> x.startsWith("prefix")
    else -> false
}
```

You don’t need to convert the subject (which right now is of `Any` type) into the particular type to use the type’s methods (for eg, you don’t have to convert `x` into a `String` to use `startsWith` once you have checked that `x` is a `String`)

Also, the subject of the `when` clause can be declared right in the expression:

```kotlin
fun Request.getBody() =
    when (val response = executeRequest()) {
        is Success -> response.body
        is HttpError -> throw HttpException(response.status)
    }

println(response.body) // will throw an error bc response if restricted to the body of the when expression
```

Here, the constant `response` is not available outside the scope of the body of the `when` expression.