// SPDX-License-Identifier: Apache-2.0
import type { VecOpSVN } from "@thi.ng/vec-api";
import { setS2 } from "./sets.js";

export const rotateS2: VecOpSVN = (
	out,
	a,
	theta,
	io = 0,
	ia = 0,
	so = 1,
	sa = 1
) => {
	out ? out !== a && setS2(out, a, io, ia, so, sa) : (out = a);
	const s = Math.sin(theta);
	const c = Math.cos(theta);
	const x = a[ia];
	const y = a[ia + sa];
	out[io] = x * c - y * s;
	out[io + so] = x * s + y * c;
	return out;
};
