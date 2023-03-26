import { DEFAULT_SYNTAX, type SyntaxOpts, type Token } from "./api.js";

/**
 * Yields iterator of {@link Token}s (incl. location info) from `src` string
 * (or from a **characterwise** iterable). Scope and string delimiters
 * and whitespace characters can be configured via given `opts`. By
 * default {@link DEFAULT_SYNTAX} is used.
 *
 * - {@link SyntaxOpts}
 * - {@link Token}
 *
 * @param src -
 * @param opts -
 */
export function* tokenize(
	src: Iterable<string>,
	opts?: Partial<SyntaxOpts>
): IterableIterator<Token> {
	const {
		scopes: rawScopes,
		whiteSpace,
		string,
	} = {
		...DEFAULT_SYNTAX,
		...opts,
	};
	const scopes = rawScopes
		.reduce((acc, x) => acc.concat(<any>x), [])
		.join("");
	let token = "";
	let isString = false;
	let tokenLine = 0;
	let tokenCol = 0;
	let line = 0;
	let col = -1;
	const $ = (value: string): Token => ({
		value,
		line: tokenLine,
		col: tokenCol,
	});
	for (let c of src) {
		if (c === "\n") {
			line++;
			col = -1;
		} else {
			col++;
		}
		if (!isString) {
			if (whiteSpace.test(c)) {
				token && (yield $(token));
				token = "";
			} else if (scopes.indexOf(c) !== -1) {
				token && (yield $(token));
				tokenLine = line;
				tokenCol = col;
				yield $(c);
				token = "";
				tokenCol++;
			} else if (c === string) {
				token && (yield $(token));
				tokenLine = line;
				tokenCol = col;
				token = '"';
				isString = true;
			} else {
				if (!token) {
					tokenLine = line;
					tokenCol = col;
				}
				token += c;
			}
		} else if (c === string && token[token.length - 1] !== "\\") {
			token += '"';
			yield $(token);
			token = "";
			isString = false;
		} else {
			token += c;
		}
	}
}
