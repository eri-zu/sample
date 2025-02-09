precision mediump float;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position; // ローカル座標
attribute vec2 uv;
attribute vec2 normal;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uCameraPos; // ワールド座標

varying vec2 vUv;
varying vec3 vVecB;


void main() {
  vec3 p = position;

  vec4 modelPosition = modelMatrix * vec4(p, 1.0); // モデル座標（ワールド変換）

  // カメラから頂点に向かって伸びるベクトルを正規化したもの
  vec3 vecB = normalize(modelPosition.xyz - uCameraPos);

  vec4 viewPosition = viewMatrix * modelPosition; // ビュー座標
  vec4 projectPosition = projectionMatrix * viewPosition; // プロジェクション座標
  gl_Position = projectPosition; // クリップ座標

  vUv = uv;
  vVecB = vecB;
}
