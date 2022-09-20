import type { Fn2, FnAnyT, IObjectOf } from "@thi.ng/api";
import { ILogger, LogLevel } from "@thi.ng/logger";
import { ConsoleLogger } from "@thi.ng/logger/console";

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
	format: CodeBlockFormat;
	files: Record<string, TangleRef>;
	outputs: Record<string, string>;
	logger: ILogger;
	resolvePath: FnAnyT<string, string>;
	readText: Fn2<string, ILogger, string>;
	opts: Partial<TangleOpts>;
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

export let LOGGER: ILogger = new ConsoleLogger("tangle", LogLevel.INFO);

export const setLogger = (logger: ILogger) => {
	LOGGER = logger;
};
