export const enum Match {
    PARTIAL = 0,
    FULL = 1,
    FULL_NC = 2,
    FAIL = -1
}

export interface MatchResult<T> {
    type: Match;
    body?: ResultBody<T>;
}

export type Matcher<T, C, R> =
    () => (ctx: C, x: T) => MatchResult<R>;

export type ResultBody<T> =
    [number | string, T[]?];

export type AltCallback<T, C, R> =
    (ctx: C, next: ResultBody<R>, x: T[]) => ResultBody<R>;

export type RangeCallback<T, C, R> =
    (ctx: C, x: T) => ResultBody<R>;

export type SeqCallback<T, C, R> =
    (ctx: C, buf: T[]) => ResultBody<R>;

export const RES_PARTIAL = Object.freeze({ type: Match.PARTIAL });
export const RES_FAIL = Object.freeze({ type: Match.FAIL });
