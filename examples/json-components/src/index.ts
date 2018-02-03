import { isFunction } from "@thi.ng/checks/is-function";
import { start } from "@thi.ng/hiccup-dom";

// some dummy JSON records
let db = [
    {
        meta: {
            author: {
                name: "Alice Bobbera",
                email: "a@b.it"
            },
            created: "2018-02-03T12:13:14Z",
            tags: ["drama", "queen"]
        },
        title: "UI components for Dummies",
        content: "Sed doloribus molestias voluptatem ut delectus vitae quo eum. Ut praesentium sed omnis sequi rerum praesentium aperiam modi. Occaecati voluptatum quis vel facere quis quisquam."
    },
    {
        meta: {
            author: {
                name: "Charlie Doran",
                email: "c@d.es"
            },
            created: "2018-02-02T01:23:45Z",
            tags: ["simplicity", "rules"]
        },
        title: "Look ma, so simple",
        content: "Ratione necessitatibus doloremque itaque. Nihil hic alias cumque beatae esse sapiente incidunt. Illum vel eveniet officia."
    }
];

// component functions for individual keys in the JSON objects
// the `item` function is the root component for each JSON object
// it's a higher-order function, since we will create different
// instances for theming purposes... see below
const item = (theme) => (item) => [`div.item.${theme}`, item.title, item.meta, item.content];
const meta = (meta) => ["div.meta", meta.author, meta.created, meta.tags];
const author = (author) => ["div", ["strong", "author: "], link(`mailto:${author.email}`, author.name)];
const date = (iso) => ["div", ["strong", "date: "], new Date(Date.parse(iso)).toLocaleString()];
const link = (href, body) => ["a", { href }, body];
const tag = (tag) => ["li", link("#", tag)];
const tags = (tags) => ["ul.tags", ...tags.map(tag)];
const title = (title, level = 3) => [`h${level}`, title];
const content = (body) => ["div", body];

// generic JSON object tree transformer
// called with a nested object spec reflecting the structure
// of the source data, returns composed component function,
// which calls all nested sub-components
const componentFromSpec = (spec) => {
    if (isFunction(spec)) {
        return spec;
    }
    const mapfns = Object.keys(spec[1]).reduce(
        (acc, k) => (acc[k] = componentFromSpec(spec[1][k]), acc),
        {}
    );
    return (x) => {
        const res = {};
        for (let k in mapfns) {
            res[k] = x[k] != null ? mapfns[k](x[k]) : undefined;
        }
        return spec[0](res);
    };
};

// now build themed component functions for the above JSON object format
// the spec below is is only partially complete and will be reused by
// the two themes below (this is only for demo purposes and of course
// one could supply completely different functions per theme, but KISS here... :)

// the full spec is an array of this recursive structure:
// [mapfn, {optional chid key specs...}]
// for leaf keys only a function needs to be given, no need to wrap in array
// giving component functions the same name as their object keys
// makes this format very succinct
const itemSpec = {
    meta: [
        meta,
        {
            author,
            tags,
            created: date
        }
    ],
    title,
    content
};

// build themed component instances
const itemLight = componentFromSpec([item("light"), itemSpec]);
const itemDark = componentFromSpec([item("dark"), itemSpec]);

// simple text area editor for our JSON data
// any change to the input should be immediately
// reflected in the rendering
const editor = (() => {
    let body = JSON.stringify(db, null, 2);
    return [
        "textarea",
        {
            oninput: (e) => {
                try {
                    db = JSON.parse(e.target.value);
                } catch (_) { }
            }
        },
        body
    ];
})();

// start UI
start(
    document.getElementById("app"),
    () =>
        ["div#container",
            ["div", editor],
            ["div",
                ["div", ["h2", "Light theme"], ...db.map(itemLight)],
                ["div", ["h2", "Dark theme"], ...db.map(itemDark)]]]
);
