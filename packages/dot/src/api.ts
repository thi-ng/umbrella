import { IObjectOf } from "@thi.ng/api/api";

export enum NodeShape {
    BOX,
    CIRCLE,
    DIAMOND,
    DOUBLE_CIRCLE,
    DOUBLE_OCTAGON,
    EGG,
    ELLIPSE,
    HEXAGON,
    HOUSE,
    INV_HOUSE,
    INV_TRAPEZIUM,
    INV_TRIANGLE,
    M_CIRCLE,
    M_DIAMOND,
    M_RECORD,
    M_SQUARE,
    NONE,
    OCTAGON,
    PARALLELOGRAM,
    PLAINTEXT,
    POINT,
    POLYGON,
    RECORD,
    TRAPEZIUM,
    TRIANGLE,
    TRIPLE_OCTAGON,
}

export type Color = string | number[];

export interface GraphAttribs {
    bgcolor: Color;
    clusterrank: "global" | "local" | "none";
    color: Color;
    compound: boolean;
    concentrate: boolean;
    dpi: number;
    edge: Partial<EdgeAttribs>;
    fillcolor: Color;
    fontcolor: Color;
    fontname: string;
    fontsize: number;
    label: string;
    labeljust: "l" | "r" | "c";
    labelloc: "t" | "b";
    landscape: boolean;
    margin: number;
    node: Partial<NodeAttribs>;
    nodesep: number;
    orientation: "portrait" | "landscape";
    rank: "same" | "min" | "max" | "source" | "sink";
    rankdir: "LR" | "TB";
    ranksep: number;
    ratio: string;
    [id: string]: any;
}

export interface Graph {
    attribs?: Partial<GraphAttribs>;
    directed?: boolean;
    edges: Edge[];
    id?: string;
    nodes: IObjectOf<Partial<Node>>;
    sub?: IObjectOf<Graph>;
}

export interface NodeAttribs {
    color: Color;
    fillcolor: Color;
    fontcolor: Color;
    fontname: string;
    fontsize: number;
    penwidth: number;
    peripheries: number;
    shape: NodeShape;
    sides: number;
    skew: number;
    style: string;
    [id: string]: any;
}

export interface Node extends NodeAttribs {
    ins: IObjectOf<string>;
    outs: IObjectOf<string>;
    label: string;
    tooltip: string;
    target: string;
    url: string;
}

export interface EdgeAttribs {
    color: Color;
    fontcolor: Color;
    fontname: string;
    fontsize: number;
    label: string;
    style: string;
    [id: string]: any;
}

export interface Edge extends Partial<EdgeAttribs> {
    src: string;
    dest: string;
    srcPort?: string;
    destPort?: string;
}
