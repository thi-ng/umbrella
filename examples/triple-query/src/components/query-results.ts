import { repeat } from "@thi.ng/transducers/iter/repeat";
import { iterator } from "@thi.ng/transducers/iterator";
import { map } from "@thi.ng/transducers/xform/map";
import { mapIndexed } from "@thi.ng/transducers/xform/map-indexed";

import { AppContext } from "../api";
import { section } from "./section";
import { table } from "./table";

export const queryResults = (_: AppContext, title: string, results: Set<any>) => {
    if (results) {
        const [first] = results;
        const keys = Object.keys(first).sort();
        return [section,
            title, ` (${results.size})`,
            [table,
                ["10%", ...repeat(`${(90 / keys.length) | 0}%`, keys.length)],
                ["id", ...keys],
                iterator(
                    mapIndexed((i, x) => [i + 1, ...iterator(map((k: string) => x[k]), keys)]),
                    results
                )]
        ];
    }
};