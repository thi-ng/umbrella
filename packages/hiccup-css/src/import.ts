import { RuleFn } from "./api";

export function at_import(url: string, ...queries: string[]): RuleFn {
    return (acc, opts) => (
        acc.push(
            queries.length ?
                `@import url(${url}) ${queries.join(opts.format.ruleSep)};` :
                `@import url(${url});`
        ),
        acc
    );
}
