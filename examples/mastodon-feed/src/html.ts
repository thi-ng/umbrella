import { type Fn } from "@thi.ng/api";
import { DEFAULT, defmulti } from "@thi.ng/defmulti";
import {
	defContext,
	defGrammar,
	type ContextOpts,
	type ParseScope,
} from "@thi.ng/parse";
import { unescapeEntities } from "@thi.ng/strings";

export interface TransformOpts {
	/**
	 * List of attribute names to ignore.
	 */
	ignoreAttribs: string[];
	/**
	 * Element transform/filter. Receives an hiccup element before its being
	 * added to its parent. The function has full freedom to replace the element
	 * with any value. If the function returns a nullish result the element will
	 * be skipped/omitted entirely.
	 */
	tx: Fn<any[], any>;
}

// HTML parse grammar rules (see: thi.ng/parse readme for details)
// playground URL:
// https://demo.thi.ng/umbrella/parse-playground/#l9oBVGVsOiAnPCchIDxuYW1lPiA8YXR0cmliPiogKDxlbGJvZHk-IHwgPGVsdm9pZD4hICkgOwplbGJvZHk6ICc-JyEgKDxib2R5PiB8IDxlbD4pKiAiPC8iISA8bmFtZT4hICc-JyEgPT4gaG9pc3QgOwplbHZvaWQ6IDxXUzA-ICIvPiIhIDsKbmFtZTogW2EtejAtOV9cLV0rID0-IGpvaW4gOwphdHRyaWI6IDxXUzE-IDxuYW1lPiA8YXR0dmFsPj8gOwphdHR2YWw6ICc9JyEgKDx2YWw-IHwgPGVtcHR5PikgOwp2YWw6ICciJyEgLig_KyciJyEpID0-IGpvaW4gOwplbXB0eTogJyInISAnIichIDsKYm9keTogLig_LSc8JyEpID0-IGpvaW4gOwptYWluOiA8U1RBUlQ-IDxlbD4rIDxFTkQ-ID0-IGhvaXN0IDukbWFpbtk_PGRpdiBpZD0iZm9vIiBhYmMgZGF0YS14eXo9IiI-PGEgaHJlZj0iI2JhciI-YmF6PC9hPjxici8-PC9kaXY-oKCgoA
const lang = defGrammar(`
el: '<'! <name> <attrib>* (<elbody> | <elvoid>! ) ;
elbody: '>'! (<body> | <el>)* "</"! <name>! '>'! => hoist ;
elvoid: <WS0> "/>"! ;
name: [a-z0-9_\\-]+ => join ;
attrib: <WS1> <name> <attval>? ;
attval: '='! (<val> | <empty>) ;
val: '"'! .(?+'"'!) => join ;
empty: '"'! '"'! ;
body: .(?-'<'!) => join ;
main: <START> <el>+ <END> => hoist ;
`);

/**
 * Creates a parser context for given source string and calls main parser rule.
 * Returns result object, incl. the context for further inspection.
 *
 * @param src
 * @param opts
 */
const parseHTML = (src: string, opts?: Partial<ContextOpts>) => {
	const ctx = defContext(src, opts);
	return { result: lang!.rules.main(ctx), ctx };
};

/**
 * Parses given HTML source string into a collection of elements in
 * thi.ng/hiccup format, using provided options to transform, clean or filter
 * elements.
 *
 * @param src
 * @param opts
 */
export const htmlToHiccup = (
	src: string,
	opts: Partial<TransformOpts> = {}
) => {
	if (!src) return [];
	const { result, ctx } = parseHTML(src);
	if (!result) return [["div", {}, "Parse error @ ", ctx.state.l]];
	const acc: any[] = [];
	transformScope(ctx.root, opts, acc);
	return acc;
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
	Partial<TransformOpts>,
	any[],
	void
>(
	(x) => x.id,
	{},
	{
		[DEFAULT]: (scope: ParseScope<string>) => {
			throw new Error(`missing impl for scope ID: ${scope.id}`);
		},

		// root node of the parse tree
		root: ({ children }, opts, acc) => {
			if (!children) return;
			for (let x of children[0].children!) transformScope(x, opts, acc);
		},

		// element node transformer, collects & filters attributes/children
		// adds resulting hiccup element to accumulator array
		el: ({ children }, opts, acc) => {
			const [name, { children: $attribs }, body] = children!;
			const attribs: any = {};
			const el: any[] = [name.result, attribs];
			if ($attribs) {
				for (let a of $attribs) {
					const name = a.children![0].result;
					if (opts.ignoreAttribs?.includes(name)) continue;
					if (a.children![1].children) {
						const val = a.children![1].children[0].result;
						if (val != null) attribs[name] = unescapeEntities(val);
					} else {
						attribs[name] = true;
					}
				}
			}
			if (body?.children) {
				for (let x of body.children!) transformScope(x, opts, el);
			}
			const res = opts.tx ? opts.tx(el) : el;
			if (res != null) acc.push(res);
		},

		// plain text transform (only resolves HTML entities)
		body: ({ result }, _, acc) => acc.push(unescapeEntities(result)),
	}
);
