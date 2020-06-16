import { $compile, $list } from "@thi.ng/hdom2020";
import { timed } from "@thi.ng/bench";
import { clamp } from "@thi.ng/math";
import { CloseMode, debounce, fromIterable, sync } from "@thi.ng/rstream";
import { map, page } from "@thi.ng/transducers";
import { deserialize } from "@ygoe/msgpack";
import { search } from "./search";

const INDEX_URL = "https://docs.thi.ng/umbrella/search-index-latest.bin";
const REPO_URL = "https://github.com/thi-ng/umbrella/";
const BASE_URL = `${REPO_URL}blob/develop/packages/`;
const SRC_URL = `${REPO_URL}/tree/feature/hdom2020/examples/hdom2020-search-docs`;
const PAGE_SIZE = 25;

(async () => {
    // load & decode msgpacked binary search index
    const buf = await (await fetch(INDEX_URL)).arrayBuffer();
    const INDEX = timed(() => deserialize(buf));

    // search query stream
    const query = fromIterable(["stream"], { closeIn: CloseMode.NEVER });

    // build results as transformation of query stream
    // first debounce query stream (for fast typers)
    const queryResults = query
        .subscribe(debounce(100))
        .transform(map((q) => search(INDEX, q, "") || []));

    // pagination state
    const pageID = fromIterable([0], { closeIn: CloseMode.NEVER });
    const maxPageID = queryResults.transform(
        map((res) => ~~(res.length / PAGE_SIZE))
    );

    // produce search result page using `page()` transducer
    // the`sync()` construct is a stream combinator which requires all input
    // streams to produce a value first before it emits its own initial
    // result...
    const resultPage = sync<any, string[][]>({
        src: { queryResults, pageID, maxPageID },
        xform: map(
            ({ queryResults, pageID, maxPageID }) =>
                <string[][]>[
                    ...page(
                        clamp(pageID, 0, maxPageID),
                        PAGE_SIZE,
                        queryResults
                    ),
                ]
        ),
    });

    // event handler for input field
    const updateQuery = (e: InputEvent) => {
        const term = (<HTMLInputElement>e.target).value;
        if (term.length > 0) {
            query.next(term.toLowerCase());
            pageID.next(0);
        }
    };

    // event handlers for pager buttons
    const updatePage = (step: number) =>
        pageID.next(clamp(pageID.deref()! + step, 0, maxPageID.deref() || 0));

    const setPage = (id: number) => pageID.next(id);

    // pagination component
    const pager = [
        "div.mv2.w-100",
        {
            style: {
                // only show if there's a need for it...
                display: maxPageID.transform(
                    map((x) => (x > 0 ? "flex" : "none"))
                ),
            },
        },
        [
            "div.w-33.tl",
            {},
            ["button", { onclick: () => setPage(0) }, "<<"],
            ["button", { onclick: () => updatePage(-1) }, "<"],
        ],
        [
            "div.w-34.tc",
            {},
            pageID.transform(map((x) => x + 1)),
            " / ",
            maxPageID.transform(map((x) => x + 1)),
        ],
        [
            "div.w-33.tr",
            {},
            ["button", { onclick: () => updatePage(1) }, ">"],
            ["button", { onclick: () => setPage(maxPageID.deref()!) }, ">>"],
        ],
    ];

    // compile component tree, including embedded reactive values/streams
    // and controlflow structures (uses tachyons CSS classes for styling)
    $compile([
        "div.ma2.measure-ns.center-ns.f7.f6-ns",
        {},
        ["h1.mv0", {}, "thi.ng/umbrella doc search"],
        ["div.mb2.f7", {}, ["a.link.blue", { href: SRC_URL }, "Source code"]],
        [
            "input.w-100.mv2.pa2",
            {
                type: "text",
                autofocus: true,
                oninput: updateQuery,
                value: query,
            },
        ],
        // query result & search index stats
        [
            "div.mv2",
            {},
            // derived view of result stream to compute number of results
            queryResults.transform(map((results) => results.length)),
            ` results (total keys: ${INDEX.numKeys} in ${INDEX.packages.length} packages, ${INDEX.numFiles} files)`,
        ],
        // include/embed pagination controls
        pager,
        // reactive list component (for search results)
        // the function arg is used to create new list items if needed
        $list(resultPage, "ul.list.pl0", {}, ([suffix, file]) => [
            "li",
            {},
            [
                "span",
                {},
                // use .deref() here to avoid unnecessary subscriptions
                ["span.b.bg-washed-green", {}, query.deref()],
                `${suffix}: `,
            ],
            ["a.link.blue", { href: BASE_URL + file, target: "_new" }, file],
        ]),
    ]).mount(document.getElementById("app")!);
})();
