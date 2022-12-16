import type { Fn, IObjectOf } from "@thi.ng/api";
import { isString } from "@thi.ng/checks/is-string";
import type { TemplateFn } from "../api.js";
import { link, list } from "./markdown.js";

export interface Package {
	name: string;
	description: string;
	version: string;
	author: string | User;
	license: string;
	homepage: string;
	contributors?: (string | User)[];
	dependencies?: IObjectOf<string>;
	devDependencies?: IObjectOf<string>;
	keywords?: string[];
}

export interface User {
	name: string;
	email?: string;
	url?: string;
}

export const LICENSES: IObjectOf<{ name: string; url: string }> = {
	"Apache-2.0": {
		name: "Apache License 2.0",
		url: "https://spdx.org/licenses/Apache-2.0.html",
	},
	"BSD-2-Clause": {
		name: 'BSD 2-Clause "Simplified" License',
		url: "https://spdx.org/licenses/BSD-2-Clause.html",
	},
	"BSD-3-Clause": {
		name: 'BSD 3-Clause "New" or "Revised" License',
		url: "https://spdx.org/licenses/BSD-3-Clause.html",
	},
	"CC-BY-4.0": {
		name: "Creative Commons Attribution 4.0 International",
		url: "https://spdx.org/licenses/CC-BY-4.0.html",
	},
	"CC-BY-NC-4.0": {
		name: "Creative Commons Attribution Non Commercial 4.0 International",
		url: "https://spdx.org/licenses/CC-BY-NC-4.0.html",
	},
	"CC-BY-NC-ND-4.0": {
		name: "Creative Commons Attribution Non Commercial No Derivatives 4.0 International",
		url: "https://spdx.org/licenses/CC-BY-NC-ND-4.0.html",
	},
	"CC-BY-NC-SA-4.0": {
		name: "Creative Commons Attribution Non Commercial Share Alike 4.0 International",
		url: "https://spdx.org/licenses/CC-BY-NC-SA-4.0.html",
	},
	"CC-BY-ND-4.0": {
		name: "Creative Commons Attribution No Derivatives 4.0 International",
		url: "https://spdx.org/licenses/CC-BY-ND-4.0.html",
	},
	"CC-BY-SA-4.0": {
		name: "Creative Commons Attribution Share Alike 4.0 International",
		url: "https://spdx.org/licenses/CC-BY-SA-4.0.html",
	},
	"CPAL-1.0": {
		name: "Common Public Attribution License 1.0",
		url: "https://spdx.org/licenses/CPAL-1.0.html",
	},
	"CPL-1.0": {
		name: "Common Public License 1.0",
		url: "https://spdx.org/licenses/CPL-1.0.html",
	},
	"ECL-2.0": {
		name: "Educational Community License v2.0",
		url: "https://spdx.org/licenses/ECL-2.0.html",
	},
	"EPL-2.0": {
		name: "Eclipse Public License 2.0",
		url: "https://spdx.org/licenses/EPL-2.0.html",
	},
	EUDatagrid: {
		name: "EU DataGrid Software License",
		url: "https://spdx.org/licenses/EUDatagrid.html",
	},
	"EUPL-1.2": {
		name: "European Union Public License 1.2",
		url: "https://spdx.org/licenses/EUPL-1.2.html",
	},
	"GFDL-1.3-or-later": {
		name: "GNU Free Documentation License v1.3 or later",
		url: "https://spdx.org/licenses/GFDL-1.3-or-later.html",
	},
	"GPL-3.0-or-later": {
		name: "GNU General Public License v3.0 or later",
		url: "https://spdx.org/licenses/GPL-3.0-or-later.html",
	},
	ISC: { name: "ISC License", url: "https://spdx.org/licenses/ISC.html" },
	"LGPL-3.0-or-later": {
		name: "GNU Lesser General Public License v3.0 or later",
		url: "https://spdx.org/licenses/LGPL-3.0-or-later.html",
	},
	MIT: { name: "MIT License", url: "https://spdx.org/licenses/MIT.html" },
	"MPL-2.0": {
		name: "Mozilla Public License 2.0",
		url: "https://spdx.org/licenses/MPL-2.0.html",
	},
	"OFL-1.1": {
		name: "SIL Open Font License 1.1",
		url: "https://spdx.org/licenses/OFL-1.1.html",
	},
	Unlicense: {
		name: "The Unlicense",
		url: "https://spdx.org/licenses/Unlicense.html",
	},
	"UPL-1.0": {
		name: "Universal Permissive License v1.0",
		url: "https://spdx.org/licenses/UPL-1.0.html",
	},
	Zlib: { name: "zlib License", url: "https://spdx.org/licenses/Zlib.html" },
};

/**
 * Returns the unscoped name of a package, i.e. the name without the package's
 * group ID (if any).
 *
 * @param name
 */
