import type { FnN } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks/is-number";
import type { IGen } from "../api.js";
import { Const } from "../const.js";

export const __ensureGenN = (x: number | IGen<number>, clamp: FnN) =>
	isNumber(x) ? new Const(clamp(x)) : x;
