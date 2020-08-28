import { readdirSync } from "fs";
import { META_FIELD } from "../api";
import { CONFIG } from "../config";
import { readJSON } from "../io";
import { thumb } from "./asset";
import { link } from "./link";
import { shortName } from "./package";
import { table } from "./table";

export const examplesTable = (pkgName: string) => {
    const examples = [];
    let hasImg = false;
    for (let ex of readdirSync(CONFIG.exampleDir)) {
        try {
            const expkg = readJSON(`${CONFIG.exampleDir}/${ex}/package.json`);
            const meta = expkg[META_FIELD] || {};
            const explicitInclude =
                Array.isArray(meta.readme) &&
                meta.readme.includes(shortName(pkgName));
            if (
                explicitInclude ||
                (meta.readme === true &&
                    expkg.dependencies &&
                    expkg.dependencies[pkgName])
            ) {
                hasImg = !!meta.screenshot || hasImg;
                const body = {
                    img: meta.screenshot ? thumb(meta.screenshot) : "",
                    desc: expkg.description || "",
                    demo:
                        meta.online !== false
                            ? link("Demo", `${CONFIG.demoURL}/${expkg.name}/`)
                            : "",
                    src: link(
                        "Source",
                        `${CONFIG.branchURL}/examples/${expkg.name}`
                    ),
                };
                examples.push(body);
            }
        } catch (_) {}
    }
    const headers = ["Screenshot", "Description", "Live demo", "Source"];
    const keys = ["img", "desc", "demo", "src"];
    if (!hasImg) {
        headers.shift();
        keys.shift();
    }
    return examples.length
        ? [
              "## Usage examples",
              "",
              "Several demos in this repo's",
              link("/examples", `${CONFIG.branchURL}/examples`),
              "directory are using this package.",
              "",
              "A selection:",
              "",
              table(headers, <any>keys, examples),
          ].join("\n")
        : null;
};
