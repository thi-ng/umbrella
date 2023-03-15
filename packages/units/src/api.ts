export interface Unit {
	/**
	 * SI base dimension vector ({@link Dimensions})
	 */
	dim: Dimensions;
	/**
	 * Scaling factor relative to the coherent unit
	 */
	scale: number;
	/**
	 * Zero offset value
	 */
	offset: number;
	/**
	 * True, if this unit is coherent.
	 *
	 * @remarks
	 * Reference:
	 * - https://en.wikipedia.org/wiki/Coherence_(units_of_measurement)
	 */
	coherent: boolean;
}

export interface NamedUnit extends Unit {
	/**
	 * Symbol under which this unit can be looked up with via {@link asUnit} and
	 * others.
	 */
	sym: string;
	/**
	 * This unit's human readable description/name.
	 */
	name: string;
}

export type MaybeUnit = Unit | string;

/**
 * Vector of the 7 basic SI unit dimensions.
 *
 * @remarks
 * In order:
 *
 * - 0 = mass
 * - 1 = length
 * - 2 = time
 * - 3 = current
 * - 4 = temperature
 * - 5 = amount of substance
 * - 6 = luminous intensity
 *
 * Note: For dimensionless units, all dimensions are zero.
 *
 * Reference:
 * - https://en.wikipedia.org/wiki/SI_base_unit
 */
export type Dimensions = [
	number,
	number,
	number,
	number,
	number,
	number,
	number
];

/**
 * A known metric prefix.
 */
export type Prefix = keyof typeof PREFIXES;

/**
 * @remarks
 * Reference:
 * - https://en.wikipedia.org/wiki/Metric_prefix
 */
export const PREFIXES = {
	Q: 1e30,
	R: 1e27,
	Y: 1e24,
	Z: 1e21,
	E: 1e18,
	P: 1e15,
	T: 1e12,
	G: 1e9,
	M: 1e6,
	k: 1e3,
	h: 1e2,
	d: 1e-1,
	c: 1e-2,
	m: 1e-3,
	µ: 1e-6,
	n: 1e-9,
	p: 1e-12,
	f: 1e-15,
	a: 1e-18,
	z: 1e-21,
	y: 1e-24,
	r: 1e-27,
	q: 1e-30,
};

/**
 * Dimensionless unit preset.
 */
export const NONE: Unit = {
	dim: [0, 0, 0, 0, 0, 0, 0],
	scale: 1,
	offset: 0,
	coherent: false,
};
