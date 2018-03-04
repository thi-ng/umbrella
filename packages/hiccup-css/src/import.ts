import { RuleFn } from "./api";

export function at_import(url: string, ...queries: string[]): RuleFn {
    return (acc, _) => (
        acc.push(
            queries.length ?
                `@import url(${url}) ${queries.join(" ")};` :
                `@import url(${url});`
        ),
        acc
    );
}
