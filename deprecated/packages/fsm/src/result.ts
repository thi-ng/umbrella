import { Match, type MatchResult, type ResultBody } from "./api.js";

export const result = <T>(
	body?: ResultBody<T>,
	type = Match.FULL
): MatchResult<T> => ({ type, body });
