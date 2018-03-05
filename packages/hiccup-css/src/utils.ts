import { repeat } from "@thi.ng/transducers/iter/repeat";

import { CSSOpts } from "./api";

export function indent(opts: CSSOpts, d = opts.depth) {
    return d > 1 ? [...repeat(opts.format.indent, d)].join("") : d > 0 ? opts.format.indent : "";
}