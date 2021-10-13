import type { Parser } from "../api.js";
import { inputEnd, inputStart, lineEnd, lineStart } from "../prims/anchor.js";
import { seq } from "./seq.js";

export const startsWith = <T>(parser: Parser<T>) => seq([inputStart, parser]);

export const endsWith = <T>(parser: Parser<T>) => seq([parser, inputEnd]);

export const entireLine = (parser: Parser<string>) =>
    seq([lineStart, parser, lineEnd]);

export const entirely = <T>(parser: Parser<T>) =>
    seq([inputStart, parser, inputEnd]);
