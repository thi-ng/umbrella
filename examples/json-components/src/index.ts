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
        title: "'I love my books, all three of them'",
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

// component function for individual keys in the JSON objects
const summary = (item) => ["div.item", item.title, item.meta, item.content];
const meta = (meta) => ["div.meta", meta.author, meta.created, meta.tags];
const author = (author) => ["div", ["strong", "author: "], link(`mailto:${author.email}`, author.name)];
const date = (d) => ["div", ["strong", "date: "], new Date(Date.parse(d)).toLocaleString()];
const link = (href, body) => ["a", { href }, body];
const tag = (t) => ["li", link("#", t)];
const tags = (tags) => ["ul.tags", ...tags.map(tag)];
const title = (title, level = 3) => [`h${level}`, title];
const content = (body) => ["div", body];

// generic JSON object tree transformer
// called with a nested object spec reflecting the structure
// of the source data and returns composed component function
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

// build component function for the above JSON object format
// the spec is an array of this recursive structure: [mapfn, {optional chid key specs...}]
// for leaf keys only a function needs to be given, no need to wrap in array
// giving component functions the same name as their object keys
// makes this format very succinct
const item = componentFromSpec([
    summary,
    {
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
    }
]);

// simple text area editor for our JSON data
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
    () => ["div#container", ["div", editor], ["div", ...db.map(item)]]
);
