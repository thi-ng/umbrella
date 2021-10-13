import type { Path } from "@thi.ng/api";
import { getInUnsafe } from "@thi.ng/paths/get-in";
import { map } from "@thi.ng/transducers/map";
import type { NodeFactory } from "../api.js";
import { node1 } from "../graph.js";

/**
 * Nested value extraction node. Higher order function.
 *
 * Inputs: 1
 *
 * @param path - value lookup path
 * @param inputID - default: `src`
 */
export const extract = (path: Path, inputID?: string): NodeFactory<any> =>
    node1(
        map((x) => getInUnsafe(x, path)),
        inputID
    );
