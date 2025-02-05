import { WebGLRenderer, Color } from "three";

export class Renderer {
  constructor(canvas, wrapW, wrapH) {
    this.canvas = canvas;
    this.wrapW = wrapW;
    this.wrapH = wrapH;
    this.instance;

    this.RENDERER_PARAM = {
      clearColor: new Color("rgb(0, 0, 0)"),
      w: this.wrapW,
      h: this.wrapH,
    };

    this.init();
  }

  init() {
    this.instance = new WebGLRenderer({
      canvas: this.canvas,
      alpha: true, // ?
    });
    this.instance.setPixelRatio(window.devicePixelRatio);
    this.instance.setClearColor(this.RENDERER_PARAM.clearColor, 1);
    this.instance.setSize(this.RENDERER_PARAM.w, this.RENDERER_PARAM.h);
  }

  onResize(w, h) {
    this.instance.setSize(w, h);
  }
}
