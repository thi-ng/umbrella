import { equivArrayLike } from "@thi.ng/equiv";
import type { MultiVecOpRoVV } from "./api.js";
import { vop } from "./vop.js";

export const equals: MultiVecOpRoVV<boolean> = vop(0);

export const equals2 = equals.add(2, (a, b) => a[0] === b[0] && a[1] === b[1]);

export const equals3 = equals.add(
	3,
	(a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2]
);

export const equals4 = equals.add(
	4,
	(a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3]
);
equals.default(equivArrayLike);
