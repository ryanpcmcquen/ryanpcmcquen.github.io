---
layout: post
title: "Dynamic object keys (computed property names) are awesome!"
date: 2016-10-25 11:45:01
categories: javascript
---

This is one of the best features of ES6 I have seen, because it allows you to write more declarative and beautiful code. In fact, I was a bit surprised to find this was not already part of JavaScript.

In optimizing some of my own code for work, I realized that one object's structure relied on 'magic numbers'. Sadly, the data structure was built this way, but you can get around that in your code with _computed property names_.

Here's how it looks without _computed property names_:

```js
const dragonTypes = {
  123: {
    physical: {
      weight: 2300
    },
    mental: {
      intelligence: 761
    }
  },
  456: {
    physical: {
      weight: 1360
    },
    mental: {
      intelligence: 762
    }
  
  }
};
```

Because of the existing data structure, you _must_ refer to these Dragons by their numeric types, but you have a secret weapon with _computed property names_:

```js
const dragons = {
  bigFoo: 123,
  lilBar: 456
};
```

And now you can write this!

```js
const dragonTypes = {
  [dragons.bigFoo]: {
    physical: {
      weight: 2300
    },
    mental: {
      intelligence: 761
    }
  },
  [dragons.lilBar]: {
    physical: {
      weight: 1360
    },
    mental: {
      intelligence: 762
    }
  
  }
};
```

Beyond that, you can even do expressions inside of the brackets (`[]`):

```js
let counter = 0;

const countingObj = {
  [counter++]: 'Getting',
  [counter++]: 'ever',
  [counter++]: 'closer',
  [counter++]: 'to',
  [counter++]: 'beauty.'
};

Object.keys(countingObj).map((i) => {
  return countingObj[i];
}).join(' ');

// => 'Getting ever closer to beauty.'
```

[REPL](https://repl.it/EKae/1)

Browser compatibility is actually pretty solid, if you are only supporting modern browsers (Chrome, Edge, Firefox and Safari), all the latest verisons of those have no problem with this code. Unfortunately Internet Explorer 11 and earlier can't handle it, spewing an _Expected identifier, string or number_ error.

[MDN reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names)
