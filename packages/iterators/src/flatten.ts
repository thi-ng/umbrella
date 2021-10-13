import { flattenWith } from "./flatten-with.js";
import { maybeIterator } from "./iterator.js";
import { maybeObjectIterator } from "./object-iterator.js";

export const flatten = (input: Iterable<any>, includeObjects = true) =>
    flattenWith(
        (x) =>
            (typeof x !== "string" &&
                (maybeIterator(x) ||
                    (includeObjects && maybeObjectIterator(x)))) ||
            undefined,
        input
    );
