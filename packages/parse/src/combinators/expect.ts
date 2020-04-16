import type { Parser } from "../api";
import { parseError } from "../error";

export const expect = <T>(parser: Parser<T>, err: string): Parser<T> => (ctx) =>
    parser(ctx) || parseError(ctx, err);
