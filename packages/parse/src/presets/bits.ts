import { repeat } from "../combinators/repeat";
import { xform } from "../combinators/xform";
import { oneOf } from "../prims/one-of";
import { xfInt } from "../xform/number";

export const BIT = oneOf("01");

export const BINARY_UINT = xform(repeat(BIT, 1, 32, "uint"), xfInt(2));
