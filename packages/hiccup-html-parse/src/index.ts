import type { Fn } from "@thi.ng/api";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { ContextOpts, ParseScope } from "@thi.ng/parse";
import { defContext } from "@thi.ng/parse/context";
import { defGrammar } from "@thi.ng/parse/grammar";
import { unescapeEntities } from "@thi.ng/strings/entities";

export interface ParseOpts {
	/**
	 * Array of element names to ignore.
	 */
	ignoreElements: string[];
	/**
	 * Array of attribute names to ignore.
	 */
	ignoreAttribs: string[];
	/**
	 * Keep data attribs.
	 *
	 * @defaultValue true
	 */
	dataAttribs: boolean;
	/**
	 * Keep `<!doctype ...>` element.
	 *
	 * @defaultValue false
	 */
	doctype: boolean;
	/**
	 * Keep whitespace-only text bodies.
	 *
	 * @defaultValue false
	 */
	whitespace: boolean;
	/**
	 * If enabled, collapses all whitespace to single space (`\u0020`)
	 * characters.
	 *
	 * @defaultValue true
	 */
	collapse: boolean;
	/**
	 * If enabled, unescapes known named and numeric HTML entities (i.e.
	 * replaces them with their original characters).
	 *
	 * @defaultValue true
	 */
	unescape: boolean;
	/**
	 * Keep comments.
	 *
	 * @defaultValue false
	 */
	comments: boolean;
	/**
	 * Element transform/filter. Receives an hiccup element before its being
	 * added to its parent. The function has full freedom to replace the element
	 * with any value. If the function returns a nullish result the element will
	 * be skipped/omitted entirely.
	 */
	tx: Fn<any[], any>;
	/**
	 * Plain text transform/filter. If the function returns a nullish result the
	 * text will be skipped/omitted entirely.
	 */
	txBody: Fn<string, any>;
	/**
	 * Parser's internal max recursion limit. Parsing will terminate once this
	 * limit is reached.
	 *
	 * @defaultValue 128
	 */
	maxDepth: number;
	/**
	 * True to enable parser debug output. Will emit details of each parse scope.
	 *
	 * @defaultValue false
	 */
	debug: boolean;
}

export type Element = [string, Record<string, any>, ...ElementBody[]];
type ElementBody = string | Element;

export interface ParseResult {
	type: "success" | "partial" | "fail" | "error";
	loc?: { offset: number; line: number; column: number };
	err?: Error;
	result?: Element[];
}

