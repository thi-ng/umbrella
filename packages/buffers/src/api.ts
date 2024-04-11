import type { IClear, ICopy } from "@thi.ng/api";

/**
 * Readonly version of {@link IReadWriteBuffer}.
 */
export interface IReadBuffer<T> {
	/**
	 * Number of readable items.
	 */
	readonly length: number;
	/**
	 * Returns true iff the buffer has at least one value available for reading.
	 * Also see {@link IReadBuffer.read}. The latter **MUST NOT** be called if
	 * this function returned false!
	 */
	readable(): boolean;
	/**
	 * Unguarded read operation. Assumes the caller checked
	 * {@link IReadBuffer.readable} immediately before. Returns next value from
	 * buffer.
	 */
	read(): T;
}

/**
 * Base interface for all implementations in this package.
 */
export interface IReadWriteBuffer<T>
	extends IClear,
		ICopy<IReadWriteBuffer<T>>,
		IReadBuffer<T> {
	/**
	 * Returns true iff the buffer principally accepts an item for writing. Also
	 * see {@link IReadWriteBuffer.write}. The latter **MUST NOT** be called if
	 * this function returned false!
	 *
	 * @remarks
	 * E.g. {@link dropping} and {@link sliding} buffers are always writable,
	 * but will expunge old or new items.
	 */
	writable(): boolean;
	/**
	 * Unguarded write operation. Assumes the caller checked
	 * {@link IReadWriteBuffer.writable} immediately before, but the impl can
	 * still decide to ignore/skip the write (based on desired behavior).
	 * Returns true, if a write happened.
	 */
	write(x: T): boolean;
}
