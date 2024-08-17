void main() {
	fragColor = vec4(vcol + baseColor, 1.0) * texture(tex, vuv);
}