import { Predicate2 } from "@thi.ng/api/api";
import { ReadonlyAtom } from "@thi.ng/atom/api";

import { Stream } from "../stream";

/**
 * Yields stream of value changes in given atom / cursor. Attaches watch
 * to atom and checks for value changes with given `changed` predicate
 * (`!==` by default). If the predicate returns truthy result, the new
 * value is emitted on the stream. If `emitFirst` is true (default),
 * also emits atom's current value when first subscriber attaches to
 * stream.
 *
 * See:
 * - fromView()
 * - @thi.ng/atom
 *
 * ```
 * db = new Atom({a: 23, b: 88});
 * cursor = new Cursor(db, "a")
 *
 * rs.fromAtom(cursor).subscribe(rs.trace("cursor val:"))
 * // cursor val: 23
 *
 * cursor.reset(42);
 * // cursor val: 42
 *
 * db.reset({a: 66})
 * // cursor val: 66
 * ```
 *
 * @param atom
 * @param emitFirst
 * @param changed
 */
export function fromAtom<T>(atom: ReadonlyAtom<T>, emitFirst = true, changed?: Predicate2<T>): Stream<T> {
    return new Stream<T>((stream) => {
        changed = changed || ((a, b) => a !== b);
        atom.addWatch(stream.id, (_, prev, curr) => {
            if (changed(prev, curr)) {
                stream.next(curr);
            }
        });
        emitFirst && stream.next(atom.deref());
        return () => atom.removeWatch(stream.id);
    });
}
