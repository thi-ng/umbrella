import { iterator } from "@thi.ng/transducers/iterator";
import { map } from "@thi.ng/transducers/xform/map";

import { AppContext } from "../api";

const row = (ctx: AppContext, body: Iterable<any>) =>
    ["tr", ctx.ui.table.row, ...body];

export const table = (ctx: AppContext, layout: any[], head: Iterable<any>, body: Iterable<Iterable<any>>) =>
    ["table", ctx.ui.table.root,
        ...(layout || []).map((x) => ["col", { style: { width: x } }]),
        [row, iterator(map((x) => ["th", ctx.ui.table.head, x]), head)],
        iterator(
            map((cols: any) =>
                [row, iterator(map((x) => ["td", ctx.ui.table.cell, x]), cols)]
            ),
            body
        )
    ];
