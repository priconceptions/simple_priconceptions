---
title: 'OOP Series #1 - Objects in Javascript'
date: '2021-05-10'
category: 'Javascript'
description: 'The fundamentals of Object Oriented Programming. What are objects? What are classes? Create a basic object from a class.'
tags:
  - javascript
  - object oriented programming
---

This is article #1 in the Javascript OOP Series. We will cover what objects are, what classes are, and create a basic object from a class.

## What are objects?

Think of an object as a contained entity. They have some data that's relevant to them. And, they have functions that tell you what the object can do.

Think of a person-- specifically, a girl named Stacy who lives in Los Angeles, California.

![Stacy](/postImages/stacy-oop-1.png)
Photo by <a href="https://unsplash.com/@everythingcaptured?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Edward Cisneros</a> on <a href="https://unsplash.com/s/photos/woman?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

Stacy has some properties that characterize her:

- a name: Stacy
- an address: Los Angeles, California
- a social security number: _hidden_
- hair color: Blue
- hobbies: knits, dances, reads, runs

In the programming world, we call these properties **attributes**.

Stacy also does things:

- she eats
- she sleeps
- she wakes us every morning

We call these functions **methods**.

Stacy is an instance of a person.

Bob is another instance of a person. He has similar properties and functions as Stacy.

![Bob](/postImages/bob-oop-1.png)
Photo by <a href="https://unsplash.com/@jediahowen?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jed Owen</a> on <a href="https://unsplash.com/s/photos/farmer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

Bob has:

- a name: Bob
- an address: Alberquerque, New Mexico
- a social security number: _hidden_
- hair color: Brown
- hobbies: raises cattle, raises chicken, experiments in his lab, runs

Bob does:

- he eats
- he sleeps
- he wakes us every morning

Both Bob and Stacy are instances of a person. An object is an instance of a class.

## Classes

A class is a blueprint for objects. It tells us what attributes an object has and what the object can do.

If we were to create a Person class in Javascript, it would look something like this:

```jsx
class Person {
  constructor(name, address, ssn, hobbies) {
    this.name = name;
    this.address = address;
    this.ssn = ssn;
    this.hobbies = hobbies;
  }

  eats() {
    return `${this.name} is eating`;
  }

  sleeps() {
    return `${this.name} is sleeping`;
  }

  wakesUp() {
    return `${this.name} is waking up`;
  }

  revealsHobbies() {
    return `${this.name}'s hobbies are ${this.hobbies.join(', ')}`;
  }
}
```

This class tells us that any particular person has a name, address, ssn, and hobbies. A person eats, sleeps, wakes up, and reveals their hobbies to us.

Now, don't get confused by the `this` keyword. I will go through what it means and all its intricacies in a different post. But, for now, `this` refers to the instance of the Person we are creating. So, when we say `this.name = name`, we are binding the variable name to a particular instance.

So, what would Stacy look like in code?

```jsx
const Stacy = new Person('Stacy', 'Los Angeles, California', 1234, [
  'knits',
  'dances',
  'reads',
  'runs'
]);
```

Here, we define Stacy as an instance of a Person and input her particular attributes.

Here is how we make Stacy do stuff:

```jsx
console.log(Stacy.eats());
console.log(Stacy.revealsHobbies());
```

When we log in to our console, we see Stacy doing things

![Object Method Console Log](/postImages/stacy-object-console-log.png)

## That's it, folks

That's it with Post #1 in the Javascript OOP series! If you have any questions, my DMs are open!

Stay tuned for Post #2, where we'll cover the different ways you can create objects and define classes in Javascript.
