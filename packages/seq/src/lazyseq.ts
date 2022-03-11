import type { Fn0, ISeq } from "@thi.ng/api";

/**
 * Returns a new lazily evaluated `ISeq` produced by given function
 * `fn`, which is only realized when values are requested. The function
 * is only called once (if at all) and its result cached.
 *
 * @example
 * ```ts
 * const rnd = () => lazyseq(() => cons(Math.random(), rnd()));
 * const a = rnd();
 *
 * a.first();
 * // 0.4421468479982633
 * a.next().first();
 * // 0.29578903713266524
 * ```
 *
 * @param fn - 
 */
export const lazyseq = <T>(fn: Fn0<ISeq<T> | undefined>): ISeq<T> => {
    let called = false;
    let seq: ISeq<T> | undefined;
    const ensure = () => {
        if (!called) {
            seq = fn();
            called = true;
        }
        return seq;
    };
    return {
        first() {
            return ensure() !== undefined ? seq!.first() : undefined;
        },
        next() {
            return ensure() !== undefined ? seq!.next() : undefined;
        },
    };
};
