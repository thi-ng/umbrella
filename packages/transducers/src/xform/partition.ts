import { Reducer, Transducer } from "../api";

export function partition<T>(size: number): Transducer<T, T[]>;
export function partition<T>(size: number, all: boolean): Transducer<T, T[]>;
export function partition<T>(size: number, step: number): Transducer<T, T[]>
export function partition<T>(size: number, step: number, all: boolean): Transducer<T, T[]>
export function partition<T>(...args: any[]): Transducer<T, T[]> {
    let size = args[0], all, step;
    if (typeof args[1] == "number") {
        step = args[1];
        all = args[2];
    } else {
        step = size;
        all = args[1];
    }
    return ([init, complete, reduce]: Reducer<any, T[]>) => {
        let buf: T[] = [];
        let skip = 0;
        return [
            init,
            (acc) => {
                if (all && buf.length > 0) {
                    acc = reduce(acc, buf);
                    buf = [];
                }
                return complete(acc);
            },
            (acc, x) => {
                if (skip <= 0) {
                    if (buf.length < size) {
                        buf.push(x);
                    }
                    if (buf.length === size) {
                        acc = reduce(acc, buf);
                        buf = step < size ? buf.slice(step) : [];
                        skip = step - size;
                    }
                } else {
                    skip--;
                }
                return acc;
            }];
    };
}
