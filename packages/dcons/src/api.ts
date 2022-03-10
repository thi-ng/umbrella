export interface ConsCell<T> {
    value: T;
    next: ConsCell<T> | undefined;
    prev: ConsCell<T> | undefined;
}

export interface IList<T> {
    append(value: T): ConsCell<T>;
    prepend(value: T): ConsCell<T>;
    insertAfter(cell: ConsCell<T>, value: T): ConsCell<T>;
    insertBefore(cell: ConsCell<T>, value: T): ConsCell<T>;
}
