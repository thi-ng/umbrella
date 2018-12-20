import { implementsFunction } from "@thi.ng/checks/implements-function";
import { isFunction } from "@thi.ng/checks/is-function";
import { isNotStringAndIterable } from "@thi.ng/checks/is-not-string-iterable";
import { isString } from "@thi.ng/checks/is-string";
import { DEFAULT, defmulti, MultiFn3 } from "@thi.ng/defmulti";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { normalize } from "@thi.ng/hiccup/serialize";
import { repeat } from "@thi.ng/strings/repeat";
import { wrap } from "@thi.ng/strings/wrap";

export const serialize = (tree: any, ctx) =>
    _serialize(tree, ctx, { indent: 0, sep: "" });

const _serialize = (tree: any, ctx, state) => {
    if (tree == null) return "";
    if (Array.isArray(tree)) {
        if (!tree.length) {
            return "";
        }
        let tag = tree[0];
        if (isFunction(tag)) {
            return _serialize(tag.apply(null, [ctx, ...tree.slice(1)]), ctx, state);
        }
        if (implementsFunction(tag, "render")) {
            return _serialize(tag.render.apply(null, [ctx, ...tree.slice(1)]), ctx, state);
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
    state: any
) => {
    if (!iter) return "";
    const res = [];
    for (let i of iter) {
        res.push(_serialize(i, ctx, state));
    }
    return res.join(state.sep);
};

const header =
    (level) =>
        (el, ctx, state) =>
            repeat("#", level) + " " + body(el, ctx, state) + "\n\n";

const body = (el, ctx, state) =>
    serializeIter(el[2], ctx, state);

export const serializeElement: MultiFn3<any, any, any, string> = defmulti((el) => el[0]);
serializeElement.add(DEFAULT, body);
serializeElement.add("h1", header(1));
serializeElement.add("h2", header(2));
serializeElement.add("h3", header(3));
serializeElement.add("h4", header(4));
serializeElement.add("h5", header(5));
serializeElement.add("h6", header(6));

serializeElement.add("p", (el, ctx, state) =>
    `\n${body(el, ctx, state)}\n`
);

serializeElement.add("img", (el) =>
    `![${el[1].alt || ""}](${el[1].src})`
);

serializeElement.add("a", (el, ctx, state) =>
    `[${body(el, ctx, state)}](${el[1].href})`
);

serializeElement.add("em", (el, ctx, state) =>
    `_${body(el, ctx, state)}_`
);

serializeElement.add("strong", (el, ctx, state) =>
    `**${body(el, ctx, state)}**`
);

serializeElement.add("pre", (el, ctx, state) =>
    `\n\`\`\`${el[1].lang || ""}\n${body(el, ctx, { ...state, pre: true, sep: "\n" })}\n\`\`\`\n`
);

serializeElement.add("code", (el, ctx, state) =>
    state.pre ?
        el[2][0] :
        `\`${body(el, ctx, state)}\``
);

serializeElement.add("ul", (el, ctx, state) => {
    const cstate = {
        ...state,
        indent: state.indent + 4,
        sep: "\n"
    };
    return wrap(state.indent === 0 ? "\n" : "")(
        body(el, ctx, cstate)
    );
});

serializeElement.add("ol", (el, ctx, state) => {
    const cstate = {
        ...state,
        indent: state.indent + 4,
        id: 0,
        sep: "\n"
    };
    return wrap(state.indent === 0 ? "\n" : "")(
        body(el, ctx, cstate)
    );
});

serializeElement.add("li", (el, ctx, state) =>
    repeat(" ", state.indent - 4) +
    (state.id != null ? (++state.id) + "." : "-") +
    " " +
    body(el, ctx, { ...state, sep: "" })
);

serializeElement.add("blockquote", (el, ctx, state) =>
    `\n> ${body(el, ctx, state)}\n`
);

serializeElement.add("br", () => "\\\n");

serializeElement.add("hr", () => "\n---\n");
