import { withoutKeysObj } from "@thi.ng/associative/without-keys";
import {
    cosineGradient,
    COSINE_GRADIENTS,
} from "@thi.ng/color/cosine-gradients";
import { threadLast } from "@thi.ng/compose/thread-last";
import { DAY } from "@thi.ng/date/api";
import { quarters } from "@thi.ng/date/iterators";
import { defs } from "@thi.ng/hiccup-svg/defs";
import { group } from "@thi.ng/hiccup-svg/group";
import { line } from "@thi.ng/hiccup-svg/line";
import { rect } from "@thi.ng/hiccup-svg/rect";
import { svg } from "@thi.ng/hiccup-svg/svg";
import { text } from "@thi.ng/hiccup-svg/text";
import { serialize } from "@thi.ng/hiccup/serialize";
import { fit } from "@thi.ng/math/fit";
import { Z2 } from "@thi.ng/strings/pad-left";
import { add } from "@thi.ng/transducers/add";
import { comp } from "@thi.ng/transducers/comp";
import { filter } from "@thi.ng/transducers/filter";
import { groupByObj } from "@thi.ng/transducers/group-by-obj";
import { keep } from "@thi.ng/transducers/keep";
import { map } from "@thi.ng/transducers/map";
import { mapIndexed } from "@thi.ng/transducers/map-indexed";
import { mapcat } from "@thi.ng/transducers/mapcat";
import { max } from "@thi.ng/transducers/max";
import { partition } from "@thi.ng/transducers/partition";
import { pushSort } from "@thi.ng/transducers/push-sort";
import { sortedKeys } from "@thi.ng/transducers/sorted-keys";
import { transduce } from "@thi.ng/transducers/transduce";
import { vals } from "@thi.ng/transducers/vals";
import { execSync } from "child_process";
import * as fs from "fs";
import { resolve } from "path";

interface Commit {
    name: string;
    epoch: number;
    date: string;
    msg: string;
    files: number;
    adds: number;
    dels: number;
}

const BASE_DIR = "..";

const SEP = "~~";

const RE_PKG = /\(([a-z-]+)\):/;

// invalid / misspelled package names to exclude
const IGNORE_PACKAGES = [
    "all",
    "cso",
    "example",
    "exmples",
    "shadertoy",
    "transducer",
];

// heatmap gradient
const GRAD = <any[]>cosineGradient(32, COSINE_GRADIENTS["blue-magenta-orange"]);

const MIN_DATE = Date.parse("2018-01-01T00:00:00+00:00");
const MAX_DATE = Date.now();

const enum LogItem {
    COMMIT,
    STATS,
}

type ClassifiedCommit = [LogItem, string | string[]];

/**
 * Retrieves raw git log from given repo path.
 *
 * @param repoPath - 
 */
const gitLog = (repoPath: string) =>
    execSync(
        `git log --pretty=format:"%ad${SEP}%s" --date=iso-strict --shortstat`,
        {
            cwd: resolve(repoPath),
        }
    )
        .toString()
        .trim();

/**
 * Attempts to split commit line with field separator and classifies
 * line as COMMIT or STATS based on outcome.
 *
 * @param line - 
 */
const classifyCommitLine = (line: string): ClassifiedCommit => {
    const parts = line.split(SEP);
    return parts.length > 1 ? [LogItem.COMMIT, parts] : [LogItem.STATS, line];
};

/**
 * Filter predicate. Returns false if given line is empty.
 *
 * @param line - 
 */
const removeEmpty = (line: string) => line.length > 0;

/**
 * Filter predicate. Returns false if commit is a merge.
 *
 * @param x - 
 */
const removeMergeCommits = (x: ClassifiedCommit) =>
    x[0] == LogItem.STATS || !x[1][1].startsWith("Merge");

/**
 * Takes a tuple of `[commit, stats]` and attempts to parse it into a
 * `Commit` object. Returns undefined if commit message is not package
 * specific (based on Conventional Commits format).
 *
 * @param tuple - 
 */
const parseCommitTuple = (tuple: ClassifiedCommit[]) => {
    const [date, msg] = tuple[0][1];
    const stats = <string>tuple[1][1];
    const match = RE_PKG.exec(msg);
    if (match) {
        const [files, adds, dels] = [
            ...map(
                (x: RegExpMatchArray) => parseInt(x[0]),
                stats.matchAll(/\d+/g)
            ),
        ];
        return <Commit>{
            name: match[1],
            epoch: Date.parse(date),
            date,
            msg,
            files,
            adds,
            dels,
        };
    }
};

