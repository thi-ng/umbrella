/**
 * Observer function for {@link IWatch} implementations.
 */
export type Watch<T> = (id: string, oldState: T, newState: T) => void;

/**
 * Interface for types offering observers of internal value changes.
 * Also see `@IWatch` decorator mixin.
 */
export interface IWatch<T> {
	addWatch(id: string, fn: Watch<T>): boolean;
	removeWatch(id: string): boolean;
	notifyWatches(oldState: T, newState: T): void;
}
