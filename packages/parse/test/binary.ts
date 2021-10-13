import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { defContext, lit, oneOrMore, Parser, range, seq, string } from "../src/index.js"

const check = (
    parser: Parser<number>,
    src: ArrayLike<number>,
    res: boolean,
    pos: number
) => {
    const ctx = defContext(src);
    assert.strictEqual(parser(ctx), res, `src: '${src}'`);
    assert.strictEqual(ctx.state!.p, pos, `src: '${src}' pos: ${ctx.state!.p}`);
};

group("parse", {
    "binary basics": () => {
        check(seq([string([1, 2, 3, 4]), lit(5)]), [1, 2, 3, 4, 5], true, 5);
        check(seq([oneOrMore(range(0, 4)), lit(5)]), [1, 2, 3, 4, 5], true, 5);
    },
});
