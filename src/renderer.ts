const canvas: HTMLElement = document.getElementById('canvas');

export const renderer = new PIXI.Renderer({
  view: canvas as HTMLCanvasElement,
  transparent: true,
  width: 1180,
  height: 750 
});