/**
 * Transducer pipeline to process raw commit log into an object
 * containing parsed commits per package. After transformation also
 * removes commits for ignored packages.
 */
const commitsByPackage = withoutKeysObj(
    transduce(
        comp(
            filter(removeEmpty),
            map(classifyCommitLine),
            filter(removeMergeCommits),
            partition(2),
            map(parseCommitTuple),
            keep()
        ),
        groupByObj<Commit, Commit[]>({
            group: pushSort((a, b) => a.epoch - b.epoch),
            key: (x) => x.name,
        }),
        gitLog(BASE_DIR).split("\n")
    ),
    IGNORE_PACKAGES
);

/**
 * Computes max value for given statistics key.
 *
 * @param key - 
 */
const maxStat = (key: "files" | "adds" | "dels") =>
    transduce(
        comp(
            mapcat((x) => x),
            map((x) => x[key])
        ),
        max(),
        vals(commitsByPackage)
    );

/**
 * Total number of commits across all packages.
 */
const totalCommits = transduce(
    map((x) => x.length),
    add(),
    vals(commitsByPackage)
);

const maxFiles = maxStat("files");
const maxAdds = maxStat("adds");

console.log(`total: ${totalCommits}, max: ${maxFiles}, ${maxAdds}`);

const NUM_PKG = Object.keys(commitsByPackage).length;
const PKG_WIDTH = 110;
const WIDTH = ((MAX_DATE - MIN_DATE) / DAY) * 1.5 + PKG_WIDTH;
const HEIGHT = NUM_PKG * 10 + 20;

/**
 * Computes X coord for given epoch (based on above config).
 *
 * @param epoch - 
 */
const mapEpoch = (epoch: number) =>
    fit(epoch, MIN_DATE, MAX_DATE, PKG_WIDTH, WIDTH - 1);

/**
 * Returns log-mapped color from `GRAD` based on given `x` and `max` value.
 *
 * @param x - 
 * @param max - 
 */
const mapColor = (x: number, max: number) =>
    GRAD[fit(Math.log(x), 0, Math.log(max), 0, GRAD.length - 1) | 0];

/**
 * Returns iterator of quarterly timeline axis labels.
 */
const timeLineLabels = () =>
    map((t) => {
        const x = mapEpoch(t);
        const d = new Date(t);
        return group(
            {},
            line([x, 0], [x, NUM_PKG * 10 + 20], {
                stroke: "#999",
                "stroke-dasharray": 1,
            }),
            text([x + 5, 8], `${d.getFullYear()}-${Z2(d.getMonth() + 1)}`)
        );
    }, quarters(MIN_DATE, MAX_DATE));

/**
 * Main visualization. Returns SVG group of commits for given package
 * name and index. See usage below.
 *
 * @param i - 
 * @param pkg - 
 */
const packageCommits = (i: number, pkg: string) =>
    group(
        {
            transform: `translate(0, ${(i + 2) * 10})`,
            "stroke-width": 2,
        },
        text([0, 8], pkg, { stroke: "none" }),
        map((commit) => {
            const x = mapEpoch(commit.epoch);
            return line([x, 0], [x, 8], {
                stroke: mapColor(commit.adds, maxAdds),
            });
        }, commitsByPackage[pkg])
    );

/**
 * Assemble & output full SVG document using hiccup-svg primitives.
 *
 * See: https://docs.thi.ng/umbrella/compose/modules.html#threadLast
 */
threadLast(
    commitsByPackage,
    sortedKeys,
    [mapIndexed, packageCommits],
    [
        svg,
        {
            width: WIDTH,
            height: HEIGHT,
            viewBox: `-10 -10 ${WIDTH + 20} ${HEIGHT + 20}`,
            "font-family": "Inconsolata",
            "font-size": 9,
            fill: "white",
        },
        defs([
            "style",
            { type: "text/css" },
            "<![CDATA[ @import url('https://fonts.googleapis.com/css?family=Inconsolata&display=swap'); ]]>",
        ]),
        // background
        rect([-10, -10], WIDTH + 20, HEIGHT + 20, { fill: "black" }),
        timeLineLabels(),
    ],
    serialize,
    [fs.writeFileSync, "heatmap.svg"]
);
