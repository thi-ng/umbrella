// prelude, attributes, varyings & uniforms will be code generated
// see browser console for full generated shader
void main() {
	fragColor = vec4(vcol + baseColor, 1.0) * texture(tex, vuv);
}