// HTML parse grammar rules (see: thi.ng/parse readme for details)
// playground URL:
// https://demo.thi.ng/umbrella/parse-playground/#l9oD3G5vZGU6ICc8JyEgKDxjb21tZW50PiB8IDxjZGF0YV9lbD4gfCA8dm9pZF9lbD4gfCA8ZWw-KSA7CmVsOiA8bmFtZT4gPGF0dHJpYj4qICg8ZWxfYm9keT4gfCA8ZWxfY2xvc2U-ISApIDsKZWxfYm9keTogPFdTMD4gJz4nISAoPGJvZHk-IHwgPG5vZGU-KSogIjwvIiEgPG5hbWU-ISA8V1MwPiAnPichID0-IGhvaXN0IDsKZWxfY2xvc2U6IDxXUzA-ICIvPiIhIDsKbmFtZTogW0EtWmEtejAtOV86XC1dKyA9PiBqb2luIDsKYXR0cmliOiA8V1MxPiA8bmFtZT4gPGF0dHZhbD4_IDsKYXR0dmFsOiAnPSchICg8dmFsPiB8IDxhbHRfdmFsPiB8IDxlbXB0eT4gfCA8YWx0X2VtcHR5PikgOwp2YWw6ICciJyEgLig_KyciJyEpID0-IGpvaW4gOwphbHRfdmFsOiAnXCcnISAuKD8rJ1wnJyEpID0-IGpvaW4gOwplbXB0eTogJyInICciJyA7CmFsdF9lbXB0eTogJ1wnJyEgJ1wnJyEgOwpib2R5OiAuKD8tJzwnISkgPT4gam9pbiA7Cgp2b2lkX2VsOiA8dm9pZF9uYW1lPiA8YXR0cmliPiogPFdTMD4gJy8nPyEgJz4nISA7CnZvaWRfbmFtZTogKCJhcmVhIiB8ICJiYXNlIiB8ICJiciIgfCAiY29sIiB8ICJlbWJlZCIgfCAiaHIiIHwgImltZyIgfCAiaW5wdXQiIHwgImxpbmsiIHwgIm1ldGEiIHwgInNvdXJjZSIgfCAidHJhY2siIHwgIndiciIpIDsKCmNkYXRhX2VsOiA8Y2RhdGFfbmFtZT4gPGF0dHJpYj4qICc-JyEgPGNkYXRhX2JvZHk-IDsKY2RhdGFfbmFtZTogKCJzY3JpcHQiIHwgInN0eWxlIikgOwpjZGF0YV9ib2R5OiAuKD8tPGNkYXRhX2Nsb3NlPiEpIDxjZGF0YV9jbG9zZT4hID0-IGpvaW4gOwpjZGF0YV9jbG9zZTogIjwvIiEgPGNkYXRhX25hbWU-ISA8V1MwPiAnPichIDsKCmRvY3R5cGU6ICI8ISIhICgiZG9jdHlwZSIgfCAiRE9DVFlQRSIpISA8V1MxPiAuKD8rJz4nISkgPFdTMD4gPT4gam9pbiA7CmNvbW1lbnQ6ICIhLS0iISAuKD8rIi0tPiIhKSA9PiBqb2luIDsKCm1haW46IDxTVEFSVD4gPGRvY3R5cGU-PyA8bm9kZT4rIDxFTkQ-IDukbWFpbtoBMjwhZG9jdHlwZSBodG1sPgo8aHRtbCBsYW5nPSJlbiI-CjxoZWFkPgogIDwhLS0gPGlnbm9yZT48L2lnbm9yZT4gLS0-CiAgPHNjcmlwdCBsYW5nPSJqYXZhc2NyaXB0Ij4KY29uc29sZS5sb2coIjwvIisic2NyaXB0PiIpOwogIDwvc2NyaXB0PgogIDxzdHlsZT4KYm9keSB7IG1hcmdpbjogMDsgfQogIDwvc3R5bGU-CjwvaGVhZD4KPGJvZHk-CiAgPGRpdiBpZD0iZm9vIiBib29sIGRhdGEteHl6PSIiIGVtcHR5PScnPgogICAgPGEgaHJlZj0iI2JhciI-YmF6IDxiPmJvbGQ8L2I-PC9hPjxici8-CiAgPC9kaXY-CjwvYm9keT4KPC9odG1sPqCgoKA
export const lang = defGrammar(`
node: '<'! (<comment> | <cdata_el> | <void_el> | <el>) ;
el: <name> <attrib>* (<el_body> | <el_close>! ) ;
el_body: <WS0> '>'! (<body> | <node>)* "</"! <name>! <WS0> '>'! => hoist ;
el_close: <WS0> "/>"! ;
name: [A-Za-z0-9_:\\-]+ => join ;
attrib: <WS1> <name> <attval>? ;
attval: '='! (<val> | <alt_val> | <empty> | <alt_empty>) ;
val: '"'! .(?+'"'!) => join ;
alt_val: '\\''! .(?+'\\''!) => join ;
empty: '"' '"' ;
alt_empty: '\\''! '\\''! ;
body: .(?-'<'!) => join ;

void_el: <void_name> <attrib>* <WS0> '/'?! '>'! ;
void_name: ("area" | "base" | "br" | "col" | "embed" | "hr" | "img" | "input" | "link" | "meta" | "source" | "track" | "wbr") ;

cdata_el: <cdata_name> <attrib>* '>'! <cdata_body> ;
cdata_name: ("script" | "style") ;
cdata_body: .(?-<cdata_close>!) <cdata_close>! => join ;
cdata_close: "</"! <cdata_name>! <WS0> '>'! ;

doctype: "<!"! ("doctype" | "DOCTYPE")! <WS1> .(?+'>'!) <WS0> => join ;
comment: "!--"! .(?+"-->"!) => join ;

main: <START> <doctype>? <node>+ <END> ;
`);

