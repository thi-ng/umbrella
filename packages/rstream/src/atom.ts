import type { Predicate2 } from "@thi.ng/api";
import type { ReadonlyAtom } from "@thi.ng/atom";
import type { CommonOpts } from "./api.js";
import { __optsWithID } from "./idgen.js";
import { stream } from "./stream.js";

export interface FromAtomOpts<T> extends CommonOpts {
	/**
	 * True, if the current atom value should be emitted when the stream
	 * activates.
	 *
	 * @defaultValue true
	 */
	emitFirst: boolean;
	/**
	 * User predicate to determine value changes in atom. New values are
	 * only emitted on stream if the predicate returns true.
	 *
	 * @defaultValue `!==`
	 */
	changed: Predicate2<T>;
}

/**
 * Yields {@link Stream} of value changes in given [Atom-like state
 * container](https://thi.ng/atom).
 *
 * @remarks
 * [Attaches a
 * watch](https://docs.thi.ng/umbrella/api/interfaces/IWatch.html#addWatch) to
 * the atom and checks for value changes with given `changed` predicate (`!==`
 * by default). If the predicate returns truthy result, the new value is emitted
 * on the stream. If `emitFirst` is true (default), also emits atom's current
 * value when first subscriber attaches to stream.
 *
 * Also see {@link fromView}, {@link fromViewUnsafe}
 *
 * @example
 * ```ts
 * import { defAtom, defCursor } from "@thi.ng/atom";
 * import { fromCursor } from "@thi.ng/rstream";
 *
 * db = defAtom({ a: 23, b: 88 });
 * cursor = defCursor(db, "a")
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
 * @param atom -
 * @param opts -
 */
export const fromAtom = <T>(
	atom: ReadonlyAtom<T>,
	opts?: Partial<FromAtomOpts<T>>
) => {
	opts = __optsWithID("atom", <FromAtomOpts<T>>{
		emitFirst: true,
		changed: (a, b) => a !== b,
		...opts,
	});
	return stream<T>((stream) => {
		atom.addWatch(stream.id, (_, prev, curr) => {
			if (opts!.changed!(prev, curr)) {
				stream.next(curr);
			}
		});
		opts!.emitFirst && stream.next(atom.deref());
		return () => atom.removeWatch(stream.id);
	}, opts);
};
