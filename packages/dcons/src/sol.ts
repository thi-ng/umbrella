import type { Fn2, Predicate } from "@thi.ng/api";
import { outOfBounds } from "@thi.ng/errors/out-of-bounds";
import type { ConsCell } from "./api.js";
import { DCons } from "./dcons.js";

/**
 * Self-organization function/handler. Attempts to re-order given list cell and
 * returns cell containing original cell's value after re-ordering. E.g. in
 * transpose strategy the original cell's value will now be in predecessor.
 */
type SOFn<T> = Fn2<SOL<T>, ConsCell<T>, ConsCell<T>>;

/**
 * Self-organizing version of {@link DCons} using given re-ordering function.
 *
 * @remarks
 * The list will only be re-ordered upon execution of:
 *
 * - `nth()`
 * - `setNth()`
 * - `setTail()`
 * - `find()`
 * - `findWith()`
 *
 * Reference:
 * - https://en.wikipedia.org/wiki/Self-organizing_list
 */
export class SOL<T> extends DCons<T> {
    constructor(protected _reorder: SOFn<T>, src?: Iterable<T>) {
        super(src);
    }

    copy() {
        return new SOL<T>(this._reorder, this);
    }

    empty() {
        return new SOL<T>(this._reorder);
    }

    find(value: T) {
        const cell = super.find(value);
        return cell ? this._reorder(this, cell) : undefined;
    }

    findWith(fn: Predicate<T>) {
        const cell = super.findWith(fn);
        return cell ? this._reorder(this, cell) : undefined;
    }

    nth(n: number, notFound?: T) {
        const cell = super.nthCell(n);
        return cell ? this._reorder(this, cell).value : notFound;
    }

    setNth(n: number, v: T) {
        const cell = this.nthCell(n);
        !cell && outOfBounds(n);
        this._reorder(this, cell!).value = v;
        return cell;
    }

    setTail(value: T) {
        const cell = this._tail;
        if (cell) {
            cell.value = value;
            this._reorder(this, cell);
            return cell;
        }
        return this.prepend(value);
    }
}

/**
 * Creates self-organizing list using Move-To-Front strategy.
 *
 * @remarks
 * Reference:
 * - https://en.wikipedia.org/wiki/Self-organizing_list#Move_to_front_method_(MTF)
 */
export const defMTF = <T>(src?: Iterable<T>) =>
    new SOL((list, cell) => (list.asHead(cell), cell), src);

/**
 * Created self-organizing list using Swap-With-Neighbor (transpose) strategy.
 *
 * @remarks
 * Reference:
 * - https://en.wikipedia.org/wiki/Self-organizing_list#Transpose_method
 */
export const defTranspose = <T>(src?: Iterable<T>) =>
    new SOL(
        (list, cell) =>
            cell.prev ? (list.swap(cell.prev, cell), cell.prev) : cell,
        src
    );
