import { ICopy } from "@thi.ng/api";
import { equivArrayLike } from "@thi.ng/equiv";
import { mapcat } from "@thi.ng/transducers";
import { Vec } from "@thi.ng/vectors3";
import { ClipMode, LineIntersectionType, VecPair } from "../api";
import { edges as _edges } from "./edges";
import { intersectLines2 } from "./line-intersection";
import { pointInside, polygonArea } from "./polygon";

export const enum VertexFlag {
    ISEC = 1,
    ENTRY = 2,
    VISITED = 4
}

export class ClipVertex implements
    ICopy<ClipVertex> {

    pos: Vec;
    next: ClipVertex;
    prev: ClipVertex;
    pair: ClipVertex;
    flags: VertexFlag;
    dist: number;

    constructor(pos: Vec, dist = 0, flags = VertexFlag.ENTRY) {
        this.pos = pos;
        this.dist = dist;
        this.flags = flags;
        this.next = this.prev = this.pair = null;
    }

    copy() {
        return new ClipVertex(this.pos);
    }

    equiv(v: any) {
        return v && equivArrayLike(this.pos, v.pos);
    }

    reset() {
        this.flags = VertexFlag.ENTRY;
        this.pair = null;
        this.dist = 0;
        return this;
    }

    visit() {
        this.flags |= VertexFlag.VISITED;
        this.pair && (this.pair.flags |= VertexFlag.VISITED);
    }

    nextNonIntersecting() {
        let v: ClipVertex = this;
        while (v.flags & VertexFlag.ISEC) {
            v = v.next;
        }
        return v;
    }
}

