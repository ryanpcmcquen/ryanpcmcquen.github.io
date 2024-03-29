---
layout: post
title: "Writing my own throttle"
date: 2015-11-28 15:11:31
categories: javascript
---

I [wrote recently](https://ryanpcmcquen.org/javascript/2015/10/22/a-modular-throttle.html) about finding a modular throttle function. I wasn't happy using that one, primarily because it is a rewrite of the [Underscore.js](http://underscorejs.org/) [throttle](http://underscorejs.org/docs/underscore.html#section-82). The Underscore project does great work, but I really wanted to understand this 'low-level' function. For me, doing *is* understanding. Furthermore, Underscore's throttle relies on `Date.now()`, which gives it a kind of 'memory'. Its behavior isn't consistent between the first time you fire it, and firing it after waiting a while. A throttle's *throttling* should always be relative.

So I have been researching and sampling various throttle functions since then. I appreciated some from a readability angle, but they had issues. They [wouldn't fire on the trailing edge](http://sampsonblog.com/749/simple-throttle-function). Or they [modified the user's function](https://www.nczonline.net/blog/2007/11/30/the-throttle-function/) (and weren't even a throttle, Zakas' *throttle* is actually a debounce).

So I have been going back and forth on throttle ideas. Writing them out on my whiteboard, on notebook paper before I fall asleep, testing them in zero gravity, et cetera. I have meditated on all things throttle. Why? Because a throttle is rudimentary to so many libraries, I could not continue writing JavaScript libs until I had a throttle I could call my own. Until I had a throttle I could easily write and understand from memory. The other day I realized that the issue with Sampson's `throttle()` could be solved by combining it with Zakas' `debounce()`. So after weeks of trying things that didn't work at all, I came up with this:

```javascript
(function() {
  'use strict';
  var modThrottle = function(func, delay) {
    var waiting = false;
    return function() {
      if (!waiting) {
        waiting = true;
        clearTimeout(func.MODTHROTTLE___TIMEOUT___ID);
        func.MODTHROTTLE___TIMEOUT___ID = setTimeout(function() {
          func.call();
          waiting = false;
        }, delay);
      }
    };
  };
  window.modThrottle = modThrottle;
}());
```

What I don't like is that it modify's the user's function, then I realized that could be worked around by cloning the function with `bind()`.

```javascript
(function() {
  'use strict';
  var modThrottle = function(func, delay) {
    var waiting = false,
      funcClone = func.bind();
    return function() {
      if (!waiting) {
        waiting = true;
        clearTimeout(funcClone.MODTHROTTLE___TIMEOUT___ID);
        funcClone.MODTHROTTLE___TIMEOUT___ID = setTimeout(function() {
          funcClone.call();
          waiting = false;
        }, delay);
      }
    };
  };
  window.modThrottle = modThrottle;
}());
```

Much better! Now we aren't modifying the function we bring in. That was just messy. But wait, if you're thinking, why not just use a `var`, you're right on the money!

```javascript
(function() {
  'use strict';
  var modThrottle = function(func, delay) {
    var waiting = false,
      funcTimeoutId;
    return function() {
      if (!waiting) {
        waiting = true;
        clearTimeout(funcTimeoutId);
        funcTimeoutId = setTimeout(function() {
          func.call();
          waiting = false;
        }, delay);
      }
    };
  };
  window.modThrottle = modThrottle;
}());
```

Now the code is simple, lightweight, readable, and isn't violating any best practices. This `throttle()` could be used internally like so:

```javascript
function modThrottle(func, delay) {
  'use strict';
  var waiting = false,
    funcTimeoutId;
  return function() {
    if (!waiting) {
      waiting = true;
      clearTimeout(funcTimeoutId);
      funcTimeoutId = setTimeout(function() {
        func.call();
        waiting = false;
      }, delay);
    }
  };
}
```

You can also easily reduce this to a `debounce()`:

```javascript
function modDebounce(func) {
  'use strict';
  var funcTimeoutId;
  return function() {
    clearTimeout(funcTimeoutId);
    funcTimeoutId = setTimeout(function() {
      func.call();
    }, 210);
  };
}
```

Now this is pretty much complete, but I think code should have a bit of attitude. So I decided to have my throttle tell a story. Enter [Odis](https://github.com/ryanpcmcquen/odis). Odis is the Latin god of modular limitation, let's take a short look at the reusable version of [Odis](https://github.com/ryanpcmcquen/odis) you can drop right inside of your library today:

<script src="https://gist-it.appspot.com/https://github.com/ryanpcmcquen/odis/blob/master/odis.js"></script>

You'll notice that we have defaults for both `delay` arguments now (the last argument for a function *should* be optional), and we are only creating one global object (or none if you use this internally).

Find out more about [Odis](https://github.com/ryanpcmcquen/odis) from his [README](https://github.com/ryanpcmcquen/odis/blob/master/README.md).

