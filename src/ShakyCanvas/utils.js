// ES6 version port by CYBAI <cyb.ai.815@gmail.com>
//
// Copyright 2012 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/* eslint-disable consistent-return, no-duplicate-case */

import Line from './Line';
import Text from './Text';
import Point from './Point';
import { CELL_SIZE } from './constants';

// Size in pixels for a sigle character cell of ASCII art.
const X = (x) => (x * CELL_SIZE + (CELL_SIZE / 2));
const Y = (y) => (y * CELL_SIZE + (CELL_SIZE / 2));

// Parses given ASCII art string into a list of figures.
function parseASCIIArt(string) {
  const lines = string.split('\n');

  const height = lines.length;
  const width = Math.max(...lines.map((line) => line.length));

  const data = []; // Matrix containing ASCII art.

  // Get a character from the array or null if we are out of bounds.
  // Useful in places where we inspect character's neighbors and peek
  // out of bounds for boundary characters.
  const at = (y, x) => (
    (y >= 0 && y < height && x >= 0 && x < width) ?
      data[y][x] :
      null
  );

  // Convert strings into a mutable matrix of characters.
  for (let y = 0; y < height; y++) {
    const line = lines[y];
    data[y] = line.split('');
    for (let x = line.length; x < width; x++) {
      data[y][x] = ' ';
    }
  }

  // Returns true iff the character can be part of the line.
  const isPartOfLine = (x, y) => {
    const c = at(y, x);
    return c === '|' ||
           c === '-' ||
           c === '+' ||
           c === '~' ||
           c === '!';
  };

  // If character represents a color modifier returns CSS color.
  const toColor = (x, y) => {
    const c = at(y, x);
    if (c === '~' || c === '!') {
      return '#666';
    }
  };

  // Returns true iff characters is line ending decoration.
  const isLineEnding = (x, y) => {
    const c = at(y, x);
    return c === '*' ||
           c === '<' ||
           c === '>' ||
           c === '^' ||
           c === 'v';
  };

  // Finds a character that belongs to unextracted line.
  const findLineChar = () => {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (data[y][x] === '|' || data[y][x] === '-') {
          return new Point(x, y);
        }
      }
    }
  };

  // Converts line's character to the direction of line's growth.
  const dir = {
    '-': new Point(1, 0),
    '|': new Point(0, 1),
  };

  // Erases character that belongs to the extracted line.
  const eraseChar = (x, y, dx, dy) => {
    switch (at(y, x)) {
      case '|':
      case '-':
      case '*':
      case '>':
      case '<':
      case '^':
      case 'v':
      case '~':
      case '!':
        data[y][x] = ' ';
        return;
      case '+':
        dx = 1 - dx;
        dy = 1 - dy;

        data[y][x] = ' ';
        switch (at(y - dy, x - dx)) {
          case '|':
          case '!':
          case '+':
            data[y][x] = '|';
            return;
          case '-':
          case '~':
            data[y][x] = '-';
            return;
          default:
        }

        switch (at(y + dy, x + dx)) {
          case '|':
          case '!':
          case '+':
            data[y][x] = '|';
            return;
          case '-':
          case '~':
            data[y][x] = '-';
            return;
          default:
        }
        return;
      default:
    }
  };

  // Erase the given extracted line.
  const erase = (line) => {
    const dx = +(line.x0 !== line.x1);
    const dy = +(line.y0 !== line.y1);

    if (dx !== 0 || dy !== 0) {
      let x = line.x0 + dx;
      let y = line.y0 + dy;
      const x_ = line.x1 - dx;
      const y_ = line.y1 - dy;
      while (x <= x_ && y <= y_) {
        eraseChar(x, y, dx, dy);
        x += dx;
        y += dy;
      }
      eraseChar(line.x0, line.y0, dx, dy);
      eraseChar(line.x1, line.y1, dx, dy);
    } else {
      eraseChar(line.x0, line.y0, dx, dy);
    }
  };

  const figures = [];  // List of extracted figures.

  // Extract a single line and erase it from the ascii art matrix.
  const extractLine = () => {
    // debugger; // eslint-disable-line
    const ch = findLineChar();
    if (ch == null) return false;

    const d = dir[data[ch.y][ch.x]];

    // Find line's start by advancing in the oposite direction.
    let x0 = ch.x;
    let y0 = ch.y;
    let color = null;
    while (isPartOfLine(x0 - d.x, y0 - d.y)) {
      x0 -= d.x;
      y0 -= d.y;
      if (color == null) color = toColor(x0, y0);
    }

    let start = null;
    if (isLineEnding(x0 - d.x, y0 - d.y)) {
      // Line has a decorated start. Extract is as well.
      x0 -= d.x;
      y0 -= d.y;
      start = (data[y0][x0] === '*') ? 'circle' : 'arrow';
    }

    // Find line's end by advancing forward in the given direction.
    let x1 = ch.x;
    let y1 = ch.y;
    while (isPartOfLine(x1 + d.x, y1 + d.y)) {
      x1 += d.x;
      y1 += d.y;
      if (color == null) {
        color = toColor(x1, y1);
      }
    }

    let end = null;
    if (isLineEnding(x1 + d.x, y1 + d.y)) {
      // Line has a decorated end. Extract it.
      x1 += d.x;
      y1 += d.y;
      end = (data[y1][x1] === '*') ? 'circle' : 'arrow';
    }

    // Create line object and erase line from the ascii art matrix.
    const line = new Line(x0, y0, start, x1, y1, end, color == null ? 'black' : color);
    figures.push(line);
    erase(line);

    // Adjust line start and end to accomodate for arrow endings.
    // Those should not intersect with their targets but should touch them
    // instead. Should be done after erasure to ensure that erase deletes
    // arrowheads.
    if (start === 'arrow') {
      line.x0 -= d.x;
      line.y0 -= d.y;
    }

    if (end === 'arrow') {
      line.x1 += d.x;
      line.y1 += d.y;
    }

    return true;
  };


  // Extract all non space characters that were left after line extraction
  // as text objects.
  const extractText = () => {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (data[y][x] !== ' ') {
          // Find the end of the text annotation by searching for a space.
          const start = x;
          let end = x;
          while ((end < width) && (data[y][end] !== ' ')) end++;

          let text = data[y].slice(start, end).join('');
          // Check if it can be concatenated with a previously found text annotation.
          const prev = figures[figures.length - 1];
          if ((prev instanceof Text) && (prev.x0 + prev.text.length + 1) === start) {
            // If they touch concatentate them.
            prev.text = `${prev.text} ${text}`;
          } else {
            // Look for a grey color modifiers.
            let color = 'black';
            if (text[0] === '\\' && text[text.length - 1] === '\\') {
              text = text.substring(1, text.length - 1);
              color = '#666';
            }
            figures.push(new Text(x, y, text, color));
          }
          x = end;
        }
      }
    }
  };

  while (extractLine());  // Extract all lines.
  extractText();  // Extract all text.

  return figures;
}

export {
  X, Y,
  parseASCIIArt,
};
