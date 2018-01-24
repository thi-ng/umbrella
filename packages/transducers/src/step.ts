import { Transducer } from "./api";
import { last } from "./rfn/last";

export function step<A, B>(tx: Transducer<A, B>): (x: A) => B {
    const rfn = tx(last())[2];
    return (x: A) => rfn(undefined, x);
}
