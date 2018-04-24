import { ISubscribable } from "@thi.ng/rstream";

export interface IToDot {
    toDot(opts?: Partial<DotOpts>): string;
}

export type NodeType =
    "default" |
    "noid" |
    "stream" |
    "streammerge" |
    "streamsync";

export interface Node {
    id: number;
    label: string;
    type: string;
    xform: boolean;
}

export interface WalkState {
    subs: Map<ISubscribable<any>, Node>;
    rels: Node[][];
    id: number;
}

export interface DotOpts {
    dir: string;
    font: string;
    fontsize: string;
    text: string;
    color: Record<NodeType, string>;
}
