import { ReadonlyAtom } from "@thi.ng/atom/api";
import { Stream } from "../stream";

/**
 * Yields stream of value changes in given atom / cursor.
 * Attaches watch to atom and compares values with `===`.
 * If `emitFirst` is true (default), also emits atom's
 * current value when first subscriber attaches to stream.
 *
 * See: @thi.ng/atom
 *
 * ```
 * db = new Atom({a: 23, b: 88});
 * cursor = new Cursor(db, (s) => s.a, (s, x)=> ({...s, a: x}))
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
 */
export function fromAtom<T>(atom: ReadonlyAtom<T>, emitFirst = true): Stream<T> {
    return new Stream<T>((stream) => {
        atom.addWatch(stream.id, (_, prev, curr) => {
            if (curr !== prev) {
                stream.next(curr);
            }
        });
        emitFirst && stream.next(atom.deref());
        return () => atom.removeWatch(stream.id);
    });
}
