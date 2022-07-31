/**
 * Basic HTML document abstraction for hiccup serialization.
 * See ./html.ts for usage
 */
export interface HTMLDoc {
	lang?: string;
	head?: Partial<HTMLHead>;
	body: any[];
	/**
	 * This object will be passed to all component functions.
	 */
	ctx?: AppContext;
}

export interface HTMLHead {
	title: string;
	meta: any[];
	links: { rel: string; href: string }[];
	scripts: { src: string; type?: string }[];
	styles: string[];
}

/**
 * App context / config object.
 * Contains repo information & component styles
 */
export interface AppContext {
	repo: Repo;
	ui: {
		body: any;
		link: any;
		header: any;
		table: any;
		stats: any;
		search: any;
	};
}

export interface Repo {
	name: string;
	path: string;
	url: string;
}

/**
 * Data structure of a single commit.
 */
export interface Commit {
	sha: string;
	date: string;
	author: string;
	msg: string;
	files: number;
	add: number;
	del: number;
}
