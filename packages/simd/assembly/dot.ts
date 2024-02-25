import { __hadd2_f32, __hadd4_f32 } from "./inline/hadd";

export function dot2_f32_aos(
	out: usize,
	a: usize,
	b: usize,
	num: usize
): usize {
	const res = out;
	num >>= 1;
	for (; num-- > 0; ) {
		const m = __hadd2_f32(f32x4.mul(v128.load(a), v128.load(b)));
		f32.store(out, f32x4.extract_lane(m, 0));
		f32.store(out, f32x4.extract_lane(m, 2), 4);
		out += 8;
		a += 16;
		b += 16;
	}
	return res;
}

export function dot4_f32_aos(
	out: usize,
	a: usize,
	b: usize,
	num: usize,
	so: usize,
	sa: usize,
	sb: usize
): usize {
	const res = out;
	so <<= 2;
	sa <<= 2;
	sb <<= 2;
	// a1*b1 + a2*b2 + a3*b3 + a4*b4
	for (; num-- > 0; ) {
		f32.store(out, __hadd4_f32(f32x4.mul(v128.load(a), v128.load(b))));
		out += so;
		a += sa;
		b += sb;
	}
	return res;
}

export function dot4_f32_soa(
	out: usize,
	a: usize,
	b: usize,
	num: usize,
	sa: usize,
	sb: usize
): usize {
	sa <<= 2;
	sb <<= 2;
	num >>= 2;
	const sa2 = sa * 2;
	const sb2 = sb * 2;
	const sa3 = sa * 3;
	const sb3 = sb * 3;
	const res = out;
	for (; num-- > 0; ) {
		v128.store(
			out,
			f32x4.add(
				f32x4.add(
					f32x4.add(
						f32x4.mul(v128.load(a), v128.load(b)),
						f32x4.mul(v128.load(a + sa), v128.load(b + sb))
					),
					f32x4.mul(v128.load(a + sa2), v128.load(b + sb2))
				),
				f32x4.mul(v128.load(a + sa3), v128.load(b + sb3))
			)
		);
		out += 16;
		sa += 16;
		sb += 16;
	}
	return res;
}
