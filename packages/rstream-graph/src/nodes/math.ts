import { IObjectOf } from "@thi.ng/api/api";
import { map } from "@thi.ng/transducers/xform/map";

import { NodeFactory } from "../api";
import { node } from "../graph";

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
    }));

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
    }));

/**
 * Subtraction node.
 *
 * Inputs: `a`, `b`
 */
export const sub: NodeFactory<number> =
    node(map((ports: IObjectOf<number>) => ports.a - ports.b), ["a", "b"]);

/**
 * Division node.
 *
 * Inputs: `a`, `b`
 */
export const div: NodeFactory<number> =
    node(map((ports: IObjectOf<number>) => ports.a / ports.b), ["a", "b"]);
