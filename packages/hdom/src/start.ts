import { derefContext } from "@thi.ng/hiccup/deref";
import type { HDOMImplementation, HDOMOpts } from "./api.js";
import { DEFAULT_IMPL } from "./default.js";
import { resolveRoot } from "./resolve.js";

/**
 * Takes an hiccup tree (array, function or component object w/ life
 * cycle methods) and an optional object of DOM update options. Starts
 * RAF update loop, in each iteration first normalizing given tree, then
 * computing diff to previous frame's tree and applying any changes to
 * the real DOM. The `ctx` option can be used for passing arbitrary
 * config data or state down into the hiccup component tree. Any
 * embedded component function in the tree will receive this context
 * object (shallow copy) as first argument, as will life cycle methods
 * in component objects. If the `autoDerefKeys` option is given,
 * attempts to auto-expand/deref the given keys in the user supplied
 * context object (`ctx` option) prior to *each* tree normalization. All
 * of these values should implement the {@link @thi.ng/api#IDeref}
 * interface (e.g. atoms, cursors, views, rstreams etc.). This feature
 * can be used to define dynamic contexts linked to the main app state,
 * e.g. using derived views provided by {@link @thi.ng/atom# | @thi.ng/atom}.
 *
 * **Selective updates**: No updates will be applied if the given hiccup
 * tree is `undefined` or `null` or a root component function returns no
 * value. This way a given root function can do some state handling of
 * its own and implement fail-fast checks to determine no DOM updates
 * are necessary, save effort re-creating a new hiccup tree and request
 * skipping DOM updates via this function. In this case, the previous
 * DOM tree is kept around until the root function returns a tree again,
 * which then is diffed and applied against the previous tree kept as
 * usual. Any number of frames may be skipped this way.
 *
 * **Important:** Unless the `hydrate` option is enabled, the parent
 * element given is assumed to have NO children at the time when
 * `start()` is called. Since hdom does NOT track the real DOM, the
 * resulting changes will result in potentially undefined behavior if
 * the parent element wasn't empty. Likewise, if `hydrate` is enabled,
 * it is assumed that an equivalent DOM (minus listeners) already exists
 * (i.e. generated via SSR) when `start()` is called. Any other
 * discrepancies between the pre-existing DOM and the hdom trees will
 * cause undefined behavior.
 *
 * Returns a function, which when called, immediately cancels the update
 * loop.
 *
 * @param tree - hiccup DOM tree
 * @param opts - options
 * @param impl - hdom target implementation
 */
export const start = (
    tree: any,
    opts: Partial<HDOMOpts> = {},
    impl: HDOMImplementation<any> = DEFAULT_IMPL
) => {
    const _opts = { root: "app", ...opts };
    let prev: any[] = [];
    let isActive = true;
    const root = resolveRoot(_opts.root, impl);
    const update = () => {
        if (isActive) {
            _opts.ctx = derefContext(opts.ctx, _opts.autoDerefKeys);
            const curr = impl.normalizeTree(_opts, tree);
            if (curr != null) {
                if (_opts.hydrate) {
                    impl.hydrateTree(_opts, root, curr);
                    _opts.hydrate = false;
                } else {
                    impl.diffTree(_opts, root, prev, curr);
                }
                prev = curr;
            }
            // check again in case one of the components called cancel
            isActive && requestAnimationFrame(update);
        }
    };
    requestAnimationFrame(update);
    return () => (isActive = false);
};
