import { mixin } from "../mixin.js";

export const iterable = (prop: PropertyKey) =>
    mixin({
        *[Symbol.iterator]() {
            yield* this[prop];
        },
    });
