import { IObjectOf } from "@thi.ng/api/api";
import { map } from "@thi.ng/transducers/xform/map";

import { MultiInputNodeFn } from "../api";
import { node } from "../graph";

/**
 * Addition node.
 *
 * Inputs: any
 */
export const add: MultiInputNodeFn<number> = node(
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
export const mul: MultiInputNodeFn<number> = node(
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
 * Inputs: 2
 */
export const sub: MultiInputNodeFn<number> =
    node(map((ports: IObjectOf<number>) => ports.a - ports.b), 2);

/**
 * Division node.
 *
 * Inputs: 2
 */
export const div: MultiInputNodeFn<number> =
    node(map((ports: IObjectOf<number>) => ports.a / ports.b), 2);
