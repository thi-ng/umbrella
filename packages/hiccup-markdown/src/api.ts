import type { IObjectOf } from "@thi.ng/api";
import type { ILogger } from "@thi.ng/logger";
import type { ParseState } from "@thi.ng/parse";

/**
 * The functions in this interface are being called by the parser to allow the
 * user to transform the raw elements into arbitrary results. The package
 * provides default implementations for all to generate minimal hiccup output.
 *
 * See the [markdown example
 * project](https://github.com/thi-ng/umbrella/tree/develop/examples/markdown)
 * for how these can be customized.
 *
 * @remarks
 * For consistency, all handlers are receiving the {@link TransformCtx} as
 * 1st arg. The remaining args are specific to each element type though and
 * vary. Any child elements (`body` args) will already be transformed by the
 * time a handler receives them.
 *
 * ### Optional metadata
 *
 * Block-level elements will also receive optional metadata associated with that
 * element (and defined in the markdown source). The default implementations all
 * assign such metadata (if present) to a `__meta` attribute (via
 * {@link withMeta}). Also by default, the metadata itself is taken verbatim (as
 * string) and NOT transformed in any way. Any form of metadata parsing (e.g.
 * JSON) must be implemented by the {@link TagTransforms.meta} handler.
 */
export interface TagTransforms {
	/**
	 * Handler for `**` delimited body.
	 *
	 * @param ctx
	 * @param body
	 */
	bold(ctx: TransformCtx, body: any[]): any;
	/**
	 * Handler for `>` quoted body (aka blockquotes).
	 *
	 * @param ctx
	 * @param body
	 * @param meta
	 */
	blockquote(ctx: TransformCtx, body: any[], meta?: any): any;
	/**
	 * Handler for forced line breaks (aka lines ending with `\`).
	 *
	 * @param ctx
	 */
	br(ctx: TransformCtx): any;
	/**
	 * Handler for inline `code`.
	 *
	 * @param ctx
	 * @param body
	 */
	code(ctx: TransformCtx, body: string): any;
	/**
	 * Handler for GFM-style fenced code blocks.
	 *
	 * @param ctx
	 * @param lang
	 * @param head
	 * @param body
	 * @param meta
	 */
	codeblock(
		ctx: TransformCtx,
		lang: string,
		head: string[],
		body: string,
		meta?: any
	): any;
	/**
	 * Handler for `:::`-fenced custom blocks. `body` is unparsed raw string.
	 *
	 * @param ctx
	 * @param type
	 * @param head
	 * @param body
	 * @param meta
	 */
	custom(
		ctx: TransformCtx,
		type: string,
		head: string[],
		body: string,
		meta?: any
	): any;
	/**
	 * Handler for `:emoji_id:` replacements.
	 *
	 * @param ctx
	 * @param id
	 */
	emoji(ctx: TransformCtx, id: string): any;
	/**
	 * Handler for a single footnote definition (NOT its reference!).
	 *
	 * @param ctx
	 * @param id
	 * @param body
	 * @param meta
	 */
	footnote(ctx: TransformCtx, id: string, body: any[], meta?: any): any;
	/**
	 * Handler for a footnote reference.
	 *
	 * @param ctx
	 * @param id
	 */
	footnoteRef(ctx: TransformCtx, id: string): any;
	/**
	 * Handler for the container element holding all footnootes (only used if
	 * there actually are footnotes).
	 *
	 * @param ctx
	 * @param notes
	 */
	footnoteWrapper(ctx: TransformCtx, notes: IObjectOf<any>): any;
	/**
	 * Handler for a single heading element.
	 *
	 * @param ctx
	 * @param level
	 * @param anchorID
	 * @param body
	 * @param meta
	 */
	heading(
		ctx: TransformCtx,
		level: number,
		anchorID: string,
		body: any[],
		meta?: any
	): any;
	/**
	 * Horizontal rule handler. Also receives number of dashes used (e.g. to
	 * create different representations/styling)
	 *
	 * @param ctx
	 * @param length
	 * @param meta
	 */
	hr(ctx: TransformCtx, length: number, meta?: any): any;
	/**
	 * Handler for an image element.
	 *
	 * @param ctx
	 * @param label
	 * @param src
	 * @param title
	 */
	img(ctx: TransformCtx, label: string, src: string, title?: string): any;
	/**
	 * Handler for `_`-delimited italic body content
	 *
	 * @param ctx
	 * @param body
	 */
	italic(ctx: TransformCtx, body: any[]): any;
	/**
	 * Handler for `<kbd>`-wrapped keyboard shortcuts content
	 * @param ctx
	 * @param key
	 */
	kbd(ctx: TransformCtx, key: string): any;
	/**
	 * Handler for `[label](target)`-style links.
	 *
	 * @param ctx
	 * @param target
	 * @param title
	 * @param body
	 */
	link(
		ctx: TransformCtx,
		target: string,
		title: string | undefined,
		body: any[]
	): any;
	/**
	 * Handler for `[label][id]`-style links.
	 *
	 * @remarks
	 * Important: The actual link target might not yet be defined/known when
	 * this handler is called. Therefore some form of late-binding /
	 * lazy-resolution mechanism needs to be employed. Handlers can check the
	 * {@link TransformCtx.linkRefs} object if an entry for the given link
	 * ID is already defined. The assumption is that once the entire document
	 * has been parsed, all link refs will be known too.
	 *
	 * @param ctx
	 * @param refID
	 * @param body
	 */
	linkRef(ctx: TransformCtx, refID: string, body: any[]): any;
	/**
	 * Handler to transform/parse raw metadata into possibly more structured
	 * form.
	 *
	 * @param ctx
	 * @param body
	 */
	meta(ctx: TransformCtx, body: string): any;
	/**
	 * Handler for an ordered list wrapper.
	 *
	 * @param ctx
	 * @param items
	 * @param meta
	 */
	ol(ctx: TransformCtx, items: any[], meta?: any): any;
	/**
	 * Handler for a single list item in an ordered list. The `index` arg is the
	 * parsed integer index specified in the MD source code for that item.
	 *
	 * @remarks
	 * If the `attribs` object has a `__todo` attrib, the item is a task list
	 * item and `__done` indicates its state.
	 *
	 * @param ctx
	 * @param attribs
	 * @param index
	 * @param body
	 */
	olitem(
		ctx: TransformCtx,
		attribs: TodoAttribs,
		index: number,
		...body: any[]
	): any;
	/**
	 * Handler for a paragraph of body content.
	 *
	 * @param ctx
	 * @param body
	 * @param meta
	 */
	para(ctx: TransformCtx, body: any[], meta?: any): any;
	/**
	 * Handler for `~~`-wrapped body content.
	 *
	 * @param ctx
	 * @param body
	 */
	strike(ctx: TransformCtx, body: any[]): any;
	/**
	 * Handler for a table container.
	 *
	 * @param ctx
	 * @param align
	 * @param head
	 * @param rows
	 * @param meta
	 */
	table(
		ctx: TransformCtx,
		align: ColumnAlign[],
		head: any[],
		rows: any[],
		meta?: any
	): any;
	/**
	 * Handler for a single table cell in a non-header row.
	 *
	 * @param ctx
	 * @param body
	 */
	tableCell(ctx: TransformCtx, body: any[]): any;
	/**
	 * Handler for a single table cell in the header row.
	 *
	 * @param ctx
	 * @param body
	 */
	tableHead(ctx: TransformCtx, body: any[]): any;
	/**
	 * Handler for a single table row. The header row will have `index=0`.
	 *
	 * @param ctx
	 * @param body
	 */
	tableRow(ctx: TransformCtx, index: number, cells: any[]): any;
	/**
	 * Handler for an unordered list wrapper.
	 *
	 * @param ctx
	 * @param items
	 * @param meta
	 */
	ul(ctx: TransformCtx, items: any[], meta?: any): any;
	/**
	 * Handler for a single list item in an unordered list.
	 *
	 * @remarks
	 * If the `attribs` object has a `__todo` attrib, the item is a task list
	 * item and `__done` indicates its state.
	 *
	 * @param ctx
	 * @param attribs
	 * @param body
	 */
	ulitem(ctx: TransformCtx, attribs: TodoAttribs, ...body: any[]): any;
	/**
	 * Handler for `[[page name]]` or `[[page name|label]]-style links.
	 *
	 * @param ctx
	 * @param id
	 * @param label
	 */
	wikiref(ctx: TransformCtx, id: string, label?: string): any;
}

