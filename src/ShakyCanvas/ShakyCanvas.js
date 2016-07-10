const font = "20pt 'Gloria Hallelujah'";

// ShakyCanvas provides a way of drawing shaky lines on a normal
// HTML5 canvas element.
export default class ShakyCanvas {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.ctx.lineWidth = 3;
    this.ctx.font = font;
    this.ctx.textBaseline = 'middle';
  }

  moveTo(x01, y01) {
    this.x0 = x01;
    this.y0 = y01;
  }

  lineTo(x1, y1) {
    this.shakyLine(this.x0, this.y0, x1, y1);
    this.moveTo(x1, y1);
  }

  // Draw a shaky line between (x0, y0) and (x1, y1)
  shakyLine(x0, y0, x1, y1) {
    // Let $v = (d_x, d_y)$ be a vector between points $P_0 = (x_0, y_0)$
    // and $P_1 = (x_1, y_1)$
    const dx = x1 - x0;
    const dy = y1 - y0;

    // Let $l$ be the length of $v$
    const l = Math.sqrt(dx * dx + dy * dy);

    // Now we need to pick two random points that are placed
    // on different sides of the line that passes through
    // $P_1$ and $P_2$ and not very far from it if length of
    // $P_1 P_2$ is small.
    const K = Math.sqrt(l) / 1.5;
    const k1 = Math.random();
    const k2 = Math.random();
    const l3 = Math.random() * K;
    const l4 = Math.random() * K;

    // Point $P_3$: pick a random point on the line between $P_0$ and $P_1$,
    // then shift it by vector $\frac{l_1}{l} (d_y, -d_x)$ which is a line's normal.
    const x3 = x0 + dx * k1 + dy / l * l3;
    const y3 = y0 + dy * k1 - dx / l * l3;

    // Point $P_3$: pick a random point on the line between $P_0$ and $P_1$,
    // then shift it by vector $\frac{l_2}{l} (-d_y, d_x)$ which also is a line's normal
    // but points into opposite direction from the one we used for $P_3$.
    const x4 = x0 + dx * k2 - dy / l * l4;
    const y4 = y0 + dy * k2 + dx / l * l4;

    // Draw a bezier curve through points $P_0$, $P_3$, $P_4$, $P_1$.
    // Selection of $P_3$ and $P_4$ makes line 'jerk' a little
    // between them but otherwise it will be mostly straight thus
    // creating illusion of being hand drawn.
    this.ctx.moveTo(x0, y0);
    this.ctx.bezierCurveTo(x3, y3, x4, y4, x1, y1);
  }

  // Draw a shaky bulb (used for line endings).
  bulb(x0, y0) {
    const fuzziness = () => Math.random() * 2 - 1;
    for (let i = 0; i <= 2; i++) {
      this.beginPath();
      this.ctx.arc(x0 + fuzziness(), y0 + fuzziness(), 5, 0, Math.PI * 2, true);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }

  // Draw a shaky arrowhead at the (x1, y1) as an ending
  // for the line from (x0, y0) to (x1, y1)
  arrowhead(x0, y0, x1, y1) {
    const dx = x0 - x1;
    const dy = y0 - y1;

    let alpha = Math.atan(dy / dx);
    if (dy === 0) {
      alpha = dx < 0 ? -Math.PI : 0;
    }

    const alpha3 = alpha + 0.5;
    const alpha4 = alpha - 0.5;

    const l3 = 20;
    const x3 = x1 + l3 * Math.cos(alpha3);
    const y3 = y1 + l3 * Math.sin(alpha3);

    this.ctx.beginPath();
    this.moveTo(x3, y3);
    this.lineTo(x1, y1);
    this.ctx.stroke();

    const l4 = 20;
    const x4 = x1 + l4 * Math.cos(alpha4);
    const y4 = y1 + l4 * Math.sin(alpha4);

    this.ctx.beginPath();
    this.moveTo(x4, y4);
    this.lineTo(x1, y1);
    this.stroke();
  }

  // Forward some methods to rendering context.
  // Ideally we would just use
  //
  //   noSuchMethod(mirror) => mirror.invokeOn(mirror);
  //
  beginPath() {
    this.ctx.beginPath();
  }

  stroke() {
    this.ctx.stroke();
  }

  set strokeStyle(val) {
    this.ctx.strokeStyle = val;
  }

  set fillStyle(val) {
    this.ctx.fillStyle = val;
  }

  fillText(text, x0, y0) {
    this.ctx.fillText(text, x0, y0);
  }
}
