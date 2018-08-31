import { isString } from "@thi.ng/checks/is-string";
import { HDOMOpts } from "@thi.ng/hdom/api";
import { diffElement } from "@thi.ng/hdom/diff";
import { hydrateDOM } from "@thi.ng/hdom/dom";
import { normalizeTree } from "@thi.ng/hdom/normalize";
import { Transducer } from "@thi.ng/transducers/api";
import { reducer } from "@thi.ng/transducers/reduce";
import { scan } from "@thi.ng/transducers/xform/scan";

/**
 * Side-effecting & stateful transducer which receives @thi.ng/hdom
 * component trees, diffs each against previous value and applies
 * required changes to browser DOM starting at given root element.
 *
 * By default, incoming values are first normalized using hdom's
 * `normalizeTree()` function and the given (optional) `ctx` object is
 * provided to all embedded component functions in the tree.
 *
 * If the `hydrate` option is given, the first received tree is only
 * used to inject event listeners and initialize components with
 * lifecycle `init()` methods and expects an otherwise identical,
 * pre-existing DOM. All succeeding trees are diffed then as usual.
 *
 * This transducer is primarily intended for @thi.ng/rstream dataflow
 * graph based applications, where it can be used as final leaf
 * subscription to reactively reflect UI changes back to the user,
 * without using the usual RAF update loop used by hdom by default. In
 * this setup, DOM updates will only be performed when the stream this
 * transducer is attached to emits new values (i.e. hdom component
 * trees).
 *
 * Please see here for further details:
 * https://github.com/thi-ng/umbrella/blob/master/packages/hdom/src/start.ts
 *
 * @param opts hdom options
 */
export const updateDOM = (opts?: Partial<HDOMOpts>): Transducer<any, any[]> => {
    opts = { root: "app", span: true, normalize: true, ...opts };
    const root = isString(opts.root) ?
        document.getElementById(opts.root) :
        opts.root;
    return scan<any, any[]>(
        reducer(
            () => [],
            (prev, curr) => {
                opts.normalize && (curr = normalizeTree(curr, opts.ctx, [0], opts.span));
                if (curr != null) {
                    if (opts.hydrate) {
                        hydrateDOM(root, curr);
                        opts.hydrate = false;
                    } else {
                        diffElement(root, prev, curr);
                    }
                    return curr;
                }
                return prev;
            }
        )
    );
};
