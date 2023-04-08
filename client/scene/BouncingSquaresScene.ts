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
    size: randomInt(15, 200),
    vx: randomFloat(5, 100),
    vy: randomFloat(5, 100),
    x: 0,
    y: 0,
  };
}

export default class BouncingSquaresScene implements Scene {
  #squares: Square[];

  constructor(numberOfSquares: number) {
    this.#squares = [...new Array(numberOfSquares)].map(randomSqaure);
  }

  update(deltaMs: DOMHighResTimeStamp, bounds: Bounds) {
    const deltaS = deltaMs / 1000;
    this.#squares = this.#squares.map((square) => {
      const newSquare = {
        ...square,
        x: square.x + square.vx * deltaS,
        y: square.y + square.vy * deltaS,
      };

      if (newSquare.x < 0) {
        newSquare.x = 0;
        newSquare.vx = Math.abs(newSquare.vx);
      } else if (newSquare.x > bounds.width - newSquare.size) {
        newSquare.x = bounds.width - newSquare.size;
        newSquare.vx = -Math.abs(newSquare.vx);
      }

      if (newSquare.y < 0) {
        newSquare.y = 0;
        newSquare.vy = Math.abs(newSquare.vy);
      } else if (newSquare.y > bounds.height - newSquare.size) {
        newSquare.y = bounds.height - newSquare.size;
        newSquare.vy = -Math.abs(newSquare.vy);
      }

      return newSquare;
    });
  }

  draw(context: CanvasRenderingContext2D) {
    this.#squares.forEach(({ color, size, x, y }) => {
      context.fillStyle = color;
      context.fillRect(x, y, size, size);
    });
  }
}
