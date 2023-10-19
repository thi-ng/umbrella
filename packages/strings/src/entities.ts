/**
 * @remarks
 * References:
 * - https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references
 * - https://www.w3.org/TR/xml-entity-names/byalpha.html
 */
export const ENTITIES: Record<string, string> = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"≤": "&le;",
	"≥": "&ge;",
	'"': "&quot;",
	"'": "&apos;",
	"—": "&mdash;",
	"–": "&ndash;",
	"…": "&hellip;",
	"⋮": "&vellip;",
	"⋯": "&ctdot;",
	"¢": "&cent;",
	"€": "&euro;",
	"£": "&pound;",
	"¥": "&yen;",
	"₹": "&#8377;",
	元: "&#20803;",
	"§": "&sect;",
	"¶": "&para;",
	"©": "&copy;",
	"®": "&reg;",
	"™": "&trade;",
	"℃": "&#8451;",
	"℉": "&#8457;",
	K: "&#8490;",
	"◂": "&ltrif;",
	"▸": "&rtrif;",
	"▴": "&utrif;",
	"▾": "&dtrif;",
	"←": "&larr;",
	"→": "&rarr;",
	"↑": "&uarr;",
	"↓": "&darr;",
	"↵": "&crarr;",
	"↩": "&larrhk;",
	"⇐": "&lArr;",
	"⇒": "&rArr;",
	"↺": "&olarr;",
	"↻": "&orarr;",
	"¹": "&sup1;",
	"²": "&sup2;",
	"³": "&sup3;",
	"½": "&frac12;",
	"⅓": "&frac13;",
	"⅔": "&frac23;",
	"¼": "&frac14;",
	"¾": "&frac34;",
	"⅕": "&frac15;",
	"⅙": "&frac16;",
	"⅛": "&frac18;",
	Ä: "&Auml;",
	Ë: "&Euml;",
	Ï: "&Iuml;",
	Ö: "&Ouml;",
	Ü: "&Uuml;",
	ä: "&auml;",
	ë: "&euml;",
	ï: "&iuml;",
	ö: "&ouml;",
	ü: "&uuml;",
	ß: "&szlig;",
	α: "&alpha;",
	β: "&beta;",
	γ: "&gamma;",
	δ: "&delta;",
	ε: "&epsi;",
	θ: "&theta;",
	λ: "&lambda;",
	μ: "&mu;",
	π: "&pi;",
	σ: "&sigma;",
	τ: "&tau;",
	φ: "&phi;",
	ω: "&omega;",
	Δ: "&Delta;",
	Ω: "&Omega;",
	"∞": "&infin;",
	"±": "&plusmn;",
	"⨯": "&Cross;",
	"°": "&deg;",
	"∑": "&sum;",
	"∏": "&prod;",
	"∫": "&int;",
	"√": "&radic;",
	"∠": "&angle;",
	"∧": "&and;",
	"∨": "&or;",
	"∩": "&cap;",
	"∪": "&cup;",
	"⊂": "&sub;",
	"⊃": "&sup;",
	"∈": "&isin;",
	"∉": "&notin;",
	"∅": "&empty;",
	"⊕": "&oplus;",
	"⊖": "&ominus;",
	"⊗": "&otimes;",
	"⌖": "&target;",
	"☆": "&star;",
	"★": "&starf;",
	"✓": "&check;",
	"✗": "&cross;",
	"\xa0": "&nbsp;",
};

export const RE_ENTITIES = new RegExp(
	`[${Object.keys(ENTITIES).join("")}]`,
	"gu"
);

export const ENTITIES_REV = Object.entries(ENTITIES).reduce(
	(acc, [k, v]) => ((acc[v] = k), acc),
	<Record<string, string>>{}
);

export const RE_ENTITIES_REV = new RegExp(
	`(${Object.keys(ENTITIES_REV).join("|")})`,
	"g"
);

export const RE_ENTITIES_NUM = /&#(x?)([0-9a-f]+);/gi;

/**
 * Replaces all occurrences of character keys in {@link ENTITIES} with their
 * named HTML entities.
 *
 * @remarks
 * Only use this function when targetting HTML output. For XML/SVG etc. use
 * {@link escapeEntitiesNum}.
 *
 * @param src
 */
export const escapeEntities = (src: string) =>
	src.replace(RE_ENTITIES, (x) => ENTITIES[x]);

/**
 * Similar to {@link escapeEntities}, but only uses _named_ entities for `&`,
 * `<`, `>`, `'`, `"` and numeric entities for all others.
 *
 * @remarks
 * This function is used as default by thi.ng/hiccup `serialize()` to escape
 * characters and ensure compatibility with XML (which by default only supports
 * named entities for the above 5 characters).
 *
 * @param src
 */
export const escapeEntitiesNum = (src: string) =>
	src.replace(RE_ENTITIES, (x) => {
		const code = x.charCodeAt(0);
		return code < 128 ? ENTITIES[x] : `&#x${code.toString(16)};`;
	});

/**
 * Replace all known named and numeric entities with their original characters.
 * Opposite op of {@link escapeEntities} and {@link escapeEntitiesNum}.
 *
 * @param src
 */
export const unescapeEntities = (src: string) =>
	src
		.replace(RE_ENTITIES_REV, (x) => ENTITIES_REV[x])
		.replace(RE_ENTITIES_NUM, (_, hex, x) =>
			String.fromCharCode(parseInt(x, hex ? 16 : 10))
		);
