import { View } from "@thi.ng/atom";
import { Stream } from "../stream";
import { optsWithID } from "../utils/idgen";
import type {
    DeepPath,
    Fn,
    Path,
    Path0,
    Path1,
    Path2,
    Path3,
    Path4,
    Path5,
    Path6,
    Path7,
    Path8,
    PathVal1,
    PathVal2,
    PathVal3,
    PathVal4,
    PathVal5,
    PathVal6,
    PathVal7,
    PathVal8,
    Predicate2,
} from "@thi.ng/api";
import type { ReadonlyAtom } from "@thi.ng/atom";
import type { CommonOpts } from "../api";

export interface FromViewOpts<P, A, B> extends Partial<CommonOpts> {
    path: P;
    tx?: Fn<A, B>;
    equiv?: Predicate2<A>;
}

export type FromViewUnsafeOpts<T> = FromViewOpts<Path, any, T>;

/**
 * Similar to {@link fromAtom}, but creates an eager derived view for a
 * nested value in atom / cursor and yields stream of its value changes.
 *
 * @remarks
 * Views are readonly and more lightweight versions of
 * {@link @thi.ng/atom#Cursor | cursors}. The view checks for value
 * changes with given `equiv` predicate (default:
 * {@link @thi.ng/equiv#equiv}). If the predicate returns a falsy result
 * (i.e. the new value), the new value is emitted on the stream. The
 * first value emitted is always the (possibly transformed) current
 * value at the stream's start time (i.e. when the first subscriber
 * attaches).
 *
 * If the `tx` option is given, the raw value is first passed to this
 * transformer function and its result emitted on the stream instead.
 *
 * When the stream is cancelled the view is destroyed as well.
 *
 * Also see {@link @thi.ng/atom#defView}, {@link @thi.ng/atom#defViewUnsafe}
 *
 * @example
 * ```ts
 * const db = defAtom<any>({ a: 1, b: { c: 2 }});
 *
 * fromViewUnsafe(
 *   db,
 *   {
 *     path: "b.c",
 *     tx: (x) => x != null ? String(x) : "n/a"
 *   }
 * ).subscribe(trace("view:"))
 * // view: 2
 *
 * db.swapIn(["b","c"], (x: number) => x + 1);
 * // view: 3
 *
 * db.reset({ a: 10 });
 * // view: n/a
 * ```
 *
 * @param atom -
 * @param opts -
 */
export const fromViewUnsafe = <T>(
    atom: ReadonlyAtom<any>,
    opts: FromViewUnsafeOpts<T>
): Stream<T extends undefined ? any : T> => fromView(atom, <any>opts);

/**
 * Type checked version of {@link fromViewUnsafe}. Only the first 8 path
 * levels are type checked.
 *
 * @remarks
 * Stream value type is inferred from target path or (if given), the
 * result type of the optional view transformer (`tx` option).
 *
 * Also see {@link @thi.ng/atom#defView},
 * {@link @thi.ng/atom#defViewUnsafe}
 *
 * @param parent -
 * @param opts -
 */
export function fromView<T, R = undefined>(
    parent: ReadonlyAtom<T>,
    opts: FromViewOpts<Path0, T, R>
): Stream<R extends undefined ? T : R>;
export function fromView<T, A, R = undefined>(
    parent: ReadonlyAtom<T>,
    opts: FromViewOpts<Path1<T, A>, PathVal1<T, A>, R>
): Stream<R extends undefined ? PathVal1<T, A> : R>;
export function fromView<T, A, B, R = undefined>(
    parent: ReadonlyAtom<T>,
    opts: FromViewOpts<Path2<T, A, B>, PathVal2<T, A, B>, R>
): Stream<R extends undefined ? PathVal2<T, A, B> : R>;
export function fromView<T, A, B, C, R = undefined>(
    parent: ReadonlyAtom<T>,
    opts: FromViewOpts<Path3<T, A, B, C>, PathVal3<T, A, B, C>, R>
): Stream<R extends undefined ? PathVal3<T, A, B, C> : R>;
export function fromView<T, A, B, C, D, R = undefined>(
    parent: ReadonlyAtom<T>,
    opts: FromViewOpts<Path4<T, A, B, C, D>, PathVal4<T, A, B, C, D>, R>
): Stream<R extends undefined ? PathVal4<T, A, B, C, D> : R>;
export function fromView<T, A, B, C, D, E, R = undefined>(
    parent: ReadonlyAtom<T>,
    opts: FromViewOpts<Path5<T, A, B, C, D, E>, PathVal5<T, A, B, C, D, E>, R>
): Stream<R extends undefined ? PathVal5<T, A, B, C, D, E> : R>;
export function fromView<T, A, B, C, D, E, F, R = undefined>(
    parent: ReadonlyAtom<T>,
    opts: FromViewOpts<
        Path6<T, A, B, C, D, E, F>,
        PathVal6<T, A, B, C, D, E, F>,
        R
    >
): Stream<R extends undefined ? PathVal6<T, A, B, C, D, E, F> : R>;
export function fromView<T, A, B, C, D, E, F, G, R = undefined>(
    parent: ReadonlyAtom<T>,
    opts: FromViewOpts<
        Path7<T, A, B, C, D, E, F, G>,
        PathVal7<T, A, B, C, D, E, F, G>,
        R
    >
): Stream<R extends undefined ? PathVal7<T, A, B, C, D, E, F, G> : R>;
export function fromView<T, A, B, C, D, E, F, G, H, R = undefined>(
    parent: ReadonlyAtom<T>,
    opts: FromViewOpts<
        Path8<T, A, B, C, D, E, F, G, H>,
        PathVal8<T, A, B, C, D, E, F, G, H>,
        R
    >
): Stream<R extends undefined ? PathVal8<T, A, B, C, D, E, F, G, H> : R>;
export function fromView<T, A, B, C, D, E, F, G, H, R = undefined>(
    parent: ReadonlyAtom<T>,
    opts: FromViewOpts<DeepPath<T, A, B, C, D, E, F, G, H>, any, R>
): Stream<R extends undefined ? any : R>;
export function fromView(
    atom: ReadonlyAtom<any>,
    opts: FromViewOpts<Path, any, any>
): Stream<any> {
    opts = <FromViewUnsafeOpts<any>>optsWithID("view", opts);
    return new Stream((stream) => {
        let isActive = true;
        const tx = opts.tx;
        const view = new View(
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
}
