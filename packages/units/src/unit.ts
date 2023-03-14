import { isNumber } from "@thi.ng/checks/is-number";
import { isString } from "@thi.ng/checks/is-string";
import { equivArrayLike } from "@thi.ng/equiv";
import { assert } from "@thi.ng/errors/assert";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import {
	Dimensions,
	MaybeUnit,
	NamedUnit,
	Prefix,
	PREFIXES,
	Unit,
} from "./api.js";

/**
 * Cache/registry for all units defined via {@link defUint}.
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
	unit([0, 0, 0, 0, 0, 0, 0], scale, offset, coherent);

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
				: unit;
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
export const prefix = (id: Prefix, unit: Unit, coherent = false) =>
	unit.coherent
		? mul(unit, PREFIXES[id], coherent)
		: illegalArgs(`unit isn't coherent: ${id}`);

/**
 * Derives a new unit as the product of the given units. If `coherent` is true
 * (default: false), the new unit itself is considered coherent and can be
 * prefixed later.
 *
 * @param a
 * @param b
 * @param coherent
 */
export const mul = (a: MaybeUnit, b: MaybeUnit | number, coherent = false) => {
	const $a = __ensureUnit(a);
	if (isNumber(b)) {
		return unit($a.dim, $a.scale * b, $a.offset, coherent);
	}
	const $b = __ensureUnit(b);
	return unit(
		<Dimensions>$a.dim.map((x, i) => x + $b.dim[i]),
		$a.scale * $b.scale,
		0,
		coherent
	);
};

/**
 * Derives a new unit via the division of the given units. If `coherent` is true
 * (default: false), the new unit itself is considered coherent and can be
 * prefixed later.
 *
 * @param a
 * @param b
 * @param coherent
 */
export const div = (a: MaybeUnit, b: MaybeUnit | number, coherent = false) => {
	const $a = __ensureUnit(a);
	if (isNumber(b)) {
		return unit($a.dim, $a.scale / b, $a.offset, coherent);
	}
	const $b = __ensureUnit(b);
	return unit(
		<Dimensions>$a.dim.map((x, i) => x - $b.dim[i]),
		$a.scale / $b.scale,
		0,
		coherent
	);
};

/**
 * Creates the reciprocal version of given unit (i.e. all SI dimensions will
 * flip sign) and the scale factor of the new unit will be `1/scale`. If
 * `coherent` is true (default: false), the new unit itself is considered
 * coherent and can be prefixed later.
 *
 * @example
 * ```ts
 * const HZ = reciprocal(S, true);
 * ```
 *
 * @param u
 * @param coherent
 */
export const reciprocal = (u: MaybeUnit, coherent = false) =>
	div(dimensionless(1), u, coherent);

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
 * Attempts to convert `x` from `src` unit into `dest` unit. Throws an error if
 * units are incompatible.
 *
 * @remarks
 * Units can only be converted if their SI dimensions are compatible. See
 * {@link isConvertible}.
 *
 * @param x
 * @param src
 * @param dest
 */
export const convert = (x: number, src: MaybeUnit, dest: MaybeUnit) => {
	const $src = __ensureUnit(src);
	const $dest = __ensureUnit(dest);
	const xnorm = x * $src.scale + $src.offset;
	if (isReciprocal($src, $dest))
		return (1 / xnorm - $dest.offset) / $dest.scale;
	assert(equivArrayLike($src.dim, $dest.dim), "incompatible dimensions");
	return (xnorm - $dest.offset) / $dest.scale;
};

/**
 * Returns true if the two given units are reciprocal to each other (and
 * therefore can be used for conversion).
 *
 * @param a
 * @param b
 */
export const isReciprocal = (src: MaybeUnit, dest: MaybeUnit) => {
	const { dim: a } = __ensureUnit(src);
	const { dim: b } = __ensureUnit(dest);
	let ok = false;
	for (let i = 0; i < 7; i++) {
		const xa = a[i];
		const xb = b[i];
		if (xa === 0 && xb === 0) continue;
		if (xa !== -xb) return false;
		ok = true;
	}
	return ok;
};

/**
 * Returns true if `src` unit is convertible to `dest`.
 *
 * @param src
 * @param dest
 */
export const isConvertible = (src: MaybeUnit, dest: MaybeUnit) => {
	const $src = __ensureUnit(src);
	const $dest = __ensureUnit(dest);
	return isReciprocal($src, $dest) || equivArrayLike($src.dim, $dest.dim);
};

export const formatSI = (u: MaybeUnit) => {
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
