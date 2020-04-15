import type { Parser } from "../api";

export const repeat = <T>(
    parser: Parser<T>,
    id = "repeat",
    min: number,
    max = Infinity
): Parser<T> => (ctx) => {
    if (ctx.done) return false;
    ctx.start(id);
    for (let i = 0; i < max; i++) {
        if (!parser(ctx)) {
            if (i < min) {
                return ctx.discard();
            }
            break;
        }
    }
    return ctx.end();
};

export const repeat0 = <T>(parser: Parser<T>, id = "repeat0", max?: number) =>
    repeat(parser, id, 0, max);

export const repeat1 = <T>(parser: Parser<T>, id = "repeat1", max?: number) =>
    repeat(parser, id, 1, max);
