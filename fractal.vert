// -----------------------------------------------------------------------------
// fractal.vert
// Author: Noah Pettinato
// Course: CS 457 – Computer Graphics Shaders
//
// Description:
//   Vertex shader for the Interactive Fractal Shader. Passes normalized
//   texture coordinates (s, t) from the input vertex to the fragment shader.
//   Also applies the model-view-projection transformation to compute the
//   final vertex position.
// -----------------------------------------------------------------------------

#version 330 compatibility

out vec2 vST;

void main() {
    // Pass texture coordinates to fragment shader
    vST = gl_MultiTexCoord0.st;

    // Standard vertex position transformation
    gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
