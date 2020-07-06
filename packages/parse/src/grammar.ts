import { DEFAULT, defmulti } from "@thi.ng/defmulti";
import { illegalArgs, unsupported } from "@thi.ng/errors";
import type {
    DynamicParser,
    GrammarOpts,
    Language,
    Parser,
    ParseScope,
    RuleTransforms,
} from "./api";
import { alt } from "./combinators/alt";
import { dynamic } from "./combinators/dynamic";
import { lookahead } from "./combinators/lookahead";
import { maybe } from "./combinators/maybe";
import { not } from "./combinators/not";
import { oneOrMore, repeat, zeroOrMore } from "./combinators/repeat";
import { seq, seqD } from "./combinators/seq";
import { xform } from "./combinators/xform";
import { defContext } from "./context";
import { ALPHA, ALPHA_NUM } from "./presets/alpha";
import { DIGIT } from "./presets/digits";
import { ESC, UNICODE } from "./presets/escape";
import { HEX_DIGIT } from "./presets/hex";
import { FLOAT, INT, UINT } from "./presets/numbers";
import { STRING } from "./presets/string";
import { DNL, NL, WS, WS0, WS1 } from "./presets/whitespace";
import { always } from "./prims/always";
import {
    inputEnd,
    inputStart,
    lineEnd,
    lineStart,
    wordBoundary,
} from "./prims/anchor";
import { lit, litD } from "./prims/lit";
import { noneOf } from "./prims/none-of";
import { oneOf } from "./prims/one-of";
import { range } from "./prims/range";
import { string, stringD } from "./prims/string";
import { collect, xfCollect } from "./xform/collect";
import { xfCount } from "./xform/count";
import { discard, xfDiscard } from "./xform/discard";
import { hoistResult, xfHoist, xfHoistResult } from "./xform/hoist";
import { join, xfJoin } from "./xform/join";
import { xfFloat, xfInt } from "./xform/number";
import { print, xfPrint } from "./xform/print";
import { xfTrim } from "./xform/trim";
import { withID } from "./xform/with-id";

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
                    maybe(hoistResult(seq([litD(","), UINT]))),
                    litD("}"),
                ],
                "repeatN"
            )
        ),
    ])
);

const DISCARD = maybe(lit("!"), undefined, "discard");

const CHAR_OR_ESC = alt([UNICODE, ESC, always()]);

const CHAR_RANGE = seq([CHAR_OR_ESC, dash, CHAR_OR_ESC], "charRange");

const CHAR_SEL = seq(
    [
        litD("["),
        maybe(lit("^", "invert")),
        oneOrMore(alt([CHAR_RANGE, UNICODE, noneOf("]", "char")]), "choice"),
        litD("]"),
    ],
    "charSel"
);

const ANY = lit(".", "any");

const LIT = hoistResult(seq([apos, CHAR_OR_ESC, apos], "char"));

const SYM = join(oneOrMore(alt([ALPHA_NUM, oneOf(".-_$")]), "sym"));

const RULE_REF = seq([litD("<"), SYM, litD(">")], "ref");

const TERM_BODY = alt([RULE_REF, ANY, LIT, STRING, CHAR_SEL]);

const LOOK_AHEAD = maybe(
    seq(
        [
            stringD("(?"),
            oneOf("-+"),
            seq([TERM_BODY, REPEAT, DISCARD], "lhterm"),
            litD(")"),
        ],
        "lhspec"
    ),
    undefined,
    "lhnone"
);

const TERM = seq([TERM_BODY, REPEAT, DISCARD, LOOK_AHEAD], "term");

const ALT = seq(
    [
        litD("("),
        WS0,
        TERM,
        zeroOrMore(seq([WS0, litD("|"), WS0, TERM])),
        WS0,
        litD(")"),
        REPEAT,
        DISCARD,
        LOOK_AHEAD,
    ],
    "alt"
);

const RULE_XF = hoistResult(seq([stringD("=>"), WS1, SYM, WS1], "xform"));

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

const COMMENT = seqD([WS0, litD("#"), lookahead(always(), DNL)]);

export const GRAMMAR = zeroOrMore(alt([RULE, COMMENT]), "rules");

const first = ($: ParseScope<any>) => $.children![0];

const nth = ($: ParseScope<any>, n: number) => $.children![n];

const compile = defmulti<ParseScope<string>, Language, GrammarOpts, any>(
    (scope) => scope.id,
    {
        unicode: ["char"],
    }
);

