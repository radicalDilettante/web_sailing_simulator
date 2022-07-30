export const vertexShaderSource = `#version 300 es
 
uniform mat4 projection;
uniform mat4 model;

layout(location = 0) in vec3 pos;
layout(location = 1) in vec3 color;
 
out vec3 fragmentColor;

void main() {
 
  gl_Position = projection * model * vec4(pos,1.0);
  fragmentColor = color;

}
`;
