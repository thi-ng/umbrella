import { Match, MatchResult, ResultBody } from "./api.js";

export const result = <T>(
	body?: ResultBody<T>,
	type = Match.FULL
): MatchResult<T> => ({ type, body });
