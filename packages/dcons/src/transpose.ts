import type { Predicate } from "@thi.ng/api";
import { illegalArgs } from "@thi.ng/errors";
import { ConsCell, DCons } from "./dcons";

/**
 * Self-organizing list using Swap-With-Neighbor (Transpose) strategy.
 *
 * @remarks
 * Reference:
 * - https://en.wikipedia.org/wiki/Self-organizing_list#Transpose_method
 */
export class DConsTranspose<T> extends DCons<T> {
    copy() {
        return new DConsTranspose<T>(this);
    }

    empty() {
        return new DConsTranspose<T>();
    }

    nth(n: number) {
        const cell = super.nthCell(n);
        return cell ? this.__swap(cell).value : undefined;
    }

    setNth(n: number, v: T) {
        const cell = this.nthCell(n);
        !cell && illegalArgs(`index out of bounds: ${n}`);
        cell!.value = v;
        this.__swap(cell!);
        return this;
    }

    setTail(value: T) {
        if (this.tail) {
            this.tail.value = value;
            this.__swap(this.tail);
            return this;
        }
        return this.cons(value);
    }

    find(value: T) {
        let cell = this.head;
        while (cell) {
            if (cell.value === value) {
                return this.__swap(cell);
            }
            cell = cell.next;
        }
    }

    findWith(fn: Predicate<T>) {
        let cell = this.head;
        while (cell) {
            if (fn(cell.value)) {
                return this.__swap(cell);
            }
            cell = cell.next;
        }
    }

    private __swap(cell: ConsCell<T>) {
        return cell.prev ? (this.swap(cell.prev, cell), cell.prev) : cell;
    }
}

/**
 * Functional syntax sugar for `new DConsTranspose(src?)`.
 *
 * @param src -
 */
export const defTranspose = <T>(src?: Iterable<T>) => new DConsTranspose(src);
