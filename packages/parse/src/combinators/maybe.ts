import type { Lift, Parser } from "../api";
import { lift } from "../prims/lift";

export const maybe = <T, R = any>(
    parser: Parser<T>,
    fn?: Lift<R>,
    id = "maybe"
): Parser<T> => (ctx) => parser(ctx) || lift(fn, id)(ctx);
