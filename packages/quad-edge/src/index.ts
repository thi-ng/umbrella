let NEXT_ID = 0;

/**
 * Helper function to set / reset edge ID counter.
 *
 * @param id
 */
export const setNextID =
    (id: number) => (NEXT_ID = (id + 3) & -4);

export class QuadEdge<T> {

    edges: Edge<T>[];

    constructor() {
        const edges = [
            new Edge(this, NEXT_ID + 0),
            new Edge(this, NEXT_ID + 1),
            new Edge(this, NEXT_ID + 2),
            new Edge(this, NEXT_ID + 3),
        ];
        NEXT_ID += 4;
        this.edges = edges;
        edges[0].next = edges[0];
        edges[1].next = edges[3];
        edges[2].next = edges[2];
        edges[3].next = edges[1];
    }
}

/**
 * Quad-edge implementation after Guibas & Stolfi. Based on C++ versions
 * by Paul Heckbert, Dani Lischinski et al:
 *
 * References:
 *
 * - http://www.cs.cmu.edu/afs/andrew/scs/cs/15-463/2001/pub/src/a2/quadedge.html
 * - http://www.cs.cmu.edu/afs/andrew/scs/cs/15-463/2001/pub/src/a2/lischinski/114.ps
 */
export class Edge<T> {

    /**
     * Main edge / quadedge factory function. Use this in preference of
     * direct invocation of the `Edge` constructor.
     *
     * Creates new `QuadEdge` with 4 child edges and returns the first
     * child/primary edge. If `src` and `dest` are not `null`ish, the
     * given args will be associated with that new edge as end points.
     *
     * @param src
     * @param dest
     */
    static create<T>(src?: T, dest?: T) {
        const e = new QuadEdge<T>().edges[0];
        src && dest && e.setEnds(src, dest);
        return e;
    }

    id: number;
    parent: QuadEdge<T>;
    next: Edge<T>;
    vertex: T;

    constructor(parent: QuadEdge<T>, id: number) {
        this.parent = parent;
        this.id = id;
    }

    get rot() {
        return this.parent.edges[(this.id + 1) & 3];
    }

    get invrot() {
        return this.parent.edges[(this.id + 3) & 3];
    }

    get sym() {
        return this.parent.edges[(this.id + 2) & 3];
    }

    get onext() {
        return this.next;
    }

    get oprev() {
        return this.rot.onext.rot;
    }

    get dnext() {
        return this.sym.onext.sym;
    }

    get dprev() {
        return this.invrot.onext.invrot;
    }

    get lnext() {
        return this.invrot.onext.rot;
    }

    get lprev() {
        return this.onext.sym;
    }

    get rnext() {
        return this.rot.onext.invrot;
    }

    get rprev() {
        return this.sym.onext;
    }

    get dest() {
        return this.sym.vertex;
    }

    setEnds(o: T, d: T) {
        this.vertex = o;
        this.sym.vertex = d;
    }

    connect(b: Edge<T>): Edge<T> {
        const e = Edge.create<T>();
        e.splice(this.lnext)
        e.sym.splice(b);
        e.setEnds(this.dest, b.vertex);
        return e;
    }

    swap() {
        const a = this.oprev;
        const b = this.sym.oprev;
        this.splice(a);
        this.sym.splice(b);
        this.splice(a.lnext);
        this.sym.splice(b.lnext);
        this.setEnds(a.dest, b.dest);
    }

    remove() {
        this.splice(this.oprev);
        this.sym.splice(this.sym.oprev);
        delete this.parent;
    }

    splice(b: Edge<T>): Edge<T> {
        const alpha = this.onext.rot;
        const beta = b.onext.rot;
        const t1 = b.onext;
        const t2 = this.onext;
        const t3 = beta.onext;
        const t4 = alpha.onext;
        this.next = t1;
        b.next = t2;
        alpha.next = t3;
        beta.next = t4;
        return this;
    }
}
