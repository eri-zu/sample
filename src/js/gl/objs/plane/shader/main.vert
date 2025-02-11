precision mediump float;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position; // ローカル座標
attribute vec2 uv;
attribute vec2 normal;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uCameraPos; // カメラのワールド座標
uniform vec3 uVecA; // カメラからカーソルに向かって伸びるベクトルを正規化したもの

varying vec2 vUv;
varying float vCloseness;
// varying vec3 vVecB;


void main() {
  vec3 p = position;

  // p.x += sin(p.y * 10.0 + uTime) * 0.05;

  // ------------------------------------------------------------
  // discordで習った内容を反映
  // ------------------------------------------------------------

  // 頂点のワールド座標
  vec4 modelPosition = modelMatrix * vec4(p, 1.0);
  
  // // カメラから頂点に向かって伸びるベクトルを正規化したもの
  vec3 vecB = normalize(modelPosition.xyz - uCameraPos);
  // 内積でマウスと頂点の近接レベルを求める
  float closeness = dot(uVecA, vecB);

  // modelPosition.x += sin(modelPosition.y * 0.1 + uTime) * 5.0 * uTime;

  
  // ------------------------------------------------------------
  // 
  // ------------------------------------------------------------

  vec4 viewPosition = viewMatrix * modelPosition; // ビュー座標
  vec4 projectPosition = projectionMatrix * viewPosition; // プロジェクション座標
  gl_Position = projectPosition; // クリップ座標

  vUv = uv;
  vCloseness = closeness;
  // vVecB = vecB;
}
