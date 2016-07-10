// Auxiliary Point class used during parsing.
// Unfortunately Dart does not support structural classes or
// local classes so I had to polute library namespace with it.
export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
