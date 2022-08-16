import { compile } from "@thi.ng/vectors/compile/emit";
import { SET } from "@thi.ng/vectors/compile/templates";
import { set as _set, set4 } from "@thi.ng/vectors/set";
import type { MatOpM } from "./api.js";

const $ = (dim: number) =>
	_set.add(dim, compile(dim, SET, "o,a", undefined, "o"));

export const set: MatOpM = _set;
export const set22: MatOpM = set4;
export const set23: MatOpM = $(6);
export const set33: MatOpM = $(9);
export const set44: MatOpM = $(16);
