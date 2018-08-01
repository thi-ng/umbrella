import { DegreeType } from "./api";
import { CSR } from "./csr";

export class AdjacencyMatrix extends CSR {

    public static newEmpty(n: number, undirected = true) {
        const raw = CSR.empty(n);
        return new AdjacencyMatrix(n, raw.data, raw.rows, raw.cols, undirected);
    }

    /**
     * Creates adjacency matrix from given edge pairs.
     * Each edge is `[dest-node src-node]`.
     *
     * If `undirected` is true, creates symmetrical
     * adjacencies.
     *
     * @param n
     * @param edges
     * @param undirected
     */
    public static fromEdges(n: number, edges: number[][], undirected = true) {
        const mat = AdjacencyMatrix.newEmpty(n, undirected);
        for (let i = edges.length - 1; i >= 0; i--) {
            const e = edges[i];
            mat.addEdge(e[0], e[1]);
        }
        return mat;
    }

    public static fromGrid2D(w: number, h: number, wrap = true) {
        const mat = AdjacencyMatrix.newEmpty(w * h, true);
        if (wrap) {
            for (let x = 0, last = w * (h - 1); x < w; x++) {
                mat.addEdge(x, x + last);
                mat.addEdge(x, x > 0 ? x - 1 : w - 1);
            }
            for (let y = 1; y < h; y++) {
                const row = y * w;
                for (let x = 0; x < w; x++) {
                    const i = row + x;
                    mat.addEdge(i, i - w);
                    mat.addEdge(i, x > 0 ? i - 1 : i + w - 1);
                }
            }
        } else {
            for (let x = 1; x < w; x++) {
                mat.addEdge(x, x - 1);
            }
            for (let y = 1; y < h; y++) {
                const row = y * w;
                mat.addEdge(row, row - w);
                for (let x = 1; x < w; x++) {
                    const i = row + x;
                    mat.addEdge(i, i - w);
                    mat.addEdge(i, i - 1);
                }
            }
        }
        return mat;
    }

    public undirected: boolean;

    constructor(n: number, data: number[], rows: number[], cols: number[], undirected = true) {
        super(n, n, data, rows, cols);
        this.undirected = undirected;
    }

    public addEdge(to: number, from: number) {
        this.setAt(to, from, 1);
        this.undirected && this.setAt(from, to, 1);
    }

    public removeEdge(to: number, from: number) {
        this.setAt(to, from, 0);
        this.undirected && this.setAt(from, to, 0);
    }

    public hasEdge(to: number, from: number) {
        return this.at(to, from) !== 0;
    }

    public numEdges() {
        return this.data.length;
    }

    public numVertices() {
        return this.m;
    }

    public *edges() {
        const rows = this.rows,
            cols = this.cols;
        for (let i = 0; i < this.m; i++) {
            const jj = rows[i + 1];
            for (let j = rows[i]; j < jj; j++) {
                yield [i, cols[j]];
            }
        }
    }

    /**
     *
     * @param deg
     */
    public degreeMat(deg: DegreeType = DegreeType.OUT) {
        const res = CSR.empty(this.m),
            m = this.m - 1;
        switch (deg) {
            case DegreeType.OUT:
            default:
                for (let i = m; i >= 0; i--) {
                    res.setAt(i, i, this.nnzRow(i));
                }
                break;
            case DegreeType.IN:
                for (let i = m; i >= 0; i--) {
                    res.setAt(i, i, this.nnzCol(i));
                }
                break;
            case DegreeType.BOTH:
                for (let i = m; i >= 0; i--) {
                    res.setAt(i, i, this.nnzRow(i) + this.nnzCol(i));
                }
                break;
        }
        return res;
    }

    /**
     * Returns this graph's Laplacian matrix: `L = D - A`
     * Where `D` is the degree matrix and `A` this adjacency matrix.
     *
     * https://en.wikipedia.org/wiki/Laplacian_matrix
     *
     * @param deg degree type for `degreeMat()`
     */
    public laplacianMat(deg?: CSR) {
        return (deg || this.degreeMat()).sub(this);
    }

    public normalizedLaplacian(deg?: CSR) {
        deg = deg || this.degreeMat();
        const m = this.m,
            res = AdjacencyMatrix.newEmpty(m);
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < m; j++) {
                if (i === j && deg.at(i, i) > 0) {
                    res.setAt(i, j, 1);
                } else if (i !== j && this.at(i, j) > 0) {
                    res.setAt(i, j, -1 / Math.sqrt(deg.at(i, i) * deg.at(j, j)));
                }
            }
        }
        return res;
    }

    /**
     * Computes: `I - nA + n^2 * (D - I)`
     *
     * @param n
     * @param deg
     */
    public deformedLaplacian(n: number, deg?: CSR) {
        deg = deg || this.degreeMat();
        const I = CSR.identity(this.m);
        return I.copy().sub(this.copy().mulN(n)).add(deg.copy().sub(I).mulN(n * n));
    }

    public toDot() {
        const res = [`digraph g {`];
        for (let i = 0; i < this.m; i++) {
            for (let j of this.nzRowCols(i)) {
                res.push(`"${j}"--"${i}";`);
            }
        }
        res.push(`}`);
        return res.join("\n");
    }
}
