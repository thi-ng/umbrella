import type { IObjectOf } from "@thi.ng/api";
import { map } from "@thi.ng/transducers/xform/map";
import type { NodeFactory } from "../api";
import { node, node2 } from "../graph";

/**
 * Addition node.
 *
 * Inputs: any
 */
export const add: NodeFactory<number> = node(
    map((ports: IObjectOf<number>) => {
        let acc = 0;
        let v;
        for (let p in ports) {
            if ((v = ports[p]) == null) return;
            acc += v;
        }
        return acc;
    })
);

/**
 * Multiplication node.
 *
 * Inputs: any
 */
export const mul: NodeFactory<number> = node(
    map((ports: IObjectOf<number>) => {
        let acc = 1;
        let v;
        for (let p in ports) {
            if ((v = ports[p]) == null) return;
            acc *= v;
        }
        return acc;
    })
);

/**
 * Subtraction node.
 *
 * Inputs: `a`, `b`
 */
export const sub: NodeFactory<number> = node2(
    map((ports: IObjectOf<number>) => ports.a - ports.b)
);

/**
 * Division node.
 *
 * Inputs: `a`, `b`
 */
export const div: NodeFactory<number> = node2(
    map((ports: IObjectOf<number>) => ports.a / ports.b)
);
