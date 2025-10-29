// -----------------------------------------------------------------------------
// fractal.frag
// Author: Noah Pettinato
// Course: CS 457 – Computer Graphics Shaders
//
// Description:
//   Fragment shader for an interactive Mandelbrot-like fractal visualization.
//   Implements an escape-time algorithm where each fragment's color is based
//   on the number of iterations required for |z| to exceed 2 in the complex plane.
//
// Controls (Uniforms):
//   uZoom            - Zoom level for fractal detail
//   uIntensity       - Overall brightness scale
//   uRedMix, uGreenMix, uBlueMix - Color channel blending factors
//   uIterationFactor - Adjusts iteration count for performance vs. detail
//   uCenterX, uCenterY - Pan coordinates in the complex plane
//
// Uses smooth color blending via sine/cosine to map iteration counts to RGB hues.
// -----------------------------------------------------------------------------

#version 330 compatibility

uniform float uZoom;         
uniform float uIntensity;    
uniform float uRedMix;       
uniform float uGreenMix;     
uniform float uBlueMix;      
uniform float uIterationFactor; 
uniform float uCenterX;      
uniform float uCenterY;      

in vec2 vST;

void main() {
    float zoom = max(uZoom, 0.0001);

    // Map texture coordinates to complex plane
    vec2 c = (vST - vec2(0.5)) * (4.0 / zoom) + vec2(uCenterX, uCenterY);
    vec2 z = c;

    // Iteration control using a linear interpolation of limits
    int iterations = int(mix(1000.0, 50.0, uIterationFactor));

    int i;
    for (i = 0; i < iterations; i++) {
        // Mandelbrot iteration: z = z^2 + c
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
        if (length(z) > 2.0) break;
    }

    // Normalize iteration count to [0, 1]
    float normColor = float(i) / float(iterations);

    // Generate base gradient using trigonometric color functions
    vec3 baseColor = vec3(
        sin(6.2831 * normColor),
        cos(6.2831 * normColor),
        sin(6.2831 * normColor + 2.0)
    );

    // Apply user color mixes
    vec3 finalColor = mix(baseColor, vec3(1.0, 0.0, 0.0), uRedMix);
    finalColor = mix(finalColor, vec3(0.0, 1.0, 0.0), uGreenMix);
    finalColor = mix(finalColor, vec3(0.0, 0.0, 1.0), uBlueMix);

    // Scale brightness
    finalColor *= uIntensity;

    gl_FragColor = vec4(finalColor, 1.0);
}
