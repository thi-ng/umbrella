import type { Fn0, IObjectOf, Nullable } from "@thi.ng/api";
import { writeFileSync } from "fs";
import { RE_PARTIAL } from "./api";
import { CONFIG, initConfig } from "./config";
import { readText } from "./io";
import { blogPosts } from "./partials/blog";
import { docLink } from "./partials/docs";
import { examplesTable } from "./partials/examples";
import { copyright } from "./partials/license";
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
} from "./partials/package";
import { authors } from "./partials/user";
import { injectTOC } from "./toc";

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

    let readme = readText("./tpl.readme.md")
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

    writeFileSync("./README.md", readme);
} catch (e) {
    console.log(e.message);
    process.exit(1);
}
