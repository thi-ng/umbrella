import type { Maybe } from "@thi.ng/api";
import type { Parser, Ctx } from "../api.js";

export const dynamic = (): Parser & { set(p: Parser): void } => {
	let impl: Maybe<Parser>;
	const wrapper: any = (ctx: Ctx) => impl?.(ctx) ?? false;
	wrapper.deref = () => impl;
	wrapper.set = (p: Parser) => (impl = p);
	return wrapper;
};
