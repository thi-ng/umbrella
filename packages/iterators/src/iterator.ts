export default function iterator<T>(x: Iterable<T>) {
    return x[Symbol.iterator]();
}

export function maybeIterator(x: any) {
    return (x != null && x[Symbol.iterator] && x[Symbol.iterator]()) || undefined;
}
