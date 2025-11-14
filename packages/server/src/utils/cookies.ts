// SPDX-License-Identifier: Apache-2.0
import type { Nullable } from "@thi.ng/api";

export interface ParseCookieOpts {
	domain: string;
	path: string;
	now: number;
}

export const parseCoookies = (
	rawCookies = "",
	{
		domain = "localhost",
		path = "/",
		now = Date.now(),
	}: Partial<ParseCookieOpts> = {}
) => {
	const res: Record<string, string> = {};
	let currK: Nullable<string>;
	let currV: Nullable<string>;
	for (let part of rawCookies.split(";")) {
		let [name, value] = part.split("=").map((x) => x.trim());
		value = decodeURIComponent(value);
		switch (name.toLowerCase()) {
			case "domain":
				if (value !== "." && !domain.endsWith(value)) currK = null;
				break;
			case "expires":
				if (Date.parse(value) < now) currK = null;
				break;
			case "path":
				if (!path.startsWith(value)) currK = null;
				break;
			case "maxage":
			case "httponly":
			case "priority":
			case "samesite":
			case "secure":
				break;
			default:
				if (currK && currV) {
					res[currK] = currV;
				}
				currK = name;
				currV = value;
		}
	}
	if (currK && currV) {
		res[currK] = currV;
	}
	return res;
};
