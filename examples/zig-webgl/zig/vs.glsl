void main() {
	vcol = color;
	vuv = uv;
	gl_Position = vec4(position * scale + offset, 0.0, 1.0);
}