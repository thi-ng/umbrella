import { Parser } from "../api";
import { litD } from "../prims/lit";
import { hoist } from "../xform/hoist";
import { seq } from "./seq";

export const wrap = <T>(parser: Parser<T>, pre: T, post: T = pre) =>
    hoist(seq([litD(pre), parser, litD(post)]));
