import { IRelease } from "@thi.ng/api";
import { clamp } from "@thi.ng/math";
import { Stream, stream, Subscription, sync } from "@thi.ng/rstream";
import { map, page } from "@thi.ng/transducers";

export class Pagination<T extends any[]> implements IRelease {
    page: Stream<number>;
    maxPage: Subscription<T, number>;
    resultPage: Subscription<any, T>;

    constructor(public src: Subscription<any, T>, pageSize: number) {
        this.page = stream<number>();
        this.maxPage = this.src.transform(
            map((res) => ~~(res.length / pageSize))
        );
        // produce search result page using `page()` transducer
        // the`sync()` construct is a stream combinator which requires all input
        // streams to produce a value first before it emits its own initial
        // result...
        this.resultPage = sync<any, T>({
            src: {
                src: this.src,
                pageID: this.page,
                maxPageID: this.maxPage,
            },
            xform: map(
                ({ src, pageID, maxPageID }) =>
                    <T>[...page(clamp(pageID, 0, maxPageID), pageSize, src)]
            ),
        });
        this.setPage(0);
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
export const pageControls = (pager: Pagination<any>) => [
    "div.mv3.w-100",
    {
        style: {
            // only show if there's a need for it...
            display: pager.maxPage.transform(
                map((x) => (x > 0 ? "flex" : "none"))
            ),
        },
    },
    [
        "div.w-33.tl",
        {},
        button(() => pager.setPage(0), "<<"),
        button(() => pager.updatePage(-1), "<"),
    ],
    [
        "div.w-34.tc",
        {},
        pager.page.transform(map((x) => x + 1)),
        " / ",
        pager.maxPage.transform(map((x) => x + 1)),
    ],
    [
        "div.w-33.tr",
        {},
        button(() => pager.updatePage(1), ">"),
        button(() => pager.setPage(pager.maxPage.deref()!), ">>"),
    ],
];

const button = (onclick: EventListener, label: string) => [
    "button",
    { onclick },
    label,
];
