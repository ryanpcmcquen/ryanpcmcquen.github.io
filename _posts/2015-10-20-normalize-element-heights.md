---
layout: post
title:  "Normalize heights of elements with JavaScript"
date:   2015-10-20 15:41:01
categories: javascript
---

Use the following code to work around elements of differing heights, that are lined up in columns. Apply the height of the tallest element to all elements (normalize them), so things line up nicely.

To use it, just put the selector inside `querySelectorAll()` on the `elementArray` (replacing `.foobar`).

If you haven't used `querySelectorAll()`, you owe it to yourself to read the [MDN article](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll).

    window.addEventListener('load',
      function () {
        // declare the height array here since we need it
        // inside multiple functions
        var elementHeightArray = [],
            // convert the collection into an array so we can forEach() over it
            elementArray = [].slice.call(document.querySelectorAll('.foobar'));
        elementArray.forEach(function (i) {
          elementHeightArray.push(i.clientHeight);
        });
        // get the tallest height
        var maxElementHeight = Math.max.apply(Math, elementHeightArray);
        // apply that height to all elements
        elementArray.forEach(function (i) {
          i.style.height = maxElementHeight + "px";
        });
      }
    );
