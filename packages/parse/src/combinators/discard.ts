import type { Parser } from "../api";
import { xform } from "./xform";

export const discard = (parser: Parser<any>) => xform(parser, () => null);
