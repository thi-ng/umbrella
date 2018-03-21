import { illegalArity } from "@thi.ng/api/error";

import { Reducer } from "./api";
import { isReduced, unreduced } from "./reduced";

export function reduce<A, B>(rfn: Reducer<A, B>, xs: Iterable<B>): A;
export function reduce<A, B>(rfn: Reducer<A, B>, acc: A, xs: Iterable<B>): A;
export function reduce<A, B>(...args: any[]): A {
    let acc: A, xs: Iterable<B>;
    switch (args.length) {
        case 3:
            xs = args[2];
            acc = args[1];
            break;
        case 2:
            xs = args[1];
            break;
        default:
            illegalArity(args.length);
    }
    const [init, complete, reduce] = args[0];
    acc = acc == null ? init() : acc;
    for (let x of xs) {
        acc = <any>reduce(acc, x);
        if (isReduced(acc)) {
            acc = (<any>acc).deref();
            break;
        }
    }
    return unreduced(complete(acc));
}
