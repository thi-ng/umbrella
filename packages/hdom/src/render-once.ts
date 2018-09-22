import { isString } from "@thi.ng/checks/is-string";
import { HDOMImplementation, HDOMOpts } from "./api";
import { DEFAULT_IMPL } from "./default";

/**
 * One-off hdom tree conversion & target DOM application. Takes same
 * options as `start()`, but performs no diffing and only creates or
 * hydrates target once. The given tree is first normalized and not
 * further action will be taken, if the normalized result is `null` or
 * `undefined`.
 *
 * @param tree
 * @param opts
 * @param impl
 */
export const renderOnce = (tree: any, opts?: Partial<HDOMOpts>, impl: HDOMImplementation<any> = DEFAULT_IMPL) => {
    opts = { root: "app", ...opts };
    const root = isString(opts.root) ?
        document.getElementById(opts.root) :
        opts.root;
    tree = impl.normalizeTree(opts, tree);
    if (!tree) return;
    opts.hydrate ?
        impl.hydrateTree(opts, root, tree) :
        impl.createTree(opts, root, tree);
};
