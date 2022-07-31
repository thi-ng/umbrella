import type { Fn } from "@thi.ng/api";
import type { MultiFn4 } from "@thi.ng/defmulti";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { unsupported } from "@thi.ng/errors/unsupported";
import type {
	DynamicParser,
	GrammarOpts,
	Language,
	Parser,
	ParseScope,
	RuleTransforms,
} from "./api.js";
import { alt, altD } from "./combinators/alt.js";
import { dynamic } from "./combinators/dynamic.js";
import { lookahead } from "./combinators/lookahead.js";
import { maybe } from "./combinators/maybe.js";
import { not } from "./combinators/not.js";
import { oneOrMore, repeat, zeroOrMore } from "./combinators/repeat.js";
import { seq, seqD } from "./combinators/seq.js";
import { xform } from "./combinators/xform.js";
import { defContext } from "./context.js";
import { ALPHA, ALPHA_NUM } from "./presets/alpha.js";
import { BIT } from "./presets/bits.js";
import { DIGIT } from "./presets/digits.js";
import { ESC, UNICODE } from "./presets/escape.js";
import { HEX_DIGIT } from "./presets/hex.js";
import { FLOAT, INT, UINT } from "./presets/numbers.js";
import { STRING } from "./presets/string.js";
import { DNL, NL, WS, WS0, WS1 } from "./presets/whitespace.js";
import { always, alwaysD } from "./prims/always.js";
import {
	inputEnd,
	inputStart,
	lineEnd,
	lineStart,
	wordBoundary,
} from "./prims/anchor.js";
import { lit, litD } from "./prims/lit.js";
import { noneOf } from "./prims/none-of.js";
import { oneOf } from "./prims/one-of.js";
import { range, rangeD } from "./prims/range.js";
import { string, stringD } from "./prims/string.js";
import { collect, xfCollect } from "./xform/collect.js";
import { xfCount } from "./xform/count.js";
import { discard, xfDiscard } from "./xform/discard.js";
import { hoist, hoistResult, xfHoist, xfHoistResult } from "./xform/hoist.js";
import { join, xfJoin } from "./xform/join.js";
import { xfJson } from "./xform/json.js";
import { nest } from "./xform/nest.js";
import { xfFloat, xfInt } from "./xform/number.js";
import { print, xfPrint } from "./xform/print.js";
import { xfReplace } from "./xform/replace.js";
import { xfTrim } from "./xform/trim.js";
import { withID } from "./xform/with-id.js";

const apos = litD("'");
const dash = litD("-");

