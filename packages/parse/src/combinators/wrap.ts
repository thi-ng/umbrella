import type { Parser } from "../api.js";
import { litD } from "../prims/lit.js";
import { hoist } from "../xform/hoist.js";
import { seq } from "./seq.js";

export const wrap = <T>(parser: Parser<T>, pre: T, post: T = pre) =>
	hoist(seq([litD(pre), parser, litD(post)]));
