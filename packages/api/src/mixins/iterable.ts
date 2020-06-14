import { mixin } from "../mixin";

export const iterable = (prop: PropertyKey) =>
    mixin({
        *[Symbol.iterator]() {
            yield* this[prop];
        },
    });
