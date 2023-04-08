type Position = {
  x: number;
  y: number;
};

let position: Position | null = null;

function updateMousePosition(e: MouseEvent) {
  position = { x: e.clientX, y: e.clientY };
}

function removeMousePosition() {
  position = null;
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("mousemove", updateMousePosition);
  document.body.addEventListener("mouseleave", removeMousePosition);
});

/**
 * Gets the mouse's current position.
 *
 * @returns The current mouse position relative to the viewport, or
 * `null` if the mouse isn't currently over the viewport
 */
export function getMousePosition(): Position | null {
  return position;
}
