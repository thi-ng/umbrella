import flattenWith from "./flatten-with";
import { maybeIterator } from "./iterator";
import { maybeObjectIterator } from "./object-iterator";

export default function flatten(input: Iterable<any>, includeObjects = true) {
    return flattenWith(
        (x) =>
            (typeof x !== "string" &&
                (maybeIterator(x) ||
                    (includeObjects && maybeObjectIterator(x)))) ||
            undefined,
        input
    );
}
