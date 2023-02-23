import type { IObjectOf } from "@thi.ng/api";
import type { ILogger } from "@thi.ng/logger";

export interface TagTransforms {
	bold(ctx: MDParseContext, body: any[]): any;
	blockquote(ctx: MDParseContext, body: any[], meta?: any): any;
	br(ctx: MDParseContext): any;
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
	img(ctx: MDParseContext, label: string, src: string): any;
	italic(ctx: MDParseContext, body: any[]): any;
	kbd(ctx: MDParseContext, key: string): any;
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
	strike(ctx: MDParseContext, body: any[]): any;
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
	 * If true, automatically escapes some characters using HTML entities.
	 *
	 * @remarks
	 * Reference:
	 * - https://github.com/thi-ng/umbrella/blob/develop/packages/strings/src/entities.ts
	 */
	escape: boolean;
}

export type TodoAttribs = Partial<{ __todo: true; __done: boolean }>;

export type ColumnAlign = "center" | "default" | "left" | "right";
