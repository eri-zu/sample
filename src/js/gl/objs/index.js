import { Group } from "three";
import { Plane } from "./plane";

export class Objs {
  constructor(texture, cameraInstance) {
    this.group = new Group();
    this.texture = texture;
    this.cameraInstance = cameraInstance;

    this.init();
    this.setEvents();
  }

  init() {
    this.plane = new Plane(this.texture, this.cameraInstance);
    this.group.add(this.plane.mesh);
  }

  onUpdate(timeDelta, time, camera, scene) {
    this.plane?.onUpdate(timeDelta, time, camera, scene);
  }

  onResize(w, h) {
    this.plane.onResize(w, h);
  }

  onMouseMove(x, y) {
    this.plane.onMouseMove(x, y);
  }

  setEvents() {}
}
