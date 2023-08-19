import type {
	Attribs,
	AttribVal,
	BooleanAttrib,
	CDataContent,
	CORSAttribs,
	ImportanceAttribs,
	MultiStringAttrib,
	ReferrerAttribs,
	RelAttribs,
	StringAttrib,
} from "./api.js";
import { defElement, defElements } from "./def.js";

export const [head, title] = defElements(["head", "title"]);

export interface BaseAttribs extends Attribs {
	href: StringAttrib;
	target: StringAttrib;
}

export const base = defElement<Partial<BaseAttribs>, never>("base");

export interface MetaAttribs extends Attribs {
	charset: StringAttrib;
	content: StringAttrib;
	"http-equiv": AttribVal<
		| "content-language"
		| "content-security-policy"
		| "content-type"
		| "default-style"
		| "refresh"
		| "set-cookie"
		| "x-ua-compatible"
	>;
	name: AttribVal<
		| "application-name"
		| "author"
		| "color-scheme"
		| "creator"
		| "description"
		| "generator"
		| "googlebot"
		| "keywords"
		| "publisher"
		| "referrer"
		| "robots"
		| "theme-color"
		| "viewport"
	>;
}

export const meta = defElement<Partial<MetaAttribs>, never>("meta");

export interface ViewportOpts {
	/**
	 * If `< 0`, resolves to `device-width`
	 */
	width: number;
	/**
	 * If `< 0`, resolves to `device-height`
	 */
	height: number;
	/**
	 * Minimum scale
	 */
	min: number;
	/**
	 * Maximum scale
	 */
	max: number;
	/**
	 * Initial scale (default: 1)
	 */
	init: number;
	/**
	 * User-scalable (default: true)
	 */
	user: boolean;
	fit: "auto" | "cover" | "contain";
}

export const metaViewport = (opts: Partial<ViewportOpts> = {}) =>
	meta({
		name: "viewport",
		content: [
			opts.width &&
				`width=${opts.width < 0 ? "device-width" : opts.width}`,
			opts.height &&
				`height=${opts.height < 0 ? "device-height" : opts.height}`,
			`initial-scale=${opts.init || 1}`,
			opts.min && `minimum-scale=${opts.min}`,
			opts.max && `maximum-scale=${opts.max}`,
			`user-scalable=${opts.user !== false ? "yes" : "no"}`,
			opts.fit != null && `viewport-fit=${opts.fit}`,
		]
			.filter((x) => !!x)
			.join(","),
	});

export const metaRobots = (
	type:
		| "index"
		| "noindex"
		| "follow"
		| "nofollow"
		| "none"
		| "noarchive"
		| "nosnippet"
		| "noimageindex"
		| "nocache"
) => meta({ name: "robots", content: type });

export const metaReferrer = (
	type:
		| "no-referrer-when-downgrade"
		| "no-referrer"
		| "origin-when-cross-origin"
		| "origin"
		| "same-origin"
		| "strict-origin-when-cross-origin"
		| "strict-origin"
		| "unsafe-URL"
) => meta({ name: "referrer", content: type });

export const metaRefresh = (delay: number, url?: string) =>
	meta({
		"http-equiv": "refresh",
		content: url ? `${delay}; url=${url}` : String(delay),
	});

export const metaUTF8 = () => meta({ charset: "utf-8" });

export const metaXUA = () =>
	meta({ "http-equiv": "x-ua-compatible", content: "IE=edge" });

export interface LinkAttribs
	extends RelAttribs,
		CORSAttribs,
		ImportanceAttribs,
		ReferrerAttribs {
	as: AttribVal<
		| "audio"
		| "document"
		| "embed"
		| "fetch"
		| "font"
		| "image"
		| "object"
		| "script"
		| "style"
		| "track"
		| "video"
		| "worker"
	>;
	disabled: BooleanAttrib;
	href: StringAttrib;
	hreflang: StringAttrib;
	integrity: StringAttrib;
	media: StringAttrib;
	sizes: MultiStringAttrib;
	type: StringAttrib;
}

export const link = defElement<Partial<LinkAttribs>, never>("link");

export const linkCSS = (href: string) => link({ href, rel: "stylesheet" });

export interface StyleAttribs extends Attribs {
	media: StringAttrib;
	nonce: StringAttrib;
	type: StringAttrib;
}

export const style = defElement<Partial<StyleAttribs>, string | CDataContent>(
	"style",
	{
		type: "text/css",
	}
);

export interface ScriptAttribs extends Attribs, CORSAttribs, ReferrerAttribs {
	async: BooleanAttrib;
	defer: BooleanAttrib;
	integrity: StringAttrib;
	nomodule: BooleanAttrib;
	nonce: StringAttrib;
	src: StringAttrib;
	type: StringAttrib;
}

export const script = defElement<Partial<ScriptAttribs>, string | CDataContent>(
	"script"
);
