---
layout: post
title: "flatMap for node"
date: 2016-05-21 13:03:01
categories: javascript
---

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
