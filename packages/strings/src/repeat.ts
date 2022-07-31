import { memoizeJ } from "@thi.ng/memoize/memoizej";

/**
 * @param ch - character
 * @param n - repeat count
 */
export const repeat = memoizeJ<string, number, string>(
	(ch: string, n: number) => ch.repeat(n)
);
