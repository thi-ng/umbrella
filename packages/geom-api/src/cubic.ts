export interface CubicOpts {
	/**
	 * Set to true (default false) to interpret original vertices as
	 * breakpoints
	 */
	breakPoints: boolean;
	/**
	 * True, to enable uniform tangent scaling. If false (default), each
	 * tangent will be also scaled by the length of its related parent
	 * edge in the source shape.
	 */
	uniform: boolean;
	/**
	 * Tangent scale factor. Actual length in uniform scaling mode, else
	 * should be a value between [0..1.33333]
	 */
	scale: number;
}
