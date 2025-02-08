precision mediump float;
varying vec2 vUv;
uniform sampler2D uTexture;
uniform vec3 uVecA;
uniform vec3 uVecB;


void main() {
  float strength = dot(uVecA, uVecB);

  vec2 newUv = vUv;
  vec3 color = texture2D(uTexture, newUv).rgb;

  gl_FragColor = vec4(color.r * strength, color.g, color.b, 1.0);
  // gl_FragColor = vec4(color, 1.0);

}
