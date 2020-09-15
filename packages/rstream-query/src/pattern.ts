import { repeatedly } from "@thi.ng/transducers";
import type { PathPattern, Pattern } from "./api";
import { autoQVar, isQVar, qvarName } from "./qvar";

export const patternVarCount = (p: Pattern) => {
    let n = 0;
    if (isQVar(p[0])) n++;
    if (isQVar(p[1])) n++;
    if (isQVar(p[2])) n++;
    return n;
};

export const patternVars = ([s, p, o]: Pattern) => {
    const vars = [];
    isQVar(s) && vars.push(qvarName(s));
    isQVar(p) && vars.push(qvarName(p));
    isQVar(o) && vars.push(qvarName(o));
    return vars;
};

/**
 * Takes a path triple pattern and max depth. The pattern's predicate
 * must be a seq of preds. Returns a 2-elem vector [patterns vars],
 * where `patterns` is a list of generated sub-query patterns with
 * injected temp qvars for in between patterns and `vars` are the temp
 * qvars themselves.
 *
 * Example:
 *
 * ```
 * ["?s", [p1, p2, p3], "?o"] =>
 * [
 *   [["?s", p1, "?__q0"], ["?__q0", p2, "?__q1"], ["?__q1", p3, "?o"] ],
 *   ["?__q0", "?__q1"]
 * ]
 * ```
 *
 * @param pattern -
 * @param maxLen -
 */
export const resolvePathPattern = (
    [s, p, o]: PathPattern,
    maxLen = p.length
): [Pattern[], string[]] => {
    const res: Pattern[] = [];
    const avars = [...repeatedly(autoQVar, maxLen - 1)];
    for (let i = 0; i < maxLen; i++) {
        res.push([s, p[i % p.length], (s = avars[i])]);
    }
    res[res.length - 1][2] = o;
    return [res, avars];
};

export const sortPatterns = (patterns: Pattern[]) =>
    patterns.sort((a, b) => patternVarCount(a) - patternVarCount(b));
