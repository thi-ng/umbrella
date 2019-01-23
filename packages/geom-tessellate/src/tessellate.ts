import { isFunction } from "@thi.ng/checks";
import {
    last,
    mapcat,
    push,
    reducer,
    repeat,
    scan,
    transduce
} from "@thi.ng/transducers";
import { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { Tessellator } from "./api";

export function tessellate(points: ReadonlyVec[], tessFn: Tessellator, iter?: number): Vec[][];
export function tessellate(points: ReadonlyVec[], tessFns: Iterable<Tessellator>): Vec[][];
export function tessellate(...args): Vec[][] {
    return transduce(
        scan(
            reducer(
                () => [args[0]],
                (acc: Vec[][], fn: Tessellator) =>
                    transduce(
                        mapcat(fn),
                        push(),
                        acc
                    )
            )
        ),
        last(),
        isFunction(args[1]) ?
            repeat(args[1], args[2] || 1) :
            args[1]
    );
}
