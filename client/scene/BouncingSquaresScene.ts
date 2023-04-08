import { getMousePosition } from "../mouse";
import Scene, { Bounds } from "./Scene";

type Square = {
  color: string;
  size: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomInt(min: number, max: number): number {
  return Math.floor(randomFloat(Math.ceil(min), Math.floor(max)));
}

function randomColor(): string {
  const [r, g, b] = [...new Array(3)].map(() => randomInt(0, 255));
  return `rgb(${r} ${g} ${b} / 0.7)`;
}

function randomSqaure(): Square {
  return {
    color: randomColor(),
    size: randomInt(40, 60),
    vx: randomFloat(5, 100),
    vy: randomFloat(5, 100),
    x: 0,
    y: 0,
  };
}

const MOUSE_FORCE = 100;
const MOUSE_DISTANCE_FACTOR = 1 / 100;
const MOUSE_MASS_FACTOR = 1 / 100;
const DRAG_FACTOR = 0.999;

export default class BouncingSquaresScene implements Scene {
  #squares: Square[];

  constructor(numberOfSquares: number) {
    this.#squares = [...new Array(numberOfSquares)].map(randomSqaure);
  }

  update(deltaMs: DOMHighResTimeStamp, bounds: Bounds) {
    const deltaS = deltaMs / 1000;
    const mousePosition = getMousePosition();

    this.#squares.forEach((square) => {
      // Apply force based on the mouse's location.
      if (mousePosition != null) {
        const cx = square.x + square.size / 2;
        const cy = square.y + square.size / 2;
        const { x: mx, y: my } = mousePosition;

        // Get acceleration as a unit vector.
        const d = Math.sqrt(Math.pow(cx - mx, 2) + Math.pow(cy - my, 2));
        const ax = (cx - mx) / d;
        const ay = (cy - my) / d;

        // Actual force applied is force * acceleration vector / distance^2 / "mass"
        // We approximate mass with the square's area.
        const factor =
          MOUSE_FORCE /
          Math.pow(d * MOUSE_DISTANCE_FACTOR, 2) /
          Math.pow(square.size * MOUSE_MASS_FACTOR, 2);
        square.vx += ax * factor * deltaS;
        square.vy += ay * factor * deltaS;
      }

      // Update position based on velocity.
      square.x += square.vx * deltaS;
      square.y += square.vy * deltaS;

      // Bounce against edges (horizontal).
      if (square.x < 0) {
        square.x = 0;
        square.vx = Math.abs(square.vx);
      } else if (square.x > bounds.width - square.size) {
        square.x = bounds.width - square.size;
        square.vx = -Math.abs(square.vx);
      }

      // Bounce against edges (vertical).
      if (square.y < 0) {
        square.y = 0;
        square.vy = Math.abs(square.vy);
      } else if (square.y > bounds.height - square.size) {
        square.y = bounds.height - square.size;
        square.vy = -Math.abs(square.vy);
      }

      // Decelerate based on velocity.
      square.vx *= DRAG_FACTOR;
      square.vy *= DRAG_FACTOR;
    });
  }

  draw(context: CanvasRenderingContext2D) {
    this.#squares.forEach(({ color, size, x, y }) => {
      context.fillStyle = color;
      context.fillRect(x, y, size, size);
    });
  }
}
