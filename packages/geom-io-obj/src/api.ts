import type { Vec } from "@thi.ng/vectors";

export interface OBJModel {
    vertices: Vec[];
    normals: Vec[];
    uvs: Vec[];
    objects: OBJObject[];
    mtlLibs: string[];
}

export interface OBJObject {
    id: string;
    groups: OBJGroup[];
}

export interface OBJGroup {
    id: string;
    smooth: boolean;
    mtl?: string;
    faces: OBJFace[];
    lines: number[][];
}

export interface OBJFace {
    v: number[];
    n?: number[];
    uv?: number[];
}
