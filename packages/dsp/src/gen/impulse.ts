import { AGen } from "./agen";

/**
 * Creates a new impulse gen, producing `on` for the first invocation of
 * {@link IGen.next}, then `off` thereafter.
 *
 * @param on - impulse value
 * @param off -
 */
export const impulse = <T>(on: T, off: T) => new Impulse<T>(on, off);

/**
 * Numeric version of {@link impulse}, using given `on` (default: 1) as
 * initial value and zero for the remaining values.
 *
 * @param on
 */
export const impulseN = (on = 1) => new Impulse(on, 0);

/**
 * Boolean version of {@link impulse}, using given `start` (default:
 * true) as initial value and its inverse for the remaining values.
 *
 * @param start
 */
export const impulseB = (start = true) => new Impulse(start, !start);

export class Impulse<T> extends AGen<T> {
    constructor(protected on: T, protected off: T) {
        super(on);
    }

    next() {
        const x = this.val;
        this.val = this.off;
        return x;
    }
}
