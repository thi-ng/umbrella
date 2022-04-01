import { repeat } from "./repeat.js";

const nextTab = (x: number, tabSize: number) =>
    Math.floor((x + tabSize) / tabSize) * tabSize;

/**
 * Multi-line version of {@link tabsToSpacesLine}.
 *
 * @example
 * ```ts
 * console.log(
 *   tabsToSpaces("0\t1\t2", 10)
 *   + "\n" +
 *   tabsToSpaces("0\t45\t890\t\t6\t0")
 *   + "\n" +
 *   tabsToSpaces("^\t^\t^\t^\t^\t^")
 * );
 * // 0         1         2
 * // 0   45  890     6   0
 * // ^   ^   ^   ^   ^   ^
 * ```
 *
 * @param src -
 * @param tabSize -
 */
export const tabsToSpaces = (src: string, tabSize = 4) =>
    src
        .split(/\r?\n/g)
        .map((line) => tabsToSpacesLine(line, tabSize))
        .join("\n");

/**
 * Takes a single line string and converts all tab characters to spaces, using
 * given `tabSize`.
 *
 * @param line -
 * @param tabSize -
 */
export const tabsToSpacesLine = (line: string, tabSize = 4) => {
    let res = "";
    let words = line.split(/\t/g);
    let n = words.length - 1;
    for (let i = 0; i < n; i++) {
        const w = words[i];
        res += w;
        res += repeat(" ", nextTab(res.length, tabSize) - res.length);
    }
    res += words[n];
    return res;
};

/**
 * Multi-line version of {@link spacesToTabsLine}.
 *
 * @param src -
 * @param tabSize -
 */
export const spacesToTabs = (src: string, tabSize = 4) =>
    src
        .split(/\r?\n/g)
        .map((line) => spacesToTabsLine(line, tabSize))
        .join("\n");

/**
 * Takes a single line string and converts all tab characters to spaces, using
 * given `tabSize`. Inverse op of {@link tabsToSpacesLine}.
 *
 * @param line -
 * @param tabSize -
 */
export const spacesToTabsLine = (line: string, tabSize = 4) => {
    const re = /\s{2,}/g;
    let i = 0;
    let res = "";
    let m: RegExpExecArray | null;
    while ((m = re.exec(line))) {
        const numSpaces = m[0].length;
        res += line.substring(i, m.index);
        i = m.index;
        const end = m.index + numSpaces;
        while (i < end) {
            const j = nextTab(i, tabSize);
            if (j <= end) {
                res += "\t";
                i = j;
            } else {
                res += repeat(" ", end - i);
                i = end;
            }
        }
        i = end;
    }
    return res + line.substring(i);
};