/**
 * State object used to manage & customize the transformation of raw parser
 * results.
 */
export interface TransformCtx {
	logger?: ILogger;
	tags: TagTransforms;
	linkRefs: IObjectOf<[string, string?]>;
	footnotes: IObjectOf<any>;
	headings: { level: number; body: any[] }[];
	hasFootnotes: boolean;
	meta?: any;
	row: number;
	opts: ParseOpts;
}

export interface ParseOpts {
	/**
	 * If true, automatically escapes some characters using HTML entities.
	 *
	 * @remarks
	 * Reference:
	 * - https://github.com/thi-ng/umbrella/blob/develop/packages/strings/src/entities.ts
	 *
	 * @defaultValue false
	 */
	escape: boolean;
	/**
	 * If true (default: false), retains the
	 * [`ParseState`](https://docs.thi.ng/umbrella/parse/interfaces/ParseState.html)
	 * for each tree node (useful for error messages/debugging).
	 *
	 * @remarks
	 * Regardless of this option being enabled, the final state of the parser
	 * can be obtained via the {@link ParseResult.state} property.
	 *
	 * @defaultValue false
	 */
	retain: boolean;
}

/**
 * Result type of {@link parse}.
 */
export interface ParseResult {
	/**
	 * Result array of parsed & transformed elements
	 */
	result: any[];
	/**
	 * The transform context used to transform the Markdown document (e.g. to
	 * obtain footnotes, headings, link references etc.)
	 */
	ctx: TransformCtx;
	/**
	 * True, if the entire document was transformed. False, if only parsing only
	 * succeeded partially.
	 */
	complete: boolean;
	/**
	 * Last location information (line, column, index position) of the parser.
	 * For partial results, this will be where further parsing failed.
	 */
	state: ParseState<string>;
}

export type TodoAttribs = Partial<{ __todo: true; __done: boolean }>;

export type ColumnAlign = "center" | "default" | "left" | "right";
