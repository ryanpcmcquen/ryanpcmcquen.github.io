---
layout: post
title: "A fast flatMap for node."
date: 2016-05-21 13:22:01
categories: javascript
---

After some testing and research I have published my first [npm module](https://www.npmjs.com/package/flatmap-fast). Which also lead me to [RunKit](https://runkit.com/). What an amazing tool! Check out this embed:

<script src="https://embed.runkit.com"></script>
<div id="flatmap-fast-example">
</div>
<script>
(() => {
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    const notebook = RunKit.createNotebook({
      // the parent element for the new notebook
      element: document.getElementById("flatmap-fast-example"),

      // specify the source of the notebook
      source: `
(() => {
  'use strict';
  
  const flatMap = require("flatmap-fast");

  const testArr = ['Hi', 'World'];
  const splitWord = (word) => word.split('');

  console.log(
    flatMap(testArr, splitWord)
  );

  // => ['H', 'i', 'W', 'o', 'r', 'l', 'd']
  
  console.log(
    flatMap([1, 2, 3, 4], (x) => [x, x * 2])
  );
  
  // => [1, 2, 2, 4, 3, 6, 4, 8]
})();
`,
      nodeVersion: ">=4.x.x"
    });
  });
})();
</script>

You can also write 'Notebooks' in RunKit. This is an excellent way to document and explain your code with usable and editable examples. Think of it as a combination of [Hackpad](https://hackpad.com/) and [repl.it](https://repl.it/), two of my favorite tools.

As for the `flatMap`, I noticed that some of the npm `flatMap`'s did not seem very modern. Also, speed can vary wildly depending on the implementation. So go get your `monad` on!
