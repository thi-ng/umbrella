import type { IObjectOf } from "@thi.ng/api";
import { writeText } from "@thi.ng/file-io";
import {
	compactEmptyLines,
	packageTemplates,
	preincludeFile,
	tabsToSpaces,
	TemplateFn,
	toc,
	transcludeFile,
} from "@thi.ng/transclude";
import { execFileSync } from "child_process";
import { Config, LOGGER } from "./api.js";
import { CONFIG, initConfig } from "./config.js";
import { blogPosts } from "./partials/blog.js";
import { docLink } from "./partials/docs.js";
import { examplesTable } from "./partials/examples.js";
import { copyright } from "./partials/license.js";
import {
	packageBanner,
	packageCitation,
	packageDeps,
	packageInstallation,
	packageSize,
	packageStatus,
	relatedPackages,
	supportPackages,
} from "./partials/package.js";

try {
	initConfig("../../tools/config.json", "./package.json");

	const templates: IObjectOf<TemplateFn<Config>> = {
		...packageTemplates<Config>((x) => x.root),
		"pkg.deps": ({ user }) => packageDeps(user, user.root),
		"pkg.size": packageSize,
		"pkg.banner": ({ user }) => packageBanner(user, user.root.name),
		"pkg.install": ({ user }) => packageInstallation(user.root),
		"pkg.cite": ({ user }) => packageCitation(user, user.root.name),
		"pkg.copyright": ({ user }) => copyright(user.meta.year),
		"pkg.docs": ({ user }) => docLink(user.docURL, user.root.name),
		"repo.supportPackages": ({ user }) =>
			supportPackages(user, user.root.name),
		"repo.relatedPackages": ({ user }) =>
			relatedPackages(user, user.meta.related),
		"repo.examples": ({ user }) => examplesTable(user.root.name),
		"meta.blogPosts": ({ user }) =>
			user.meta.blog ? blogPosts(user.meta.blog) : "",
		"meta.status": ({ user }) =>
			packageStatus(user, user.root.name, user.meta.status),
	};
	const readme = transcludeFile<Config>("tpl.readme.md", {
		user: CONFIG,
		templates,
		logger: LOGGER,
		pre: [preincludeFile],
		post: [toc(), tabsToSpaces(), compactEmptyLines],
	}).src;

	writeText("./README.md", readme, LOGGER);

	if (/tangle:/.test(readme)) {
		LOGGER.info("tangling code blocks...");
		console.log(
			execFileSync("../../node_modules/.bin/tangle", [
				"tpl.readme.md",
			]).toString()
		);
	}
} catch (e) {
	console.log((<Error>e).message);
	process.exit(1);
}
