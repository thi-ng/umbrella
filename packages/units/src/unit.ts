import type { IDeref } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks";
import { isNumber } from "@thi.ng/checks/is-number";
import { isString } from "@thi.ng/checks/is-string";
import { equivArrayLike } from "@thi.ng/equiv";
import { assert } from "@thi.ng/errors/assert";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import {
	NONE,
	PREFIXES,
	type Dimensions,
	type MaybeUnit,
	type NamedUnit,
	type Prefix,
	type Unit,
} from "./api.js";

/**
 * Cache/registry for all units defined via {@link defUnit}.
 */
export const UNITS: Record<string, NamedUnit> = {};

/**
 * Defines a "raw" (anonymous) unit using given dimension(s), scale factor, zero
 * offset and `coherent` flag indicating if the unit is the coherent one for
 * given dimensions and can later be used for deriving prefixed versions (see
 * {@link coherent}).
 *
 * @param dim
 * @param scale
 * @param offset
 * @param coherent
 */
export const unit = (
	dim: Dimensions | number,
	scale: number,
	offset = 0,
	coherent = false
): Unit => ({
	dim: isNumber(dim) ? __oneHot(dim) : dim,
	scale,
	offset,
	coherent,
});

/**
 * Syntax sugar for defining coherent SI base units. See {@link unit}.
 *
 * @param dim
 */
export const coherent = (dim: Dimensions | number) => unit(dim, 1, 0, true);

/**
 * Returns a new dimensionless unit (i.e. all SI dimensions are zero) with given
 * `scale` factor.
 *
 * @param scale
 * @param offset
 * @param coherent
 */
export const dimensionless = (scale: number, offset = 0, coherent = false) =>
	unit(NONE.dim, scale, offset, coherent);

/**
 * Takes a unit symbol, full unit name and pre-defined {@link Unit} impl and
 * registers it in the {@link UNITS} cache for further lookups by symbol name.
 *
 * @remarks
 * By default throws an error if attempting to register a unit with an existing
 * symbol. If `force` is true, the existing unit will be overwritten.
 *
 * @param sym
 * @param name
 * @param unit
 * @param force
 */
export const defUnit = (
	sym: string,
	name: string,
	unit: Unit,
	force = false
): NamedUnit => {
	if (UNITS[sym] && !force) illegalArgs(`attempt to override unit: ${sym}`);
	return (UNITS[sym] = { ...unit, sym, name });
};

/**
 * Attempts to find a unit by given symbol ID/name. Throws error if unit is
 * unknown.
 *
 * @param id
 */
export const asUnit = (id: string): Unit => {
	for (let i = 0; i < id.length; i++) {
		const pre = id.substring(0, i);
		const unit = UNITS[id.substring(i)];
		if (unit) {
			return PREFIXES[<Prefix>pre] !== undefined
				? prefix(<Prefix>pre, unit)
				: !pre
				? unit
				: illegalArgs(`unknown unit: ${id}`);
		}
	}
	for (let u in UNITS) {
		if (UNITS[u].name === id) return UNITS[u];
	}
	illegalArgs(`unknown unit: ${id}`);
};

/**
 * Creates a new re-scaled version of given unit (only coherent ones are
 * allowed), using the scale factor associated with given standard metric prefix
 * (see {@link PREFIXES}). If `coherent` is true (default: false), the new unit
 * itself is considered coherent and can be prefixed later.
 *
 * @example
 * ```ts
 * // create kilometer unit from (builtin) meter
 * const KM = prefix("k", M);
 * ```
 *
 * @param id
 * @param unit
 * @param coherent
 */
export const prefix = (id: Prefix, unit: MaybeUnit, coherent = false) => {
	const $u = __ensureUnit(unit);
	return $u.coherent
		? mul($u, PREFIXES[id], coherent)
		: illegalArgs("unit isn't coherent");
};

type QUnit<T extends number | number[]> = T extends number ? Unit : Unit[];

/**
 * Wrapper for scalar or vector quantities. See {@link quantity}.
 */
export class Quantity<T extends number | number[]> implements IDeref<T> {
	constructor(public readonly value: QUnit<T>) {}

	deref(): T {
		return <any>(
			(isArray(this.value)
				? this.value.map((x) => x.scale)
				: this.value.scale)
		);
	}
}

/**
 * Creates a new {@link Quantity}, i.e. a certain finite amount of a given unit.
 * `value` can be a number or vector.
 *
 * @remarks
 * The quantities can then be used for calculations & conversions using the
 * polymorphic functions: {@link div}, {@link mul}, {@link reciprocal} and
 * {@link convert}.
 *
 * The {@link Quantity} class also implements the standard [`IDeref`]()
 * interface to obtain unwrapped amount (though only should be used for
 * dimensionless quantities). Use {@link convert} otherwise!
 *
 * @example
 * ```ts
 * const speedOfLight = quantity(299792458, "m/s");
 *
 * // compute wavelength of a WiFi signal in millimeters
 * convert(div(speedOfLight, quantity(2.4,"GHz")), "mm");
 * // 124.9135
 *
 * // DIN A4 paper size
 * const A4 = quantity([210, 297], "mm");
 *
 * // convert paper size to inches
 * convert(A4, "in");
 * // [ 8.2677, 11.6929 ]
 *
 * // or calculate pixel dimensions @ 300 dpi
 * // the result of the product is dimensionless so we use NONE as target unit
 * convert(mul(A4, quantity(300, "dpi")), NONE)
 * // [ 2480.314960629921, 3507.8740157480315 ]
 *
 * // alternatively dimensionless units can be deref'd directly
 * mul(A4, quantity(300, "dpi")).deref()
 * // [ 2480.314960629921, 3507.8740157480315 ]
 * ```
 *
 * @param value
 * @param unit
 */
