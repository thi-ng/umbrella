import { filter } from "./filter";

export function dense<T>(input: Iterable<T>) {
    return filter(x => x != null, input);
}
