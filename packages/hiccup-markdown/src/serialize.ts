import { implementsFunction } from "@thi.ng/checks/implements-function";
import { isFunction } from "@thi.ng/checks/is-function";
import { isNotStringAndIterable } from "@thi.ng/checks/is-not-string-iterable";
import { isString } from "@thi.ng/checks/is-string";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { normalize } from "@thi.ng/hiccup/normalize";
import { repeat } from "@thi.ng/strings/repeat";
import { wrap } from "@thi.ng/strings/wrap";
import { Border } from "@thi.ng/text-canvas/api";
import { formatCanvas } from "@thi.ng/text-canvas/format";
import { tableCanvas } from "@thi.ng/text-canvas/table";

interface SerializeState {
	indent: number;
	sep: string;
	id?: number;
	pre?: boolean;
	blockquote?: boolean;
}

export const serialize = (tree: any, ctx: any) =>
	__serialize(tree, ctx, { indent: 0, sep: "" })
		.replace(/\n{3,}/g, "\n\n")
		.trim();

const __serialize = (tree: any, ctx: any, state: SerializeState): string => {
	if (tree == null) return "";
	if (Array.isArray(tree)) {
		if (!tree.length) {
			return "";
		}
		let tag = tree[0];
		if (isFunction(tag)) {
			return __serialize(
				tag.apply(null, [ctx, ...tree.slice(1)]),
				ctx,
				state
			);
		}
		if (implementsFunction(tag, "render")) {
			return __serialize(
				tag.render.apply(null, [ctx, ...tree.slice(1)]),
				ctx,
				state
			);
		}
		if (isString(tag)) {
			tree = normalize(tree);
			const attribs = tree[1];
			if (attribs.__skip || attribs.__serialize === false) {
				return "";
			}
			tag = tree[0];
			return serializeElement(tree, ctx, state);
		}
		if (isNotStringAndIterable(tree)) {
			return __serializeIter(tree, ctx, state);
		}
		illegalArgs(`invalid tree node: ${tree}`);
	}
	if (isFunction(tree)) {
		return __serialize(tree(ctx), ctx, state);
	}
	if (implementsFunction(tree, "toHiccup")) {
		return __serialize(tree.toHiccup(ctx), ctx, state);
	}
	if (implementsFunction(tree, "deref")) {
		return __serialize(tree.deref(), ctx, state);
	}
	if (isNotStringAndIterable(tree)) {
		return __serializeIter(tree, ctx, state);
	}
	return tree.toString();
};

const __serializeIter = (
	iter: Iterable<any>,
	ctx: any,
	state: SerializeState
) => {
	if (!iter) return "";
	const res = [];
	for (let i of iter) {
		res.push(__serialize(i, ctx, state));
	}
	return res.join(state.sep);
};

const __heading =
	(level: number) => (el: any[], ctx: any, state: SerializeState) =>
		`\n${repeat("#", level)} ${__body(el, ctx, state)}\n`;

const __body = (el: any[], ctx: any, state: SerializeState) =>
	__serializeIter(el[2], ctx, state);

const __resolve = (x: any) => (isFunction(x) ? x() : x);

export const serializeElement = defmulti<any, any, SerializeState, string>(
	(el) => el[0],
	{
		th: "strong",
	},
	{
		[DEFAULT]: __body,
		h1: __heading(1),
		h2: __heading(2),
		h3: __heading(3),
		h4: __heading(4),
		h5: __heading(5),
		h6: __heading(6),

		p: (el, ctx, state) => `\n${__body(el, ctx, state)}\n`,

		img: (el) => `![${el[1].alt || ""}](${el[1].src})`,

		a: (el, ctx, state) => {
			let { href, title } = el[1];
			title = __resolve(title);
			return `[${__body(el, ctx, state)}](${__resolve(href)}${
				title ? ` "${title}"` : ""
			})`;
		},

		em: (el, ctx, state) => `_${__body(el, ctx, state)}_`,

		strong: (el, ctx, state) => `**${__body(el, ctx, state)}**`,

		pre: (el, ctx, state) =>
			`\n\`\`\`${el[1].lang || ""}\n${__body(el, ctx, {
				...state,
				pre: true,
				sep: "\n",
			})}\n\`\`\`\n`,

		code: (el, ctx, state) =>
			state.pre ? el[2][0] : `\`${__body(el, ctx, state)}\``,

		ul: (el, ctx, state) => {
			const cstate: SerializeState = {
				...state,
				indent: state.indent + 4,
				sep: "\n",
			};
			return wrap(state.indent === 0 ? "\n" : "")(
				__body(el, ctx, cstate)
			);
		},

		ol: (el, ctx, state) => {
			const cstate: SerializeState = {
				...state,
				indent: state.indent + 4,
				id: 0,
				sep: "\n",
			};
			return wrap(state.indent === 0 ? "\n" : "")(
				__body(el, ctx, cstate)
			);
		},

		li: (el, ctx, state) =>
			repeat(" ", state.indent - 4) +
			(state.id != null ? ++state.id + "." : "-") +
			" " +
			__body(el, ctx, { ...state, sep: "" }),

		blockquote: (el, ctx, state) =>
			`\n${repeat(">", state.indent + 1)} ${__body(el, ctx, {
				...state,
				indent: state.indent + 1,
				blockquote: true,
			})}\n`,

		br: (_, __, state) =>
			state.blockquote ? `\\\n${repeat(">", state.indent)} ` : "\\\n",

		hr: () => "\n---\n",

		table: (el, ctx, state) => {
			let caption = "";
			let thead: any[] = [];
			let tbody: any[] = [];
			let colWidths: number[] = [];

			const rows = (rows: any[]) =>
				rows.map((x: any) =>
					normalize(x)[2].map((td: any, i: number) => {
						const cell = serialize(td, ctx);
						colWidths[i] = Math.max(colWidths[i] || 3, cell.length);
						return cell;
					})
				);

			for (let child of el[2]) {
				child = normalize(child);
				switch (child[0]) {
					case "thead":
						thead = rows(child[2]);
						break;
					case "tbody":
						tbody = rows(child[2]);
						break;
					case "caption":
						caption = __body(child, ctx, state);
						break;
					default:
					// TODO output warning?
				}
			}
			return (
				"\n" +
				formatCanvas(
					tableCanvas(
						{
							cols: colWidths.map((width) => ({ width })),
							padding: [1, 0],
							border: Border.V,
						},
						[
							...thead,
							colWidths.map((w) => repeat("-", w)),
							...tbody,
						]
					)
				) +
				"\n" +
				caption +
				"\n"
			);
		},
	}
);
