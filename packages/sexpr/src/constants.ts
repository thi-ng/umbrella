import type { SyntaxOpts } from "./api";

export const DEFAULT_SYNTAX: SyntaxOpts = {
    scopes: [["(", ")"]],
    whiteSpace: /(\s|,)/,
    string: '"',
};
