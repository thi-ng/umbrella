import {
    implementsFunction,
    isFunction,
    isNotStringAndIterable,
    isString
} from "@thi.ng/checks";
import { DEFAULT, defmulti, MultiFn3 } from "@thi.ng/defmulti";
import { illegalArgs } from "@thi.ng/errors";
import { normalize } from "@thi.ng/hiccup";
import { repeat, wrap } from "@thi.ng/strings";

interface SerializeState {
    indent: number;
    sep: string;
    id?: number;
    pre?: boolean;
}

export const serialize = (tree: any, ctx: any) =>
    _serialize(tree, ctx, { indent: 0, sep: "" });

const _serialize = (tree: any, ctx: any, state: SerializeState): string => {
    if (tree == null) return "";
    if (Array.isArray(tree)) {
        if (!tree.length) {
            return "";
        }
        let tag = tree[0];
        if (isFunction(tag)) {
            return _serialize(
                tag.apply(null, [ctx, ...tree.slice(1)]),
                ctx,
                state
            );
        }
        if (implementsFunction(tag, "render")) {
            return _serialize(
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
            return serializeIter(tree, ctx, state);
        }
        illegalArgs(`invalid tree node: ${tree}`);
    }
    if (isFunction(tree)) {
        return _serialize(tree(ctx), ctx, state);
    }
    if (implementsFunction(tree, "toHiccup")) {
        return _serialize(tree.toHiccup(ctx), ctx, state);
    }
    if (implementsFunction(tree, "deref")) {
        return _serialize(tree.deref(), ctx, state);
    }
    if (isNotStringAndIterable(tree)) {
        return serializeIter(tree, ctx, state);
    }
    return tree.toString();
};

const serializeIter = (
    iter: Iterable<any>,
    ctx: any,
    state: SerializeState
) => {
    if (!iter) return "";
    const res = [];
    for (let i of iter) {
        res.push(_serialize(i, ctx, state));
    }
    return res.join(state.sep);
};

const header = (level: number) => (
    el: any[],
    ctx: any,
    state: SerializeState
) => repeat("#", level) + " " + body(el, ctx, state) + "\n\n";

const body = (el: any[], ctx: any, state: SerializeState) =>
    serializeIter(el[2], ctx, state);

export const serializeElement: MultiFn3<
    any,
    any,
    SerializeState,
    string
> = defmulti((el) => el[0]);
serializeElement.add(DEFAULT, body);

serializeElement.addAll({
    h1: header(1),
    h2: header(2),
    h3: header(3),
    h4: header(4),
    h5: header(5),
    h6: header(6),

    p: (el, ctx, state) => `\n${body(el, ctx, state)}\n`,

    img: (el) => `![${el[1].alt || ""}](${el[1].src})`,

    a: (el, ctx, state) => `[${body(el, ctx, state)}](${el[1].href})`,

    em: (el, ctx, state) => `_${body(el, ctx, state)}_`,

    strong: (el, ctx, state) => `**${body(el, ctx, state)}**`,

    pre: (el, ctx, state) =>
        `\n\`\`\`${el[1].lang || ""}\n${body(el, ctx, {
            ...state,
            pre: true,
            sep: "\n"
        })}\n\`\`\`\n`,

    code: (el, ctx, state) =>
        state.pre ? el[2][0] : `\`${body(el, ctx, state)}\``,

    ul: (el, ctx, state) => {
        const cstate: SerializeState = {
            ...state,
            indent: state.indent + 4,
            sep: "\n"
        };
        return wrap(state.indent === 0 ? "\n" : "")(body(el, ctx, cstate));
    },

    ol: (el, ctx, state) => {
        const cstate: SerializeState = {
            ...state,
            indent: state.indent + 4,
            id: 0,
            sep: "\n"
        };
        return wrap(state.indent === 0 ? "\n" : "")(body(el, ctx, cstate));
    },

    li: (el, ctx, state) =>
        repeat(" ", state.indent - 4) +
        (state.id != null ? ++state.id + "." : "-") +
        " " +
        body(el, ctx, { ...state, sep: "" }),

    blockquote: (el, ctx, state) => `\n> ${body(el, ctx, state)}\n`,

    br: () => "\\\n",

    hr: () => "\n---\n"
});
