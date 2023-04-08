import Scene from "./scene/Scene";

export default class Game {
  #animationFrameId: number | null;
  #animationFrameTime: DOMHighResTimeStamp | null;
  #canvas: HTMLCanvasElement;
  #scene: Scene;

  constructor(canvas: HTMLCanvasElement, initialScene: Scene) {
    this.#animationFrameId = null;
    this.#animationFrameTime = null;
    this.#canvas = canvas;
    this.#scene = initialScene;
  }

  #tick = (time: DOMHighResTimeStamp) => {
    if (this.#animationFrameTime != null) {
      // If this isn't the first frame, update based on the elapsed time
      // since the previous frame.
      const elapsed = time - this.#animationFrameTime;
      this.#scene.update(elapsed, {
        width: this.#canvas.width,
        height: this.#canvas.height,
      });
    }

    // Draw the frame.
    const context = this.#canvas.getContext("2d");
    context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#scene.draw(context);

    // Request the next frame!
    this.#animationFrameId = window.requestAnimationFrame(this.#tick);
    this.#animationFrameTime = time;
  };

  /**
   * Starts the game, if it's not already running.
   *
   * @returns `true` if the game was freshly started, `false` if it was already running
   */
  start(): boolean {
    if (this.#animationFrameId != null) {
      return false;
    }

    this.#animationFrameId = window.requestAnimationFrame(this.#tick);
    return true;
  }

  /**
   * Stops the game, if it is currently running.
   *
   * @returns `true` if the game was running and is now stopped, `false` if the game wasn't running
   */
  stop(): boolean {
    if (this.#animationFrameId == null) {
      return false;
    }

    window.cancelAnimationFrame(this.#animationFrameId);
    this.#animationFrameId = null;
    return true;
  }
}
