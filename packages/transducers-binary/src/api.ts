export type Type =
	| "i8"
	| "i8a"
	| "u8"
	| "u8a"
	| "i16"
	| "i16a"
	| "u16"
	| "u16a"
	| "i24"
	| "i24a"
	| "u24"
	| "u24a"
	| "i32"
	| "i32a"
	| "u32"
	| "u32a"
	| "f32"
	| "f32a"
	| "f64"
	| "f64a"
	| "str";

export type BinStructItem =
	| ["i8", number]
	| ["i8a", ArrayLike<number>]
	| ["u8", number]
	| ["u8a", ArrayLike<number>]
	| ["i16", number, boolean?]
	| ["i16a", ArrayLike<number>, boolean?]
	| ["u16", number, boolean?]
	| ["u16a", ArrayLike<number>, boolean?]
	| ["i24", number, boolean?]
	| ["i24a", ArrayLike<number>, boolean?]
	| ["u24", number, boolean?]
	| ["u24a", ArrayLike<number>, boolean?]
	| ["i32", number, boolean?]
	| ["i32a", ArrayLike<number>, boolean?]
	| ["u32", number, boolean?]
	| ["u32a", ArrayLike<number>, boolean?]
	| ["f32", number, boolean?]
	| ["f32a", ArrayLike<number>, boolean?]
	| ["f64", number, boolean?]
	| ["f64a", ArrayLike<number>, boolean?]
	| ["str", string];

export interface HexDumpOpts {
	/**
	 * Number of bytes per line.
	 * Default: 16
	 */
	cols: number;
	/**
	 * Start address.
	 * Default: 0
	 */
	address: number;
}
