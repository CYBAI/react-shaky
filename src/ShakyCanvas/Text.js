import { X, Y } from './utils';

// Text annotation at (x0, y0) with the given color.
export default class Text {
  constructor(x0, y0, text, color) {
    this.x0 = x0;
    this.y0 = y0;
    this.text = text;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, X(this.x0), Y(this.y0));
  }
}
