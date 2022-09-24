import type { Fn0, IObjectOf, Nullable } from "@thi.ng/api";
import { readText, writeText } from "@thi.ng/file-io";
import { LOGGER, RE_PARTIAL } from "./api.js";
import { CONFIG, initConfig } from "./config.js";
import { blogPosts } from "./partials/blog.js";
import { docLink } from "./partials/docs.js";
import { examplesTable } from "./partials/examples.js";
import { copyright } from "./partials/license.js";
import {
	packageBanner,
	packageCitation,
	packageDeps,
	packageDesc,
	packageInstallation,
	packageSize,
	packageStatus,
	relatedPackages,
	supportPackages,
} from "./partials/package.js";
import { authors } from "./partials/user.js";
import { injectTOC } from "./toc.js";

try {
	initConfig("../../tools/config.json", "./package.json");

	const partials: IObjectOf<string | Fn0<Nullable<string>>> = {
		"pkg.name": CONFIG.root.name,
		"pkg.version": CONFIG.root.version,
		"pkg.description": () => packageDesc(CONFIG.root),
		"pkg.deps": () => packageDeps(CONFIG.root),
		"pkg.size": packageSize,
		"pkg.banner": () => packageBanner(CONFIG.root.name),
		"pkg.install": () => packageInstallation(CONFIG.root),
		"pkg.cite": () => packageCitation(CONFIG.root.name),
		status: () => packageStatus(CONFIG.root.name, CONFIG.meta.status),
		examples: () => examplesTable(CONFIG.root.name),
		supportPackages: () => supportPackages(CONFIG.root.name),
		relatedPackages: () => relatedPackages(CONFIG.meta.related),
		blogPosts: () => blogPosts(CONFIG.meta.blog),
		docLink: () => docLink(CONFIG.root.name),
		copyright: () => copyright(CONFIG.meta.year, CONFIG.mainAuthor),
		license: CONFIG.license,
		authors,
	};

	let readme = readText("./tpl.readme.md", LOGGER)
		.replace(RE_PARTIAL, (orig, id) => {
			if (!partials.hasOwnProperty(id)) {
				console.warn(`skipping unsupported tpl ID: "${id}"`);
				return orig;
			}
			const part = partials[id];
			return (typeof part === "function" ? part() : part) || "";
		})
		.replace(/\n{3,}/g, "\n\n");
	readme = injectTOC(readme);
	readme = "<!-- This file is generated - DO NOT EDIT! -->\n\n" + readme;

	writeText("./README.md", readme, LOGGER);
} catch (e) {
	console.log((<Error>e).message);
	process.exit(1);
}
