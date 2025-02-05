precision mediump float;
varying vec2 vUv;
uniform sampler2D uTexture;


void main() {
  vec2 newUv = vUv;
  vec3 color = texture2D(uTexture, newUv).rgb;
  
  gl_FragColor = vec4(color, 1.0);
}
