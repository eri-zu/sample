import { Scene, AxesHelper, TextureLoader, Clock } from "three";
import { Renderer } from "./renderer";
import { Camera } from "./perspectiveCamera";
// import { Camera } from "./orthographicCamera";
import { Objs } from "./objs";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Light } from "./light";

// console.log("aa");

export class Gl {
  constructor(wrap) {
    this.wrap = wrap;
    this.wrapW = this.wrap.clientWidth;
    this.wrapH = this.wrap.clientHeight;

    // 時間系
    this.clock = new Clock();
    this.prevTime = Date.now();
    this.timeDelta = 0;
    this.time = 0;

    this.isLoaded = false;
    this.isHelper = false;
    this.isControl = false;

    this.init();
  }

  async init() {
    const texture = await this.load();
    this.isLoaded = true;

    this.canvas = this.wrap.querySelector("canvas");
    this.renderer = new Renderer(this.canvas, this.wrapW, this.wrapH);
    this.scene = new Scene();
    this.camera = new Camera(this.wrapW, this.wrapH);
    this.light = new Light();
    this.obj = new Objs(texture, this.camera.instance);

    this.scene.add(this.light.instance);
    this.scene.add(this.obj.group);

    this.setUtility();
  }

  async load() {
    const loader = new TextureLoader();
    const src = "./assets/img/sample.webp";

    const p = new Promise((resolve) => {
      const texture = loader.load(src, () => {
        resolve(texture);
      });
    });

    return p;
  }

  onUpdate() {
    if (this.isLoaded) {
      // const now = Date.now();
      // const timeDelta = (now - this.prevTime) / 1000; //  フレームごとの経過時間
      this.timeDelta = this.clock.getDelta(); // フレームごとの経過時間
      this.time += this.timeDelta; // 経過時間

      if (this.controls) this.controls.update();

      this.obj.onUpdate(
        this.timeDelta,
        this.time,
        this.camera.instance,
        this.scene
      );

      this.renderer.instance.render(this.scene, this.camera.instance);

      // this.prevTime = now;
    }
  }

  onResize() {
    const w = this.wrap.clientWidth;
    const h = this.wrap.clientHeight;

    this.camera?.onResize(w, h);
    this.obj?.onResize(w, h);
    this.renderer?.onResize(w, h);
  }

  onMouseMove(x, y) {
    this.obj?.onMouseMove(x, y);
  }

  setUtility() {
    // helper
    if (this.isHelper) {
      const axesBarLength = 600.0;
      this.axesHelper = new AxesHelper(axesBarLength);
      this.scene.add(this.axesHelper);
    }
    // orbit control
    if (this.isControl) {
      this.controls = new OrbitControls(this.camera.instance, this.canvas);
    }
  }
}
