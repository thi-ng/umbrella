import { DEFAULT_SYNTAX, SyntaxOpts } from "./api";

/**
 * Yields iterator of tokens from `src` string (or a **characterwise**
 * iterable). Scope and string delimiters and whitespace characters can be
 * configured via given `opts`. By default `DEFAULT_SYNTAX` is used.
 *
 * @see SyntaxOpts
 *
 * @param src
 * @param opts
 */
export function* tokenize(src: Iterable<string>, opts?: Partial<SyntaxOpts>) {
    const { scopeOpen, scopeClose, ws, string } = {
        ...DEFAULT_SYNTAX,
        ...opts
    };
    const scopes = scopeOpen + scopeClose;
    let curr = "";
    let isString = false;
    for (let c of src) {
        if (!isString) {
            if (ws.test(c)) {
                curr && (yield curr);
                curr = "";
            } else if (scopes.indexOf(c) !== -1) {
                curr && (yield curr);
                yield c;
                curr = "";
            } else if (c === string) {
                curr && (yield curr);
                curr = '"';
                isString = true;
            } else {
                curr += c;
            }
        } else if (c === string && curr[curr.length - 1] !== "\\") {
            curr += '"';
            yield curr;
            curr = "";
            isString = false;
        } else {
            curr += c;
        }
    }
}
