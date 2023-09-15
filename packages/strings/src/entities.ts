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

const $esc = (re: RegExp, index: Record<string, string>) => (src: string) =>
	src.replace(re, (x) => index[x]);

export const escapeEntities = $esc(RE_ENTITIES, ENTITIES);

export const unescapeEntities = (src: string) =>
	src
		.replace(RE_ENTITIES_REV, (x) => ENTITIES_REV[x])
		.replace(RE_ENTITIES_NUM, (_, hex, x) =>
			String.fromCharCode(parseInt(x, hex ? 16 : 10))
		);
