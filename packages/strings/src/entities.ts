export const ENTITIES: Record<string, string> = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&apos;",
	"—": "&mdash;",
	"–": "&ndash;",
	"…": "&hellip;",
	"¢": "&cent;",
	"€": "&euro;",
	"£": "&pound;",
	"§": "&sect;",
	"©": "&copy;",
	"®": "&reg;",
	"™": "&trade;",
	"\xa0": "&nbsp;",
};

export const RE_ENTITIES = new RegExp(
	`[${Object.keys(ENTITIES).join("")}]`,
	"g"
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
