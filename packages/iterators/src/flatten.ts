import { flattenWith } from "./flatten-with";
import { maybeIterator } from "./iterator";
import { maybeObjectIterator } from "./object-iterator";

export const flatten = (input: Iterable<any>, includeObjects = true) =>
    flattenWith(
        (x) =>
            (typeof x !== "string" &&
                (maybeIterator(x) ||
                    (includeObjects && maybeObjectIterator(x)))) ||
            undefined,
        input
    );
