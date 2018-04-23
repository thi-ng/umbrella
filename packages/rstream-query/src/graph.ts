import { equiv } from "@thi.ng/api/equiv";
// import { SortedMap } from "@thi.ng/associative/sorted-map";
import { intersection } from "@thi.ng/associative/intersection";
import { Stream, trace, Subscription, sync } from "@thi.ng/rstream";
import { Transducer, Reducer } from "@thi.ng/transducers/api";
import { compR } from "@thi.ng/transducers/func/compr";
import { map } from "@thi.ng/transducers/xform/map";

import { Fact, Pattern, EditOp, Edit } from "./api";

export class FactGraph {

    static NEXT_ID = 0;

    facts: Fact[];
    indexS: Map<any, Set<number>>;
    indexP: Map<any, Set<number>>;
    indexO: Map<any, Set<number>>;
    allIDs: Set<number>;

    indexSelS: Map<any, Subscription<Edit, Set<number>>>;
    indexSelP: Map<any, Subscription<Edit, Set<number>>>;
    indexSelO: Map<any, Subscription<Edit, Set<number>>>;

    streamAll: Stream<Set<number>>;
    streamS: Stream<Edit>;
    streamP: Stream<Edit>;
    streamO: Stream<Edit>;

    constructor() {
        this.facts = [];
        this.indexS = new Map();
        this.indexP = new Map();
        this.indexO = new Map();
        this.streamS = new Stream("S");
        this.streamP = new Stream("P");
        this.streamO = new Stream("O");
        this.streamAll = new Stream("ALL");
        this.allIDs = new Set<number>();
    }

    addFact(f: Fact) {
        let s = this.indexS.get(f[0]);
        let p = this.indexP.get(f[1]);
        let o = this.indexO.get(f[2]);
        if (this.findInIndices(s, p, o, f) !== -1) return this;
        s || (s = new Set<number>());
        p || (p = new Set<number>());
        o || (o = new Set<number>());
        const id = FactGraph.NEXT_ID++;
        this.facts[id] = f;
        s.add(id);
        p.add(id);
        o.add(id);
        this.allIDs.add(id);
        this.indexS.set(f[0], s);
        this.indexP.set(f[1], p);
        this.indexO.set(f[2], o);
        this.streamAll.next(this.allIDs);
        this.streamS.next({ op: EditOp.ADD, key: f[0], id });
        this.streamP.next({ op: EditOp.ADD, key: f[1], id });
        this.streamO.next({ op: EditOp.ADD, key: f[2], id });
        return this;
    }

    addQuery(id: string, [s, p, o]: Pattern) {
        const qs: Subscription<any, Set<number>> = s != null ?
            this.streamS.transform(indexSel(s), "s") :
            this.streamAll.subscribe(null, "s");
        const qp: Subscription<any, Set<number>> = p != null ?
            this.streamP.transform(indexSel(p), "p") :
            this.streamAll.subscribe(null, "p");
        const qo: Subscription<any, Set<number>> = o != null ?
            this.streamO.transform(indexSel(o), "o") :
            this.streamAll.subscribe(null, "o");
        const results = sync<Set<number>, Set<Fact>>({
            id,
            src: [qs, qp, qo],
            xform: map(
                ({ s, p, o }) => {
                    const res = new Set<Fact>();
                    for (let id of intersection(intersection(s, p), o)) {
                        res.add(this.facts[id])
                    }
                    return res;
                }
            )
        });
        for (let id = this.facts.length - 1; id >= 0; id--) {
            const f = this.facts[id];
            qs.next(s != null ? { op: EditOp.ADD, key: f[0], id } : this.allIDs);
            qp.next(p != null ? { op: EditOp.ADD, key: f[1], id } : this.allIDs);
            qo.next(o != null ? { op: EditOp.ADD, key: f[2], id } : this.allIDs);
        }
        return results.subscribe(trace(`${id}: `));
    }

    findInIndices(s: Set<number>, p: Set<number>, o: Set<number>, f: Fact) {
        if (s && p && o) {
            const facts = this.facts;
            const index = s.size < p.size ?
                s.size < o.size ? s : p.size < o.size ? p : o :
                p.size < o.size ? p : s.size < o.size ? s : o;
            console.log("smallest index", index, s, p, o);
            for (let id of index) {
                if (equiv(facts[id], f)) {
                    return id;
                }
            }
        }
        return -1;
    }
}

export function indexSel(key: any): Transducer<Edit, Set<number>> {
    return (rfn: Reducer<any, Set<number>>) => {
        const r = rfn[2];
        const sel = new Set<number>();
        return compR(rfn,
            (acc, e) => {
                if (key == null || equiv(e.key, key)) {
                    switch (e.op) {
                        case EditOp.ADD:
                            sel.add(e.id);
                            return r(acc, sel);
                        case EditOp.DELETE:
                            sel.delete(e.id);
                        case EditOp.UPDATE:
                            return r(acc, sel);
                        default:
                    }
                }
                return acc;
            });
    };
}

export const g = new FactGraph();
g.addFact(["mia", "loves", "toxi"]);
g.addFact(["mia", "loves", "ned"]);
g.addFact(["mia", "age", 42]);
g.addFact(["toxi", "age", 42]);
g.addFact(["mia", "loves", "noah"]);
export const q1 = g.addQuery("mia", ["mia", null, null]);
export const q2 = g.addQuery("loves", [null, "loves", null]);
export const q3 = g.addQuery("all", [null, null, null]);
