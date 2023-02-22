import type { IObjectOf } from "@thi.ng/api";
import type { ILogger } from "@thi.ng/logger";

export interface TagTransforms {
	bold(ctx: MDParseContext, body: string): any;
	blockquote(ctx: MDParseContext, body: any[], meta?: any): any;
	code(ctx: MDParseContext, body: string): any;
	codeblock(
		ctx: MDParseContext,
		lang: string,
		head: string,
		body: string,
		meta?: any
	): any;
	custom(ctx: MDParseContext, kind: string, body: string, meta?: any): any;
	emoji(ctx: MDParseContext, id: string): any;
	footnote(ctx: MDParseContext, id: string, body: any[], meta?: any): any;
	footnoteRef(ctx: MDParseContext, id: string): any;
	footnoteWrapper(ctx: MDParseContext, notes: IObjectOf<any>): any;
	heading(ctx: MDParseContext, level: number, body: any[], meta?: any): any;
	hr(ctx: MDParseContext, length: number): any;
	img(ctx: MDParseContext, src: string, alt: string): any;
	italic(ctx: MDParseContext, body: string): any;
	link(ctx: MDParseContext, target: string, body: any[]): any;
	linkRef(ctx: MDParseContext, refID: string, body: any[]): any;
	meta(ctx: MDParseContext, body: string): any;
	ol(ctx: MDParseContext, items: any[], meta?: any): any;
	olitem(
		ctx: MDParseContext,
		attribs: TodoAttribs,
		index: number,
		...body: any[]
	): any;
	para(ctx: MDParseContext, body: any[], meta?: any): any;
	strike(ctx: MDParseContext, body: string): any;
	table(
		ctx: MDParseContext,
		align: ColumnAlign[],
		head: any[],
		rows: any[],
		meta?: any
	): any;
	tableCell(ctx: MDParseContext, body: any[]): any;
	tableRow(ctx: MDParseContext, cells: any[]): any;
	ul(ctx: MDParseContext, items: any[], meta?: any): any;
	ulitem(ctx: MDParseContext, attribs: TodoAttribs, ...body: any[]): any;
}

export interface MDParseContext {
	logger?: ILogger;
	tags: TagTransforms;
	linkRefs: IObjectOf<string>;
	footnotes: IObjectOf<any>;
	headings: { level: number; body: any[] }[];
	hasFootnotes: boolean;
	meta?: any;
	opts: ParseOpts;
}

export interface ParseOpts {
	/**
	 * Line break representation in blockquotes. E.g. Use `["br",{}]` for actual
	 * line breaks.
	 *
	 * @defaultValue `" "`
	 */
	bqLineBreak: any;
}

export type TodoAttribs = Partial<{ __todo: true; __done: boolean }>;

export type ColumnAlign = "center" | "left" | "right";
