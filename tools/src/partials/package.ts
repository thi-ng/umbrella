import { isString } from "@thi.ng/checks";
import { readJSON, readText } from "@thi.ng/file-io";
import { bytes, camel } from "@thi.ng/strings";
import { execFileSync } from "child_process";
import { readdirSync } from "fs";
import { META_FIELD, RE_PKG, type Config, type Package } from "../api.js";
import { link } from "./link.js";
import { list } from "./list.js";

export const shortName = (name: string) => name.split("/")[1];

export const packageURL = (name: string) => `https://${name.substring(1)}`;

export const isNodeOnly = (pkg: Package) =>
	pkg.keywords ? pkg.keywords.includes("no-browser") : false;

export const isWebModule = (pkg: Package) =>
	!isNodeOnly(pkg) && pkg[META_FIELD]?.skypack !== false;

export const pkgLink = (config: Config, name: string) => {
	let url: string | undefined = undefined;
	if (name.startsWith(config.pkgScope)) {
		url = `${config.branchURL}/packages/${shortName(name)}`;
	} else {
		const { homepage, repository } = readJSON(
			`../../node_modules/${name}/package.json`
		);
		url = homepage;
		if (!url && repository) {
			url = isString(repository) ? repository : repository.url;
		}
	}
	return url ? link(name, url) : name;
};

export const packageList = (
	config: Config,
	pkgShortNames: string[],
	title: string
) => {
	const items = [];
	for (let p of pkgShortNames) {
		try {
			const pkg = readJSON(`../${p}/package.json`);
			items.push(
				pkgLink(config, pkg.name) +
					" - " +
					pkg.description.replace(RE_PKG, (x: string) =>
						pkgLink(config, x)
					)
			);
		} catch (_) {
			console.log(`error reading support pkg: ${p}`);
		}
	}
	return items.length > 0 ? `## ${title}\n\n${list(items)}` : "";
};

export const supportPackages = (config: Config, pkgName: string) => {
	const pkgShortName = shortName(pkgName);
	return packageList(
		config,
		readdirSync("../").filter((x) => x.startsWith(pkgShortName + "-")),
		"Support packages"
	);
};

export const relatedPackages = (config: Config, pkgShortNames: string[] = []) =>
	packageList(config, pkgShortNames, "Related packages");

export const packageDesc = (config: Config, pkg: Package) => {
	const desc =
		pkg.description.replace(RE_PKG, (x) => pkgLink(config, x)) + ".";
	const parent = (pkg[META_FIELD] || {}).parent;
	return parent && desc.indexOf(parent) == -1
		? `${desc} This is a support package for ${pkgLink(config, parent)}.`
		: desc;
};

export const packageDeps = (config: Config, pkg: Package) => {
	const deps = Object.keys(pkg.dependencies || {})
		.sort()
		.map((x) => pkgLink(config, x));
	return deps.length ? list(deps) : "None";
};

export const packageStatus = (
	config: Config,
	pkgName: string,
	id = "stable"
) => {
	const status = config.statuses[id];
	const name = shortName(pkgName);
	return [
		"## Status",
		"",
		`**${id.toUpperCase()}**${status ? " - " + status : ""}`,
		"",
		link(
			"Search or submit any issues for this package",
			`https://github.com/thi-ng/umbrella/issues?q=%5B${name}%5D+in%3Atitle`
		),
	].join("\n");
};

export const packageSize = () => {
	try {
		const meta = readJSON("./.meta/size.json");
		const res = [];
		for (let id in meta) {
			res.push(`${id.toUpperCase()}: ${bytes(meta[id].brotli)}`);
		}
		return "Package sizes (brotli'd, pre-treeshake): " + res.join(" / ");
	} catch (_) {
		return "";
	}
};

export const packageBanner = (config: Config, name: string) => {
	const $name = shortName(name);
	const sha1 = execFileSync("shasum", [
		`${config.bannerBasePath}${$name}.svg`,
	])
		.toString()
		.substring(0, 8);
	return `![${name}](${config.bannerURL}${$name}.svg?${sha1})`;
};

export const packageInstallation = (pkg: Package) =>
	[
		`\`\`\`bash
yarn add ${pkg.name}
\`\`\``,
		isWebModule(pkg)
			? `\nES module import:

\`\`\`html
<script type="module" src="https://cdn.skypack.dev/${pkg.name}"></script>
\`\`\`

[Skypack documentation](https://docs.skypack.dev/)\n`
			: "",
		`For Node.js REPL:

\`\`\`js
const ${camel(shortName(pkg.name))} = await import("${pkg.name}");
\`\`\`\n`,
	].join("\n");

export const packageCitation = (config: Config, name: string) => {
	let hasAuthors = false;
	try {
		hasAuthors = !!readText("./AUTHORS.md").length;
	} catch (_) {}
	return `If this project contributes to an academic publication, please cite it as:

\`\`\`bibtex
@misc{thing-${shortName(name)},
  title = "${name}",
  author = "${config.mainAuthor}${hasAuthors ? " and others" : ""}",
  note = "${packageURL(name)}",
  year = ${config.meta.year}
}
\`\`\``;
};
