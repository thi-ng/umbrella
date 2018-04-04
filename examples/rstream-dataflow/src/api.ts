import { ISubscribable } from "@thi.ng/rstream/api";
import { Transducer } from "@thi.ng/transducers/api";

export interface NodeSpec {
    fn: (src: ISubscribable<any>[]) => ISubscribable<any>;
    ins: NodeInput[];
    out?: NodeOutput;
}

export interface NodeInput {
    id?: string;
    path?: string;
    stream?: string | ((resolve) => ISubscribable<any>);
    const?: any;
    xform?: Transducer<any, any>;
}

export type NodeOutput = string | ((node: ISubscribable<any>) => void);