export const quantity = <T extends number | number[]>(
	value: T,
	unit: MaybeUnit
) =>
	new Quantity<T>(
		<any>(
			(isNumber(value)
				? mul(unit, value)
				: value.map((x) => mul(unit, x)))
		)
	);

/**
 * Polymorphic function. Derives a new quantity or unit as the product of the
 * given quantities/units.
 *
 * @remarks
 * If given units and if `coherent` is true (default: false), the new unit
 * itself is considered coherent and can be prefixed later.
 *
 * @param a
 * @param b
 * @param coherent
 */
export function mul(a: Quantity<number>, b: Quantity<number>): Quantity<number>;
export function mul(
	a: Quantity<number>,
	b: Quantity<number[]>
): Quantity<number[]>;
export function mul(
	a: Quantity<number[]>,
	b: Quantity<number>
): Quantity<number[]>;
export function mul(
	a: Quantity<number[]>,
	b: Quantity<number[]>
): Quantity<number[]>;
export function mul(
	a: MaybeUnit,
	b: MaybeUnit | number,
	coherent?: boolean
): Unit;
export function mul(
	a: Quantity<any> | MaybeUnit,
	b: Quantity<any> | MaybeUnit | number,
	coherent = false
): any {
	if (a instanceof Quantity) return __combineQ(mul, a, <Quantity<any>>b);
	const $a = __ensureUnit(a);
	if (isNumber(b)) return unit($a.dim, $a.scale * b, $a.offset, coherent);
	const $b = __ensureUnit(<MaybeUnit>b);
	return unit(
		<Dimensions>$a.dim.map((x, i) => x + $b.dim[i]),
		$a.scale * $b.scale,
		0,
		coherent
	);
}

/**
 * Polymorphic function. Derives a new quantity or unit via the division of the
 * given quantities/units.
 *
 * @remarks
 * If given units and if `coherent` is true (default: false), the new unit
 * itself is considered coherent and can be prefixed later.
 *
 * @param a
 * @param b
 * @param coherent
 */
export function div(a: Quantity<number>, b: Quantity<number>): Quantity<number>;
export function div(
	a: Quantity<number>,
	b: Quantity<number[]>
): Quantity<number[]>;
export function div(
	a: Quantity<number[]>,
	b: Quantity<number>
): Quantity<number[]>;
export function div(
	a: Quantity<number[]>,
	b: Quantity<number[]>
): Quantity<number[]>;
export function div(
	a: MaybeUnit,
	b: MaybeUnit | number,
	coherent?: boolean
): Unit;
export function div(
	a: Quantity<any> | MaybeUnit,
	b: Quantity<any> | MaybeUnit | number,
	coherent = false
): any {
	if (a instanceof Quantity) return __combineQ(div, a, <Quantity<any>>b);
	const $a = __ensureUnit(a);
	if (isNumber(b)) {
		return unit($a.dim, $a.scale / b, $a.offset, coherent);
	}
	const $b = __ensureUnit(<MaybeUnit>b);
	return unit(
		<Dimensions>$a.dim.map((x, i) => x - $b.dim[i]),
		$a.scale / $b.scale,
		0,
		coherent
	);
}

/**
 * Polymorphic function. Creates the reciprocal version of given quantity or
 * unit (i.e. all SI dimensions will flip sign) and the scale factor of the new
 * unit will be `1/scale`.
 *
 * @remarks
 * If given a unit and if `coherent` is true (default: false), the new unit
 * itself is considered coherent and can be prefixed later.
 *
 * @example
 * ```ts
 * const HZ = reciprocal(S, true);
 * ```
 *
 * @param u
 * @param coherent
 */
export function reciprocal(u: Quantity<number>): Quantity<number>;
export function reciprocal(u: Quantity<number[]>): Quantity<number[]>;
export function reciprocal(u: MaybeUnit, coherent?: boolean): Unit;
export function reciprocal(
	u: Quantity<any> | MaybeUnit,
	coherent = false
): any {
	return u instanceof Quantity
		? new Quantity(
				isArray(u.value)
					? u.value.map((x) => div(NONE, x))
					: div(NONE, u.value)
		  )
		: div(NONE, u, coherent);
}

