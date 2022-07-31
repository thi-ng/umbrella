import type { Fn } from "@thi.ng/api";
import type {
	ArrayInit,
	Assign,
	Branch,
	Decl,
	FnCall,
	ForLoop,
	Func,
	FuncArg,
	FuncReturn,
	Index,
	IndexM,
	Lit,
	Op1,
	Op2,
	Scope,
	Swizzle,
	Sym,
	Ternary,
	WhileLoop,
} from "./nodes.js";
import type { Tag } from "./tags.js";

export interface TargetImpl<T> extends Record<Tag, Fn<any, T>> {
	arg: Fn<FuncArg<any>, T>;
	array_init: Fn<ArrayInit<any>, T>;
	assign: Fn<Assign<any>, T>;
	call: Fn<FnCall<any>, T>;
	call_i: Fn<FnCall<any>, T>;
	decl: Fn<Decl<any>, T>;
	fn: Fn<Func<any>, T>;
	for: Fn<ForLoop, T>;
	idx: Fn<Index<any>, T>;
	idxm: Fn<IndexM<any>, T>;
	if: Fn<Branch, T>;
	lit: Fn<Lit<any>, T>;
	op1: Fn<Op1<any>, T>;
	op2: Fn<Op2<any>, T>;
	ret: Fn<FuncReturn<any>, T>;
	scope: Fn<Scope, T>;
	swizzle: Fn<Swizzle<any>, T>;
	sym: Fn<Sym<any>, T>;
	ternary: Fn<Ternary<any>, T>;
	while: Fn<WhileLoop, T>;
}
