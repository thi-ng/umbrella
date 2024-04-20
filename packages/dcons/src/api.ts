import type { Maybe } from "@thi.ng/api";

export interface ConsCell<T> {
	value: T;
	next: Maybe<ConsCell<T>>;
	prev: Maybe<ConsCell<T>>;
}

export interface IList<T> {
	append(value: T): ConsCell<T>;
	prepend(value: T): ConsCell<T>;
	insertAfter(cell: ConsCell<T>, value: T): ConsCell<T>;
	insertBefore(cell: ConsCell<T>, value: T): ConsCell<T>;
}
