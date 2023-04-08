function createCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');

  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';

  return canvas;
}

function syncCanvasSizeWithWindow(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

class Canvas {
  #canvas: HTMLCanvasElement;
  #attach: Promise<void>;

  constructor() {
    this.#canvas = createCanvas();

    this.#attach = new Promise(resolve => document.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(this.#canvas);
      syncCanvasSizeWithWindow(this.#canvas);
      resolve();
    }));
  }

  async attach() {
    return this.#attach;
  }

  getContext(): CanvasRenderingContext2D {
    return this.#canvas.getContext('2d');
  }
}

export default new Canvas();
