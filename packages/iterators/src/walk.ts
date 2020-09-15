import type { Fn } from "@thi.ng/api";
import { iterator, maybeIterator } from "./iterator";
import { maybeObjectIterator } from "./object-iterator";

export const walkable = (x: any) =>
    typeof x !== "string"
        ? maybeIterator(x) || maybeObjectIterator(x)
        : undefined;

export function walk(fn: Fn<any, void>, input: any, postOrder?: boolean): void;
export function walk(
    fn: Fn<any, void>,
    children: Fn<any, any>,
    input: any,
    postOrder?: boolean
): void;
export function walk(fn: Fn<any, void>, ...args: any[]) {
    let children: Fn<any, any>;
    let input: any;
    let postOrder: boolean;
    if (args.length === 3) {
        [children, input, postOrder] = args;
    } else if (args.length === 2 && typeof args[0] === "function") {
        [children, input] = args;
    } else {
        [input, postOrder] = args;
    }
    let inner = (iter: Iterator<any>) => {
        let v: IteratorResult<any>;
        while (((v = iter.next()), !v.done)) {
            if (!postOrder) {
                fn(v.value);
            }
            let cvals;
            if (children) {
                cvals = children(v.value);
            } else {
                cvals = v.value;
            }
            if ((cvals = walkable(cvals)) !== undefined) {
                inner(cvals);
            }
            if (postOrder) {
                fn(v.value);
            }
        }
    };
    inner(iterator([input]));
}

export function walkIterator(
    input: any,
    postOrder?: boolean
): IterableIterator<any>;
export function walkIterator(
    input: any,
    children: Fn<any, any>,
    postOrder?: boolean
): IterableIterator<any>;
export function walkIterator(input: any, ...args: any[]) {
    let children: Fn<any, any>;
    let postOrder: boolean;
    if (args.length === 2) {
        [children, postOrder] = args;
    } else if (typeof args[0] === "function") {
        children = args[0];
    } else {
        postOrder = args[0];
    }
    let walk = function* (iter: Iterator<any>): IterableIterator<any> {
        let v: IteratorResult<any>;
        while (((v = iter.next()), !v.done)) {
            if (!postOrder) {
                yield v.value;
            }
            let cvals;
            if (children) {
                cvals = children(v.value);
            } else {
                cvals = v.value;
            }
            if ((cvals = walkable(cvals)) !== undefined) {
                yield* walk(cvals);
            }
            if (postOrder) {
                yield v.value;
            }
        }
    };
    return walk(iterator([input]));
}
