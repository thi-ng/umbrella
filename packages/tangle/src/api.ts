import type { Fn, Fn2, FnAnyT, IObjectOf, Predicate } from "@thi.ng/api";
import { ConsoleLogger, LogLevel, ROOT, type ILogger } from "@thi.ng/logger";
import { split } from "@thi.ng/strings";
import { map, str, transduce } from "@thi.ng/transducers";

export interface Block {
	id: string;
	tangle?: string;
	publish?: string;
	noweb: string;
	lang: string;
	matchStart: number;
	matchEnd: number;
	start: number;
	end: number;
	body: string;
	edited?: boolean;
	resolved?: boolean;
}

export interface TangleRef {
	path: string;
	src: string;
	blocks: Record<string, Block>;
}

export type Blocks = Record<string, Block>;

export interface TangleCtx {
	/**
	 * Code block marker definitions for current source file format. If not
	 * pre-defined, then {@link tangleFile} will auto-detect the format based on
	 * given file extension. See {@link BLOCK_FORMATS} for supported source
	 * formats.
	 */
	format: CodeBlockFormat;
	/**
	 * Stores all referenced source files and their extracted code blocks.
	 */
	files: Record<string, TangleRef>;
	/**
	 * Stores all generated outputs (absolute file paths are used as keys)
	 */
	outputs: Record<string, string>;
	/**
	 * Logger for debug outputs
	 */
	logger: ILogger;
	/**
	 * "Filesystem" implementation. When using {@link tangleString}, in-memory
	 * stubs will be used to obtain file contents from a given object.
	 */
	fs: FileSystem;
	/**
	 * Tangle & codegen options
	 */
	opts: Partial<TangleOpts>;
}

export interface FileSystem {
	isAbsolute: Predicate<string>;
	resolve: FnAnyT<string, string>;
	read: Fn2<string, ILogger, string>;
}

export interface TangleOpts {
	comments: boolean;
}

export interface CodeBlockFormat {
	/**
	 * String or regexp matching the beginning of a code block. If given a
	 * regexp, it will become part of a larger one and any regexp flags given
	 * here will be ignored. Also the given regexp pattern will always be
	 * prefixed with the line-start symbol (`^`), so it must not be given
	 * here...
	 */
	prefix: string | RegExp;
	/**
	 * String or regexp matching the end of a code block. If given a
	 * regexp, it MUST have the multiline flag enabled!
	 */
	suffix: string | RegExp;
	/**
	 * Optional function to transform the codeblock's body (e.g. to remove any
	 * prefix characters or remove trailing whitespace).
	 */
	xform?: Fn<string, string>;
}

/** @internal */
const JS_DOC: CodeBlockFormat = {
	prefix: /^\s*\*\s+```/,
	suffix: /^\s*\*\s+```/m,
	xform: (body) =>
		transduce(
			map((x) => x.replace(/^\s*\*\s?/, "")),
			str("\n"),
			split(body)
		),
};

export const BLOCK_FORMATS: IObjectOf<CodeBlockFormat> = {
	".md": {
		prefix: "```",
		suffix: "```",
	},
	".org": {
		prefix: "#+BEGIN_SRC ",
		suffix: "#+END_SRC",
	},
	".js": JS_DOC,
	".ts": JS_DOC,
};

const C = "//";
const P = "#";
const L = "--";
const S = ";;";
const C89: [string, string] = ["/*", "*/"];
const HTML: [string, string] = ["<!--", "-->"];

export const COMMENT_FORMATS: IObjectOf<string | [string, string]> = {
	c: C89,
	clj: S,
	cljs: S,
	cpp: C,
	cs: C,
	css: C89,
	docker: "::",
	elm: L,
	erl: "%",
	fs: "\\",
	go: C,
	h: C,
	html: HTML,
	java: C,
	js: C,
	jsonc: C,
	lua: L,
	md: HTML,
	ml: ["(*", "*)"],
	pde: C,
	py: P,
	rs: C,
	scala: C,
	scm: S,
	sh: P,
	sql: L,
	swift: C,
	tex: "%",
	toml: P,
	ts: C,
	ttl: P,
	wast: S,
	xml: HTML,
	yaml: P,
	zig: C,
};

/**
 * See [thi.ng/logger](https://docs.thi.ng/umbrella/logger/) for usage.
 */
export const LOGGER = ROOT.addChild(new ConsoleLogger("tangle", LogLevel.INFO));
