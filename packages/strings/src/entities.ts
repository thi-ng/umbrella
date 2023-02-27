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
	"§": "&sect;",
	"¶": "&para;",
	"©": "&copy;",
	"®": "&reg;",
	"™": "&trade;",
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

const $esc = (re: RegExp, index: Record<string, string>) => (src: string) =>
	src.replace(re, (x) => index[x]);

export const escapeEntities = $esc(RE_ENTITIES, ENTITIES);

export const unescapeEntities = $esc(RE_ENTITIES_REV, ENTITIES_REV);
