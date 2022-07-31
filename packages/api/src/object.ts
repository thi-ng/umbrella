/**
 * Generic plain object with all key values of given type.
 */
export interface IObjectOf<T> {
	[id: string]: T;
}
