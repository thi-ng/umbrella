import { timed } from "@thi.ng/bench";
import { readJSON } from "@thi.ng/file-io";
import { search } from "./search.js";

const idx = timed(() => readJSON("assets/search.json"));

console.log(timed(() => search(idx, process.argv[2])));
