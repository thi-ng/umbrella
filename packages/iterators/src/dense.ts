import filter from "./filter";

export default function dense<T>(input: Iterable<T>) {
    return filter(x => x != null, input);
}
