import type { NumOrString } from "@thi.ng/api";
import { FAIL, type Ctx, type Memo, type Scope } from "./api.js";

export const defContext = (
	src: string,
	opts?: Partial<Pick<Ctx, "debug" | "prune" | "memoize">>
): Ctx => ({
	src,
	curr: { id: "__root", pos: 0, children: [] },
	cache: [],
	lastPrune: 0,
	memoize: true,
	prune: false,
	...opts,
});

export const addChild = (scope: Scope, child: Scope) =>
	scope.children?.push(child) ?? (scope.children = [child]);

export const useMemoized = (
	ctx: Ctx,
	memo: Memo,
	key: NumOrString,
	discard: boolean
) => {
	if (memo === FAIL) return false;
	ctx.debug?.("memoized", key, "@", memo.scope.pos);
	!discard && addChild(ctx.curr, memo.scope);
	ctx.curr.pos = memo.next;
	// if (ctx.prune) prune(ctx);
	return true;
};

export const prune = (ctx: Ctx) => {
	if (ctx.curr.id === "__root") {
		const pos = ctx.curr.pos;
		ctx.debug?.("prune", ctx.lastPrune, pos);
		ctx.cache.fill(undefined, ctx.lastPrune, pos);
		ctx.lastPrune = pos;
	}
};

export const cacheStats = ({ cache }: Ctx) =>
	cache.reduce(
		(acc, bin) => {
			if (bin) {
				for (let x of bin.values()) {
					if (x === FAIL) acc.fail++;
					else acc.success++;
				}
			}
			return acc;
		},
		{ fail: 0, success: 0 }
	);