/**
 * Raises given unit to power `k`. If `coherent` is true (default: false), the
 * new unit itself is considered coherent and can be prefixed later.
 *
 * ```ts
 * // create kilometer unit from (builtin) meter
 * const SQ_METER = pow(M, 2);
 *
 * // acceleration aka m/s^2
 * const M_S2 = div(M, pow(S, 2));
 * ```
 *
 * @param u
 * @param k
 * @param coherent
 */
export const pow = (u: MaybeUnit, k: number, coherent = false) => {
	const $u = __ensureUnit(u);
	return unit(
		<Dimensions>$u.dim.map((x) => x * k),
		$u.scale ** k,
		0,
		coherent
	);
};

/**
 * Polymorphic function. If given a {@link Quantity}, attempts to convert it to
 * given `dest` unit and returns result as raw/unwrapped value (or vector).
 * Otherwise, attempts to convert `x` amount from `src` unit into `dest` unit
 * and returns result. In all cases an error is thrown if units are
 * incompatible.
 *
 * @remarks
 * Units can only be converted if their SI dimensions are compatible. See
 * {@link isConvertible}.
 *
 * @param x
 * @param src
 * @param dest
 */
export function convert<T extends number | number[]>(
	x: Quantity<T>,
	dest: MaybeUnit
): T;
export function convert(x: number, src: MaybeUnit, dest: MaybeUnit): number;
export function convert(
	x: Quantity<any> | number,
	a: MaybeUnit,
	b?: MaybeUnit
): any {
	const $src = __ensureUnit(a);
	if (x instanceof Quantity) {
		return isArray(x.value)
			? x.value.map((y) => convert(1, y, $src))
			: convert(1, x.value, $src);
	}
	const $dest = __ensureUnit(<MaybeUnit>b);
	const xnorm = x * $src.scale + $src.offset;
	if (isReciprocal($src, $dest))
		return (1 / xnorm - $dest.offset) / $dest.scale;
	assert(equivArrayLike($src.dim, $dest.dim), "incompatible dimensions");
	return (xnorm - $dest.offset) / $dest.scale;
}

/**
 * Returns true if `src` quantity or unit is convertible to `dest` unit.
 *
 * @param src
 * @param dest
 */
export const isConvertible = (
	src: Quantity<any> | MaybeUnit,
	dest: MaybeUnit
): boolean => {
	if (src instanceof Quantity) return isConvertible(__qunit(src), dest);
	const $src = __ensureUnit(src);
	const $dest = __ensureUnit(dest);
	return isReciprocal($src, $dest) || equivArrayLike($src.dim, $dest.dim);
};

/**
 * Returns true, if `u` is a dimensionless quantity or unit.
 *
 * @param u
 */
export const isDimensionless = (u: Quantity<any> | MaybeUnit): boolean =>
	u instanceof Quantity
		? isDimensionless(__qunit(u))
		: __ensureUnit(u).dim.every((x) => x === 0);

/**
 * Returns true if the two given units are reciprocal to each other (and
 * therefore can be used for conversion).
 *
 * @param a
 * @param b
 */
export const isReciprocal = (a: MaybeUnit, b: MaybeUnit) => {
	const { dim: $a } = __ensureUnit(a);
	const { dim: $b } = __ensureUnit(b);
	let ok = false;
	for (let i = 0; i < 7; i++) {
		const xa = $a[i];
		const xb = $b[i];
		if (xa === 0 && xb === 0) continue;
		if (xa !== -xb) return false;
		ok = true;
	}
	return ok;
};

/**
 * Polymorphic function. Returns formatted version of given quantity's or unit's
 * SI dimension vector.
 *
 * @param u
 */
export const formatSI = (u: Quantity<any> | MaybeUnit): string => {
	if (u instanceof Quantity) return formatSI(__qunit(u));
	const { dim } = __ensureUnit(u);
	const SI = ["kg", "m", "s", "A", "K", "mol", "cd"];
	const acc: string[] = [];
	for (let i = 0; i < 7; i++) {
		const x = dim[i];
		if (x !== 0) acc.push(SI[i] + (x !== 1 ? x : ""));
	}
	return acc.length ? acc.join("·") : "<dimensionless>";
};

/** @internal */
const __ensureUnit = (x: MaybeUnit) => (isString(x) ? asUnit(x) : x);

/** @internal */
const __oneHot = (x: number) => {
	const dims = <Dimensions>new Array<number>(7).fill(0);
	dims[x] = 1;
	return dims;
};

const __qunit = (q: Quantity<any>) => (isArray(q.value) ? q.value[0] : q.value);

const __combineQ = (
	op: (a: Unit, b: Unit) => Unit,
	a: Quantity<any>,
	b: Quantity<any>
) => {
	const $b = <Quantity<any>>b;
	const vecA = isArray(a.value);
	const vecB = isArray($b.value);
	return new Quantity(
		vecA
			? vecB
				? a.value.map((x, i) => op(x, (<Unit[]>$b.value)[i]))
				: a.value.map((x) => op(x, <Unit>$b.value))
			: vecB
			? $b.value.map((x) => op(<Unit>a.value, x))
			: op(a.value, $b.value)
	);
};
