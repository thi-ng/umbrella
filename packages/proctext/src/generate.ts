import { peek } from "@thi.ng/arrays/peek";
import { mergeDeepObj } from "@thi.ng/associative/merge-deep";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { ContextOpts, ParseScope } from "@thi.ng/parse";
import { defContext } from "@thi.ng/parse/context";
import { defGrammar } from "@thi.ng/parse/grammar";
import { SYSTEM } from "@thi.ng/random/system";
import { pickRandomUnique } from "@thi.ng/random/unique-indices";
import { capitalize, lower, upper } from "@thi.ng/strings/case";
import type { GeneratorContext } from "./api.js";

/**
 * Default variable modifiers (capitalize, uppercase, lowercase)
 */
export const DEFAULT_MODIFIERS: GeneratorContext["mods"] = {
	cap: capitalize,
	uc: upper,
	lc: lower,
};

/**
 * Parser grammar rules for the custom text/DSL format used for this text
 * generator. These rules were created with & exported from this playground URL:
 *
 * Source:
 * https://demo.thi.ng/umbrella/parse-playground/#l9oCTSMgbWFpbiBwYXJzZXIgcnVsZQptYWluOiA8U1RBUlQ-ICggPGRlZj4gfCA8Y29tbWVudD4gfCA8YmluZGluZz4gfCA8d29yZD4gKSogPEVORD4gPT4gaG9pc3QgOwoKIyB2YXJpYWJsZSBkZWZpbml0aW9uCmRlZjogPFdTMD4gPExTVEFSVD4gJ1snISA8aWQ-ICddJyEgPEROTD4gPHZhbHVlPisgPEROTD4gOwppZDogKCA8QUxQSEFfTlVNPiB8IFsuXHUwMDJkXSApKyA9PiBqb2luIDsKdmFsdWU6IC4oPys8RE5MPikgPT4gam9pbiA7CgojIHZhcmlhYmxlIGJpbmRpbmdzCmJpbmRpbmc6ICc8JyEgKDxzZXR2YXI-IHwgPHZhcj4pICc-JyEgPT4gaG9pc3QgOwp2YXI6IDxpZD4gPG1vZGlmaWVyPj8gOwptb2RpZmllcjogPG1vZGlkPisgOwptb2RpZDogJzsnISA8QUxQSEFfTlVNPisgPT4gam9pbiA7CnNldHZhcjogJyEnPyA8aWQ-ICc9JyEgPHZhcj4gOwoKIyBsaW5lIGNvbW1lbnQKY29tbWVudDogPExTVEFSVD4gJyMnIC4oPys8RE5MPikgPT4gZGlzY2FyZCA7CgojIHZlcmJhdGltIHRleHQKd29yZDogKCA8QUxQSEFfTlVNPiB8IFsgPyEuLCciQCMkJSYoKXt9OzovKj0rXHUwMDJkXHUwMDViXHUwMDVkXHUwMDBhXSApKyA9PiBqb2luIDukbWFpbtn9W25hbWVdCkFsaWNlCkJvYgoKW3BsYWNlXQp0b3duCnRoZSB3b29kcwoKIyBDb21tZW50IGxpbmUKW2FjdGl2aXR5XQpjeWNsaW5nIGFuZCA8YWN0LmFsdD4KaGlraW5nCgpPbmNlIHVwb24gYSB0aW1lLCA8aGVybzE9bmFtZT4gYW5kIDxoZXJvMj1uYW1lPiB3ZW50IHRvIDxwbGFjZT4uIDxoZXJvMT4gdGhlbiBkaWQgc29tZSA8YWN0aXZpdHk-LCBidXQgPGhlcm8yPiBjaG9zZSB0byBkbyA8YWN0aXZpdHk7dWM-IGluc3RlYWQuCgpUaGUgZW5kLq0oaGVsbG8gd29ybGQpuGludGVudGlvbmFsbHkgbGVmdCBibGFua6Cg
 */
const GRAMMAR = defGrammar(`
# main parser rule
main: <START> ( <def> | <comment> | <binding> | <word> )* <END> => hoist ;

# variable definition
def: <WS0> <LSTART> '['! <id> ']'! <DNL> <value>+ <DNL> ;
id: ( <ALPHA_NUM> | [.\\u002d] )+ => join ;
value: .(?+<DNL>) => join ;

# variable bindings
binding: '<'! (<setvar> | <var>) '>'! => hoist ;
var: <id> <modifier>? ;
modifier: <modid>+ ;
modid: ';'! <ALPHA_NUM>+ => join ;
setvar: '!'? <id> '='! <var> ;

# line comment
comment: <LSTART> '#' .(?+<DNL>) => discard ;

# verbatim text
word: ( <ALPHA_NUM> | [ ?!.,'"@#$%&(){};:/*=+\\u002d\\u005b\\u005d\\u000a] )+ => join ;
`);

/**
 * Applies the main parser rule to given input and returns resulting parse tree
 * which will then be traversed for further processing/transformations
 *
 * @param src
 * @param opts
 */
const __parse = (src: string, opts?: Partial<ContextOpts>) => {
	const ctx = defContext(src, opts);
	return { result: GRAMMAR!.rules.main(ctx), ctx };
};

