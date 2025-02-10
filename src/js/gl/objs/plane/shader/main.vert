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
uniform vec2 uMouseWorldPos; // マウスのワールド座標

varying vec2 vUv;
// varying vec3 vVecB;


void main() {
  vec3 p = position;

  // ------------------------------------------------------------
  // discordで習った内容を反映
  // ------------------------------------------------------------
  // 頂点のワールド座標
  vec4 modelPosition = modelMatrix * vec4(p, 1.0);
  
  // // カメラから頂点に向かって伸びるベクトルを正規化したもの
  // vec3 vecB = normalize(modelPosition.xyz - uCameraPos);
  // // 内積で2つのベクトルの向き判定（いかに近接してるか）
  // float direction = dot(uVecA, vecB);


  // ------------------------------------------------------------
  // 授業の内容を反映してみる
  // ------------------------------------------------------------

  // 頂点からマウスの位置を指すベクトル（ワールド座標で比べる）
  vec2 toMouse = uMouseWorldPos - modelPosition.xy;
  // ベクトルの長さを測る
  float distanceToMouse = length(toMouse);

  // 方向に注目、ベクトルの単位化
  vec2 normalizedToMouse = normalize(toMouse);
  // 方向の影響を 0.1 倍したものに、距離をもとに求めた値を乗算
  vec2 offset = normalizedToMouse * 0.1 * (1.0 - distanceToMouse);
  // オフセットを加味して動かす
  modelPosition = vec4(modelPosition.xy - offset, modelPosition.z, modelPosition.w);
  
  // ------------------------------------------------------------
  // 
  // ------------------------------------------------------------

  vec4 viewPosition = viewMatrix * modelPosition; // ビュー座標
  vec4 projectPosition = projectionMatrix * viewPosition; // プロジェクション座標
  gl_Position = projectPosition; // クリップ座標

  vUv = uv;
  // vVecB = vecB;
}
