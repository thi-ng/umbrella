// SPDX-License-Identifier: Apache-2.0
import type { Nullable } from "@thi.ng/api";
import { DOCTYPE_HTML, serialize } from "@thi.ng/hiccup";
import { mergeDeepObj } from "@thi.ng/object-utils";
import { map } from "@thi.ng/transducers";
import type { AppContext, HTMLDoc } from "../common/api.js";
import { DEFAULT_DOC } from "../common/config.js";

/**
 * Takes a `HTMLDoc` object and serializes it into an HTML5 string. The
 * `body` field of the document must contain elements in thi.ng/hiccup
 * format, i.e. it's an array in which each element is a nested array,
 * string or ES6 iterable, each encoding a part of the full DOM to be
 * generated. The resulting HTML string will not contain any whitespace
 * unless it's part of string values.
 *
 * See here for more reference:
 * https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup
 *
 * @param doc -
 */
export const html = (doc: HTMLDoc) => {
	doc = mergeDeepObj(DEFAULT_DOC, doc);
	return serialize(
		[
			DOCTYPE_HTML,
			[
				"html",
				{ lang: doc.lang || "en" },
				[
					"head",
					map((meta) => ["meta", meta], doc.head!.meta || []),
					map((s) => script(null, s), doc.head!.scripts || []),
					map((link) => ["link", link], doc.head!.links || []),
					map((css) => ["style", css], doc.head!.styles || []),
					["title", doc.head!.title || ""],
				],
				["body", doc.ctx!.ui.body, ...doc.body],
			],
		],
		{ ctx: doc.ctx }
	);
};

export const script = (
	_: Nullable<AppContext>,
	script: { src: string; type?: string }
) => ["script", { type: "text/javascript", ...script }];
