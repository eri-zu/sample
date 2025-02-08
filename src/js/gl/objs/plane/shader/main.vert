uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute vec2 uv;
attribute vec2 normal;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uVecA;
uniform vec3 uVecB;

varying vec2 vUv;



void main() {
  vec3 p = position;

  

  vec4 modelPosition = modelMatrix * vec4(p, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition; // ビュー座標
  vec4 projectPosition = projectionMatrix * viewPosition; // プロジェクション座標
  gl_Position = projectPosition; // クリップ座標

  vUv = uv;
}


// マウスと頂点の距離の測り方
// 頂点のワールド空間の位置とカーソルをワールド空間に持っていったときの情報 とで距離を測るなどの処理
// ベクトルA：カメラ→カーソルのベクトル
// ベクトルB：カメラ→頂点のベクトル
// ベクトルAは