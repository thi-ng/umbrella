export interface Item {
	id: string;
	desc: string;
	tags: string[];
	img?: string;
}

export const EXAMPLE_BASE_URL =
	"https://github.com/thi-ng/umbrella/tree/develop/examples";

export const DEMO_BASE_URL = "https://demo.thi.ng/umbrella";

export const ASSET_BASE_URL =
	"https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets";

export const GLOSSARY_URL = "https://github.com/thi-ng/umbrella/wiki/Glossary#";

export const DOCS_BASE_URL = "https://docs.thi.ng/umbrella";

export const WIKI_URL = "https://en.wikipedia.org/wiki/";

export const MAX_RELATED_TAGS = 10;

export const LINK_TARGET = "_blank";
