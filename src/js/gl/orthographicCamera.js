import { OrthographicCamera, Vector3 } from "three";

export class Camera {
  constructor() {
    this.instance;
    this.init();
  }

  static get CAMERA_SCALE() {
    return 3.5; // 視野の広さ調整できる（ズームしたい時とかここいじる）
  }

  static get CAMERA_PARAM() {
    const aspect = window.innerWidth / window.innerHeight;
    const scale = Camera.CAMERA_SCALE;
    const horizontal = scale * aspect;
    const vertiacal = scale;
    return {
      left: -horizontal - 2.0, // 切り取る空間の左端までの距離
      right: horizontal - 2.0, // 切り取る空間の右端までの距離
      top: vertiacal - 2.0, // 切り取る空間の上端までの距離
      bottom: -vertiacal - 2.0, // 切り取る空間の下端までの距離
      near: -10.0,
      far: 1000.0,
      x: -1,
      y: 1.5,
      z: -1,
      lookAt: new Vector3(0.0, 0.0, 0.0),
    };
  }

  init() {
    this.instance = new OrthographicCamera(
      Camera.CAMERA_PARAM.left,
      Camera.CAMERA_PARAM.right,
      Camera.CAMERA_PARAM.top,
      Camera.CAMERA_PARAM.bottom,
      Camera.CAMERA_PARAM.near,
      Camera.CAMERA_PARAM.far
    );
    this.setPosition();
    this.instance.lookAt(Camera.CAMERA_PARAM.lookAt);
  }

  onResize(w, h) {
    const aspect = w / h;
    const scale = Camera.CAMERA_SCALE;
    const horizontal = scale * aspect;
    const vertiacal = scale;
    this.instance.left = -horizontal - 2.0;
    this.instance.right = horizontal - 2.0;
    this.instance.top = vertiacal - 2.0;
    this.instance.bottom = -vertiacal - 2.0;
    this.instance.updateProjectionMatrix();
  }

  setPosition() {
    this.instance.position.set(
      Camera.CAMERA_PARAM.x,
      Camera.CAMERA_PARAM.y,
      Camera.CAMERA_PARAM.z
    );
  }
}
