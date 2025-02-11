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
uniform float uAmp;
uniform float uFreq;

varying vec2 vUv;
varying float vCloseness;
varying vec3 vDirection;
varying vec3 vToMouse;


void main() {
  vec3 p = position;

  // 頂点のワールド座標
  vec4 modelPosition = modelMatrix * vec4(p, 1.0);
  
  // カメラから頂点に向かって伸びるベクトルを正規化したもの
  vec3 vecB = normalize(modelPosition.xyz - uCameraPos);
  
  // 内積でマウスと頂点の近接レベルを求める（-1〜1）
  float closeness = dot(uVecA, vecB);

  // ★effect1
  // 境界パキッとしないように
  closeness = smoothstep(0.99, 0.99999, closeness);
  // 近接してる頂点だけ動かす
  float wave = sin((uFreq * (modelPosition.x + modelPosition.y) + uTime)) * uAmp;
  modelPosition.z += wave * closeness;

  // // ★effect2
  // // マウスの方向
  // closeness = smoothstep(0.8, 0.99999, closeness);
  // // vec3 toMouse = clamp(normalize(vecB - uVecA), 0.0, 1.0);
  // // vec3 toMouse = smoothstep(0.5, 1.0, normalize(vecB - uVecA));
  // vec3 toMouse = normalize(vecB - uVecA);
  // // vec3 toMouse = smoothstep(0.0, 1.0, normalize(vecB - uVecA));

  // // if(closeness > 0.99) {
  // // // modelPosition.x += 100.0 * closeness;
  // // // modelPosition.y += sin(modelPosition.x * 0.1) * 10.0;
  // //  modelPosition.xyz += toMouse * 50.0;
  // // }
 
  // modelPosition.xy += 100.0 * closeness;

  // modelPosition.x += 50.0 * toMouse.x;
  // modelPosition.y += 50.0 * toMouse.y;



  // ------------------------------------------------------------
  // 
  // ------------------------------------------------------------

  vec4 viewPosition = viewMatrix * modelPosition; // ビュー座標
  vec4 projectPosition = projectionMatrix * viewPosition; // プロジェクション座標
  gl_Position = projectPosition; // クリップ座標

  vUv = uv;
  vCloseness = closeness;
  // vToMouse = toMouse;
}
