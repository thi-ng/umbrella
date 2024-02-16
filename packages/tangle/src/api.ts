import type { Fn2, FnAnyT, IObjectOf, Predicate } from "@thi.ng/api";
import { ConsoleLogger, LogLevel, ROOT, type ILogger } from "@thi.ng/logger";

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
	prefix: string;
	suffix: string;
}

export const BLOCK_FORMATS: IObjectOf<CodeBlockFormat> = {
	".md": {
		prefix: "```",
		suffix: "```",
	},
	".org": {
		prefix: "#+BEGIN_SRC ",
		suffix: "#+END_SRC",
	},
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
