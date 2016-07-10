import { X, Y } from './utils';

// Line from (x0, y0) to (x1, y1) with the given color and decolartions
// at the start and end.
export default class Line {
  constructor(x0, y0, start, x1, y1, end, color) {
    this.x0 = x0;
    this.y0 = y0;
    this.start = start;
    this.x1 = x1;
    this.y1 = y1;
    this.end = end;
    this.color = color;
  }

  draw(ctx) {
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(X(this.x0), Y(this.y0));
    ctx.lineTo(X(this.x1), Y(this.y1));
    ctx.stroke();
    this._ending(ctx, this.start, X(this.x1), Y(this.y1), X(this.x0), Y(this.y0));
    this._ending(ctx, this.end, X(this.x0), Y(this.y0), X(this.x1), Y(this.y1));
  }

  _ending(canvas, type, x0, y0, x1, y1) {
    switch (type) {
      case 'circle':
        canvas.bulb(x1, y1);
        break;
      case 'arrow':
        canvas.arrowhead(x0, y0, x1, y1);
        break;
      default:
    }
  }
}
