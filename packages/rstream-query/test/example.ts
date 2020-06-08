import { trace } from "@thi.ng/rstream";
import * as q from "../src";

const store = new q.TripleStore([
    ["london", "type", "city"],
    ["london", "part-of", "uk"],
    ["portland", "type", "city"],
    ["portland", "part-of", "oregon"],
    ["portland", "part-of", "usa"],
    ["oregon", "type", "state"],
    ["usa", "type", "country"],
    ["uk", "type", "country"],
]);

// alternatively, convert an object into a sequence of triples
// const store = new q.TripleStore(q.asTriples({
//     london: {
//         type: "city",
//         partOf: "uk"
//     },
//     portland: {
//         type: "city",
//         partOf: ["oregon", "usa"]
//     },
//     oregon: { type: "state" },
//     uk: { type: "country" },
//     usa: { type: "country" },
// }));

// compile the below query spec into a dataflow graph
// pattern items prefixed w/ "?" are query variables

// this query matches the following relationships
// using all currently known triples in the store

// currently only "where" and "path" sub-queries are possible
// in the near future, more query types will be supported
// (e.g. optional relationships, filters etc.)
store
    .addQueryFromSpec({
        q: [
            {
                where: [
                    // first match any subject of type "city"
                    ["?city", "type", "city"],
                    // then a city's "part-of" relationships (if any)
                    ["?city", "partOf", "?country"],
                    // the matched ?country must have type = "country"
                    ["?country", "type", "country"],
                ],
            },
        ],
        // `bind` is an (optional) query post-processor and
        // allows injection of new variables into the result set
        // here we create a new var "answer" whose values are derived from
        // the other two query vars
        bind: {
            answer: (res) => `${res.city} is located in ${res.country}`,
        },
        // another post-processing step, only keeps "answer" var in results
        select: ["answer"],
    })
    .subscribe(trace());
// Set {
//   { answer: 'london is located in uk' },
//   { answer: 'portland is located in usa' } }

// helper fn to insert new city relationship to the store
const addCity = (name: string, country: string) =>
    store.into([
        [name, "type", "city"],
        [name, "partOf", country],
        [country, "type", "country"],
    ]);

addCity("berlin", "germany");
// Set {
//     { answer: 'london is located in uk' },
//     { answer: 'portland is located in usa' },
//     { answer: 'berlin is located in germany' } }

addCity("paris", "france");
// Set {
//     { answer: 'london is located in uk' },
//     { answer: 'portland is located in usa' },
//     { answer: 'berlin is located in germany' },
//     { answer: 'paris is located in france' } }

store.delete(["paris", "type", "city"]);
// Set {
//     { answer: 'london is located in uk' },
//     { answer: 'portland is located in usa' },
//     { answer: 'berlin is located in germany' } }

// output for graphviz
// console.log(store.toDot());
