precision mediump float;

varying vec2 vUv;
varying float vCloseness;
// varying vec3 vToMouse;

uniform sampler2D uTexture;
uniform vec3 uVecA;

void main() {
  vec2 newUv = vUv;
  // vec3 color = texture2D(uTexture, newUv).rgb;
  float r = texture2D(uTexture, newUv + vCloseness * 0.01).r;
  float g = texture2D(uTexture, newUv).g;
  float b = texture2D(uTexture, newUv).b;

  // gl_FragColor = vec4(color, 1.0);
  gl_FragColor = vec4(r, g, b, 1.0);
  // gl_FragColor = vec4(vToMouse.x, color.gb, 1.0);
  // gl_FragColor = vec4(vToMouse * 0.5 + 0.5, 1.0);
}
