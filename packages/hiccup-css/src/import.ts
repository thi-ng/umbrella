import { RuleFn } from "./api";

export const at_import = (url: string, ...queries: string[]): RuleFn => (
    acc,
    opts
) => (
    acc.push(
        queries.length
            ? `@import url(${url}) ${queries.join(opts.format.ruleSep)};`
            : `@import url(${url});`
    ),
    acc
);
