import { comp } from "@thi.ng/transducers/comp";
import { iterator } from "@thi.ng/transducers/iterator";
import { map } from "@thi.ng/transducers/map";
import { mapIndexed } from "@thi.ng/transducers/map-indexed";
import { partitionBy } from "@thi.ng/transducers/partition-by";
import { repeat } from "@thi.ng/transducers/repeat";
import type { AppContext, Commit } from "../api";
import { commitLink } from "./commit-link";
import { table } from "./table";

/**
 * Git commit log table component. Consumes iterable of `Commit` objects
 * and transforms each into a table row.
 *
 * @param _ -
 * @param commits -
 */
export const repoTable = (_: AppContext, commits: Iterable<Commit>) => [
    table,
    ["15%", "15%", "55%", "5%", "5%", "5%"],
    ["Date", "Author", "Description", "Files", "Adds", "Dels"],
    iterator(
        comp(
            // convert commit into tuple, one value per table cell
            map((x: Commit) => [
                x.date.substring(0, 10),
                x.author,
                [commitLink, x.sha, x.msg],
                x.files,
                x.add ? ["span.green", `+${x.add}`] : null,
                x.del ? ["span.red", `-${x.del}`] : null,
            ]),
            // partition rows by month
            partitionBy((row: any[]) => row[0].split("-")[1]),
            // insert month headers (but not in 1st chunk)
            mapIndexed((i, month) => [
                i > 0 ? [month[0][0].substring(0, 7), ...repeat("", 5)] : null,
                month,
            ])
        ),
        commits
    ),
];
