import { Match, MatchResult, ResultBody } from "./api";

export const result =
    <T>(body: ResultBody<T>, type = Match.FULL): MatchResult<T> =>
        ({ type, body });
