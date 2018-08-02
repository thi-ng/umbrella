import { isString } from "@thi.ng/checks/is-string";
import { diffElement } from "@thi.ng/hdom/diff";
import { normalizeTree } from "@thi.ng/hdom/normalize";
import { Transducer } from "@thi.ng/transducers/api";
import { reducer } from "@thi.ng/transducers/reduce";
import { scan } from "@thi.ng/transducers/xform/scan";

/**
 * Side-effecting & stateful transducer which receives @thi.ng/hdom
 * component trees, diffs each against previous value and applies
 * required changes to browser DOM starting at given root element. By
 * default, incoming values are first normalized using hdom's
 * `normalizeTree()` function.
 *
 * This transducer is primarily intended for @thi.ng/rstream dataflow
 * graph based applications, where this transducer can be used as final
 * leaf subscription to reactively reflect UI changes back to the user,
 * without using the standard RAF update loop used by hdom by default.
 * In this setup, UI updates will only be performed if the stream this
 * transducer is attached too receives new values (i.e. hdom component
 * trees).
 *
 * @param el
 * @param normalize
 */
export const updateUI = (el: string | Element, normalize = true): Transducer<any, any[]> => {
    const root = isString(el) ? document.getElementById(el) : el;
    return scan<any, any[]>(
        reducer(
            () => [],
            (prev, curr) => {
                normalize && (curr = normalizeTree(curr, {}));
                diffElement(root, prev, curr);
                return curr;
            }
        )
    );
};
