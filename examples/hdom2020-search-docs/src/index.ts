import { $compile, $list } from "@thi.ng/hdom2020";
import { CloseMode, fromIterable, metaStream } from "@thi.ng/rstream";
import { map } from "@thi.ng/transducers";
import { indexSize, search } from "./search";
// IMPORTANT: this file is not checked into git (~350KB) and must be downloaded from:
// https://gist.github.com/postspectacular/8370adeaf262299065db4aa5849e40d7
import INDEX from "./search.json";

const BASE_URL = "https://github.com/thi-ng/umbrella/tree/develop/packages/";
const SIZE = indexSize(INDEX);

// search query stream
const query = fromIterable(["stream"], { closeIn: CloseMode.NEVER });

// build results as transformation of query stream
// the intermediate metastream sub acts as a debouncer for fast typers
// (TODO add to thi.ng/rstream)
const queryResults = query
    .subscribe(metaStream((x) => fromIterable([x], { delay: 250 })))
    .transform(map((q) => search(INDEX, q, "") || []));

// event handler for input field
const updateQuery = (e: InputEvent) => {
    const term = (<HTMLInputElement>e.target).value;
    term.length > 0 && query.next(term);
};

// compile component tree, including embedded reactive values/streams
$compile([
    "div.ma2.measure-ns.center-ns.f7.f6-ns",
    {},
    ["h1.mv2", {}, "thi.ng/umbrella doc search"],
    [
        "input.w-100.mv2.pa2",
        { type: "text", autofocus: true, oninput: updateQuery, value: query },
    ],
    [
        "div",
        {},
        // derived view of result stream to compute number of results
        queryResults.transform(map((results) => results.length)),
        ` results (total keys: ${SIZE.keys} in ${SIZE.files} files)`,
    ],
    // reactive list component
    // the function arg is used to create new list items if needed
    $list(queryResults, "ul.list.pl0", {}, ([suffix, file]) => [
        "li",
        {},
        [
            "span",
            {},
            // use .deref() here to avoid unnecessary subscriptions
            ["span.b.bg-washed-green", {}, query.deref()],
            `${suffix}: `,
        ],
        ["a.link.blue", { href: BASE_URL + file }, file],
    ]),
]).mount(document.getElementById("app")!);
