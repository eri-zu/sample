import { Gl } from "./gl";
export class Controller {
  constructor() {
    this.isUpdate = true;
    this.isMouseMove = true;
    this.isScroll = false;

    this.setup();
    this.setEvents();
  }

  setup() {
    gb.w = window.innerWidth;
    gb.h = window.innerHeight;
    this.gl = new Gl(document.querySelector(".canvaswrap"));
  }

  onUpdate() {
    if (!this.isUpdate) return;

    const scrollY = window.scrollY;

    this.timer = requestAnimationFrame(this.onUpdate.bind(this));
    this.gl.onUpdate(scrollY);
  }

  onResize() {
    gb.w = window.innerWidth;
    gb.h = window.innerHeight;
    this.gl.onResize();
  }

  onMouseMove(e) {
    if (!this.isMouseMove) return;
    this.gl.onMouseMove(e.pageX, e.pageY);
  }

  onScroll() {
    if (!this.isScroll) return;
  }

  setEvents() {
    this.onUpdate();
    window.addEventListener("resize", this.onResize.bind(this));
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
    window.addEventListener("scroll", this.onScroll.bind(this));
  }
}

(() => {
  if (window.gb === undefined) window.gb = {};
  new Controller();
})();
