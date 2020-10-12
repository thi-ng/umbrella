import type { Predicate } from "@thi.ng/api";
import { illegalArgs } from "@thi.ng/errors";
import { DCons } from "./dcons";

/**
 * Self-organizing list using Move-To-Front strategy.
 *
 * @remarks
 * Reference:
 * - https://en.wikipedia.org/wiki/Self-organizing_list#Move_to_front_method_(MTF)
 */
export class DConsMTF<T> extends DCons<T> {
    copy() {
        return new DConsMTF<T>(this);
    }

    empty() {
        return new DConsMTF<T>();
    }

    nth(n: number) {
        const cell = super.nthCell(n);
        if (cell !== undefined) {
            this.asHead(cell);
            return cell.value;
        }
    }

    setNth(n: number, v: T) {
        const cell = this.nthCell(n);
        !cell && illegalArgs(`index out of bounds: ${n}`);
        cell!.value = v;
        this.asHead(cell!);
        return this;
    }

    setTail(value: T) {
        if (this.tail) {
            this.tail.value = value;
            return this.asHead(this.tail);
        }
        return this.cons(value);
    }

    find(value: T) {
        let cell = this.head;
        while (cell) {
            if (cell.value === value) {
                this.asHead(cell);
                return cell;
            }
            cell = cell.next;
        }
    }

    findWith(fn: Predicate<T>) {
        let cell = this.head;
        while (cell) {
            if (fn(cell.value)) {
                this.asHead(cell);
                return cell;
            }
            cell = cell.next;
        }
    }
}

/**
 * Functional syntax sugar for `new DConsMTF(src?)`.
 *
 * @param src -
 */
export const defMTF = <T>(src?: Iterable<T>) => new DConsMTF(src);
