export function madd4_f32(
	out: usize,
	a: usize,
	b: usize,
	c: usize,
	num: usize,
	so: usize,
	sa: usize,
	sb: usize,
	sc: usize
): usize {
	const res = out;
	so <<= 2;
	sa <<= 2;
	sb <<= 2;
	sc <<= 2;
	for (; num-- > 0; ) {
		v128.store(
			out,
			f32x4.add(f32x4.mul(v128.load(a), v128.load(b)), v128.load(c))
		);
		out += so;
		a += sa;
		b += sb;
		c += sc;
	}
	return res;
}
