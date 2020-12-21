import type { DefuzzStrategyOpts } from "../api";

export const defaultOpts = (
    opts?: Partial<DefuzzStrategyOpts>
): DefuzzStrategyOpts => ({
    samples: 100,
    eps: 1e-6,
    ...opts,
});
