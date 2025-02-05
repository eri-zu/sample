import { PlaneGeometry, Mesh, RawShaderMaterial } from "three";

import vert from "./shader/main.vert";
import frag from "./shader/main.frag";

export class Plane {
  constructor(texture, cameraInstance) {
    this.mesh;
    this.texture = texture;
    this.cameraInstance = cameraInstance;

    this.setup();
    this.setEvents();
  }

  setup() {
    this.createMesh();
    this.setParam();
  }

  setParam() {
    this.mouseX = 0;
    this.mouseY = 0;
    this.normaliseMouseX = 0;
    this.normaliseMouseY = 0;
  }

  createMesh() {
    const g = new PlaneGeometry(1, 1, 1, 1); // 初期値

    this.m = new RawShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: this.texture },
        uMouse: { value: { x: 0, y: 0 } },
        uResolution: {
          value: { x: window.innerWidth, y: window.innerHeight },
        },
        // いったん置いとく
        // uImageAspect: { value: 1000 / 563 },
        // uPlaneAspect: { value: 1000 / 563 },
      },
    });

    this.mesh = new Mesh(g, this.m);

    this.setMesh();
  }

  setMesh() {
    // DOMに合わせてmesh更新
    const img = document.querySelector(".js-img");
    const rect = img.getBoundingClientRect();

    const top = rect.top;
    const left = rect.left;
    const w = rect.width; // 500
    const h = rect.height; // 333

    const x = left - gb.w * 0.5 + w * 0.5;
    const y = top - gb.h * 0.5 + h * 0.5;

    this.mesh.scale.x = w;
    this.mesh.scale.y = h;
    this.mesh.position.set(x, y, 0);
  }

  onUpdate(timeDelta, time, camera, scene) {
    this.mesh.material.uniforms.uTime.value = time;

    // ままの座標を渡すか、正規化したのを渡すべきか？
    this.m.uniforms.uMouse.value.x = this.mouseX;
    this.m.uniforms.uMouse.value.y = this.mouseY;
  }

  onMouseMove(x, y) {
    // 画面中心を(0, 0)にしたマウス座標
    this.mouseX = x - gb.w * 0.5;
    this.mouseY = -(y - gb.h * 0.5);

    // 上記を正規化
    this.normaliseMouseX = (x / gb.w) * 2 - 1;
    this.normaliseMouseY = -(y / gb.h) * 2 + 1;
  }

  onResize(w, h) {}

  setEvents() {}
}
