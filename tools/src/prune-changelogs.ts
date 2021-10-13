import { into } from "@thi.ng/arrays";
import { isArray, isString } from "@thi.ng/checks";
import { parse, serialize } from "@thi.ng/hiccup-markdown";
import {
    comp,
    filter,
    mapcat,
    mapcatIndexed,
    partitionWhen,
    push,
    transduce,
} from "@thi.ng/transducers";
import { writeFileSync } from "fs";
import { files, readText } from "./io.js";

const isBumpOnly = (entry: any[]) =>
    entry &&
    entry[0] === "p" &&
    isString(entry[3]) &&
    entry[3].startsWith(" Version bump only for package");

const isLog = (li: any[]) => isArray(li[3]) && li[3][0] === "strong";

/**
 * Convert nested lists within a single commit message (given as list item)
 *
 * @param msg
 */
const processLogMessage = (msg: any[]) => {
    if (msg[2].indexOf("   - ") === -1) return [msg];
    const [hd, ...parts] = msg[2].split("   - ");
    return [
        ["li", {}, hd],
        ["ul", {}, ...parts.map((x: string) => ["li", {}, x])],
    ];
};

/**
 * Merge items from consecutive commits (lists) and re-format lists from
 * *within* commit messages as nested lists.
 *
 * @param entry
 */
const mergeLists = (entry: any[]) => {
    for (let i = 0; i < entry.length - 1; i++) {
        if (entry[i][0] == "ul") {
            const items: any[] = entry[i].slice(2);
            let j = i + 1;
            for (; j < entry.length && entry[j][0] === "ul"; j++) {
                into(items, entry[j].slice(2));
            }
            for (let k = 0; k < items.length; k++) {
                if (isLog(items[k])) {
                    let m = k + 1;
                    let n = m;
                    while (n < items.length && !isLog(items[n])) n++;
                    // replace as nested list
                    if (n > m) {
                        items.splice(m, n - m, [
                            "ul",
                            {},
                            ...mapcat(processLogMessage, items.slice(m, n)),
                        ]);
                    }
                }
            }
            entry.splice(i, j - i, ["ul", {}, ...items]);
        }
    }
    return entry;
};

const addProcessedEntry = (res: any[], i: number, entry: any[]) =>
    into(
        res,
        mapcatIndexed(
            (j, a) => (i > 0 || (j > 0 && a[0][0] === "h") ? [["p"], a] : [a]),
            mergeLists(entry)
        )
    );

for (let f of files("packages", "CHANGELOG.md")) {
    console.log(f);
    const src =
        readText(f)
            .replace(/<a name="[a-z0-9.-]+"><\/a>\n/gm, "")
            .replace(/^\*\s+/gm, "- ") + "\n\n";
    const doc = transduce(
        comp(
            parse(),
            partitionWhen((x) => x[0] === "h1" || x[0] === "h2"),
            filter((x) => !!x)
        ),
        push<any[]>(),
        src
    );
    // writeFileSync(f + ".json", JSON.stringify(doc, null, 4));
    const res: any[] = [];
    for (let i = 0, n = doc.length; i < n; i++) {
        const a = doc[i];
        const b = doc[i + 1];
        if (b && isBumpOnly(a[1])) {
            const versionA = a[0][3][2].split(".");
            const versionB = (b[0][3] ? b[0][3][2] : b[0][2]).split(".");
            if (versionA[0] === versionB[0]) {
                console.log("prune", a[0][3][2]);
                continue;
            }
        }
        addProcessedEntry(res, i, a);
    }
    writeFileSync(
        // f.replace(/\.md$/, ".edit.md"),
        f,
        serialize(res, {}),
        "utf-8"
    );
}
