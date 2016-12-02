# React Shaky Diagram

[![Build Status](http://img.shields.io/travis/CYBAI/react-shaky.svg?style=flat-square)](https://travis-ci.org/CYBAI/react-shaky)
[![npm version](http://img.shields.io/npm/v/react-shaky.svg?style=flat-square)](https://badge.fury.io/js/react-shaky)

Use this component to draw a shaky diagram.
Code of drawing shaky diagram is ported from [`moe-js`](https://github.com/mraleph/moe-js/blob/master/talks/jsconfeu2012/tools/shaky/web/shaky.dart) and [`shaky.coffee`](https://github.com/dbushong/shaky/blob/master/shaky.coffee).

## Usage

```js
import ShakyCanvas from 'react-shaky';

const canvas = (
  <ShakyCanvas>
    {
      `
      +----+  +----+
      |V8  |  |    |
      |   *+--+> JS|
      +----+  +----+`
    }
  </ShakyCanvas>
);

ReactDOM.render(canvas, document.getElementById('shaky'));
```

## Reference

[Shaky diagramming](http://mrale.ph/blog/2012/11/25/shaky-diagramming.html) by [mraleph](https://twitter.com/mraleph)
