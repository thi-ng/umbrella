import { View } from "@thi.ng/atom";
import { Stream } from "../stream";
import { optsWithID } from "../utils/idgen";
import type { Fn, Path, Predicate2 } from "@thi.ng/api";
import type { ReadonlyAtom } from "@thi.ng/atom";
import type { CommonOpts } from "../api";

export interface FromViewOpts<T> extends Partial<CommonOpts> {
    path: Path;
    tx?: Fn<any, T>;
    equiv?: Predicate2<any>;
}

/**
 * Similar to {@link fromAtom}, but creates an eager derived view for a
 * nested value in atom / cursor and yields stream of its value changes.
 *
 * @remarks
 * Views are readonly and more lightweight versions of
 * {@link @thi.ng/atom#Cursor | cursors}. The view checks for value
 * changes with given `equiv` predicate ({@link @thi.ng/equiv#equiv} by
 * default). If the predicate returns a falsy result, the new value is
 * emitted on the stream. The first value emitted is always the
 * (possibly transformed) current value at the stream's start time (i.e.
 * when the first subscriber attaches).
 *
 * If the `tx` option is given, the raw value is first passed to this
 * transformer function and its result emitted on the stream instead.
 *
 * When the stream is cancelled the view is destroyed as well.
 *
 * @example
 * ```ts
 * db = new Atom({ a: 1, b: { c: 2 }});
 *
 * fromView(
 *   db,
 *   {
 *     path: "b.c",
 *     tx: (x) => x != null ? x : "n/a"
 * }).subscribe(trace("view:"))
 * // view: 2
 *
 * db.swapIn("b.c", (x: number) => x + 1);
 * // view: 3
 *
 * db.reset({ a: 10 });
 * // view: n/a
 * ```
 *
 * @param atom -
 * @param opts -
 */
export const fromView = <T>(
    atom: ReadonlyAtom<any>,
    opts: FromViewOpts<T>
): Stream<T> => {
    opts = <FromViewOpts<T>>optsWithID("view", opts);
    return new Stream<T>((stream) => {
        let isActive = true;
        const tx = opts.tx;
        const view = new View<T>(
            atom,
            opts.path,
            tx
                ? (x) => isActive && ((x = tx(x)), stream.next(x), x)
                : (x) => isActive && (stream.next(x), x),
            false,
            opts.equiv
        );
        return () => {
            isActive = false;
            view.release();
        };
    });
};
