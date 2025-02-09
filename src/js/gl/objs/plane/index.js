import { PlaneGeometry, Mesh, RawShaderMaterial, Vector3 } from "three";

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
    this.setParam();
    this.createMesh();
    this.setMesh();
    // this.getVecB();
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
        uResolution: {
          value: { x: window.innerWidth, y: window.innerHeight },
        },
        uCameraPos: {
          value: this.cameraInstance.position,
        },
        uVecA: { value: new Vector3(0, 0, 0) },
        // uVecB: { value: new Vector3(0, 0, 0) },
      },
    });

    console.log(this.cameraInstance.position);
    this.mesh = new Mesh(g, this.m);
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
    const y = -top + gb.h * 0.5 - h * 0.5;

    this.mesh.scale.x = w;
    this.mesh.scale.y = h;
    this.mesh.position.set(x, y, 0);
  }

  getVecB() {
    // カメラから頂点に向かって伸びるベクトル
    // const vecB = this.mesh.position.clone().sub(this.cameraInstance.position);
    // vecB.normalize();
    // this.m.uniforms.uVecB.value = vecB;
  }

  onUpdate(timeDelta, time, camera, scene) {
    this.mesh.material.uniforms.uTime.value = time;
  }

  onMouseMove(x, y) {
    // 画面中心を(0, 0)にしたマウス座標
    this.mouseX = x - gb.w * 0.5;
    this.mouseY = -(y - gb.h * 0.5);

    // 正規化したマウス座標
    this.normaliseMouseX = (x / gb.w) * 2 - 1;
    this.normaliseMouseY = -(y / gb.h) * 2 + 1;

    // ★カメラからカーソルに向かって伸びるベクトルを求める
    // 正規化されたマウスカーソルの位置から、カメラの情報を頼りに変換を掛けることで、
    // ニアクリップ面上にカーソルを投影したときの、カメラから見た相対的な位置」を求めている
    this.vecA = new Vector3(this.normaliseMouseX, this.normaliseMouseY, -1.0);
    this.vecA.unproject(this.cameraInstance); // vec3.unproject(camera)：vec3をワールド空間に投影
    this.vecA.normalize();
    this.m.uniforms.uVecA.value = this.vecA;

    console.log(this.vecA);
  }

  onResize(w, h) {}

  setEvents() {}
}
