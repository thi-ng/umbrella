import { equiv } from "@thi.ng/api/equiv";
import { intersection } from "@thi.ng/associative/intersection";
import { Stream, trace, Subscription, sync } from "@thi.ng/rstream";
import { Transducer, Reducer } from "@thi.ng/transducers/api";
import { compR } from "@thi.ng/transducers/func/compr";
import { map } from "@thi.ng/transducers/xform/map";

import { Fact, Pattern, Edit } from "./api";

export class FactGraph {

    static NEXT_ID = 0;

    facts: Fact[];
    indexS: Map<any, Set<number>>;
    indexP: Map<any, Set<number>>;
    indexO: Map<any, Set<number>>;
    allIDs: Set<number>;

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
        const id = FactGraph.NEXT_ID++;
        const is = s || new Set<number>();
        const ip = p || new Set<number>();
        const io = o || new Set<number>();
        this.facts[id] = f;
        is.add(id);
        ip.add(id);
        io.add(id);
        this.allIDs.add(id);
        !s && this.indexS.set(f[0], is);
        !p && this.indexP.set(f[1], ip);
        !o && this.indexO.set(f[2], io);
        this.streamAll.next(this.allIDs);
        this.streamS.next({ index: is, key: f[0] });
        this.streamP.next({ index: ip, key: f[1] });
        this.streamO.next({ index: io, key: f[2] });
        return this;
    }

    addQuery(id: string, [s, p, o]: Pattern) {
        const qs: Subscription<any, Set<number>> = this.getIndexSelection(this.streamS, s, "s");
        const qp: Subscription<any, Set<number>> = this.getIndexSelection(this.streamP, p, "p");
        const qo: Subscription<any, Set<number>> = this.getIndexSelection(this.streamO, o, "o");
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
        const submit = (index: Map<any, Set<number>>, stream: Subscription<any, Set<number>>, key: any) => {
            if (key != null) {
                const ids = index.get(key);
                ids && stream.next({ index: ids, key: s });
            } else {
                stream.next(this.allIDs);
            }
        };
        submit(this.indexS, qs, s);
        submit(this.indexP, qp, p);
        submit(this.indexO, qo, o);
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

    protected getIndexSelection(stream: Stream<Edit>, key: any, id: string): Subscription<any, Set<number>> {
        return key != null ?
            stream.transform(indexSel(key), id) :
            this.streamAll.subscribe(null, id);
    }
}

export const indexSel = (key: any): Transducer<Edit, Set<number>> =>
    (rfn: Reducer<any, Set<number>>) => {
        const r = rfn[2];
        return compR(rfn,
            (acc, e) => {
                if (equiv(e.key, key)) {
                    return r(acc, e.index);
                }
                return acc;
            }
        );
    };

export const g = new FactGraph();
g.addFact(["mia", "loves", "toxi"]);
g.addFact(["mia", "loves", "ned"]);
g.addFact(["mia", "age", 42]);
g.addFact(["toxi", "age", 42]);
g.addFact(["mia", "loves", "noah"]);
export const q1 = g.addQuery("mia", ["mia", null, null]);
export const q2 = g.addQuery("loves", [null, "loves", null]);
export const q3 = g.addQuery("all", [null, null, null]);
