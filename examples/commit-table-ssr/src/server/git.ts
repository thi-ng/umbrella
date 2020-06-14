import {
    assocObj,
    comp,
    filter,
    iterator,
    map,
    mapcat,
    partitionBy,
    transduce,
    zip,
} from "@thi.ng/transducers";
import { execSync } from "child_process";
import { resolve } from "path";
import type { Commit } from "../common/api";

/**
 * Calls out to git to retrieve raw log string.
 *
 * @param repoPath
 */
const gitLog = (repoPath: string) =>
    execSync(
        `git log --pretty=format:"%ad~~%an~~%h~~%s" --shortstat --date=iso-strict`,
        { cwd: resolve(repoPath) }
    )
        .toString()
        .trim();

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
const parseStats = ([_, stats]: string[]): Partial<Commit> | null =>
    stats
        ? transduce(
              map(([k, v]) => <[string, number]>[k, parseInt(v)]),
              assocObj(),
              zip(["files", "add", "del"], stats.split(","))
          )
        : null;

/**
 * Retrieves git log for given `repoPath` and transforms it into an
 * iterable of `Commit` objects.
 *
 * @param repoPath
 */
export const repoCommits = (repoPath: string) =>
    iterator(
        comp(
            // get raw log
            map(gitLog),
            // split into lines
            mapcat((x: string) => x.split("\n")),
            // group related lines:
            // normal commits have 2 lines + 1 empty
            // merge commits have only 1 line
            // pick a random number for merge commits
            // in case there're successive ones
            partitionBy((x) =>
                x.indexOf("~~Merge ") !== -1
                    ? Math.random()
                    : x.length > 0
                    ? 1
                    : 0
            ),
            // remove empty lines
            filter((x) => x[0].length > 0),
            // parse commit details
            map(
                (commit) =>
                    <Commit>{
                        ...parseLog(commit),
                        ...parseStats(commit),
                    }
            )
        ),
        [repoPath]
    );
