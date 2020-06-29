import { timed } from "@thi.ng/bench";
import { readJSON } from "./io";
import { search } from "./search";

const idx = timed(() => readJSON("search.json"));

console.log(timed(() => search(idx, process.argv[2])));
