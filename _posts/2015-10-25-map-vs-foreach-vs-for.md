---
layout: post
title: ".map() vs .forEach() vs for()"
date: 2015-10-25 10:08:31
categories: javascript
---

Due to the amount of traffic this article still receives, it has been given a much needed refresh. For the sake of comments that happened before July 19, 2017, the original version is still available here:

https://ryanpcmcquen.org/javascript/2015/10/25/DEPRECATED__map-vs-foreach-vs-for.html

You may find yourself at a point where you wonder whether to use `.map()`, `.forEach()` or `for ()`.

You should favor `.map()` and `.reduce()`, if you prefer the functional paradigm of programming. For other paradigms (and even in some _rare_ cases within the functional paradigm), `.forEach()` is the proper choice. `for ()` loops should be avoided unless you have determined that there is some necessary benefit they deliver to your end user that no other iteration method is capable of (such as a performance necessity). Keep in mind that while `for ()` loops may appear to be faster in some cases, they will use more memory than the native methods. Also, never forget what Donald Knuth said:

>The real problem is that programmers have spent far too much time worrying about efficiency in the wrong places and at the wrong times; premature optimization is the root of all evil (or at least most of it) in programming.

There have been scenarios where `.forEach()` was my first instinctual choice, only to discover that using `.map()` or `.reduce()` yielded more hackable, readable and maintainable code. One such scenario was cloning the first level of an object and copying _only_ its properties.

Given object `foo`:

```js
var foo = {
    foo: 1,
    bar: 2,
    baz: 3
};
```

Procedural style:

```js
var bar = {};
Object.keys(foo).forEach(function (prop) {
    bar[prop] = null;
});
```

This is readable enough, but gets reduced to one expression with `.reduce()` (functional style):

```js
var bar = Object.keys(foo).reduce(function (newObj, prop) {
    newObj[prop] = null;
    return newObj;
}, {});
```

This focuses all of the assignment code into one expression!

---

Let's take a look at another example. Say we need to produce a new array and add `1` to each value in that array:

```js
var nums = [
    5,
    9,
    7
];
```

Procedural style:

```js
nums.forEach(function (num) {
    return num + 1;
});
```

Functional style:

```js
var oneBetterThanNums = nums.map(function (num) {
    return num + 1;
});
```

The idea here is to avoid transforming the original array, one of the pillars of functional design is to create something new when something changes.

`.forEach()` operates on our original array. You may be wondering why that matters. The idea is that a functional application is easier to debug because data structures are treated as immutable entities. In other words, we know what the value of `nums` will be throughout our application. In the procedural style, the `nums` value is variable, which makes debugging more difficult. Any logic which considers `nums`, will also need to consider its current state, the functional version has no such issue.

Another benefit of the `.map()` method here, is that it allows more hackability for the future. For instance, let's say you have decided to sort that array at some point, with `.map()`, you can merely chain on the `.sort()` method!

```js
var oneBetterThanNums = nums.map(function (num) {
    return num + 1;
}).sort();
```

Thanks for reading!

Which methods do you prefer and why?
