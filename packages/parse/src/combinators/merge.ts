import type { Parser } from "../api";
import { xfMerge } from "../xform/merge";
import { xform } from "./xform";

export const merge = <T>(parser: Parser<T>) => xform(parser, xfMerge);
