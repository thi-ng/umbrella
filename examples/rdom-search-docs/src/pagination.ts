import type { IRelease } from "@thi.ng/api";
import { equiv } from "@thi.ng/equiv";
import { div } from "@thi.ng/hiccup-html/blocks";
import { button } from "@thi.ng/hiccup-html/forms";
import { clamp } from "@thi.ng/math/interval";
import type { ISubscription } from "@thi.ng/rstream";
import { reactive, Stream } from "@thi.ng/rstream/stream";
import { sync } from "@thi.ng/rstream/sync";
import { comp } from "@thi.ng/transducers/comp";
import { dedupe } from "@thi.ng/transducers/dedupe";
import { map } from "@thi.ng/transducers/map";
import { page } from "@thi.ng/transducers/page";

export class Pagination<T extends any[]> implements IRelease {
    page: Stream<number>;
    maxPage: ISubscription<T, number>;
    resultPage: ISubscription<any, T>;

    constructor(src: ISubscription<any, T>, pageSize: number) {
        this.page = reactive(0);
        this.maxPage = src.transform(map((res) => ~~(res.length / pageSize)));
        // produce search result page using `page()` transducer
        // the`sync()` construct is a stream combinator which requires all input
        // streams to produce a value first before it emits its own initial
        // result...
        this.resultPage = sync({
            src: {
                src,
                pageID: this.page,
            },
            xform: comp(
                dedupe(equiv),
                map(
                    ({ src, pageID }) =>
                        <T>[
                            ...page(
                                clamp(pageID, 0, this.maxPage.deref() || 1),
                                pageSize,
                                src
                            ),
                        ]
                )
            ),
        });
    }

    release() {
        this.resultPage.unsubscribe();
        return true;
    }

    updatePage(step: number) {
        this.page.next(
            clamp(this.page.deref()! + step, 0, this.maxPage.deref() || 0)
        );
    }

    setPage(id: number) {
        this.page.next(id);
    }
}

/**
 * UI component for given pagination model.
 *
 * @param pager
 */
export const pageControls = (pager: Pagination<any>) =>
    div(
        {
            class: "mv3 w-100",
            style: {
                // only show if there's a need for it...
                display: pager.maxPage.transform(
                    map((x) => (x > 0 ? "flex" : "none"))
                ),
            },
        },
        div(
            { class: "w-33 tl" },
            bt(() => pager.setPage(0), "<<"),
            bt(() => pager.updatePage(-1), "<")
        ),
        div(
            { class: "w-34 tc" },
            pager.page.transform(map((x) => x + 1)),
            " / ",
            pager.maxPage.transform(map((x) => x + 1))
        ),
        div(
            { class: "w-33 tr" },
            bt(() => pager.updatePage(1), ">"),
            bt(() => pager.setPage(pager.maxPage.deref()!), ">>")
        )
    );

const bt = (onclick: EventListener, label: string) =>
    button({ onclick }, label);