/**
 * Creates a parser context for given source string and calls the main parser
 * rule. Returns result object, incl. the context for further inspection and
 * transformation.
 *
 * @param src
 * @param opts
 */
export const parseRaw = (src: string, opts?: Partial<ContextOpts>) => {
	const ctx = defContext(src, opts);
	return { result: lang!.rules.main(ctx), ctx };
};

/**
 * Trims given HTML source string and attempts to parse it into a collection of
 * elements in thi.ng/hiccup format, using provided options to transform, clean
 * or filter elements.
 *
 * @param src
 * @param opts
 */
export const parseHtml = (
	src: string,
	opts?: Partial<ParseOpts>
): ParseResult => {
	if (!src) return { type: "success", result: [] };
	opts = {
		debug: false,
		collapse: true,
		unescape: true,
		maxDepth: 128,
		...opts,
	};
	try {
		const { result, ctx } = parseRaw(src.trim(), {
			debug: opts.debug,
			maxDepth: opts.maxDepth,
		});
		const loc = {
			offset: ctx.state.p,
			line: ctx.state.l,
			column: ctx.state.c,
		};
		if (result) {
			const acc: Element[] = [];
			transformScope(ctx.root, opts, acc);
			return {
				type: ctx.done ? "success" : "partial",
				result: acc,
				loc,
			};
		} else {
			return { type: "fail", loc };
		}
	} catch (e) {
		return { type: "error", err: <Error>e };
	}
};

/**
 * Recursive depth-first transformation function to process the parse tree (this
 * is where the actual conversion to hiccup format happens).
 *
 * @remarks
 * The dispatch values for the various implementations here correspond to the
 * above grammar rules.
 *
 * @internal
 */
const transformScope = defmulti<
	ParseScope<string>,
	Partial<ParseOpts>,
	any[],
	void
>(
	(x) => x.id,
	{ cdata_el: "el", void_el: "el" },
	{
		[DEFAULT]: (scope: ParseScope<string>) => {
			throw new Error(`missing impl for scope ID: ${scope.id}`);
		},

		// root node of the parse tree
		root: ({ children }, opts, acc) => {
			if (!children) return;
			children = children[0].children;
			if (opts.doctype && children?.[0]) {
				acc.push(["!DOCTYPE", children[0].result]);
			}
			for (let x of children![1].children!) transformScope(x, opts, acc);
		},

		node: ({ children }, opts, acc) => {
			transformScope(children![0], opts, acc);
		},

		comment: ({ result }, opts, acc) => {
			if (opts.comments) acc.push(["__COMMENT__", result.trim()]);
		},

		// element node transformer, collects & filters attributes/children
		// adds resulting hiccup element to accumulator array
		el: ({ children }, opts, acc) => {
			const [name, { children: $attribs }, body] = children!;
			if (opts.ignoreElements?.includes(name.result)) return;
			const attribs: any = {};
			const el: Element = [name.result, attribs];
			if ($attribs) {
				for (let a of $attribs) {
					const name: string = a.children![0].result;
					if (opts.dataAttribs === false && name.startsWith("data-"))
						continue;
					if (opts.ignoreAttribs?.includes(name)) continue;
					if (a.children![1].children) {
						const val = a.children![1].children[0].result;
						if (val != null) attribs[name] = unescapeEntities(val);
					} else {
						attribs[name] = true;
					}
				}
			}
			if (body) {
				if (body.result) {
					el.push(body.result.trim());
				} else if (body.children) {
					for (let x of body.children!) transformScope(x, opts, el);
				}
			}
			const result = opts.tx ? opts.tx(el) : el;
			if (result != null) acc.push(result);
		},

		// plain text transform (by default only resolves HTML entities)
		body: ({ result }, opts, acc) => {
			if (!opts.whitespace && /^\s+$/.test(result)) return;
			if (opts.collapse) result = (<string>result).replace(/\s+/gm, " ");
			if (opts.unescape) result = unescapeEntities(result);
			result = opts.txBody ? opts.txBody(result) : result;
			if (result != null) acc.push(result);
		},
	}
);
