import './css/shaky.css';

import React, { PropTypes, Component } from 'react'; // eslint-disable-line no-unused-vars
import classNames from 'classnames';

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
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleUpdateDiagram = this.handleUpdateDiagram.bind(this);
    this.state = {
      editing: false,
      shakyDiagram: '',
      canvasWidth: 0,
      canvasHeight: 0,
    };
  }

  componentWillMount() {
    this.setState({ shakyDiagram: this.props.children });
  }

  componentDidMount() {
    this.drawDiagram();
  }

  handleDoubleClick() {
    this.updateEditState();
    this.focusTextarea();
  }

  focusTextarea() {
    this.refs.reactShakyTextarea.focus();
  }

  handleUpdateDiagram(e) {
    if (e.type === 'blur') {
      this.updateEditState();
    }

    this.updateShakyDiagram(this.refs.reactShakyTextarea.value);
    this.drawDiagram();
  }

  updateEditState() {
    this.setState({ editing: !this.state.editing });
  }

  updateShakyDiagram(shakyDiagram) {
    this.setState({ shakyDiagram });
  }

  // Draw a diagram from the ascii art contained in the #textarea.
  drawDiagram() {
    const figures = parseASCIIArt(this.state.shakyDiagram);

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

    this.setState({ canvasWidth: canvas.width });
    this.setState({ canvasHeight: canvas.height });

    const shakyCtx = new ShakyCanvas(canvas);
    for (let i = 0; i < figuresLen; i++) {
      figures[i].draw(shakyCtx);
    }
  }

  render() {
    return (
      <div id="react-shaky-wrapper">
        <textarea
          id={`shaky-textarea-${this.shakyId}`}
          className={
            classNames({
              'react-shaky-textarea-active': this.state.editing,
              'react-shaky-textarea-hidden': !this.state.editing,
            })
          }
          value={this.state.shakyDiagram}
          onChange={this.handleUpdateDiagram}
          onKeyUp={this.handleUpdateDiagram}
          onBlur={this.handleUpdateDiagram}
          ref="reactShakyTextarea"
          style={{
            width: this.state.canvasWidth,
            height: this.state.canvasHeight,
          }}
        ></textarea>
        <canvas
          id={`shaky-canvas-${this.shakyId}`}
          ref="reactShakyCanvas"
          className={
            classNames({
              'react-shaky-canvas-active': !this.state.editing,
              'react-shaky-canvas-hidden': this.state.editing,
            })
          }
          onDoubleClick={this.handleDoubleClick}
        ></canvas>
      </div>
    );
  }
}

ShakyCanvasComponent.propTypes = {
  children: PropTypes.node.isRequired,
  editable: PropTypes.bool,
};

export default ShakyCanvasComponent;
