import { default as iterator, maybeIterator } from "./iterator";
import { maybeObjectIterator } from "./object-iterator";

export function walkable(x) {
    return typeof x !== "string" ? maybeIterator(x) || maybeObjectIterator(x) : undefined;
}

export default function walk(fn: (x: any) => void, input: Iterable<any>, postOrder = false) {
    let inner = (iter) => {
        let v: IteratorResult<any>,
            node;
        while (((v = iter.next()), !v.done)) {
            if (!postOrder) { fn(v.value); }
            if ((node = walkable(v.value)) !== undefined) {
                inner(node);
            }
            if (postOrder) { fn(v.value); }
        }
    };
    inner(iterator([input]));
}

export function walkIterator(input: Iterable<any>, postOrder = false) {
    let walk = function* (iter) {
        let v: IteratorResult<any>,
            node;
        while (((v = iter.next()), !v.done)) {
            if (!postOrder) { yield v.value; }
            if ((node = walkable(v.value)) !== undefined) {
                yield* walk(node);
            }
            if (postOrder) { yield v.value; }
        }
    };
    return walk(iterator([input]));
}