/**
 * Main text generation function. First parses input string, then (if there were
 * no parse errors) traverses the document AST and generates text according to
 * the rules and provided options (e.g. predefined vars, modifiers etc). Returns
 * promise to an object with resulting text and processing status/error.
 *
 * @remarks
 * If the generation was successful, the result object will also contain the
 * update {@link GeneratorContext}, which can then be re-used for future
 * invocations (i.e. to retain state between multiple generations).
 *
 * @param src
 * @param ctx
 */
export const generate = async (
	src: string,
	ctx?: Partial<GeneratorContext>
) => {
	try {
		const { result, ctx: parseCtx } = __parse(src.trim());
		if (result) {
			const $ctx: GeneratorContext = mergeDeepObj(
				{
					vars: {},
					mods: DEFAULT_MODIFIERS,
					rnd: SYSTEM,
					maxTrials: 10,
				},
				ctx
			);
			const acc: string[] = [];
			await __transformScope(parseCtx.root, $ctx, acc);
			return {
				type: parseCtx.done ? "success" : "partial",
				result: acc.join(""),
				ctx: $ctx,
			};
		} else {
			return { type: "error", err: new Error(`parse error`) };
		}
	} catch (e) {
		return { type: "error", err: <Error>e };
	}
};

/**
 * Polymorphic tree traversal function. this is where the actual text generation
 * and variable handling/expansion happens. This function is initially called
 * for the root node of the parse tree, then descends recursively to process
 * child nodes.
 *
 * @remarks
 * The best way to understand the structure here is to open the above parser
 * playground URL (see {@link GRAMMAR}) and look at the parsed result tree
 * shown, then compare with the code here...
 */
const __transformScope = defmulti<
	ParseScope<string>,
	GeneratorContext,
	string[],
	Promise<void>
>(
	(x) => x.id,
	{},
	{
		// fallback handler for unknown tree nodes (usually a grammar error)
		[DEFAULT]: async (scope: ParseScope<string>) => {
			throw new Error(`missing impl for scope ID: ${scope.id}`);
		},

		// handler for processing the root node (just traverses children)
		root: async ({ children }, ctx, acc) => {
			if (!children) return;
			for (let x of children![0].children!)
				await __transformScope(x, ctx, acc);
		},

		// handler for a new variable definition and its possible values
		def: async ({ children }, story) => {
			story.vars[children![0].result] = {
				opts: children![1].children!.map((x) => x.result),
				history: [],
			};
		},

		// handler for variable lookups
		var: async (scope, ctx, acc) => {
			acc.push(await __expandVar(scope, ctx));
		},

		// handler for variable assignments
		setvar: async ({ children }, ctx, acc) => {
			const choice = await __expandVar(children![2], ctx);
			ctx.vars[children![1].result] = {
				opts: [choice],
				history: [choice],
			};
			if (!children![0].result) acc.push(choice);
		},

		// handler for verbatim text
		word: async ({ result }, _, acc) => {
			acc.push(result);
		},
	}
);

/**
 * Checks if `name` contains dots and if so attempt to look up indirectly via
 * already declared vars. Returns possibly resolved var name
 *
 * @remarks
 * For details see "Dynamic lookups" section in readme
 *
 * @param name
 * @param ctx
 *
 * @internal
 */
const __resolveVarName = (name: string, ctx: GeneratorContext) => {
	if (name.indexOf(".") == -1) return name;
	let resolved = "";
	for (let x of name.toLowerCase().split(".")) {
		const $name = resolved + "." + x;
		const $var = resolved ? ctx.vars[$name] : ctx.vars[x];
		if ($var)
			resolved =
				($var.history.length ? peek($var.history).toLowerCase() : "") ||
				$name;
	}
	return resolved;
};

/**
 * Resolves & expands variable, chooses new value from defined option for this
 * vars and then applies any modifiers in sequence.
 *
 * @param var
 * @param ctx
 *
 * @internal
 */
const __expandVar = async (
	{ children }: ParseScope<string>,
	ctx: GeneratorContext
) => {
	const id = __resolveVarName(children![0].result, ctx);
	const $var = ctx.vars[id];
	if (!$var) throw new Error(`unknown variable: ${id}`);
	// pick a new random value (attempt different choice than last time)
	pickRandomUnique(1, $var.opts, $var.history, ctx.maxTrials, ctx.rnd);
	// store value as last pick for this var (to ensure next pick will be different)
	if ($var.history.length > ctx.maxHist) $var.history.shift();
	const choice = peek($var.history);
	// parse & expand picked value to recursively expand any included variable refs
	// provide current story context obj as shared state
	const result = await generate(choice, ctx);
	// bail if there were any errors
	if (result.err) {
		throw new Error(
			result.err.message.includes("recursion")
				? `error expanding variable: ${id} (cycle detected)`
				: result.err.message
		);
	}
	// apply modifiers in sequence, if any...
	let value = result.result;
	if (children![1].children) {
		for (let mod of children![1].children) {
			const modFn = ctx.mods[mod.result];
			if (modFn) value = await modFn(value);
			else throw new Error(`unknown modifier: ${mod.result}`);
		}
	}
	return value;
};
