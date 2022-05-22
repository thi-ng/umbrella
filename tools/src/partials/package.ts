import { readJSON, readText } from "@thi.ng/file-io";
import { bytes, camel } from "@thi.ng/strings";
import { execSync } from "child_process";
import { readdirSync } from "fs";
import { META_FIELD, Package, RE_PKG } from "../api.js";
import { CONFIG } from "../config.js";
import { link } from "./link.js";
import { list } from "./list.js";

export const shortName = (name: string) => name.split("/")[1];

export const packageURL = (name: string) => `https://${name.substring(1)}`;

export const isNodeOnly = (pkg: Package) =>
    pkg.keywords ? pkg.keywords.includes("node-only") : false;

export const isWebModule = (pkg: Package) =>
    !isNodeOnly(pkg) && pkg[META_FIELD]?.skypack !== false;

export const pkgLink = (name: string) =>
    link(name, `${CONFIG.branchURL}/packages/${shortName(name)}`);

export const packageList = (pkgShortNames: string[], title: string) => {
    const items = [];
    for (let p of pkgShortNames) {
        try {
            const pkg = readJSON(`../${p}/package.json`);
            items.push(
                pkgLink(pkg.name) +
                    " - " +
                    pkg.description.replace(RE_PKG, pkgLink)
            );
        } catch (_) {
            console.log(`error reading support pkg: ${p}`);
        }
    }
    return items.length > 0 ? `### ${title}\n\n${list(items)}` : "";
};

export const supportPackages = (pkgName: string) => {
    const pkgShortName = shortName(pkgName);
    return packageList(
        readdirSync("../").filter((x) => x.startsWith(pkgShortName + "-")),
        "Support packages"
    );
};

export const relatedPackages = (pkgShortNames: string[] = []) =>
    packageList(pkgShortNames, "Related packages");

export const packageDesc = (pkg: Package) => {
    const desc = pkg.description.replace(RE_PKG, pkgLink) + ".";
    const parent = (pkg[META_FIELD] || {}).parent;
    return parent && desc.indexOf(parent) == -1
        ? `${desc} This is a support package for ${pkgLink(parent)}.`
        : desc;
};

export const packageDeps = (pkg: Package) => {
    const deps = Object.keys(pkg.dependencies || {})
        .sort()
        .map(pkgLink);
    return deps.length ? list(deps) : "None";
};

export const packageStatus = (pkgName: string, id = "stable") => {
    const status = CONFIG.statuses[id];
    const name = shortName(pkgName);
    return [
        "### Status",
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
            res.push(`${id.toUpperCase()}: ${bytes(meta[id].gzip)}`);
        }
        return "Package sizes (gzipped, pre-treeshake): " + res.join(" / ");
    } catch (_) {
        return "";
    }
};

export const packageBanner = (name: string) => {
    name = shortName(name);
    const sha1 = execSync(`shasum ${CONFIG.bannerBasePath}${name}.svg`)
        .toString()
        .substr(0, 8);
    return `![${name}](${CONFIG.bannerURL}${name}.svg?${sha1})`;
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

\`\`\`text
# with flag only for < v16
node --experimental-repl-await

> const ${camel(shortName(pkg.name))} = await import("${pkg.name}");
\`\`\`\n`,
    ].join("\n");

export const packageCitation = (name: string) => {
    let hasAuthors = false;
    try {
        hasAuthors = !!readText("./AUTHORS.md").length;
    } catch (_) {}
    return `If this project contributes to an academic publication, please cite it as:

\`\`\`bibtex
@misc{thing-${shortName(name)},
  title = "${name}",
  author = "${CONFIG.mainAuthor}${hasAuthors ? " and others" : ""}",
  note = "${packageURL(name)}",
  year = ${CONFIG.meta.year}
}
\`\`\``;
};
