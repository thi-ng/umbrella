export interface Item {
	id: string;
	desc: string;
	tags: string[];
	img?: string;
}

export const EXAMPLE_BASE_URL =
	"https://github.com/thi-ng/umbrella/tree/develop/examples";

export const ASSET_BASE_URL =
	"https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets";