compile.addAll({
    root: ($, lang, opts) => {
        const rules = first($).children!;
        rules.reduce(
            (acc, r) => ((acc[first(r).result] = dynamic()), acc),
            lang.rules
        );
        for (let r of rules) {
            const id = first(r).result;
            (<DynamicParser<string>>lang.rules[id]).set(compile(r, lang, opts));
        }
        return lang;
    },
    rule: ($, lang, opts) => {
        const [id, body, xfID] = $.children!;
        opts.debug && console.log(`rule: ${id.result}`);
        const acc: Parser<string>[] = [];
        for (let b of body.children!) {
            const c = compile(b, lang, opts);
            c && acc.push(c);
        }
        let parser =
            acc.length > 1 ? seq(acc, id.result) : withID(id.result, acc[0]);
        if (xfID.result) {
            const xf = lang.env[xfID.result];
            if (!xf) illegalArgs(`missing xform: ${xfID.result}`);
            parser = xform(parser, xf);
        }
        return parser;
    },
    ref: ($, lang) => {
        const id = first($).result;
        const ref = lang.rules[id];
        return ref || illegalArgs(`invalid rule ref: ${id}`);
    },
    term: ($, lang, opts) => {
        const [term, repeat, discard, lookahead] = $!.children!;
        opts.debug && console.log(`term: ${term.id}`);
        return compileLookahead(
            compileDiscard(
                compileRepeat(compile(term, lang, opts), repeat, opts),
                discard,
                opts
            ),
            lookahead,
            lang,
            opts
        );
    },
    lhterm: ($, lang, opts) => {
        const [term, repeat, discard] = $!.children!;
        opts.debug && console.log(`lhterm: ${term.id}`);
        return compileDiscard(
            compileRepeat(compile(term, lang, opts), repeat, opts),
            discard,
            opts
        );
    },
    alt: ($, lang, opts) => {
        opts.debug && console.log(`alt: ${$.id}`);
        const acc: Parser<string>[] = [compile(first($), lang, opts)];
        const terms = nth($, 1).children!;
        if (terms) {
            for (let c of terms) {
                acc.push(compile(first(c), lang, opts));
            }
        }
        return compileLookahead(
            compileDiscard(
                compileRepeat(
                    acc.length > 1 ? alt(acc) : acc[0],
                    $.children![2],
                    opts
                ),
                $.children![3],
                opts
            ),
            $.children![4],
            lang,
            opts
        );
    },
    any: (_, __, opts) => {
        opts.debug && console.log(`any`);
        return always("any");
    },
    char: ($, _, opts) => {
        const x = $.result;
        opts.debug && console.log(`lit: '${x}'`);
        return lit(x);
    },
    string: ($, _, opts) => {
        const x = $.result;
        opts.debug && console.log(`string: "${x}"`);
        return string(x);
    },
    charRange: ($, _, opts) => {
        const [a, b] = $.children!;
        opts.debug && console.log(`range: ${a.result} - ${b.result}`);
        return range(a.result, b.result);
    },
    charSel: ($, lang, opts) => {
        opts.debug && console.log("charSel");
        const choices = nth($, 1).children!.map((c) => compile(c, lang, opts));
        const invert = first($).result;
        const parser = choices.length > 1 ? alt(choices) : choices[0];
        opts.debug && console.log(`invert: ${invert}`);
        return invert ? not(parser) : parser;
    },
});

compile.add(DEFAULT, ($) => unsupported(`unknown op: ${$.id}`));

const compileRepeat = (
    parser: Parser<string>,
    rspec: ParseScope<string>,
    opts: GrammarOpts
) => {
    opts.debug && console.log(`repeat: ${rspec.id}`);
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
        const [n, m] = rspec.result;
        return repeat(parser, n, m || n);
    }
    return parser;
};

const compileDiscard = (
    parser: Parser<string>,
    dspec: ParseScope<string>,
    opts: GrammarOpts
) => {
    opts.debug && console.log(`discard:`, dspec.result);
    return dspec.result === "!" ? discard(parser) : parser;
};

const compileLookahead = (
    parser: Parser<string>,
    spec: ParseScope<string>,
    lang: Language,
    opts: GrammarOpts
) => {
    opts.debug && console.log(`lookahead:`, spec.id);
    return spec.id === "lhspec"
        ? lookahead(
              parser,
              compile(nth(spec, 1), lang, opts),
              first(spec).result === "+"
          )
        : parser;
};

export const defGrammar = (
    rules: string,
    env?: RuleTransforms,
    opts?: Partial<GrammarOpts>
) => {
    opts = { debug: false, optimize: true, ...opts };
    env = {
        collect: xfCollect,
        count: xfCount,
        discard: xfDiscard,
        float: xfFloat,
        hex: xfInt(16),
        hoist: xfHoist,
        hoistR: xfHoistResult,
        int: xfInt(10),
        join: xfJoin,
        print: xfPrint(),
        trim: xfTrim,
        ...env,
    };
    const ctx = defContext(rules);
    const result = (opts.debug ? print(GRAMMAR) : GRAMMAR)(ctx);
    if (result) {
        return <Language>compile(
            ctx.root,
            {
                env,
                grammar: ctx,
                rules: {
                    ALPHA_NUM,
                    ALPHA,
                    DIGIT,
                    END: inputEnd,
                    ESC,
                    FLOAT,
                    HEX_DIGIT,
                    INT,
                    LEND: lineEnd,
                    LSTART: lineStart,
                    NL,
                    START: inputStart,
                    STRING,
                    UNICODE,
                    WB: wordBoundary,
                    WS,
                    WS0,
                    WS1,
                },
            },
            <GrammarOpts>opts
        );
    }
};