const REPEAT = maybe(
	alt([
		oneOf("?*+", "repeat"),
		collect(
			seq(
				[litD("{"), UINT, maybe(lit(",")), maybe(UINT), litD("}")],
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

const RULE_XF = hoist(
	seq([stringD("=>"), WS1, alt([SYM, RULE_REF, STRING]), WS1], "xform")
);

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

interface CompileFlags {
	discard?: boolean;
}

const compile: MultiFn4<
	ParseScope<string>,
	Language,
	GrammarOpts,
	CompileFlags,
	any
> = defmulti<ParseScope<string>, Language, GrammarOpts, CompileFlags, any>(
	(scope) => scope.id,
	{
		unicode: "char",
	},
	{
		[DEFAULT]: ($: ParseScope<string>) =>
			unsupported(`unknown op: ${$.id}`),
		root: ($, lang, opts, flags) => {
			const rules = first($).children!;
			rules.reduce(
				(acc, r) => ((acc[first(r).result] = dynamic()), acc),
				lang.rules
			);
			for (let r of rules) {
				const id = first(r).result;
				(<DynamicParser<string>>lang.rules[id]).set(
					compile(r, lang, opts, flags)
				);
			}
			return lang;
		},
		rule: ($, lang, opts, flags) => {
			const [id, body, xf] = $.children!;
			opts.debug && console.log(`rule: ${id.result}`, xf);
			const acc: Parser<string>[] = [];
			for (let b of body.children!) {
				const c = compile(b, lang, opts, flags);
				c && acc.push(c);
			}
			let parser =
				acc.length > 1
					? seq(acc, id.result)
					: withID(id.result, acc[0]);
			if (xf.id === "sym") {
				const $xf = lang.env[xf.result];
				if (!$xf) illegalArgs(`missing xform: ${xf.result}`);
				parser = xform(parser, $xf);
			} else if (xf.id === "ref") {
				const $id = first(xf).result;
				if ($id === id) illegalArgs(`self-referential: ${$id}`);
				const $xf = lang.rules[$id];
				if (!$xf) illegalArgs(`missing xform rule: ${$id}`);
				parser = nest(parser, $xf);
			} else if (xf.id === "string") {
				parser = xform(parser, xfReplace(xf.result));
			}
			return parser;
		},
		ref: ($, lang, opts, flags) => {
			const id = first($).result;
			opts.debug && console.log(`ref: ${id}`, flags);
			const ref = lang.rules[id];
			return ref
				? flags.discard
					? discard(ref)
					: ref
				: illegalArgs(`invalid rule ref: ${id}`);
		},
		term: ($, lang, opts, flags) => {
			const [term, repeat, discard, lookahead] = $!.children!;
			opts.debug && console.log(`term: ${term.id}`, flags);
			return compileRDL(
				(discard) => compile(term, lang, opts, { ...flags, discard }),
				repeat,
				discard,
				lookahead,
				lang,
				opts
			);
		},
		lhterm: ($, lang, opts, flags) => {
			const [term, repeat, discard] = $.children!;
			opts.debug && console.log(`lhterm: ${term.id}`);
			return compileRD(
				(discard) => compile(term, lang, opts, { ...flags, discard }),
				repeat,
				discard,
				opts
			);
		},
		alt: ($, lang, opts, flags) => {
			opts.debug && console.log(`alt: ${$.id}`, flags);
			const [term0, { children: terms }, repeat, disc, lookahead] =
				$.children!;
			const acc: Parser<string>[] = [compile(term0, lang, opts, flags)];
			if (terms) {
				for (let c of terms) {
					acc.push(compile(first(c), lang, opts, flags));
				}
			}
			return compileRDL(
				(optimize) =>
					optimize || flags.discard
						? acc.length > 1
							? altD(acc)
							: discard(acc[0])
						: acc.length > 1
						? alt(acc)
						: acc[0],
				repeat,
				disc,
				lookahead,
				lang,
				opts
			);
		},
		any: (_, __, opts, flags) => {
			opts.debug && console.log(`any`, flags);
			return flags.discard ? alwaysD() : always("any");
		},
		char: ($, _, opts, flags) => {
			const x = $.result;
			opts.debug && console.log(`lit: '${x}'`, flags);
			return (flags.discard ? litD : lit)(x);
		},
		string: ($, _, opts, flags) => {
			const x = $.result;
			opts.debug && console.log(`string: "${x}"`, flags);
			return (flags.discard ? stringD : string)(x);
		},
		charRange: ($, _, opts, flags) => {
			const [a, b] = $.children!;
			opts.debug &&
				console.log(`range: ${a.result} - ${b.result}`, flags);
			return (flags.discard ? rangeD : range)(a.result, b.result);
		},
		charSel: ($, lang, opts, flags) => {
			opts.debug && console.log("charSel", flags);
			const choices = nth($, 1).children!.map((c) =>
				compile(c, lang, opts, flags)
			);
			const invert = first($).result;
			const parser = choices.length > 1 ? alt(choices) : choices[0];
			opts.debug && console.log(`invert: ${invert}`);
			return invert
				? not(parser, flags.discard ? alwaysD() : always())
				: parser;
		},
	}
);

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
		const [n, sep, m] = rspec.result;
		return repeat(parser, n, sep ? m || Infinity : m || n);
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
				compile(nth(spec, 1), lang, opts, {}),
				first(spec).result === "+"
		  )
		: parser;
};

const compileRD = (
	parser: Fn<boolean, Parser<string>>,
	rspec: ParseScope<string>,
	dspec: ParseScope<string>,
	opts: GrammarOpts
) =>
	dspec.result != null && rspec.result == null
		? parser(true)
		: compileDiscard(
				compileRepeat(parser(false), rspec, opts),
				dspec,
				opts
		  );

const compileRDL = (
	parser: Fn<boolean, Parser<string>>,
	rspec: ParseScope<string>,
	dspec: ParseScope<string>,
	lhspec: ParseScope<string>,
	lang: Language,
	opts: GrammarOpts
) =>
	compileLookahead(compileRD(parser, rspec, dspec, opts), lhspec, lang, opts);

export const defGrammar = (
	rules: string,
	env?: RuleTransforms,
	opts?: Partial<GrammarOpts>
) => {
	opts = { debug: false, optimize: true, ...opts };
	env = {
		binary: xfInt(2),
		collect: xfCollect,
		count: xfCount,
		discard: xfDiscard,
		float: xfFloat,
		hex: xfInt(16),
		hoist: xfHoist,
		hoistR: xfHoistResult,
		int: xfInt(10),
		join: xfJoin,
		json: xfJson,
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
					BIT,
					DIGIT,
					DNL,
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
			<GrammarOpts>opts,
			{}
		);
	}
};
