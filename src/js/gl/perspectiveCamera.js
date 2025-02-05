import { PerspectiveCamera, Vector3 } from "three";

export class Camera {
  constructor(wrapW, wrapH) {
    this.instance;
    this.wrapW = wrapW;
    this.wrapH = wrapH;

    this.CAMERA_PARAM = {
      fovy: 30,
      aspect: this.wrapW / this.wrapH,
      near: 1,
      far: 10000,
      x: 0,
      y: 0,
      z: 0,
      lookAt: new Vector3(0.0, 0.0, 0.0),
    };

    this.init();
  }

  // static get CAMERA_PARAM() {
  //   return {
  //     fovy: 30,
  //     aspect: window.innerWidth / window.innerHeight,
  //     near: 1,
  //     far: 10000,
  //     x: 200,
  //     y: 200,
  //     lookAt: new Vector3(0.0, 200.0, 0.0),
  //   };
  // }

  init() {
    this.instance = new PerspectiveCamera(
      this.CAMERA_PARAM.fovy,
      this.CAMERA_PARAM.aspect,
      this.CAMERA_PARAM.near,
      this.CAMERA_PARAM.far
    );
    this.setPosition(this.wrapH);
    this.instance.lookAt(this.CAMERA_PARAM.lookAt);
  }

  onResize(w, h) {
    this.setPosition(h);
    this.instance.aspect = w / h;
    this.instance.updateProjectionMatrix();
  }

  setPosition(h) {
    const fovRad = (this.CAMERA_PARAM.fovy / 2) * (Math.PI / 180);

    this.instance.position.x = this.CAMERA_PARAM.x;
    this.instance.position.y = this.CAMERA_PARAM.y;
    this.instance.position.z = h / 2 / Math.tan(fovRad);
  }
}
