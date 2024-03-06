import type { IObjectOf } from "@thi.ng/api";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import type { Implementation, MultiFn } from "./api.js";

/**
 * Syntax-sugar intended for sets of multi-methods sharing same dispatch
 * values / logic. Takes a dispatch value, an object of "is-a"
 * relationships and a number of multi-methods, each with an
 * implementation for the given dispatch value.
 *
 * @remarks
 * The relations object has dispatch values (parents) as keys and arrays
 * of multi-methods as their values. For each multi-method associates
 * the given `type` with the related parent dispatch value to delegate
 * to its implementation.
 *
 * The remaining implementations are associated with their related
 * multi-method and the given `type` dispatch value.
 *
 * @example
 * ```ts tangle:../export/implementations.ts
 * import { defmulti, implementations } from "@thi.ng/defmulti";
 *
 * const foo = defmulti((x) => x.id);
 * const bar = defmulti((x) => x.id);
 * const bax = defmulti((x) => x.id);
 * const baz = defmulti((x) => x.id);
 *
 * // define impls for dispatch value `a`
 * implementations(
 *   "a",
 *
 *   // delegate bax & baz impls to dispatch val `b`
 *   {
 *      b: [bax, baz]
 *   },
 *
 *   // concrete multi-fn impls
 *   foo,
 *   (x) => `foo: ${x.val}`,
 *
 *   bar,
 *   (x) => `bar: ${x.val.toUpperCase()}`
 * );
 *
 * // add parent impls
 * bax.add("b", (x) => `bax: ${x.id}`);
 * baz.add("c", (x) => `baz: ${x.id}`);
 *
 * // use "c" impl for "b"
 * baz.isa("b", "c");
 *
 * console.log(foo({ id: "a", val: "alice" }));
 * // "foo: alice"
 *
 * console.log(bar({ id: "a", val: "alice" }));
 * // "bar: ALICE"
 *
 * console.log(bax({ id: "a", val: "alice" }));
 * // "bax: a"
 *
 * console.log(baz({ id: "a", val: "alice" }));
 * // "baz: a"
 *
 * console.log([...baz.impls().keys()]);
 * // Set { "c", "a", "b" }
 * ```
 *
 * @param id - dispatch value / implementation ID
 * @param impls - implementations
 */
export const implementations = (
	id: PropertyKey,
	rels: IObjectOf<MultiFn<any>[]>,
	...impls: (MultiFn<any> | Implementation<any>)[]
) => {
	impls.length & 1 &&
		illegalArgs("expected an even number of implementation items");
	if (rels) {
		for (let parent in rels) {
			for (let fn of rels[parent]) {
				fn.isa(id, parent);
			}
		}
	}
	for (let i = 0; i < impls.length; i += 2) {
		(<MultiFn<any>>impls[i]).add(id, impls[i + 1]);
	}
};
