export type Tuple<T, N extends number> = [T, ...T[]] & { length: N };

export type IterableTuple<T, N extends number> = Tuple<T, N> & Iterable<T>;
