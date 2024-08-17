// prelude, attributes, varyings & uniforms will be code generated
// see browser console for full generated shader
void main() {
	vcol = color;
	vuv = uv;
	gl_Position = vec4(position * scale + offset, 0.0, 1.0);
}