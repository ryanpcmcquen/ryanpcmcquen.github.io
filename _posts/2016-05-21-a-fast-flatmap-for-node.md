---
layout: post
title: "A fast flatMap for node."
date: 2016-05-21 13:22:01
categories: javascript
---

After some testing and research I have published my first [npm module](https://www.npmjs.com/package/flatmap-fast). Which also lead me to [Tonic](https://tonicdev.com/). What an amazing tool! Check out this embed:

<script src="https://embed.tonicdev.com"></script>
<div id="flatmap-fast-example">
</div>
<script>
(() => {
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    const notebook = Tonic.createNotebook({
      // the parent element for the new notebook
      element: document.getElementById("flatmap-fast-example"),

      // specify the source of the notebook
      source: "\
const flatMap = require(\"flatmap-fast\");\n\
const arr = [[], [1], [2, 3]];\n\
flatMap(arr);\
",
      nodeVersion: ">=4.x.x"
    });
  });
})();
</script>

You can also write 'Notebooks' in Tonic. This is an excellent way to document and explain your code with usable and editable examples. Think of it as a combination of [Hackpad](https://hackpad.com/) and [repl.it](https://repl.it/), two of my favorite tools.

As for the `flatMap`, I noticed that some of the npm `flatMap`'s did not seem very modern. Also, [speed can vary wildly](https://repl.it/CTc3) depending on the implementation. So go get your `monad` on!
