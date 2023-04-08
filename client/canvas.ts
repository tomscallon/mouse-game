const canvas = document.createElement('canvas');

canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';

function syncCanvasSizeWithWindow(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

const attach = new Promise<void>(resolve => document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(canvas);
  syncCanvasSizeWithWindow(canvas);
  resolve();
}));

export async function getCanvas(): Promise<HTMLCanvasElement> {
  await attach;
  return canvas;
};
