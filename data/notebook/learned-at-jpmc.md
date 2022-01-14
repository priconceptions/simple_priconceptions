---
title: 'Everything I learned in 2 years at JPMorgan'
date: '2021-12-06'
category: 'Misc'
description: 'An incomplete, growing list of everything I learned in 2 years at JPMorgan'
tags:
  - thoughts
  - learnings
  - projects
---

This week will be my last at JPMorgan. So, I wanted to look back and make a (growing) list of everything I learned on the job to get a high-level overview of all the intellectual progress I've made, reflect on things I could've done better, and set a direction for my work at Wave.

By the way, this is not an exhaustive list of every single thing I've learned. There's definitely a lot I have missed.

## Technical things

- Git and version control  
  
  When I joined, I barely understood the need for version control in a software team. Before JPMorgan, all the projects I worked on were in teams of less than 5 people. We coordinated through Google Docs and messaging each other when parts of each person's code were ready to be pushed to master 🙈  
  
  It was at JPMorgan I really understood how useful it is to have a central place to host our codebase, commit histories and branches, and a standard protocol to "publish" our code.
  
- Continous Integration/Continuous deployment (CI/CD) pipelines
  
    A way to push your code and deploy it to servers without doing manually configuring your servers and builds. You have a configuration file in your code that specifies how to build and package your code and where your code must go when you "publish" it AKA pushing it to the master branch.
    
- Different environments (local, development, test, production)
  
    It's hard to appreciate the need for different staging environments until you have real users using and complaining about your applications. At JPMorgan, we had two staging environments,  there were multiple rounds of automated and manual testing before your changes went into production (a state where your application is—hopefully— stable and your users are using it)
    
- Unit tests
  
    I hadn't written a single unit test before I joined JPMorgan. I didn't understand why we should even bother writing tests if we were going to manually check the code changes in a dev or test environment.
    
    Now, I understand that unit tests aren't just for making sure your application works as it should. It's a mechanism to force your engineers to break up code into small chunks that can be individually tested and strung together to do something large. Unit tests make your code easy to read and maintain, document your functions, and bring all the other advantages of modular code with them.
    
- Python
  
    I knew Python on a basic level before I joined. It was at JPMorgan that I started working on larger Python projects— libraries, ETL pipelines, APIs. I learned how to build, test, and deploy Python code at JPMorgan.
    
- PySpark and distributed computing
  
    I didn't know anything about building ETL pipelines, map-reduce, why we would run jobs on several servers... anything before I joined. I learned many of the intricacies of PySpark as a language and a bit about distributed computing in general.
    
- JavaScript
  
    I knew JavaScript at a beginner level before I joined. Building UIs at JPMorgan, I learned the language a little more in-depth— promises, event loops, async functions, fetching large amounts of data from a server, local storage, browser sessions.
    
- React
  
    I also knew how to build applications with React before I joined. But the projects I built were pretty small. Building our dashboards taught me a lot about lifecycle events, fiddling with babel and webpack, redux state management, etc.
    
- AWS products
    - S3
    - EMRs
    - EC2 servers
    - Autoscaling groups
    - Lambda functions
    - Access management
    - AWS CLI tools
    - Elasticsearch
        - Loading and reading data from ES
        - Querying ES data for our UIs
        - CRUD operations using ES
    
- Logging and monitoring
  
    It's super important to have log traces of every important thing in your application. This might include messages about what step of your code is running at a given time, error messages, and counts.
    
- Using Python Flask to build APIs

- PostgreSQL
  
    I worked a tiny bit with PostgreSQL in the beginning when I was migrating some of our data services to PySpark. A lot of this work involved inspecting Postgres code, translating it into data models that I would present to my team, coming to a mutual agreement on how the new datasets in AWS would look like, and writing PySpark code for these jobs. In the process, I learned the syntax for Postgres.
    
- Writing shell scripts
  
    I'm still not fluent in the syntax but, with the help of a dictionary and StackOverflow, I wrote a couple of shell scripts to read CSVs from different directories and email them to people.
    
## Process things

- Agile software development  
  
  You have a time period called a sprint dedicated to implementing a feature, investigating something, or in general doing some sort of task.
  
  All your tasks are tracked on a kanban board (usually with steps like "Haven't started", "In progress", "Done")
  
  You participate in standups where you update your team on how your work is going and if you have anything preventing you from doing your task (called a blocker)
  
  At the end of every sprint, you and your team participate in a Retrospective— a meeting to go through what went well and what to improve upon.
  
- Always underpromise and overdeliver
  
    Everything will take longer than you plan. Things that are out of your control will come up. So, never promise to finish a task in exactly the amount of time you think it will take. Multiply this number by some factor (depending on the number of things that are out of your control) and tell your product manager/scrum master/manager this resulting time.
    
    When you have committed to a time frame, stick to it. 
    
- Follow up often
  
    People get busy. They lose track of your email/ping. It's nothing personal. Remind them until you have what you need.
    

## Things to improve upon at my new job

- Ask a lot, and I mean A LOT, more questions  
  
  I think I was worried about looking stupid and inexperienced when I first joined. I spent *days* working on a small problem that could've been solved in hours if I just asked someone how to do it.
  
  Just like you enjoy helping others, other people probably will enjoy helping you.
  
- Overcommunicate  
  
  Thank people often. If something is blocking your work, tell that to your product manager/scrum master/manager early. Track what you've done and tell our team about it often.
  
- Map out the codebase  
  
  Map out how everything works with each other in a way that you can recite where to find some functionality if asked. Constantly question whether this is the best way to solve a problem and bring up these concerns to the relevant person.
  
- Write down what you did every day, week, and month. Reflect on whether this is the best use of your time
- Take my one-on-ones more seriously. Have a very large list of questions and suggestions for my 1-on-1s
- Write a lot more documentation
- Take notes in Word docs/text files during meetings so that they can easily be transferred to other people
- Back up my code and notes frequently

JPMorgan is an excellent place to start your journey as a developer. You learn a lot of things in a controlled environment and can easily get help from other engineers. Depending on the team, people at JPMorgan are committed to making sure you learn and grow as a programmer. 

I enjoyed my time here and as you can see, grew from an incompetent engineer to a hopefully, fairly competent one.