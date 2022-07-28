export const vertexShaderSource = `#version 300 es
 
// attribute는 정점 셰이더에 대한 입력(in)입니다.
// 버퍼로부터 데이터를 받습니다.
in vec4 a_position;
 
// 모든 셰이더는 main 함수를 가지고 있습니다.
void main() {
 
  // gl_Position은 정점 셰이더가 설정해 주어야 하는 내장 변수입니다.
  gl_Position = a_position;
}
`;
export const fragmentShaderSource = `#version 300 es
 
// 프래그먼트 셰이더는 기본 정밀도를 가지고 있지 않으므로 선언을 해야합니다.
// highp는 기본값으로 적당합니다. "높은 정밀도(high precision)"를 의미합니다.
precision highp float;
 
// 프래그먼트 셰이더는 출력값을 선언 해야합니다.
out vec4 outColor;
 
void main() {
  // 붉은-보라색 상수로 출력값을 설정합니다.
  outColor = vec4(1, 0, 0.5, 1);
}
`;
