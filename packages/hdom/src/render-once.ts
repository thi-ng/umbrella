import { derefContext } from "@thi.ng/hiccup/deref";
import type { HDOMImplementation, HDOMOpts } from "./api.js";
import { DEFAULT_IMPL } from "./default.js";
import { resolveRoot } from "./resolve.js";

/**
 * One-off hdom tree conversion & target DOM application. Takes same
 * options as {@link start}, but performs no diffing and only creates or
 * hydrates target once. The given tree is first normalized and if
 * result is `null` or `undefined` no further action will be taken.
 *
 * @param tree - component tree
 * @param opts - hdom config options
 * @param impl - hdom implementation
 */
export const renderOnce = (
    tree: any,
    opts: Partial<HDOMOpts> = {},
    impl: HDOMImplementation<any> = DEFAULT_IMPL
) => {
    opts = { root: "app", ...opts };
    opts.ctx = derefContext(opts.ctx, opts.autoDerefKeys);
    const root = resolveRoot(opts.root, impl);
    tree = impl.normalizeTree(opts, tree);
    if (!tree) return;
    opts.hydrate
        ? impl.hydrateTree(opts, root, tree)
        : impl.createTree(opts, root, tree);
};
