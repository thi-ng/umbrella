import { timed } from "@thi.ng/bench";
import { $compile, $list, $text, Component, IComponent } from "@thi.ng/rdom";
import { anchor, div, inputText } from "@thi.ng/hiccup-html";
import { debounce, Stream, stream, Subscription } from "@thi.ng/rstream";
import { map } from "@thi.ng/transducers";
import { deserialize } from "@ygoe/msgpack";
import { pageControls, Pagination } from "./pagination";
import { search, SearchIndex } from "./search";

const INDEX_URL = "https://docs.thi.ng/umbrella/search-index-latest.bin";
const REPO_URL = "https://github.com/thi-ng/umbrella/";
const BASE_URL = `${REPO_URL}blob/develop/packages/`;
const SRC_URL = `${REPO_URL}/tree/feature/rdom/examples/rdom-search-docs`;
const INITIAL_QUERY = "hdom";
const PAGE_SIZE = 25;

class DocSearch extends Component {
    wrapper!: IComponent;
    inner!: IComponent;
    pager!: Pagination<string[][]>;
    query!: Stream<string>;
    queryResults!: Subscription<string, string[][]>;

    updateQuery(e: InputEvent) {
        const term = (<HTMLInputElement>e.target).value;
        if (term.length > 0) {
            this.query.next(term.toLowerCase());
            this.pager.setPage(0);
        }
    }

    async mount(parent: Element) {
        this.wrapper = $compile(
            div(
                { class: "ma2 measure-ns center-ns f7 f6-ns" },
                ["h1.mv0", {}, "thi.ng/umbrella doc search"],
                div(
                    { class: "mb2 f7" },
                    anchor({ class: "link blue", href: SRC_URL }, "Source code")
                )
            )
        );
        this.el = await this.wrapper.mount(parent);

        // show preloader
        const loader = this.$el(
            "div.ma2.measure-ns.center-ns.f7.f6-ns",
            {},
            "Loading search index...",
            this.el
        );

        try {
            // load & decode msgpacked binary search index
            const resp = await fetch(INDEX_URL);
            if (resp.status >= 400)
                throw new Error("Failed to load search index");
            const buf = await resp.arrayBuffer();
            const index: SearchIndex = timed(() => deserialize(buf));

            // remove preloader
            this.$remove(loader);

            // init local state
            this.query = stream<string>();
            this.query.next(INITIAL_QUERY);
            // build results as transformation of query stream
            // first debounce query stream (for fast typers)
            this.queryResults = this.query
                .subscribe(debounce(100))
                .transform(map((q) => search(index, q, "") || []));

            // setup pagination
            this.pager = new Pagination(this.queryResults, PAGE_SIZE);

            // compile inner component tree, including embedded reactive
            // values/streams and controlflow structures
            this.inner = $compile(
                div(
                    null,
                    inputText({
                        class: "w-100 mv2 pa2",
                        type: "text",
                        autofocus: true,
                        oninput: this.updateQuery.bind(this),
                        value: this.query,
                    }),
                    // query result & search index stats
                    div(
                        { class: "mv2" },
                        // derived view of result stream to compute number of results
                        this.queryResults.transform(
                            map((results) => results.length)
                        ),
                        " results",
                        div(
                            null,
                            `(total: ${index.numVals}, keys: ${index.numKeys} in ${index.packages.length} packages, ${index.numFiles} files)`
                        )
                    ),
                    // pagination controls
                    pageControls(this.pager),
                    // reactive list component of paginated search results
                    // the function arg is used to create new list items if needed
                    $list(
                        this.pager.resultPage,
                        "ul.list.pl0",
                        {},
                        ([suffix, file]) => [
                            "li",
                            {},
                            [
                                "span",
                                {},
                                // use .deref() here to avoid unnecessary subscriptions
                                [
                                    "span.b.bg-washed-green",
                                    {},
                                    this.query.deref(),
                                ],
                                `${suffix}: `,
                            ],
                            anchor(
                                {
                                    class: "link blue",
                                    href: BASE_URL + file,
                                    target: "_new",
                                },
                                file
                            ),
                        ]
                    )
                )
            );
            this.inner.mount(this.el);
        } catch (e) {
            $text(<HTMLElement>loader, e);
        }
        return this.el;
    }

    // not needed here, just for reference...
    async unmount() {
        this.inner.unmount();
        this.wrapper.unmount();
        this.pager.release();
    }
}

new DocSearch().mount(document.getElementById("app")!);
