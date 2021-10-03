import { pager } from "@thi.ng/hdom-components/pager";
import type { AppContext } from "../api";
import { SET_PAGE, SET_SORT } from "../events";
import { PAGE_LEN } from "../handlers";
import { button } from "./button";
import { eventLink } from "./event-link";
import { section } from "./section";
import { table } from "./table";

export const tripleTable = () => {
    const _pager = pager({
        root: (ctx, ...body) => ["div", ctx.ui.pager.root, ...body],
        button: (i, _, __, label, disabled) => [
            button,
            [SET_PAGE, i],
            label,
            disabled,
        ],
        groupPrev: (ctx, ...bts) => ["div", ctx.ui.pager.prev, ...bts],
        groupNext: (ctx, ...bts) => ["div", ctx.ui.pager.next, ...bts],
        groupPages: (ctx, bts) => ["div", ctx.ui.pager.pages, bts],
    });
    return (ctx: AppContext, triples: any[], num: number, page: number) => {
        const [sid, sdir] = ctx.views.sort.deref()!;
        const icon = sdir ? "🔽" : "🔼";
        return [
            section,
            "All triples",
            ` (${ctx.store.triples.length})`,
            [
                table,
                ["10%", "30%", "30%", "30%"],
                [
                    "id",
                    ...["subject", "predicate", "object"].map((x, i) => [
                        eventLink,
                        ctx.ui.table.headlink,
                        [SET_SORT, i],
                        `${x} ${sid === i ? icon : ""}`,
                    ]),
                ],
                triples,
            ],
            [_pager, page, num, PAGE_LEN, 5],
        ];
    };
};
