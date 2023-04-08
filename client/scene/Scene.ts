export type Bounds = {
  width: number;
  height: number;
};

export default interface Scene {
  update(deltaMs: DOMHighResTimeStamp, bounds: Bounds): Scene | void;
  draw(context: CanvasRenderingContext2D): void;
}
