import React, { PropTypes, Component } from 'react'; // eslint-disable-line no-unused-vars

import Line from './ShakyCanvas/Line';
import ShakyCanvas from './ShakyCanvas/ShakyCanvas';
import {
  X, Y,
  parseASCIIArt,
} from './ShakyCanvas/utils';

class ShakyCanvasComponent extends Component {
  constructor() {
    super();
    this.shakyId = Date.now();
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  componentDidMount() {
    this.drawDiagram();
  }

  handleDoubleClick() {
    console.log('Double Clicked');
    const textarea = (
      <textarea
        id={`shaky-textarea-${this.shakyId}`}
        defaultValue={this.props.children}
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}
        cols="45"
        rows="45"
      ></textarea>
    );
  }

  handleChange() {
    this.drawDiagram();
  }

  handleKeyUp() {
    this.drawDiagram();
  }

  // Draw a diagram from the ascii art contained in the #textarea.
  drawDiagram() {
    const figures = parseASCIIArt(this.props.children);

    // Compute required canvas size.
    let width = 0;
    let height = 0;
    const figuresLen = figures.length;
    for (let i = 0; i < figuresLen; i++) {
      const figure = figures[i];
      if (figure instanceof Line) {
        width = Math.max(width, X(figure.x1 + 1));
        height = Math.max(height, Y(figure.y1 + 1));
      }
    }

    const canvas = document.getElementById(`shaky-canvas-${this.shakyId}`);

    canvas.width = +width;
    canvas.height = +height;

    const shakyCtx = new ShakyCanvas(canvas);
    for (let i = 0; i < figuresLen; i++) {
      figures[i].draw(shakyCtx);
    }
  }

  render() {
    return (
      <div id="react-shaky-wrapper">
        <canvas
          id={`shaky-canvas-${this.shakyId}`}
          onDoubleClick={this.handleDoubleClick}
        ></canvas>
      </div>
    );
  }
}

ShakyCanvasComponent.propTypes = {
  children: PropTypes.node,
};

export default ShakyCanvasComponent;
