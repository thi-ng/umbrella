import type { HDOMImplementation, HDOMOpts } from "@thi.ng/hdom";
import { DEFAULT_IMPL } from "@thi.ng/hdom/default";
import { resolveRoot } from "@thi.ng/hdom/resolve";
import { derefContext } from "@thi.ng/hiccup/deref";
import type { Transducer } from "@thi.ng/transducers";
import { scan } from "@thi.ng/transducers/scan";

/**
 * Side-effecting & stateful transducer which receives {@link
 * @thi.ng/hdom} component trees, diffs each against previous value and
 * applies required changes to browser DOM starting at given root
 * element.
 *
 * By default, incoming values are first normalized using hdom's
 * {@link @thi.ng/hdom#normalizeTree} function and a copy of the given
 * (optional) `ctx` object is provided to all embedded component
 * functions in the tree. If the `autoDerefKeys` option is given,
 * attempts to auto-expand/deref the given keys in the user supplied
 * context object (`ctx` option) prior to *each* tree normalization. All
 * of these values should implement the {@link @thi.ng/api#IDeref}
 * interface (e.g. atoms, cursors, views, rstreams etc.). This feature
 * can be used to define dynamic contexts linked to the main app state,
 * e.g. using derived views provided by {@link @thi.ng/atom# | @thi.ng/atom}.
 *
 * If the `hydrate` option is given, the first received tree is only
 * used to inject event listeners and initialize components with
 * lifecycle {@link @thi.ng/hdom#ILifecycle.init} methods and expects an
 * otherwise identical, pre-existing DOM. All succeeding trees are
 * diffed then as usual.
 *
 * This transducer is primarily intended for {@link @thi.ng/rstream# | @thi.ng/rstream}
 * dataflow graph based applications, where it can be used as final leaf
 * subscription to reactively reflect UI changes back to the user,
 * without using the usual RAF update loop used by hdom by default. In
 * this setup, DOM updates will only be performed when the stream this
 * transducer is attached to emits new values (i.e. hdom component
 * trees).
 *
 * Please see here for further details:
 * {@link @thi.ng/hdom#start}
 *
 * @param opts - hdom options
 */
export const updateDOM = (
    opts: Partial<HDOMOpts> = {},
    impl: HDOMImplementation<any> = DEFAULT_IMPL
): Transducer<any, any[]> => {
    const _opts = { root: "app", ...opts };
    const root = resolveRoot(_opts.root, impl);
    return scan<any, any[]>([
        () => [],
        (acc) => acc,
        (prev, curr) => {
            _opts.ctx = derefContext(opts.ctx, _opts.autoDerefKeys);
            curr = impl.normalizeTree(_opts, curr);
            if (curr != null) {
                if (_opts.hydrate) {
                    impl.hydrateTree(_opts, root, curr);
                    _opts.hydrate = false;
                } else {
                    impl.diffTree(_opts, root, prev, curr, 0);
                }
                return curr;
            }
            return prev;
        },
    ]);
};
