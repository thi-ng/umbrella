// SPDX-License-Identifier: Apache-2.0
import type { IObjectOf } from "@thi.ng/api";
import { ConsoleLogger, LogLevel, type LogLevelName } from "@thi.ng/logger";
import type { Package as $Package } from "@thi.ng/transclude";

export const RE_PKG = /@thi\.ng\/[a-z0-9-]+/g;
export const RE_USER = /@([a-z0-9_-]+)/gi;
export const RE_PARTIAL = /\$\{([a-z.]+)\}/gi;
export const RE_IS_HEADING = /^#{2,4}\s/;
export const RE_HEADING = /^(#{2,4})\s(.+)/;
export const PATTERN_TOC = "<!-- TOC -->";
export const PATTERN_NO_TOC = "<!-- NOTOC -->";

export const META_FIELD = "thi.ng";

export const LOGGER = new ConsoleLogger(
	"tools",
	process.env.LOG_LEVEL
		? LogLevel[<LogLevelName>process.env.LOG_LEVEL]
		: LogLevel.INFO
);

export interface BaseConfig {
	repoURL: string;
	userURL: string;
	assetURL: string;
	bannerURL: string;
	bannerBasePath: string;
	demoURL: string;
	docURL: string;
	exampleDir: string;
	mainAuthor: string;
	license: string;
	pkgScope: string;
	statuses: IObjectOf<string>;
}

export interface Config extends BaseConfig {
	root: Package;
	meta: PackageMeta;
	branchURL: string;
}

export interface Package extends $Package {
	[META_FIELD]?: Partial<PackageMeta>;
}

export interface PackageMeta {
	/**
	 * Package name alias/abbreviation. If not given, an abbreviation will be
	 * generated automatically. Currently only used for readme generation
	 * (install instructions).
	 */
	alias: string;
	/**
	 * List of blog post URLs about this package.
	 */
	blog: BlogPost[];
	/**
	 * Custom Git branch for shortlinks.
	 */
	branch: string;
	/**
	 * Only used for examples. Custom demo URL.
	 */
	demo: string;
	/**
	 * Only used for examples. If false, this example will not be uploaded.
	 */
	online: boolean;
	/**
	 * Full name of the parent package (only used for support pkgs).
	 */
	parent: string;
	/**
	 * Only used for examples. List of package names to force include this
	 * example in their readme's. If `false` example will NOT be included
	 * anywhere.
	 */
	readme: string[] | boolean;
	/**
	 * Short names of related pacakges.
	 */
	related: string[];
	/**
	 * Screenshot URL
	 */
	screenshot: string;
	/**
	 * Flag to indicate this package has no thi.ng short URL
	 */
	shortlink: boolean;
	/**
	 * Flag/hint to skip processing this package (tool dependent)
	 */
	skip: boolean;
	/**
	 * Project status. One of configured options in `config.json`
	 */
	status: string;
	/**
	 * Search tag to use for demo.thi.ng/umbrella/thing-browser/. Currently only
	 * used for links to this browser from the unified doc page.
	 */
	tag: string;
	/**
	 * Year the package was started
	 *
	 * @defaultValue 2016
	 */
	year: number;
}

export interface BlogPost {
	title: string;
	url: string;
}
