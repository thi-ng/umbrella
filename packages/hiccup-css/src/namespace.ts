import type { RuleFn } from "./api.js";

export function at_namespace(url: string): RuleFn;
export function at_namespace(prefix: string, url: string): RuleFn;
export function at_namespace(...args: string[]): RuleFn {
    return (acc, _) => (
        acc.push(
            args.length > 1
                ? `@namespace ${args[0]} url(${args[1]});`
                : `@namespace url(${args[0]});`
        ),
        acc
    );
}
