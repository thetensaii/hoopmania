precision mediump float;

uniform sampler2D uTexture;

void main() {
  float textureAlpha = texture2D(uTexture, gl_PointCoord).r;

  gl_FragColor = vec4(vec3(2.0), textureAlpha);
}