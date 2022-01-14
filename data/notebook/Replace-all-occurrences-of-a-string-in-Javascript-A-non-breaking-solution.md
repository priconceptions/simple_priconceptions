---
title: 'Replace all occurrences of a string in Javascript + A non-breaking solution'
date: '2021-05-26'
category: 'Javascript'
description: 'Replace all occurrences of a string in Javascript using the .replace method. A solution to using this method when the original string is null or undefined.'
tags:
  - Modify a string
  - regular expressions
---

Say you have a string. You want to remove/replace all instances of a character in that string. You could use the `replace` method in Javascript.

It looks something like this:
```jsx
String.replace(/<TERM>/g, '');
```

For example,
```jsx
'Hello-World'.replace(/-/g, ' ');
// "Hello World"

'H E L L O'.replace(/ /g, '');
// "HELLO"
```

Note that this does a **_case-sensitive_** substitution. For a case-insensitive substitution, use the `/i` flag. For example:
```jsx
'AbBle'.replace(/b/gi, 'p');
// "Apple"
```

This is a super useful method and a little understanding of regular expressions will help you write more concise, performant code.

But, what if the string is null or undefined? I recently had a use-case where the string was a variable that could be undefined or null. To be precise,
```jsx
object['property'].replace(/ /g, '');
```

And, object\["property"\] came from an API. So, the returned object either has the property or doesn't.

If `object["property"] === null` or `object["property"] === undefined`, you see an ugly TypeError:

![Using .replace on undefined or null](/postImages/undefined-null-replace-error.png)

In this case, I don't want the application to throw an error if `object["property"] === null` or `object["property"] === undefined`. Still, if `object["property"]` is a valid string, I wanted to modify it.

So, I wrote my own replace function:
```jsx
const replaceString = (str, newSubstring, regex) => {
  if (!str) {
    return str;
  }
  return str.replace(regex, newSubstring);
};

replaceString(undefined, '', /-/g);
// undefined

replaceString(null, '', /-/g);
// null

replaceString('H-E-L-L-O', '', /-/g);
// "HELLO"
```

I could have redefined the String prototype method for my module instead. However, I wanted to avoid confusions in the future when a coder wants to use the `.replace` function as originally defined.
