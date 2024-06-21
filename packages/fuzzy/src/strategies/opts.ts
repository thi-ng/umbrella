// thing:no-export
import type { DefuzzStrategyOpts } from "../api.js";

/** @internal */
export const __defaultOpts = (
	opts?: Partial<DefuzzStrategyOpts>
): DefuzzStrategyOpts => ({
	samples: 100,
	eps: 1e-6,
	...opts,
});