export class ClipPolygon implements
    ICopy<ClipPolygon> {

    protected first: ClipVertex;
    protected firstIsec: ClipVertex;
    protected lastProc: ClipVertex;
    protected length: number;
    protected clockwise: boolean;

    constructor(points: Vec[], orient = true) {
        if (orient && polygonArea(points) > 0) {
            points = points.slice().reverse();
        }
        this.first = this.firstIsec = this.lastProc = null;
        this.length = 0;
        const n = points.length;
        for (let i = 0; i < n; i++) {
            this.addVertex(points[i]);
        }
    }

    copy() {
        return new ClipPolygon(this.vertices());
    }

    addVertex(p: Vec) {
        const v = new ClipVertex(p);
        if (this.first) {
            const next = this.first;
            const prev = next.prev;
            next.prev = v;
            v.next = next;
            v.prev = prev;
            prev.next = v;
        } else {
            this.first = v;
            v.next = v.prev = v;
        }
        this.length++;
    }

    insertVertex(v: ClipVertex, start: ClipVertex, end: ClipVertex) {
        let curr = start;
        while (curr !== end && curr.dist < v.dist) {
            curr = curr.next;
        }
        v.next = curr;
        const prev = curr.prev;
        v.prev = prev;
        prev.next = v;
        curr.prev = v;
        this.length++;
    }

    removeVertex(v: ClipVertex) {
        if (this.first === v) {
            if (this.length === 1) {
                this.first = null;
                this.length = 0;
                return;
            }
            this.first = v.next;
        }
        this.firstIsec === v && (this.firstIsec = null);
        this.lastProc === v && (this.lastProc = null);
        v.prev.next = v.next;
        v.next.prev = v.prev;
        this.length--;
    }

    edges() {
        const edges: VecPair[] = [];
        const f = this.first;
        let v = f;
        do {
            edges.push([v.pos, v.next.pos]);
            v = v.next;
        } while (v !== f);
        return edges;
    }

    vertices() {
        const vertices: Vec[] = [];
        const f = this.first;
        let v = f;
        do {
            vertices.push(v.pos);
            v = v.next;
        } while (v !== f);
        return vertices;
    }

    clip(clip: ClipPolygon, mode: ClipMode) {
        this.insertIntersections(clip);
        const sinc = clip.pointInside(this.first.pos);
        const cins = this.pointInside(clip.first.pos);
        this.markEntryVertices(((mode & 1) ^ sinc) > 0);
        clip.markEntryVertices((((mode >> 1) & 1) ^ cins) > 0);
        const res = this.buildClipPolys();
        if (res.length === 0) {
            switch (mode) {
                case ClipMode.UNION:
                    if (sinc) { res.push(clip); }
                    else if (cins) { res.push(this); }
                    else { res.push(this, clip); }
                    break;
                case ClipMode.INTERSECTION:
                    if (sinc) { res.push(this); }
                    else if (cins) { res.push(clip); }
                    break;
                default:
                    if (sinc) { res.push(clip, this); }
                    else if (cins) { res.push(this, clip); }
                    else { res.push(this); }
            }
        }
        return res;
    }

    reset() {
        const f = this.first;
        let v = f;
        do {
            v = v.reset().next;
        } while (v !== f);
    }

    pointInside(p: Vec) {
        const f = this.first;
        const x = p[0];
        const y = p[1];
        let v = f;
        let n = v.next;
        let inside = 0;
        do {
            inside = pointInside(v.pos, n.pos, x, y, inside);
            v = n;
            n = n.next || f;
        } while (v !== f);
        return inside;
    }

    protected insertIntersections(clip: ClipPolygon) {
        let s = this.first;
        let c = clip.first;
        do {
            if (!(s.flags & VertexFlag.ISEC)) {
                do {
                    if (!(c.flags & VertexFlag.ISEC)) {
                        const ns = s.next.nextNonIntersecting();
                        const nc = c.next.nextNonIntersecting();
                        const i = intersectLines2(s.pos, ns.pos, c.pos, nc.pos);
                        if (i && i.type === LineIntersectionType.INTERSECT) {
                            const is = new ClipVertex(i.isec, i.alpha, VertexFlag.ISEC);
                            const ic = new ClipVertex(i.isec, i.beta, VertexFlag.ISEC);
                            is.pair = ic;
                            ic.pair = is;
                            this.insertVertex(is, s, ns);
                            clip.insertVertex(ic, c, nc);
                        }
                    }
                    c = c.next;
                } while (c !== clip.first);
            }
            s = s.next;
        } while (s !== this.first);
    }

    protected markEntryVertices(state: boolean) {
        const f = this.first;
        let v = f;
        do {
            if (v.flags & VertexFlag.ISEC) {
                v.flags = state ?
                    (v.flags | VertexFlag.ENTRY) :
                    (v.flags & (~VertexFlag.ENTRY));
                state = !state;
            }
            v = v.next;
        } while (v !== f);
    }

    protected buildClipPolys() {
        const res: ClipPolygon[] = [];
        while (this.hasUnprocessed()) {
            let curr = this.findfirstIntersection();
            const clipped = new ClipPolygon([curr.pos]);
            do {
                curr.visit();
                if (curr.flags & VertexFlag.ENTRY) {
                    do {
                        curr = curr.next;
                        clipped.addVertex(curr.pos);
                    } while (!(curr.flags & VertexFlag.ISEC));
                } else {
                    do {
                        curr = curr.prev;
                        clipped.addVertex(curr.pos);
                    } while (!(curr.flags & VertexFlag.ISEC));
                }
                curr = curr.pair;
            } while (curr.flags < VertexFlag.VISITED);
            clipped.removeVertex(clipped.first.prev);
            // TODO only return vertices?
            res.push(clipped);
        }
        return res;
    }

    protected findfirstIntersection() {
        const f = this.first;
        let v = this.firstIsec || f;
        do {
            if (v.flags < VertexFlag.VISITED && (v.flags & VertexFlag.ISEC)) {
                break;
            }
            v = v.next;
        } while (v !== f);
        this.firstIsec = v;
        return v;
    }

    protected hasUnprocessed() {
        const f = this.first;
        let v = this.lastProc || f;
        do {
            if (v.flags < VertexFlag.VISITED && (v.flags & VertexFlag.ISEC)) {
                this.lastProc = v;
                return true;
            }
            v = v.next;
        } while (v !== f);
        this.lastProc = null;
        return false;
    }
};

export const booleanOp = (a: Vec[][], b: Vec[], mode: ClipMode, orient = true) =>
    [...mapcat(
        (a) =>
            new ClipPolygon(a, orient)
                .clip(new ClipPolygon(b, orient), mode)
                .map((c) => c.vertices()),
        a)];
