import type { Fn, Predicate } from "@thi.ng/api";
import type { Parser } from "../api.js";

export const string =
	<T>(str: ArrayLike<T>, id = "string"): Parser<T> =>
	(ctx) => {
		if (ctx.done) return false;
		const scope = ctx.start(id);
		const state = scope.state!;
		const reader = ctx.reader;
		for (let i = 0, n = str.length; i < n; i++) {
			if (state.done) return false;
			const r = reader.read(state);
			if (r !== str[i]) {
				return ctx.discard();
			}
			reader.next(state);
		}
		scope.result = str;
		return ctx.end();
	};

export const stringD =
	<T>(str: ArrayLike<T>): Parser<T> =>
	(ctx) => {
		if (ctx.done) return false;
		const state = { ...ctx.state! };
		const reader = ctx.reader;
		for (let i = 0, n = str.length; i < n; i++) {
			if (state.done) return false;
			const r = reader.read(state);
			if (r !== str[i]) {
				return false;
			}
			reader.next(state);
		}
		ctx.state = state;
		return true;
	};

export const stringOf =
	<T>(
		pred: Predicate<T>,
		id = "string",
		reduce: Fn<T[], any> = (x) => x.join("")
	): Parser<T> =>
	(ctx) => {
		const state = { ...ctx.state };
		const reader = ctx.reader;
		let acc: T[] = [];
		while (!state.done) {
			const r = reader.read(state);
			if (!pred(r)) break;
			acc.push(r);
			reader.next(state);
		}
		return ctx.addChild(id, reduce(acc), state);
	};
