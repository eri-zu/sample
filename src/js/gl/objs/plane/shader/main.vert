// デフォルトuniform
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

// デフォルトattribute
attribute vec3 position;
attribute vec2 uv;
attribute vec2 normal;

// 自分で定義したuniform
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;

// 自分で定義したattribute

// varying
varying vec2 vUv;


void main() {
  vec3 p = position;
  vec2 mouse = uMouse;

  // マウスと頂点の距離
  // 座標系異なる気がするけど、大丈夫？
  // mouse：スクリーン座標
  // position：ローカル座標
  float distanceToMouse = distance(position.xy, mouse);

  vec4 modelPosition = modelMatrix * vec4(p, 1.0); // ワールド座標
  vec4 viewPosition = viewMatrix * modelPosition; // ビュー座標
  vec4 projectPosition = projectionMatrix * viewPosition; // プロジェクション座標
  gl_Position = projectPosition; // クリップ座標

  vUv = uv;
}

