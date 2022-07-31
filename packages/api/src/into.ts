/**
 * Interface for collection types supporting addition of multiple
 * values.
 */
export interface IInto<V, T> {
	into(coll: Iterable<V>): T;
}
