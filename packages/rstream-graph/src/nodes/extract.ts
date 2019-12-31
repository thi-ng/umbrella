import { Path } from "@thi.ng/api";
import { getIn } from "@thi.ng/paths";
import { map } from "@thi.ng/transducers";
import { NodeFactory } from "../api";
import { node1 } from "../graph";

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
        map((x) => getIn(x, path)),
        inputID
    );
