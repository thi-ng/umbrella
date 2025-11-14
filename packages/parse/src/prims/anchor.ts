// SPDX-License-Identifier: Apache-2.0
import type { Nullable, Predicate2 } from "@thi.ng/api";
import { ALPHA_NUM } from "@thi.ng/strings/groups";
import type { Parser } from "../api.js";

export const anchor =
	<T>(fn: Predicate2<Nullable<T>>): Parser<T> =>
	({ reader, state }) =>
		fn(reader.prev(state), state.done ? null : reader.read(state));

export const inputStart: Parser<any> = (ctx) =>
	ctx.reader.prev(ctx.state) == null;

export const inputEnd: Parser<any> = ({ reader, state }) =>
	state.done || reader.read(state) === undefined;

export const lineStart: Parser<string> = (ctx) => {
	const l = ctx.reader.prev(ctx.state);
	return l == null || l === "\n" || l === "\r";
};

export const lineEnd: Parser<string> = ({ reader, state }) => {
	let c: string;
	return state.done || (c = reader.read(state)) === "\n" || c === "\r";
};

export const wordBoundaryP: Predicate2<Nullable<string>> = (prev, next) => {
	return prev
		? next
			? ALPHA_NUM[prev] && !ALPHA_NUM[next]
			: ALPHA_NUM[prev]
		: next
		? ALPHA_NUM[next]
		: false;
};

export const wordBoundary = anchor(wordBoundaryP);
