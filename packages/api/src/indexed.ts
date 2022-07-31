/**
 * Interface for collection types which can be accessed via numeric
 * index.
 */
export interface IIndexed<T> {
	nth(i: number, notfound: T): T;
}
