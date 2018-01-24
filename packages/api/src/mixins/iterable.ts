import { mixin } from "../mixin";

export function iterable(prop: PropertyKey) {
    return mixin({
        *[Symbol.iterator]() { yield* (this[prop]); },
    });
}
