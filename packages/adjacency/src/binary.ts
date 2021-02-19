import { popCount } from "@thi.ng/binary";
import { BitMatrix } from "@thi.ng/bitfield";
import type { Edge, IGraph } from "./api";
import { into, invert, toDot } from "./utils";

export class AdjacencyBitMatrix implements IGraph<number> {
    mat: BitMatrix;
    protected undirected: boolean;
    protected numE: number;

    constructor(n: number, edges?: Iterable<Edge>, undirected = false) {
        this.mat = new BitMatrix(n);
        this.undirected = undirected;
        this.numE = 0;
        edges && into(this, edges);
    }

    *edges() {
        const directed = !this.undirected;
        for (let i = this.mat.n; --i >= 0; ) {
            for (let n of this.neighbors(i)) {
                if (directed || n > i) {
                    yield <Edge>[i, n];
                }
            }
        }
    }

    numEdges(): number {
        return this.numE;
    }

    numVertices(): number {
        return this.mat.n;
    }

    /**
     * Resizes matrix to new size given.
     *
     * @param n - new max vertices
     */
    resize(n: number) {
        this.mat.resize(n);
        return this;
    }

    addEdge(from: number, to: number) {
        if (!this.mat.setAt(from, to, true)) {
            this.numE++;
            this.undirected && this.mat.setAt(to, from, true);
            return true;
        }
        return false;
    }

    removeEdge(from: number, to: number) {
        if (this.mat.setAt(from, to, false)) {
            this.numE--;
            this.undirected && this.mat.setAt(to, from, false);
            return true;
        }
        return false;
    }

    hasEdge(from: number, to: number) {
        return this.mat.at(from, to) !== 0;
    }

    valence(id: number) {
        let res = 0;
        const { data, stride } = this.mat;
        id *= stride;
        for (let i = id + stride; --i >= id; ) {
            data[i] !== 0 && (res += popCount(data[i]));
        }
        return res;
    }

    neighbors(id: number) {
        const res: number[] = [];
        const { data, stride } = this.mat;
        id *= stride;
        for (
            let i = this.mat.n - 1, j = id + stride - 1;
            i >= 0;
            i -= 32, j--
        ) {
            const v = data[j];
            if (v !== 0) {
                for (let k = 31 - Math.clz32(v); k >= 0; k--) {
                    (v & (1 << k)) !== 0 && res.push(i - k);
                }
            }
        }
        return res;
    }

    invert(): AdjacencyBitMatrix {
        return invert(
            new AdjacencyBitMatrix(this.mat.n, undefined, this.undirected),
            this.edges()
        );
    }

    toString() {
        return this.mat.toString();
    }

    toDot(ids?: string[]) {
        return toDot(this.edges(), this.undirected, ids);
    }
}

/**
 * Creates adjacency matrix backed by a {@link @thi.ng/bitfield#BitMatrix}
 * with capacity `n` (max vertices), optionally initialized with given edge
 * pairs. Each edge is `[src-node dest-node]`. If `undirected` is true
 * (default: false), creates symmetrical adjacencies.
 *
 * @param n - max vertices
 * @param edges - edge pairs
 * @param undirected -true, if undirected
 */
export const defAdjBitMatrix = (
    n: number,
    edges?: Iterable<Edge>,
    undirected?: boolean
) => new AdjacencyBitMatrix(n, edges, undirected);
