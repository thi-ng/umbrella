import type { Pair } from "@thi.ng/api";
import { CSR } from "@thi.ng/sparse";
import { DegreeType, IGraph } from "./api";

export class AdjacencyMatrix extends CSR implements IGraph {
    static newEmpty(n: number, undirected = false) {
        const raw = CSR.empty(n);
        return new AdjacencyMatrix(n, raw.data, raw.rows, raw.cols, undirected);
    }

    /**
     * Creates adjacency matrix from given edge pairs. Each edge is
     * `[dest-node src-node]`.
     *
     * @remarks
     * If `undirected` is true (default: false), creates symmetrical
     * edges.
     *
     * @param n - max number of vertices
     * @param edges - edge pairs
     * @param undirected - true, if undirected
     */
    static fromEdges(
        n: number,
        edges: Iterable<Pair<number, number>>,
        undirected = false
    ) {
        const mat = AdjacencyMatrix.newEmpty(n, undirected);
        for (let e of edges) {
            mat.addEdge(e[0], e[1]);
        }
        return mat;
    }

    undirected: boolean;

    constructor(
        n: number,
        data: number[],
        rows: number[],
        cols: number[],
        undirected = false
    ) {
        super(n, n, data, rows, cols);
        this.undirected = undirected;
    }

    *edges() {
        const { cols, rows } = this;
        const directed = !this.undirected;
        for (let i = 0; i < this.m; i++) {
            const jj = rows[i + 1];
            for (let j = rows[i]; j < jj; j++) {
                const k = cols[j];
                if (directed || i <= k) {
                    yield <Pair<number, number>>[i, k];
                }
            }
        }
    }

    addEdge(from: number, to: number) {
        this.setAt(to, from, 1);
        this.undirected && this.setAt(from, to, 1);
        return this;
    }

    removeEdge(from: number, to: number) {
        this.setAt(to, from, 0);
        this.undirected && this.setAt(from, to, 0);
        return this;
    }

    hasEdge(from: number, to: number) {
        return this.at(to, from) !== 0 || this.at(from, to) !== 0;
    }

    numEdges() {
        const n = this.data.length;
        return this.undirected ? n / 2 : n;
    }

    numVertices() {
        return this.m;
    }

    valence(id: number): number {
        return this.nnzRow(id);
    }

    neighbors(id: number): number[] {
        return this.nzRowCols(id);
    }

    /**
     *
     * @param deg - degree type
     */
    degreeMat(deg: DegreeType = DegreeType.OUT) {
        const res = CSR.empty(this.m);
        switch (deg) {
            case DegreeType.OUT:
            default:
                for (let i = this.m; --i >= 0; ) {
                    res.setAt(i, i, this.nnzRow(i));
                }
                break;
            case DegreeType.IN:
                for (let i = this.m; --i >= 0; ) {
                    res.setAt(i, i, this.nnzCol(i));
                }
                break;
            case DegreeType.BOTH:
                for (let i = this.m; --i >= 0; ) {
                    res.setAt(i, i, this.nnzRow(i) + this.nnzCol(i));
                }
                break;
        }
        return res;
    }

    /**
     * Returns this graph's Laplacian matrix: `L = D - A` Where `D` is
     * the degree matrix and `A` this adjacency matrix.
     *
     * @remarks
     * - {@link https://en.wikipedia.org/wiki/Laplacian_matrix}
     * - {@link https://en.wikipedia.org/wiki/Discrete_Laplace_operator}
     *
     * @param deg - degree type for {@link AdjacencyMatrix.degreeMat}
     */
    laplacianMat(deg?: CSR) {
        return (deg || this.degreeMat()).sub(this);
    }

    normalizedLaplacian(deg?: CSR) {
        deg = deg || this.degreeMat();
        const m = this.m;
        const res = AdjacencyMatrix.newEmpty(m);
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < m; j++) {
                if (i === j && deg.at(i, i) > 0) {
                    res.setAt(i, j, 1);
                } else if (i !== j && this.at(i, j) > 0) {
                    res.setAt(
                        i,
                        j,
                        -1 / Math.sqrt(deg.at(i, i) * deg.at(j, j))
                    );
                }
            }
        }
        return res;
    }

    /**
     * Computes: `I - nA + n^2 * (D - I)`, where `I` is the unit matrix,
     * `A` the adjacency matrix, `D` the degree matrix, and `n` is a
     * (complex-valued) number.
     *
     * @remarks
     * See {@link AdjacencyMatrix.degreeMat}.
     *
     * @param n - scale factor
     * @param deg - degree matrix
     */
    deformedLaplacian(n: number, deg?: CSR) {
        deg = deg || this.degreeMat();
        const I = CSR.identity(this.m);
        return I.copy()
            .sub(this.copy().mulN(n))
            .add(
                deg
                    .copy()
                    .sub(I)
                    .mulN(n * n)
            );
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
