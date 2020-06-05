import { assert, NO_OP } from "@thi.ng/api";
import { isArray, isNotStringAndIterable } from "@thi.ng/checks";
import { diffArray, DiffMode } from "@thi.ng/diff";
import { equiv, HDOMImplementation, HDOMOpts, releaseTree } from "@thi.ng/hdom";
import { draw } from "@thi.ng/hiccup-canvas";

const FN = "function";
const STR = "string";

/**
 * Special HTML5 canvas component which injects a branch-local hdom
 * implementation for virtual SVG-like shape components / elements.
 * These elements are then translated into canvas draw commands during
 * the hdom update process.
 *
 * The canvas component automatically adjusts its size for HDPI displays
 * by adding CSS `width` & `height` properties and pre-scaling the
 * drawing context accordingly before shapes are processed.
 *
 * Shape components are expressed in standard hiccup syntax, however
 * with the following restrictions:
 *
 * - Shape component objects with life cycle methods are only partially
 *   supported, i.e. only the {@link @thi.ng/hdom#ILifecycle.render} &
 *   {@link @thi.ng/hdom#ILifecycle.release} methods are used (Note, for
 *   performance reasons `release` methods are ignored by default. If
 *   your shape tree contains stateful components which use the
 *   `release` life cycle method, you'll need to explicitly enable the
 *   canvas component's `__release` attribute by setting it to `true`).
 * - Currently no event listeners can be assigned to shapes (ignored),
 *   though this is planned for a future version. The canvas element
 *   itself can of course have event handlers as usual.
 *
 * All embedded component functions receive the user context object just
 * like normal hdom components.
 *
 * For best performance, it's recommended to ensure all resulting shapes
 * elements are provided in already normalized hiccup format (i.e.
 * `[tag, {attribs}, ...]`). That way the `__normalize: false` control
 * attribute can be added either to the canvas component itself (or to
 * individual shapes / groups), and if present, will skip normalization
 * of all children.
 *
 * @param _ - hdom user context (ignored)
 * @param attribs - canvas attribs
 * @param shapes - shape components
 */
export const canvas = {
    render(_: any, attribs: any, ...body: any[]) {
        const cattribs = { ...attribs };
        delete cattribs.__diff;
        delete cattribs.__normalize;
        const dpr = window.devicePixelRatio || 1;
        if (dpr !== 1) {
            !cattribs.style && (cattribs.style = {});
            cattribs.style.width = `${cattribs.width}px`;
            cattribs.style.height = `${cattribs.height}px`;
            cattribs.width *= dpr;
            cattribs.height *= dpr;
        }
        return [
            "canvas",
            cattribs,
            [
                "g",
                {
                    __impl: IMPL,
                    __diff: attribs.__diff !== false,
                    __normalize: attribs.__normalize !== false,
                    __release: attribs.__release === true,
                    __serialize: false,
                    __clear: attribs.__clear,
                    scale: dpr !== 1 ? dpr : null,
                },
                ...body,
            ],
        ];
    },
};

/** @internal */
export const createTree = (
    _: Partial<HDOMOpts>,
    canvas: HTMLCanvasElement,
    tree: any
) => {
    // console.log(Date.now(), "draw");
    const ctx = canvas.getContext("2d");
    assert(!!ctx, "canvas ctx unavailable");
    const attribs = tree[1];
    if (attribs) {
        if (attribs.__skip) return;
        if (attribs.__clear !== false) {
            ctx!.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    draw(ctx!, tree);
};

/** @internal */
export const normalizeTree = (opts: Partial<HDOMOpts>, tree: any): any => {
    if (tree == null) {
        return tree;
    }
    if (isArray(tree)) {
        const tag = tree[0];
        if (typeof tag === FN) {
            return normalizeTree(
                opts,
                tag.apply(null, [opts.ctx, ...tree.slice(1)])
            );
        }
        if (typeof tag === STR) {
            const attribs = tree[1];
            if (attribs && attribs.__normalize === false) {
                return tree;
            }
            const res = [tree[0], attribs];
            for (let i = 2, n = tree.length; i < n; i++) {
                const n = normalizeTree(opts, tree[i]);
                n != null && res.push(n);
            }
            return res;
        }
    } else if (typeof tree === FN) {
        return normalizeTree(opts, tree(opts.ctx));
    } else if (typeof tree.toHiccup === FN) {
        return normalizeTree(opts, tree.toHiccup(opts.ctx));
    } else if (typeof tree.deref === FN) {
        return normalizeTree(opts, tree.deref());
    } else if (isNotStringAndIterable(tree)) {
        const res = [];
        for (let t of tree) {
            const n = normalizeTree(opts, t);
            n != null && res.push(n);
        }
        return res;
    }
    return tree;
};

/** @internal */
export const diffTree = (
    opts: Partial<HDOMOpts>,
    parent: HTMLCanvasElement,
    prev: any[],
    curr: any[],
    child: number
) => {
    const attribs = curr[1];
    if (attribs.__skip) return;
    if (attribs.__diff === false) {
        releaseTree(prev);
        return createTree(opts, parent, curr);
    }
    // delegate to branch-local implementation
    let impl: HDOMImplementation<any> = attribs.__impl;
    if (impl && impl !== IMPL) {
        return impl.diffTree(opts, parent, prev, curr, child);
    }
    const delta = diffArray(prev, curr, DiffMode.ONLY_DISTANCE, equiv);
    if (delta.distance > 0) {
        return createTree(opts, parent, curr);
    }
};

export const IMPL: HDOMImplementation<any> = {
    createTree,
    normalizeTree,
    diffTree,
    hydrateTree: NO_OP,
    getElementById: NO_OP,
    createElement: NO_OP,
    createTextElement: NO_OP,
    replaceChild: NO_OP,
    getChild: NO_OP,
    removeAttribs: NO_OP,
    removeChild: NO_OP,
    setAttrib: NO_OP,
    setContent: NO_OP,
};
