import { timed } from "@thi.ng/bench";
import { readJSON } from "./io.js";
import { search } from "./search.js";

const idx = timed(() => readJSON("search.json"));

console.log(timed(() => search(idx, process.argv[2])));
