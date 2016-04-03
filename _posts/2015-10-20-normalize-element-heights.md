---
layout: post
title: "Normalize heights of elements with JavaScript"
date: 2015-10-20 15:41:01
categories: javascript
---

Use the following code to work around elements of differing heights, that are lined up in columns. Apply the height of the tallest element to all elements (normalize them), so things line up nicely.

To use it, just put the selector inside `querySelectorAll()` on the `elementArray` (replacing `.foobar`).

If you haven't used `querySelectorAll()`, you owe it to yourself to read the [MDN article](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll).

```javascript
(function() {
  window.addEventListener('load', function() {
    // declare the height array here since we need it
    // inside multiple functions
    var elementHeightArray = [],
      // convert the collection into an array so we can forEach() over it
      elementArray = [].slice.call(document.querySelectorAll('.foobar'));
    elementArray.forEach(function(i) {
      elementHeightArray.push(i.clientHeight);
    });
    // get the tallest height
    var maxElementHeight = Math.max.apply(Math, elementHeightArray);
    // apply that height to all elements
    elementArray.forEach(function(i) {
      i.style.height = maxElementHeight + "px";
    });
  });
}());
```

### ALTERNATE SOLUTION (thanks to [Tarabyte](https://github.com/Tarabyte), added 2015.10.21)

```javascript
window.addEventListener('load', function() {
  var max = 0,
    elements = document.querySelectorAll('.foobar');

  [].reduce.call(elements, function(prev, item) {
    max = Math.max(item.clientHeight, max);

    return function(height) {
      prev(item.style.height = height);
    };
  }, function() {})(max + 'px');
});
```

[Speed comparison of the solutions.](https://jsperf.com/compare-height-normalizing-solutions)

### UPDATE 2016.02.04:

I libraried this code:

<script src="https://gist-it.appspot.com/https://github.com/ryanpcmcquen/normalizeStuff.js/blob/master/normalizeStuff.js"></script>

