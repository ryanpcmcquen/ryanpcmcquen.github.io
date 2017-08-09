---
layout: post
title: "DEPRECATED! -- .map() vs .forEach() vs for()"
date: 2015-10-25 10:08:31
categories: javascript
---

---

### THIS ARTICLE IS OLD AND CRUSTY! IT EXISTS ONLY FOR HISTORICAL PURPOSES. THE NEW AND SHINY VERSION IS HERE:

[https://ryanpcmcquen.org/javascript/2015/10/25/map-vs-foreach-vs-for.html](https://ryanpcmcquen.org/javascript/2015/10/25/map-vs-foreach-vs-for.html)

---

~~Recently on Twitter I noticed [Eric Elliott](https://twitter.com/_ericelliott) saying this:~~

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Favor `map()` over `forEach()` when you can. Avoid side-effects.&#10;<a href="https://twitter.com/hashtag/functional?src=hash">#functional</a> <a href="https://twitter.com/hashtag/JavaScript?src=hash">#JavaScript</a></p>&mdash; Eric Elliott (@_ericelliott) <a href="https://twitter.com/_ericelliott/status/655530013631107072">October 17, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

~~I thought I would explore this a little bit, as I almost never use `for()` loops, but I often use `.forEach()`.~~

~~There will always be nay-sayers, who point out that `for()` is faster than `.forEach()` (this is actually not true, see UPDATE below).~~

~~Speed is important, but you have to consider other things, especially as code scales.~~

~~This is a great [article](http://zsoltfabok.com/blog/2012/08/javascript-foreach/), that explains some of the *gotcha's* of `for()` loops. It also points out something that you would not notice if merely viewing a `for()` vs `.forEach()` test like [this](https://jsperf.com/for-vs-foreach/37). `for()` uses **more** memory than `.forEach()`!~~

~~So which is more important? Speed or memory?~~

~~Both are important, of course. Firstly, *none* of these are going to be the bottleneck in your code. Secondly, micro-optimizations aren't the way to win the war, which is more readable/hackable/maintainable?~~

~~Let's take a look at a really basic example:~~

~~Consider this array:~~

```javascript
var arr = [1, 2, 3];
```

~~`.map()`:~~

```javascript
arr.map(function(i) {
  console.log(i);
});
```

~~*43 characters*~~

~~`.forEach()`:~~

```javascript
arr.forEach(function(i) {
  console.log(i);
});
```

~~*47 characters*~~

~~`for()`:~~

```javascript
for (var i = 0, l = arr.length; i < l; i++) {
  console.log(arr[i]);
}
```

~~*70 characters*~~

~~`.map()` and `.forEach()` are significantly less typing, they are also clearer to read, and they create their own scope, whereas the `for()` loop leaves us with `i` and `l` hanging around after everything is done, so we would need to write even more code to clean up after our `for()` loop!~~

~~In other words, do yourself and your friends a favor:~~

~~Use `.forEach()` or `.map()`.~~

~~Which leads us to the next argument. Why is `.map()` better than `.forEach()`?~~

~~First point for `.map()`, is that it is faster than `.forEach()`. Although I noted earlier that speed is not the only consideration, in this case neither have the inherent issues of `for` loops.~~

~~Secondly, the un-intended side effect you will run into with `.forEach()` is that it doesn't return an array. So if you want to be the coolest, functional JavaScript programmer on the block, `.map()` is your friend. In other words, `.forEach()` terminates chains, while `.map()` allows you to chain even more calls. Making you the coolest cat around town. Thanks to [Ross Allen](https://twitter.com/ssorallen) for some tips on explaining this. Here is a terrible example of method chaining:~~

```javascript
var arr = [1, 3, 2];

console.log(
  // This one works:
  arr
  .map(function (i) {
    return i + i;
  })
  // Chaining!
  .sort()
);
// => [ 2, 4, 6 ]

console.log(
  // This one does not:
  arr
  .forEach(function (i) {
    return i + i;
  })
  // This is where forEach breaks:
  .sort()
);
// => TypeError: Cannot read property 'sort' of undefined
```

~~[Fiddle](https://jsfiddle.net/ryanpcmcquen/tdkp2wvo/)~~

~~Although this is a lame example, it does show the limitations of `.forEach()` as opposed to `.map()`.~~

~~Let me know in the comments what you prefer and why, thanks for reading!~~

~~TL;DR~~

~~`.map()` > `.forEach()` > `for()`~~

~~UPDATE 2016.05.24: `.map()` is actually the fastest of all 3 in certain JavaScript engines (like [Mozilla's SpiderMonkey](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey)). I advise *always* using `map`.~~
