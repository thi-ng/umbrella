import { Parser } from "../api";
import { inputEnd, inputStart, lineEnd, lineStart } from "../prims/anchor";
import { seq } from "./seq";

export const startsWith = <T>(parser: Parser<T>) => seq([inputStart, parser]);

export const endsWith = <T>(parser: Parser<T>) => seq([parser, inputEnd]);

export const entireLine = (parser: Parser<string>) =>
    seq([lineStart, parser, lineEnd]);

export const entirely = <T>(parser: Parser<T>) =>
    seq([inputStart, parser, inputEnd]);
