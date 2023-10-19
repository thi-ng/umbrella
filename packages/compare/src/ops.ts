import type { NumOrString, Predicate2 } from "@thi.ng/api";

export type Operator = "=" | "!=" | "<" | "<=" | ">=" | ">";

export const OPERATORS: Record<
	Operator,
	Predicate2<string> | Predicate2<number>
> = {
	"=": eq,
	"!=": neq,
	"<": lt,
	"<=": lte,
	">=": gte,
	">": gt,
};

const __ensure = <T extends NumOrString>(op: string | Predicate2<T>) => {
	if (typeof op === "string") {
		if (op in OPERATORS) return <Predicate2<T>>OPERATORS[<Operator>op];
		else throw new Error(`invalid operator: ${op}`);
	}
	return op;
};

/**
 * Takes a comparison operator (either as string alias or function) and the RHS arg
 * for it, returns a new function for given operator which only takes a single
 * arg (i.e. the LHS of the operator) and always coerces it to a string before
 * applying the operator.
 *
 * @remarks
 * See {@link numericOp} for related functionality.
 *
 * @example
 * ```ts
 * const equalsABC = stringOp("=", "abc");
 *
 * ["xyz", "abc", "def"].map(equalsABC)
 * // [ false, true, false ]
 *
 * class X {
 *   constructor(public body: string) {}
 *
 *   toString() {
 *     return this.body;
 *   }
 * }
 *
 * equalsABC(new X("abc"))
 * // true
 * ```
 *
 * @param op
 * @param x
 */
export const stringOp = (op: Operator | Predicate2<string>, x: string) => {
	const impl = __ensure(op);
	return (y: any) => impl(String(y), x);
};

/**
 * Similar to {@link stringOp}, but for numeric args. Takes a comparison
 * operator (either as string alias or function) and the RHS arg for it, returns
 * a new function for given operator which only takes a single arg (i.e. the LHS
 * of the operator) and then checks if that arg is a number before applying the
 * operator. For non-numeric args, the returned function will always return
 * false.
 *
 * @example
 * ```ts
 * const lessThan42 = numericOp("<", 42);
 *
 * lessThan42(41)
 * // true
 *
 * lessThan42("41")
 * // false
 *
 * lessThan42([41])
 * // false
 * ```
 *
 * @param op
 * @param x
 */
export const numericOp = (op: Operator | Predicate2<number>, x: number) => {
	const impl = __ensure(op);
	return (y: any) => typeof y === "number" && impl(y, x);
};

export function eq(a: string, b: string): boolean;
export function eq(a: number, b: number): boolean;
export function eq(a: NumOrString, b: NumOrString) {
	return a === b;
}

export function neq(a: string, b: string): boolean;
export function neq(a: number, b: number): boolean;
export function neq(a: NumOrString, b: NumOrString) {
	return a !== b;
}

export function lt(a: string, b: string): boolean;
export function lt(a: number, b: number): boolean;
export function lt(a: NumOrString, b: NumOrString) {
	return a < b;
}

export function lte(a: string, b: string): boolean;
export function lte(a: number, b: number): boolean;
export function lte(a: NumOrString, b: NumOrString) {
	return a <= b;
}

export function gte(a: string, b: string): boolean;
export function gte(a: number, b: number): boolean;
export function gte(a: NumOrString, b: NumOrString) {
	return a >= b;
}

export function gt(a: string, b: string): boolean;
export function gt(a: number, b: number): boolean;
export function gt(a: NumOrString, b: NumOrString) {
	return a > b;
}
