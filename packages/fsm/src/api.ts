export enum Match {
	/**
	 * Partial match
	 */
	PARTIAL = 0,
	/**
	 * Full match
	 */
	FULL = 1,
	/**
	 * Full match (No Consume), i.e. didn't consume last input. The
	 * result will be treated like `FULL`, but the last input will be
	 * processed further.
	 */
	FULL_NC = 2,
	/**
	 * Failed match.
	 */
	FAIL = -1,
}

export interface MatchResult<T> {
	type: Match;
	body?: ResultBody<T>;
}

export type Matcher<T, C, R> = () => MatcherInst<T, C, R>;

export type MatcherInst<T, C, R> = (ctx: C, x: T) => MatchResult<R>;

export type ResultBody<T> = [number | string, T[]?];

export type AltCallback<T, C, R> = (
	ctx: C,
	next: ResultBody<R> | undefined,
	x: T[]
) => ResultBody<R> | undefined;

export type LitCallback<T, C, R> = (ctx: C, x: T) => ResultBody<R> | undefined;

export type SeqCallback<T, C, R> = (
	ctx: C,
	buf: T[]
) => ResultBody<R> | undefined;

export type AltFallback<T, C, R> = SeqCallback<T, C, R>;

// prettier-ignore
export const RES_PARTIAL: MatchResult<any> = Object.freeze({ type: Match.PARTIAL });
export const RES_FAIL: MatchResult<any> = Object.freeze({ type: Match.FAIL });
