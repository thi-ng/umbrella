import { DEFAULT, defmulti } from "@thi.ng/defmulti";
import {
	defContext,
	defGrammar,
	type ContextOpts,
	type ParseScope,
} from "@thi.ng/parse";
import { pickRandomUnique, type IRandom } from "@thi.ng/random";
import { capitalize, lower, upper } from "@thi.ng/strings";

// types for story generation
export type StoryVar = { opts: string[]; last: string };
export type StoryContext = { vars: Record<string, StoryVar>; rnd: IRandom };

// variable modifiers
const MODIFIERS = { cap: capitalize, uc: upper, lc: lower };

// parser grammar rules for the custom text format used for our text generator.
// these rules were created with & exported from this playground URL:
// Source: https://demo.thi.ng/umbrella/parse-playground/#l9oCTSMgbWFpbiBwYXJzZXIgcnVsZQptYWluOiA8U1RBUlQ-ICggPGRlZj4gfCA8Y29tbWVudD4gfCA8YmluZGluZz4gfCA8d29yZD4gKSogPEVORD4gPT4gaG9pc3QgOwoKIyB2YXJpYWJsZSBkZWZpbml0aW9uCmRlZjogPFdTMD4gPExTVEFSVD4gJ1snISA8aWQ-ICddJyEgPEROTD4gPHZhbHVlPisgPEROTD4gOwppZDogKCA8QUxQSEFfTlVNPiB8IFsuXHUwMDJkXSApKyA9PiBqb2luIDsKdmFsdWU6IC4oPys8RE5MPikgPT4gam9pbiA7CgojIHZhcmlhYmxlIGJpbmRpbmdzCmJpbmRpbmc6ICc8JyEgKDxzZXR2YXI-IHwgPHZhcj4pICc-JyEgPT4gaG9pc3QgOwp2YXI6IDxpZD4gPG1vZGlmaWVyPj8gOwptb2RpZmllcjogPG1vZGlkPisgOwptb2RpZDogJzsnISA8QUxQSEFfTlVNPisgPT4gam9pbiA7CnNldHZhcjogJyEnPyA8aWQ-ICc9JyEgPHZhcj4gOwoKIyBsaW5lIGNvbW1lbnQKY29tbWVudDogPExTVEFSVD4gJyMnIC4oPys8RE5MPikgPT4gZGlzY2FyZCA7CgojIHZlcmJhdGltIHRleHQKd29yZDogKCA8QUxQSEFfTlVNPiB8IFsgPyEuLCciQCMkJSYoKXt9OzovKj0rXHUwMDJkXHUwMDViXHUwMDVkXHUwMDBhXSApKyA9PiBqb2luIDukbWFpbtn9W25hbWVdCkFsaWNlCkJvYgoKW3BsYWNlXQp0b3duCnRoZSB3b29kcwoKIyBDb21tZW50IGxpbmUKW2FjdGl2aXR5XQpjeWNsaW5nIGFuZCA8YWN0LmFsdD4KaGlraW5nCgpPbmNlIHVwb24gYSB0aW1lLCA8aGVybzE9bmFtZT4gYW5kIDxoZXJvMj1uYW1lPiB3ZW50IHRvIDxwbGFjZT4uIDxoZXJvMT4gdGhlbiBkaWQgc29tZSA8YWN0aXZpdHk-LCBidXQgPGhlcm8yPiBjaG9zZSB0byBkbyA8YWN0aXZpdHk7dWM-IGluc3RlYWQuCgpUaGUgZW5kLq0oaGVsbG8gd29ybGQpuGludGVudGlvbmFsbHkgbGVmdCBibGFua6Cg
export const lang = defGrammar(`
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

// applies the main parser rule to given input and returns resulting parse tree
// which will then be traversed for further processing/transformations
const parse = (src: string, opts?: Partial<ContextOpts>) => {
	const ctx = defContext(src, opts);
	return { result: lang!.rules.main(ctx), ctx };
};

// main text generation function. first parses input string, then (if there were
// no parse errors) traverses the AST and generates text according to the rules.
// returns an object with resulting text and processing status/error.
export const generateStory = (src: string, story: StoryContext) => {
	try {
		const { result, ctx } = parse(src.trim());
		if (result) {
			const acc: string[] = [];
			transformScope(ctx.root, story, acc);
			return {
				type: ctx.done ? "success" : "partial",
				result: acc.join(""),
			};
		} else {
			return { type: "error", err: new Error(`parse error`) };
		}
	} catch (e) {
		return { type: "error", err: <Error>e };
	}
};

// polymorphic tree traversal function. this is where the actual text generation
// and variable handling/expansion happens. this function is initially called
// for the root node of the parse tree, then descends recursively to process
// child nodes. the best way to understand the structure here is to open the
// above parser playground URL and look at the parsed result tree shown, then
// compare with the code here...
// IMPORTANT: please also consult the https://thi.ng/defmulti readme for
// detailed description of how this type of function operates in general.
const transformScope = defmulti<
	ParseScope<string>,
	StoryContext,
	string[],
	void
>(
	(x) => x.id,
	{},
	{
		// fallback handler for unknown tree nodes (usually a grammar error)
		[DEFAULT]: (scope: ParseScope<string>) => {
			throw new Error(`missing impl for scope ID: ${scope.id}`);
		},

		// handler for processing the root node (just traverses children)
		root: ({ children }, story, acc) => {
			if (!children) return;
			for (let x of children![0].children!) transformScope(x, story, acc);
		},

		// handler for a new variable definition and its possible values
		def: ({ children }, story) => {
			story.vars[children![0].result] = {
				opts: children![1].children!.map((x) => x.result),
				last: "",
			};
		},

		// handler for variable lookups
		var: (scope, story, acc) => {
			acc.push(expandVar(scope, story));
		},

		// handler for variable assignments
		setvar: ({ children }, story, acc) => {
			const choice = expandVar(children![2], story);
			story.vars[children![1].result] = { opts: [choice], last: choice };
			if (!children![0].result) acc.push(choice);
		},

		// handler for verbatim text
		word: ({ result }, _, acc) => acc.push(result),
	}
);

// check if var name contains dots and if so attempt to look up indirectly via
// already declared vars. returns possibly resolved var name
// (for details see /src/stories/dynamic-lookup.txt)
const resolveVarName = (name: string, story: StoryContext) => {
	if (name.indexOf(".") == -1) return name;
	let resolved = "";
	for (let x of name.toLowerCase().split(".")) {
		const $var = resolved ? story.vars[resolved + "." + x] : story.vars[x];
		if ($var) resolved = $var.last.toLowerCase() || resolved + "." + x;
	}
	return resolved;
};

// lookup variable, choose new value and apply any modifiers
const expandVar = ({ children }: ParseScope<string>, story: StoryContext) => {
	const id = resolveVarName(children![0].result, story);
	const $var = story.vars[id];
	if (!$var) throw new Error(`unknown variable: ${id}`);
	// pick a new random value (attempt different choice than last time)
	const choice = pickRandomUnique(
		1,
		$var.opts,
		[$var.last],
		10,
		story.rnd
	).pop()!;
	// store value as last pick for this var (to ensure next pick will be different)
	$var.last = choice;
	// parse & expand picked value to recursively expand any included variable refs
	// provide current story context obj as shared state
	const result = generateStory(choice, story);
	// bail if there were any errors
	if (result.err) {
		throw new Error(
			result.err.message.includes("recursion")
				? `error expanding variable: ${id} (cycle detected)`
				: result.err.message
		);
	}
	// apply modifiers, if any...
	let value = result.result;
	if (children![1].children) {
		for (let mod of children![1].children) {
			const modFn = MODIFIERS[<keyof typeof MODIFIERS>mod.result];
			if (modFn) value = modFn(value);
			else throw new Error(`unknown modifier: ${mod.result}`);
		}
	}
	return value;
};
