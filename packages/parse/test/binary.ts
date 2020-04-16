import * as assert from "assert";
import { defContext, lit, oneOrMore, Parser, range, seq, string } from "../src";

const check = (
    parser: Parser<number>,
    src: ArrayLike<number>,
    res: boolean,
    pos: number
) => {
    const ctx = defContext(src);
    assert.equal(parser(ctx), res, `src: '${src}'`);
    assert.equal(ctx.state!.p, pos, `src: '${src}' pos: ${ctx.state!.p}`);
};

describe("parse", () => {
    it("binary basics", () => {
        check(seq([string([1, 2, 3, 4]), lit(5)]), [1, 2, 3, 4, 5], true, 5);
        check(
            seq([oneOrMore(range<number>(0, 4)), lit(5)]),
            [1, 2, 3, 4, 5],
            true,
            5
        );
    });
});
