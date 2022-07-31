import type { FnU2 } from "@thi.ng/api";
import { SQRT3_2 } from "@thi.ng/math/api";
import type { Vec } from "@thi.ng/vectors";
import { add2 } from "@thi.ng/vectors/add";
import { maddN2 } from "@thi.ng/vectors/maddn";
import { mag } from "@thi.ng/vectors/mag";
import { normalize } from "@thi.ng/vectors/normalize";
import { perpendicularCCW } from "@thi.ng/vectors/perpendicular";
import { sub2 } from "@thi.ng/vectors/sub";

export const equilateralTriangle2: FnU2<Vec, Vec[]> = (a, b) => {
	const dir = sub2([], b, a);
	return [
		a,
		b,
		add2(
			null,
			normalize(null, perpendicularCCW([], dir), mag(dir) * SQRT3_2),
			maddN2(dir, dir, 0.5, a)
		),
	];
};
