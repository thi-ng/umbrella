import type { Pair } from "@thi.ng/api";
import { popCount } from "@thi.ng/binary";
import { BitMatrix } from "@thi.ng/bitfield";
import type { IGraph } from "./api";

export class AdjacencyBitMatrix implements IGraph {
    /**
     * Creates adjacency matrix with capacity `n` (max vertices) from
     * given edge pairs. Each edge is `[dest-node src-node]`.
     *
     * @remarks
     * If `undirected` is true, creates symmetrical adjacencies.
     *
     * @param n - max vertices
     * @param edges - edge pairs
     * @param undirected -true, if undirected
     */
    static fromEdges(
        n: number,
        edges: Iterable<Pair<number, number>>,
        undirected = false
    ) {
        const mat = new AdjacencyBitMatrix(n, undirected);
        for (let e of edges) {
            mat.addEdge(e[0], e[1]);
        }
        return mat;
    }

    mat: BitMatrix;
    protected undirected: boolean;
    protected numE: number;

    constructor(n: number, undirected = false) {
        this.mat = new BitMatrix(n);
        this.undirected = undirected;
        this.numE = 0;
    }

    *edges() {
        const directed = !this.undirected;
        for (let i = this.mat.n; --i >= 0; ) {
            for (let n of this.neighbors(i)) {
                if (directed || n > i) {
                    yield <Pair<number, number>>[i, n];
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
        !this.mat.setAt(to, from, true) && this.numE++;
        this.undirected && this.mat.setAt(from, to, true);
        return this;
    }

    removeEdge(from: number, to: number) {
        this.mat.setAt(to, from, false) && this.numE--;
        this.undirected && this.mat.setAt(from, to, false);
        return this;
    }

    hasEdge(from: number, to: number) {
        return this.mat.at(to, from) !== 0;
    }

    valence(id: number) {
        const s = this.mat.stride;
        const d = this.mat.data;
        let res = 0;
        id *= s;
        for (let i = id + s; --i >= id; ) {
            d[i] !== 0 && (res += popCount(d[i]));
        }
        return res;
    }

    neighbors(id: number) {
        const s = this.mat.stride;
        const d = this.mat.data;
        const res: number[] = [];
        id *= s;
        for (let i = this.mat.n - 1, j = id + s - 1; i >= 0; i -= 32, j--) {
            const v = d[j];
            if (v !== 0) {
                for (let k = 31 - Math.clz32(v); k >= 0; k--) {
                    (v & (1 << k)) !== 0 && res.push(i - k);
                }
            }
        }
        return res;
    }

    toString() {
        return this.mat.toString();
    }

    toDot() {
        const [type, sep] = this.undirected
            ? ["graph", "--"]
            : ["digraph", "->"];
        const res = [`${type} g {`];
        for (let e of this.edges()) {
            res.push(`"${e[0]}"${sep}"${e[1]}";`);
        }
        res.push(`}`);
        return res.join("\n");
    }
}
