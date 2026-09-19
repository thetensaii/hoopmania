precision mediump float;

varying vec2 vUv;

uniform float uTime;
uniform float uWidth;
uniform float uHeight;

vec3 palette(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
  return a + b * cos(6.283185 * (c * t + d));
}

void main() {
  float stengthY = step(0.95, fract((vUv.y * uHeight * 2.0) - uTime));
  float stengthX = step(0.95, fract((vUv.x * uWidth * 2.0) + 0.5));
  float opacity = min((stengthX + stengthY) * 1.5, 1.0);

  vec3 colorA = vec3(0.938, 0.328, 0.718);
  vec3 colorB = vec3(0.659, 0.438, 0.328);
  vec3 colorC = vec3(0.388, 0.388, 0.296);
  vec3 colorD = vec3(0.138, 0.138, 0.638);
  vec3 color = palette(((vUv.x + vUv.y) * 3.0 - uTime), colorA, colorB, colorC, colorD);

  gl_FragColor = vec4(color, opacity);

}