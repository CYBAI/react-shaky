import React from 'react';
import ReactDOM from 'react-dom';
import ShakyCanvas from 'react-shaky';

const canvas = (
  <ShakyCanvas>
    {
      `
      +------------+     +------------+
      |            |     |            |
      |  CONTEXT   |<-+  |  CONTEXT   |<-+
      |            |  |  |            |  |
      +------------+  |  +------------+  |
                      |                  |
      +------------+  |  +------------+  |
      |    getY    |  |  |    getY    |  |
      |            |  |  |            |  |
      |     *------+--+  |     *------+--+
      |            |  |  |            |  |
      +------------+  |  +------------+  |
                      |                  |
      +------------+  |  +------------+  |
      |    getX    |  |  |    getX    |  |
      |            |  |  |            |  |
      |     *------+--+  |     *------+--+
      |            |  |  |            |  |
      +------------+  |  +------------+  |
                      |                  |
      +------------+  |  +------------+  |
      |   getSum   |  |  |   getSum   |  |
      |            |  |  |            |  |
      |     *------+--+  |     *------+--+
      |     *      |     |     *      |
      +-----+------+     +-----+------+
            |                  |
            +----------+-------+
                       |
                       v
            +--------------------+
            |  SharedFunctionInfo|
            |          *         |
            +----------+---------+
                       |
                       v
            +--------------------+
            |  unoptimized Code  |
            |                    |
     ??? <--+---* getX call      |
            |                    |
     ??? <--+---* getY call      |
            |                    |
            +--------------------+`
    }
  </ShakyCanvas>
);

ReactDOM.render(canvas, document.getElementById('app'));
