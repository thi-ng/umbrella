import { Predicate2 } from "@thi.ng/api/api";
import { ReadonlyAtom, ViewTransform } from "@thi.ng/atom/api";
import { View } from "@thi.ng/atom/view";
import { Path } from "@thi.ng/paths";

import { Stream } from "../stream";

/**
 * Similar to `fromAtom()`, but creates an eager derived view for a
 * nested value in atom / cursor and yields stream of its value changes.
 * Views are readonly versions of Cursors and more lightweight. The view
 * checks for value changes with given `equiv` predicate
 * (`@thi.ng/equiv` by default). If the predicate returns a falsy
 * result, the new value is emitted on the stream. The first value
 * emitted is always the (possibly transformed) current value at the
 * stream's start time (i.e. when the first subscriber attaches).
 *
 * If the optional `tx` is given, the raw value is first passed to this
 * transformer function and its result emitted on the stream.
 *
 * When the stream is cancelled the view is destroyed as well.
 *
 * See:
 * - fromAtom()
 * - @thi.ng/atom
 *
 * ```
 * db = new Atom({a: 1, b: {c: 2}});
 *
 * fromView(db, "b.c", (x) => x != null ? x : "n/a").subscribe(trace("view:"))
 * // view: 2
 *
 * db.swapIn("b.c", (x: number) => x + 1);
 * // view: 3
 *
 * db.reset({a: 10});
 * // view: n/a
 * ```
 *
 * @param atom
 * @param path
 * @param tx
 * @param equiv
 * @param id
 */
export function fromView<T>(atom: ReadonlyAtom<any>, path: Path, tx?: ViewTransform<T>, equiv?: Predicate2<any>, id?: string): Stream<T> {
    return new Stream<T>((stream) => {
        let isActive = true;
        const view = new View<T>(
            atom,
            path,
            tx ?
                (x) => isActive && (x = tx(x), stream.next(x), x) :
                (x) => isActive && (stream.next(x), x),
            false,
            equiv
        );
        return () => (isActive = false, view.release());
    }, id);
}
