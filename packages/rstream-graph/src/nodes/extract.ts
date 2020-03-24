import { getInUnsafe } from "@thi.ng/paths";
import { map } from "@thi.ng/transducers";
import { node1 } from "../graph";
import type { Path } from "@thi.ng/api";
import type { NodeFactory } from "../api";

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
