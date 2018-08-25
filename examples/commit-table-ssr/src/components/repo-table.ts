import { iterator, map, multiplex, comp, partitionBy, mapIndexed, repeat } from "@thi.ng/transducers";
import { AppContext, Commit } from "../api";
import { table } from "./table";
import { commitLink } from "./commit-link";

export const repoTable = (_: AppContext, commits: Iterable<Commit>) =>
    [table,
        ["15%", "15%", "55%", "5%", "5%", "5%"],
        ["Date", "Author", "Description", "Files", "Adds", "Dels"],
        iterator(
            comp(
                multiplex(
                    map((x: Commit) => x.date.substr(0, 10)),
                    map((x: Commit) => x.author),
                    map((x: Commit) => [commitLink, x.sha, x.msg]),
                    map((x: Commit) => x.files),
                    map((x: Commit) => x.add ? ["span.green", `+${x.add}`] : null),
                    map((x: Commit) => x.del ? ["span.red", `-${x.del}`] : null),
                ),
                partitionBy((row) => row[0].split("-")[1]),
                mapIndexed((i, month) => [
                    i > 0 ? [month[0][0].substr(0, 7), ...repeat("", 5)] : null,
                    month
                ])
            ),
            commits
        )
    ]