/**
 * Generic interface for types with binary backing buffers.
 */
export interface IBuffered<T> {
	/**
	 * An implementation's publicly accessible backing array /
	 * ArrayBuffer (usually a typed array instance).
	 */
	buffer: T;
	/**
	 * Returns an Uint8Array view of backing array.
	 */
	bytes?(): Uint8Array;
}
