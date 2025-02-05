import { DirectionalLight } from "three";

export class Light {
  constructor() {
    this.instance;

    this.init();
    this.setPosition();
  }

  static get DIRECTIONAL_LIGHT_PARAM() {
    return {
      color: 0xffffff, // 光の色
      intensity: 5.0, // 光の強度
      x: -50.0, // 光の向きを表すベクトルの X 要素
      y: 100, // 光の向きを表すベクトルの Y 要素
      z: 100.0, // 光の向きを表すベクトルの Z 要素
    };
  }

  init() {
    this.instance = new DirectionalLight(
      Light.DIRECTIONAL_LIGHT_PARAM.color,
      Light.DIRECTIONAL_LIGHT_PARAM.intensity
    );
  }

  setPosition() {
    this.instance.position.set(
      Light.DIRECTIONAL_LIGHT_PARAM.x,
      Light.DIRECTIONAL_LIGHT_PARAM.y,
      Light.DIRECTIONAL_LIGHT_PARAM.z
    );
  }

  update() {}

  onResize(w, h) {}
}
