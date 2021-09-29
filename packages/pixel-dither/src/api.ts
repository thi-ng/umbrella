export type BayerSize = 1 | 2 | 4 | 8 | 16 | 32 | 64;

export interface BayerMatrix {
    mat: number[][];
    invSize: number;
    mask: number;
}
