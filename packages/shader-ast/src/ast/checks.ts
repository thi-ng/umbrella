import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { isNumber } from "@thi.ng/checks/is-number";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import type { Lit, Term } from "../api/nodes.js";
import type { BoolTerm, FloatTerm, IntTerm, UintTerm } from "../api/terms.js";
import {
	B,
	F,
	I,
	U,
	type BVec,
	type IVec,
	type UVec,
	type Vec,
} from "../api/types.js";

const RE_VEC = /^[iub]?vec[234]$/;
const RE_MAT = /^mat[234]$/;

/**
 * Returns true if given `t` is a {@link Term}-like object.
 *
 * @param t -
 */
export const isTerm = (t: any): t is Term<any> =>
	isPlainObject(t) && !!t.tag && !!t.type;

/**
 * Returns true, if given term evaluates to a boolean value.
 */
export const isBool = (t: Term<any>): t is BoolTerm => t.type === B;

/**
 * Returns true, if given term evaluates to a float value.
 */
export const isFloat = (t: Term<any>): t is FloatTerm => t.type === F;

/**
 * Returns true, if given term evaluates to a signed integer value.
 */
export const isInt = (t: Term<any>): t is IntTerm => t.type === I;

/**
 * Returns true, if given term evaluates to an unsigned integer value.
 */
export const isUint = (t: Term<any>): t is UintTerm => t.type === U;

/**
 * Returns true, if given term is a literal.
 */
export const isLit = (t: Term<any>): t is Lit<any> => t.tag === "lit";

/**
 * Returns true, if given term is a float literal.
 */
export const isLitFloat = (t: Term<any>): t is Lit<"float"> =>
	isLit(t) && isFloat(t);

/**
 * Returns true, if given term is a signed integer literal.
 */
export const isLitInt = (t: Term<any>): t is Lit<"int"> => isLit(t) && isInt(t);

/**
 * Returns true, if given term is a numeric literal (float, int, uint).
 */
export const isLitNumeric = (
	t: Term<any>
): t is Lit<"float" | "int" | "uint"> =>
	isLit(t) && (isFloat(t) || isInt(t) || isUint(t));

/**
 * Returns true if t is a numeric literal with a JS number as value (not an
 * expression).
 *
 * @param t -
 */
export const isLitNumericConst = (
	t: Term<any>
): t is Lit<"float" | "int" | "uint"> => isLit(t) && isNumber(t.val);

/**
 * Returns true if t is a vector literal with a JS array as value (not an
 * expression).
 *
 * @param t -
 */
export const isLitVecConst = (
	t: Term<any>
): t is Lit<Vec | IVec | UVec | BVec> =>
	isLit(t) && isVec(t) && isArrayLike(t.val);

/**
 * Returns true, if given term evaluates to a vector value (vec, ivec, bvec).
 */
export const isVec = (t: Term<any>) => RE_VEC.test(t.type);

/**
 * Returns true, if given term evaluates to a matrix value.
 */
export const isMat = (t: Term<any>) => RE_MAT.test(t.type);