export const shortName = (name: string) => {
	const idx = name.indexOf("/");
	return idx > 0 ? name.substring(idx + 1) : name;
};

/**
 * Returns name of the author, given in any format supported by NPM.
 *
 * @param author
 */
export const author = (author: string | User) =>
	isString(author) ? author.split(/\s*[<\(]/)[0] : author.name;

/**
 * Similar to {@link author}, but if an URL is available, returns a Markdown
 * link to the author's URL, else just the name.
 *
 * @param author
 */
export const authorLink = (author: string | User) => {
	if (isString(author)) {
		const [name, a, b] = author.split(/\s*[<\(]/);
		const href = b ? (b[b.length - 1] == ")" ? b : a) : a ? a : "";
		return href.length && href[href.length - 1] === ")"
			? link(name, href.substring(0, href.length - 1))
			: name;
	}
	return author.url ? link(author.name, author.url) : author.name;
};

/**
 * Formats the {@link Package.contributors} as Markdown list.
 *
 * @param people
 * @param eol
 */
export const contributors = (people: (string | User)[], eol = "\n") =>
	list(people.map(author), eol);

/**
 * Similar to {@link contributors}, but formatted as list of links.
 *
 * @param people
 * @param eol
 */
export const contributorLinks = (people: (string | User)[], eol = "\n") =>
	list(people.map(authorLink), eol);

/**
 * Returns the name for given SPDX license ID (only those in
 * {@link LICENSES} are supported).
 *
 * @param spdxID
 */
export const license = (spdxID: string) =>
	LICENSES[spdxID].name || `${spdxID} license`;

/**
 * Similar to {@link license}, but returns Markdown link to license.
 *
 * @param spdxID
 */
export const licenseLink = (spdxID: string) => {
	const license = LICENSES[spdxID];
	return license ? link(license.name, license.url) : `${spdxID} license`;
};

export interface PackageTemplateOpts {
	/**
	 * Headline for list of contributors (only used if any present).
	 */
	hdContributors: string;
}

export type PackageTemplates<T> = Record<
	| "pkg.name"
	| "pkg.shortName"
	| "pkg.version"
	| "pkg.description"
	| "pkg.link"
	| "pkg.author"
	| "pkg.authorLink"
	| "pkg.contributors"
	| "pkg.contributorLinks"
	| "pkg.allAuthors"
	| "pkg.allAuthorLinks"
	| "pkg.license"
	| "pkg.licenseLink",
	TemplateFn<T>
>;

/**
 * Higher order function returning various useful NPM package.json related
 * templates. The user provided `pkg` function is used to look up the loaded
 * {@link Package} data within the {@link TranscludeCtx.user} object.
 *
 * @param pkg
 * @param opts
 */
export const packageTemplates = <T = any>(
	pkg: Fn<T, Package>,
	opts?: Partial<PackageTemplateOpts>
) => {
	const $opts = {
		hdContributors: "### Contributors\n\n",
		...opts,
	};
	const tpls: PackageTemplates<T> = {
		"pkg.name": ({ user }) => pkg(user).name,
		"pkg.shortName": ({ user }) => shortName(pkg(user).name),
		"pkg.version": ({ user }) => "v" + pkg(user).version,
		"pkg.description": ({ user }) => pkg(user).description,
		"pkg.link": ({ user }) => link(pkg(user).name, pkg(user).homepage),
		"pkg.author": ({ user }) => author(pkg(user).author),
		"pkg.authorLink": ({ user }) => authorLink(pkg(user).author),
		"pkg.contributors": ({ user, eol }) => {
			const people = pkg(user).contributors;
			return people
				? $opts.hdContributors + contributors(people, eol)
				: "";
		},
		"pkg.contributorLinks": ({ user, eol }) => {
			const people = pkg(user).contributors;
			return people
				? $opts.hdContributors + contributorLinks(people, eol)
				: "";
		},
		"pkg.allAuthors": ({ user, eol }) => {
			const $pkg = pkg(user);
			const $author = author($pkg.author);
			const res = [];
			if ($pkg.contributors) {
				res.push(
					$author + " (Main author)",
					...$pkg.contributors.map(author)
				);
			} else {
				res.push($author);
			}
			return list(res, eol);
		},
		"pkg.allAuthorLinks": ({ user, eol }) => {
			const $pkg = pkg(user);
			const $author = authorLink($pkg.author);
			const res = [];
			if ($pkg.contributors) {
				res.push(
					$author + " (Main author)",
					...$pkg.contributors.map(authorLink)
				);
			} else {
				res.push($author);
			}
			return list(res, eol);
		},
		"pkg.license": ({ user }) => license(pkg(user).license),
		"pkg.licenseLink": ({ user }) => licenseLink(pkg(user).license),
	};
	return tpls;
};
