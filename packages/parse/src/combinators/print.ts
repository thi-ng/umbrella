import type { Parser } from "../api";
import { xfPrint } from "../xform/print";
import { xform } from "./xform";

export const print = <T>(parser: Parser<T>) => xform(parser, xfPrint);
