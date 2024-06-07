---
title: 'OOP Series #2 - Creating Classes and Objects in Javascript'
date: '2021-05-27'
category: 'Code diaries'
description: 'How do we create classes and objects in Javascript?'
publish: true
tags:
  - javascript
  - object oriented programming
---

In the last post of this series, we covered what objects and classes are. To recap, an object is a collection of related data and functions. A class is a blueprint that tells you what kind of attributes and methods an object has and creates objects according to the blueprint. So, a specific person (Stacy, in our example from the last post) is an object and "person" is a class.

In this post, we will look at the ways we can create objects and classes in Javascript.

## Object Literal Syntax

An object literal is a set of keys and their values grouped by curly braces.

Let's look at how Stacy (the object) would look like as an object literal:

```jsx
const Stacy = {
  name: "Stacy",
  address: "Los Angeles, California",
  ssn: 1234,
  hobbies: ["knits", "dances", "reads", "runs"],
  eats: function () {
    return `${this.name} is eating`
  },
  sleeps: function () {
    return `${this.name} is sleeping`
  },
  wakesUp: function () {
    return `${this.name} is waking up`
  },
  revealsHobbies: function () {
    return `${this.name}'s hobbies are ${this.hobbies.join(", ")}`
  },
}
```

We can access Stacy's attributes using the dot-notation or the bracket notation like this:

```jsx
// dot-notation
console.log(Stacy.name)
console.log(Stacy.address)

// bracket-notation
console.log(Stacy["name"])
console.log(Stacy["address"])
```


And, we can run Stacy's methods like this:

```jsx
console.log(Stacy.eats())
console.log(Stacy.revealsHobbies())
```


Note: Here, the `this` keyword refers to the object Stacy. So, when we say`this.name` we are referring to the Stacy object we defined. Don't get too confused by this. I will go into this topic further in a later post.

## Constructor

A constructor is a function that creates and initalizes an object. This is what a constructor would look like:

```jsx
function Person(name, address, ssn, hobbies) {
  this.name = name
  this.address = address
  this.ssn = ssn
  this.hobbies = hobbies

  return {
    name: this.name,
    address: this.address,
    ssn: this.ssn,
    hobbies: this.hobbies,
    eats: function () {
      return `${this.name} is eating`
    },
    sleeps: function () {
      return `${this.name} is sleeping`
    },
    wakesUp: function () {
      return `${this.name} is waking up`
    },
    revealsHobbies: function () {
      return `${this.name}'s hobbies are ${this.hobbies.join(", ")}`
    },
  }
}
```

Here is how we would define Stacy using the constructor above:

```jsx
const Stacy = new Person("Stacy", "Los Angeles, California", 1234, [
  "knits",
  "dances",
  "reads",
  "runs",
])

console.log(Stacy.hobbies)
// ["knits", "dances", "reads", "runs"]
console.log(Stacy.wakesUp())
// Stacy is waking up
```

## Object.create

Object.create lets us create classes using a prototype. A prototype is a parent class whose methods and attributes are inherited by the child class.

```jsx
const Person = {
  wakesUp: function () {
    return `${this.name} is waking up`
  },
  revealsHobbies: function () {
    return `${this.name}'s hobbies are ${this.hobbies.join(", ")}`
  },
}

let Stacy = Object.create(Person, {
  name: {
    value: "Stacy",
    writable: true,
    configurable: true,
    enumerable: true,
  },
  hobbies: { value: ["knits", "dances", "reads", "runs"] },
})

console.log(Stacy.revealsHobbies())
// Stacy's hobbies are knits, dances, reads, runs
console.log(Stacy.wakesUp())
// Stacy is waking up
```

Here, notice how we can call the `revealsHobbies()` method on the `Stacy` object even though it's not defined on the `Stacy` object? This is because we we using the `Person` object as the parent or _prototype_ of Stacy.

The Object.create method also lets us add additional properties to our Object.

## ES6 Class

This is what we saw in the first post of this series. ES6 lets us define a class in a similar way to other languages.

```jsx
class Person {
  constructor(name, address, ssn, hobbies) {
    this.name = name
    this.address = address
    this.hobbies = hobbies
  }

  eats() {
    return `${this.name} is eating`
  }

  sleeps() {
    return `${this.name} is sleeping`
  }

  revealsHobbies() {
    return `${this.name}'s hobbies are ${this.hobbies.join(", ")}`
  }
}

const Stacy = new Person("Stacy", "Los Angeles, California", [
  "reading",
  "dancing",
])

console.log(Stacy.eats())
// Stacy is eating
console.log(Stacy.revealsHobbies())
// Stacy's hobbies are rading, dancing
```

## That's it, folks!

Thanks for sticking around! In this post, we covered the four common ways classes and objects can be created. Hope you found this post useful.