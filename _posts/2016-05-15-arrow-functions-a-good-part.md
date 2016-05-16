---
layout: post
title: "Arrow functions: a 'good' part."
date: 2016-05-15 20:44:01
categories: javascript
---

As far as confusing parts of JavaScript rank, function declarations are near the top. Due to hoisting, they allow developers to write functions wherever they please, regardless of where they get executed. Did anyone ever think this was a good idea? Has anyone seen a case where hoisting paid off?

I certainly have not. Thankfully, arrow functions cannot be named, and hence, cannot be used as function declarations. So I propose this as the only way you should EVER write functions in ES6+:

```js
const addTwo = (num) => {
  return num + 2;
};
```

`const` is also important, because functions should not be redefined. Now you could pull off some fanciness, and shorten the above example to:

```js
const addTwo = (num) => num + 2;
```

Although this one-liner may seem like a great idea, when someone else has to update your code and expand this function, you have decreased that maintainability. What if this future developer did not know a `return` was implied, and added curly braces? They will discover through debugging that something is amiss, but the code was not helpful in determining that because of a convenient shortcut.

Using these 'clever' shortcuts often seems like a great idea, but know that code does not live in a bubble, and a lot of code will be re-touched throughout its life. Consider your future self, or a future friend who may have to maintain your code, sometimes a little long-handedness will save a lot of frustration.
