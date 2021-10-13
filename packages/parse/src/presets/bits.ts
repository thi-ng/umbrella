import { repeat } from "../combinators/repeat.js";
import { xform } from "../combinators/xform.js";
import { oneOf } from "../prims/one-of.js";
import { xfInt } from "../xform/number.js";

export const BIT = oneOf("01");

export const BINARY_UINT = xform(repeat(BIT, 1, 32, "uint"), xfInt(2));
