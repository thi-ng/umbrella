import type { Parser } from "../api";
import { parseError } from "../error";

export const fail = (msg: string): Parser<any> => (ctx) => parseError(ctx, msg);
