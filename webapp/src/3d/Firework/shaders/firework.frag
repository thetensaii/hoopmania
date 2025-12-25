precision mediump float;

uniform sampler2D uTexture;
uniform vec3 uColor;

void main() {
  float textureAlpha = texture2D(uTexture, gl_PointCoord).r;

  gl_FragColor = vec4(uColor, textureAlpha) * 0.7;
}