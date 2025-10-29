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
    vec2 c = (vST - vec2(0.5)) * (4.0 / zoom) + vec2(uCenterX, uCenterY);
    vec2 z = c; 
    int iterations = int(mix(1000.0, 50.0, uIterationFactor)); 
    int i;
    for (i = 0; i < iterations; i++) {
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
        if (length(z) > 2.0) break;
    }
    float normColor = float(i) / float(iterations);
    vec3 baseColor = vec3(
        sin(6.2831 * normColor),
        cos(6.2831 * normColor),
        sin(6.2831 * normColor + 2.0)
    );
    vec3 finalColor = mix(baseColor, vec3(1.0, 0.0, 0.0), uRedMix);
    finalColor = mix(finalColor, vec3(0.0, 1.0, 0.0), uGreenMix);
    finalColor = mix(finalColor, vec3(0.0, 0.0, 1.0), uBlueMix);
    finalColor *= uIntensity;
    gl_FragColor = vec4(finalColor, 1.0);
}