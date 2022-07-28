export const vertexShaderSource: string = `#version 300 es
 
uniform mat4 projection;

layout(location = 0) in vec3 pos;
layout(location = 1) in vec3 color;
 
out vec3 fragmentColor;

void main() {
 
  gl_Position = projection * vec4(pos,1.0);
  fragmentColor = color;

}
`;
