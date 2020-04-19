import { DEFAULT, defmulti } from "@thi.ng/defmulti";
import { illegalArgs, unsupported } from "@thi.ng/errors";
import type { Language, Parser, ParseScope, RuleTransforms } from "./api";
import { alt } from "./combinators/alt";
import { dynamic } from "./combinators/dynamic";
import { maybe } from "./combinators/maybe";
import { not } from "./combinators/not";
import { oneOrMore, repeat, zeroOrMore } from "./combinators/repeat";
import { seq } from "./combinators/seq";
import { xform } from "./combinators/xform";
import { defContext } from "./context";
import { ALPHA_NUM } from "./presets/alpha";
import { ESC, UNICODE } from "./presets/escape";
import { UINT } from "./presets/numbers";
import { WS0, WS1 } from "./presets/whitespace";
import { lit, litD } from "./prims/lit";
import { noneOf } from "./prims/none-of";
import { oneOf } from "./prims/one-of";
import { range } from "./prims/range";
import { stringD } from "./prims/string";
import { collect } from "./xform/collect";
import { hoist } from "./xform/hoist";
import { join } from "./xform/join";
import { xfPrint } from "./xform/print";

const apos = litD("'");
const dash = litD("-");

const REPEAT = maybe(
    alt([
        oneOf("?*+", "repeat"),
        collect(
            seq(
                [
                    litD("{"),
                    UINT,
                    maybe(hoist(seq([litD(","), UINT]))),
                    litD("}"),
                ],
                "repeatN"
            )
        ),
    ])
);

const CHAR_OR_ESC = alt([ALPHA_NUM, UNICODE, ESC]);

const CHAR_RANGE = seq([CHAR_OR_ESC, dash, CHAR_OR_ESC], "charRange");

const CHAR_SEL = seq(
    [
        litD("["),
        maybe(lit("^", "invert")),
        oneOrMore(alt([CHAR_RANGE, UNICODE, noneOf("]", "char")]), "choice"),
        litD("]"),
        REPEAT,
    ],
    "charSel"
);

const LIT = hoist(seq([apos, CHAR_OR_ESC, apos], "char"));

const SYM = join(oneOrMore(alt([ALPHA_NUM, oneOf(".-_$")]), "sym"));

const RULE_REF = seq([litD("<"), SYM, litD(">"), REPEAT], "ref");

const TERM = alt([RULE_REF, LIT, CHAR_SEL]);

const ALT = seq(
    [
        litD("("),
        WS0,
        TERM,
        zeroOrMore(seq([WS0, litD("|"), WS0, TERM])),
        WS0,
        litD(")"),
        REPEAT,
    ],
    "alt"
);

const RULE_XF = hoist(seq([stringD("=>"), WS1, SYM, WS1], "xform"));

const RULE = seq(
    [
        WS0,
        SYM,
        WS0,
        litD(":"),
        oneOrMore(alt([TERM, ALT, WS1]), "body"),
        maybe(RULE_XF),
        litD(";"),
        WS0,
    ],
    "rule"
);

const GRAMMAR = zeroOrMore(RULE, "rules");

const first = ($: ParseScope<any>) => $.children![0];

const nth = ($: ParseScope<any>, n: number) => $.children![n];

const compile = defmulti<ParseScope<string>, Language, any>(
    (scope) => scope.id,
    {
        unicode: ["char"],
    }
);

compile.addAll({
    root: ($, lang) => {
        const rules = first($).children!;
        rules.reduce(
            (acc, r) => ((acc[first(r).result] = dynamic()), acc),
            lang.rules
        );
        for (let r of rules) {
            const id = first(r).result;
            lang.rules[id].set(compile(r, lang));
        }
        return lang;
    },
    rule: ($, lang) => {
        const [id, body, xfID] = $.children!;
        console.log(`rule: ${id.result}`);
        const acc: Parser<string>[] = [];
        for (let b of body.children!) {
            const c = compile(b, lang);
            c && acc.push(c);
        }
        let parser = acc.length > 1 ? seq(acc, id.result) : acc[0];
        if (xfID.result) {
            const xf = lang.env[xfID.result];
            if (!xf) illegalArgs(`missing xform: ${xfID.result}`);
            parser = xform(parser, xf);
        }
        return parser;
    },
    ref: ($, lang) => {
        const [id, repeat] = $.children!;
        const ref = lang.rules[id.result];
        if (!ref) illegalArgs(`invalid rule ref: ${id.result}`);
        return compileRepeat(ref, repeat);
    },
    alt: ($, lang) => {
        const acc: Parser<string>[] = [compile(first($), lang)];
        for (let c of nth($, 1).children!) {
            acc.push(compile(first(c), lang));
        }
        return compileRepeat(
            acc.length > 1 ? alt(acc) : acc[0],
            $.children![2]
        );
    },
    char: ($) => {
        const x = $.result;
        console.log(`lit: '${x}'`);
        return lit(x);
    },
    charRange: ($) => {
        const [a, b] = $.children!;
        console.log(`range: ${a.result} - ${b.result}`);
        return range(a.result, b.result);
    },
    charSel: ($, lang) => {
        const choices = nth($, 1).children!.map((c) => compile(c, lang));
        const [invert, , repeat] = $.children!;
        console.log(`invert: ${invert.result}, repeat: ${repeat.result}`);
        let parser = choices.length > 1 ? alt(choices) : choices[0];
        if (invert.result) {
            parser = not(parser);
        }
        return compileRepeat(parser, repeat);
    },
});

compile.add(DEFAULT, ($) => unsupported(`unknown op: ${$.id}`));

const compileRepeat = (parser: Parser<string>, rspec: ParseScope<string>) => {
    if (rspec.id === "repeat") {
        switch (rspec.result) {
            case "?":
                return maybe(parser);
            case "*":
                return zeroOrMore(parser);
            case "+":
                return oneOrMore(parser);
            default:
                return parser;
        }
    } else if (rspec.id === "repeatN") {
        return repeat(parser, rspec.result[0], rspec.result[1]);
    }
    return parser;
};

export const defGrammar = (rules: string, env: RuleTransforms = {}) => {
    const ctx = defContext(rules);
    if (GRAMMAR(ctx)) {
        xfPrint(ctx.root, ctx);
        return <Language>compile(ctx.root, { env, grammar: ctx, rules: {} });
    }
};
