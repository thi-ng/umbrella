import {
    assocObj,
    comp,
    filter,
    iterator,
    map,
    mapcat,
    multiplex,
    partitionBy,
    transduce,
    tuples
} from "@thi.ng/transducers";
import { execSync } from "child_process";
import { resolve } from "path";

import { Commit } from "./api";

/**
 * Calls out to git to retrieve raw log string.
 *
 * @param repoPath
 */
const gitLog = (repoPath: string) =>
    execSync(
        `git log --pretty=format:"%ad~~%an~~%h~~%s" --shortstat --date=iso-strict`,
        { cwd: resolve(repoPath) }
    ).toString().trim();

/**
 * Transforms 1st line of a raw commit log into a partial commit
 * object.
 *
 * @param log
 */
const parseLog = ([log]: string[]): Partial<Commit> => {
    const [date, author, sha, msg] = log.split("~~");
    return { date, author, sha, msg };
};

/**
 * Transforms 2nd line (if present) of a raw commit log into a partial
 * commit object.
 *
 * @param log
 */
const parseStats = ([_, stats]: string[]): Partial<Commit> =>
    stats ?
        transduce(
            map(([k, v]) => [k, parseInt(v)]),
            assocObj(),
            tuples(["files", "add", "del"], stats.split(","))
        ) :
        null;

/**
 * Retrieves git log for given `repoPath` and transforms it into an
 * iterable of `Commit` objects.
 *
 * @param repoPath
 */
export const repoCommits = (repoPath: string) =>
    iterator(
        comp(
            map(gitLog),
            mapcat((x: string) => x.split("\n")),
            partitionBy((x) => x.indexOf("~~Merge ") !== -1 ? 2 : x.length > 0 ? 1 : 0),
            filter((x) => x[0].length > 0),
            multiplex(
                map(parseLog),
                map(parseStats)
            ),
            map(([log, stats]) => <Commit>{ ...log, ...stats })
        ),
        repoPath
    );
