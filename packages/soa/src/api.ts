import type { Fn, Type } from "@thi.ng/api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";

export interface AOSAttribSpec {
	/**
	 * Element size
	 */
	size: number;
	/**
	 * Primitive type ID for backing array.
	 * Default: "f32"
	 */
	type: Type;
	/**
	 * Default value
	 */
	default: ReadonlyVec;
}

export interface SOAAttribSpec extends AOSAttribSpec {
	/**
	 * Optional user supplied backing buffer.
	 */
	buf: ArrayBuffer;
	/**
	 * Optional start offset for mapped region in backing buffer. Only
	 * used if `buf` is given.
	 */
	byteOffset: number;
	/**
	 * Number of indices between each SOA value.
	 * MUST be >= size
	 * Default: size
	 */
	stride: number;
}

/**
 * Alias for main config object of attribute specs. Declares an object
 * of partial SOAAttribSpec values (i.e. every item is made optional)
 */
export type AOSSpecs<K extends string> = Record<K, Partial<AOSAttribSpec>>;

/**
 * Alias for main config object of attribute specs. Declares an object
 * of partial SOAAttribSpec values (i.e. every item is made optional)
 */
export type SOASpecs<K extends string> = Record<K, Partial<SOAAttribSpec>>;

/**
 * Mapped type for index lookups. Declares an object with all keys from given
 * {@link SOAAttribSpec} and each value a
 * [`Vec`](https://docs.thi.ng/umbrella/vectors/interfaces/Vec.html).
 */
export type SOATuple<K extends string, V> = Record<K, V>;

export interface SerializerPair<T> {
	decode: (v: ReadonlyVec) => T;
	encode: (x: T) => ReadonlyVec;
}

export type SerializerSpecs = Record<string, SerializerPair<any>>;

export type SerializedType<
	T extends SerializerSpecs,
	K extends keyof T
> = ReturnType<T[K]["decode"]>;

export type SerializedTuple<T extends SerializerSpecs> = {
	[P in keyof T]: SerializedType<T, P>;
};

export interface Serializer<T extends SerializerSpecs> {
	decode: Fn<Record<keyof T, Vec>, SerializedTuple<T>>;
	encode: Fn<Partial<SerializedTuple<T>>, Partial<Record<keyof T, Vec>>>;
}
