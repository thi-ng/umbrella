// SPDX-License-Identifier: Apache-2.0
import { isArray, isProtoPath } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import { setInUnsafe, updateInUnsafe } from "@thi.ng/paths";
import type { IncomingMessage } from "node:http";
import type { ParsedFormData } from "../api.js";

export const parseSearchParams = (params: URLSearchParams) => {
	let acc: ParsedFormData = {};
	for (const [k, v] of params) {
		if (k.includes("[")) acc = parseObjectVal(acc, k, v);
		else if (!isProtoPath(k)) acc[k] = v;
	}
	return acc;
};

/**
 * Parses given URL's query string {@link parseFormData}. Any prefix
 * before/including the first `?` will be ignored.
 *
 * @param url
 */
export const parseQuerystring = (url: string): ParsedFormData => {
	const idx = url.indexOf("?");
	return idx >= 0 ? parseFormData(url.substring(idx + 1)) : {};
};

export const parseRequestFormData = async (req: IncomingMessage) => {
	let body = "";
	for await (let chunk of req) body += chunk.toString();
	return parseFormData(body);
};

/**
 * Parses given URI-encoded string of key-value pairs into a
 * {@link ParsedFormData} object. Throws an error if there're syntax/nesting
 * errors.
 *
 * @remarks
 * Supports the following syntax:
 *
 * - `key=value`
 * - `key[]=value`: append value to `key` array
 * - `key[a]=value`: set value `a` in object `key`
 * - `key[a][b]=value`: set nested value in object `key`
 * - `key[a][]=value`: append value to nested array in object `key`
 *
 * Ignores attempts to manipulate a JS prototype chain (via
 * [`isProtoPath()`](https://docs.thi.ng/umbrella/checks/functions/isProtoPath.html)),
 * i.e. `foo[__proto__][bar]=42` will be skipped.
 *
 * @param body
 */
export const parseFormData = (body: string) =>
	body.split("&").reduce((acc, x) => {
		x = decodeURIComponent(x.replace(/\+/g, " "));
		const idx = x.indexOf("=");
		if (idx < 1) return acc;
		const k = x.substring(0, idx);
		const v = x.substring(idx + 1);
		if (k.includes("[")) return parseObjectVal(acc, k, v);
		if (!isProtoPath(k)) acc[k] = v;
		return acc;
	}, <ParsedFormData>{});

const parseObjectVal = (
	acc: ParsedFormData,
	key: string,
	val: string
): ParsedFormData => {
	const parts = key.split("[");
	if (!parts[0]) __illegal(key);
	const path: string[] = [parts[0]];
	for (let i = 1, n = parts.length - 1; i <= n; i++) {
		const p = parts[i];
		if (p === "]") {
			if (i < n) __illegal(key);
			return !isProtoPath(path)
				? updateInUnsafe(acc, path, (curr) =>
						isArray(curr) ? [...curr, val] : [val]
				  )
				: acc;
		}
		const idx = p.indexOf("]");
		if (idx < 0 || idx < p.length - 1) __illegal(key);
		path.push(p.substring(0, p.length - 1));
	}
	return !isProtoPath(path) ? setInUnsafe(acc, path, val) : acc;
};

const __illegal = (key: string) => illegalArgs("invalid form param: " + key);
