import { getIn, Path } from "@thi.ng/paths";
import { map } from "@thi.ng/transducers/xform/map";

import { NodeFactory } from "../api";
import { node1 } from "../graph";

/**
 * Nested value extraction node. Higher order function.
 *
 * Inputs: 1
 */
export const extract = (path: Path, inputID?: string): NodeFactory<any> =>
    node1(map((x) => getIn(x, path)), inputID);
