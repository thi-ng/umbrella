import type { Parser } from "../api";
import { xfCollect } from "../xform/collect";
import { xform } from "./xform";

export const collect = <T>(parser: Parser<T>) => xform(parser, xfCollect);
