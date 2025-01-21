import type { Ctx } from "./api.js";

export const parseError = (pos: number, ctx: Ctx) => {
	const lineStart = Math.max(0, ctx.src.lastIndexOf("\n", pos));
	const lineEnd = Math.max(pos + 1, ctx.src.indexOf("\n", pos));
	const line = ctx.src.substring(lineStart, lineEnd);
	throw new Error(
		`parse error @ ${pos} (${ctx.curr.id}):\n${line}\n${".".repeat(
			pos - lineStart
		)}^\n`
	);
};
