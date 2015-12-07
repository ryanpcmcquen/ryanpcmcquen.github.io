---
layout: post
title: "Writing a Google Chrome extension"
date: 2015-12-06 20:38:31
categories: javascript
---

Have you ever found a tool that was 99% there? It was just missing that one killer feature?

That happened to me, with the lovely tool [WorkFlowy](https://workflowy.com/). I found it helped me organize my JavaScript thoughts, but there was no code support! Not a deal breaker, but code formatting is nice. I'm used to tools like [Hackpad](https://hackpad.com) where you can mix code with prose. I found a tool that should have fixed that. [WorkFlowy for Coders](https://chrome.google.com/webstore/detail/workflowy-for-coders/hogpngcijkfmbfijfkaapeejhijipddp?hl=en-GB). It looked like a winner, and it's [open source](https://github.com/medovob/workflowy-for-coders). So far, so good.

But it sucks. There is just no other way to put it. You can't edit the text in certain views. It breaks functionality. It only renders Markdown in certain views. There are lots of reports of it not working on recent versions of Chrome ... not a surprise considering the extension hasn't been updated in 3 years, and bundles a lot of old libraries.

So I thought, what if I wrote something simple, pure JavaScript, that would just render code? I didn't need full Markdown support, WorkFlowy already has bold and italic.

Here [it is](https://github.com/ryanpcmcquen/workflowyCodeFormatter)! At just a few kilobytes of pure JavaScript (under 1KB [minified](https://github.com/ryanpcmcquen/workflowyCodeFormatter/blob/master/workflowyCodeFormatter.min.js)!).

I also was fortunate enough to get an awesome [graphic designer](http://www.corriblair.com/) to put together some beautiful artwork for it:

![WorkFlowy code formatter marquee](https://raw.githubusercontent.com/ryanpcmcquen/workflowyCodeFormatter/master/wcf_marquee.png)

The only file necessary for a Chrome extension, is a short file named `manifest.json`:

<script src="https://gist-it.appspot.com/https://github.com/ryanpcmcquen/workflowyCodeFormatter/blob/master/manifest.json"></script>

The only thing that isn't obvious here is the `manifest_version`, more on that [here](https://developer.chrome.com/extensions/manifestVersion). Long story short, put a `2` there.

The only other 'barrier' for becoming a web store developer is a one-time $5.00 USD fee. You can easily push new versions using Chrome's [Dev Editor](https://chrome.google.com/webstore/detail/chrome-dev-editor-develop/pnoffddplpippgcfjdhbmhkofpnaalpg?hl=en). I pushed all my work to [GitHub](https://github.com/) and then cloned the repo with the Dev Editor. The entire process was nearly friction-less. I'm already bouncing around ideas for other Chrome extensions, and maybe porting the [WorkFlowy Code Formatter](https://github.com/ryanpcmcquen/workflowyCodeFormatter) to [Firefox](https://www.mozilla.org/en-US/firefox/desktop/). Firefox is going to make porting Chrome extensions easier, more on that [here](https://hacks.mozilla.org/2015/10/porting-chrome-extensions-to-firefox-with-webextensions/). I cannot wait to experiment with Firefox's WebExtensions.

Let me know if there are any sites you would like to extend the functionality of in the comments, maybe we can work on an extension together!
