import { IObjectOf } from "@thi.ng/api/api";
import { equiv } from "@thi.ng/api/equiv";
import { intersection } from "@thi.ng/associative/intersection";
import { Stream, Subscription, sync } from "@thi.ng/rstream";
import { toDot, walk, DotOpts, IToDot } from "@thi.ng/rstream-dot";
import { Transducer, Reducer } from "@thi.ng/transducers/api";
import { compR } from "@thi.ng/transducers/func/compr";
import { map } from "@thi.ng/transducers/xform/map";

import { DEBUG, Edit, Fact, FactIds, Pattern } from "./api";

export class FactGraph implements
    IToDot {

    static NEXT_ID = 0;

    facts: Fact[];
    indexS: Map<any, FactIds>;
    indexP: Map<any, FactIds>;
    indexO: Map<any, FactIds>;
    indexSelections: IObjectOf<Map<any, Subscription<Edit, FactIds>>>;
    allSelections: IObjectOf<Subscription<FactIds, FactIds>>;
    allIDs: FactIds;

    streamAll: Stream<FactIds>;
    streamS: Stream<Edit>;
    streamP: Stream<Edit>;
    streamO: Stream<Edit>;

    constructor() {
        this.facts = [];
        this.indexS = new Map();
        this.indexP = new Map();
        this.indexO = new Map();
        this.indexSelections = {
            "s": new Map(),
            "p": new Map(),
            "o": new Map()
        };
        this.streamS = new Stream("S");
        this.streamP = new Stream("P");
        this.streamO = new Stream("O");
        this.streamAll = new Stream("ALL");
        this.allIDs = new Set<number>();
        this.allSelections = {
            "s": this.streamAll.subscribe(null, "s"),
            "p": this.streamAll.subscribe(null, "p"),
            "o": this.streamAll.subscribe(null, "o")
        };
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

    addPatternQuery(id: string, [s, p, o]: Pattern): Subscription<FactIds, FactIds> {
        if (s == null && p == null && o == null) {
            return this.streamAll;
        }
        const qs = this.getIndexSelection(this.streamS, s, "s");
        const qp = this.getIndexSelection(this.streamP, p, "p");
        const qo = this.getIndexSelection(this.streamO, o, "o");
        const results = sync<FactIds, FactIds>({
            id,
            src: [qs, qp, qo],
            xform: map(({ s, p, o }) => intersection(intersection(s, p), o)),
            reset: true,
        });
        const submit = (index: Map<any, Set<number>>, stream: Subscription<any, Set<number>>, key: any) => {
            if (key != null) {
                const ids = index.get(key);
                ids && stream.next({ index: ids, key });
            }
        };
        submit(this.indexS, qs, s);
        submit(this.indexP, qp, p);
        submit(this.indexO, qo, o);
        return results;
    }

    toDot(opts?: Partial<DotOpts>) {
        return toDot(walk([this.streamS, this.streamP, this.streamO, this.streamAll]), opts);
    }

    protected findInIndices(s: FactIds, p: FactIds, o: FactIds, f: Fact) {
        if (s && p && o) {
            const facts = this.facts;
            const index = s.size < p.size ?
                s.size < o.size ? s : p.size < o.size ? p : o :
                p.size < o.size ? p : s.size < o.size ? s : o;
            for (let id of index) {
                if (equiv(facts[id], f)) {
                    return id;
                }
            }
        }
        return -1;
    }

    protected getIndexSelection(stream: Stream<Edit>, key: any, id: string): Subscription<any, FactIds> {
        if (key != null) {
            let sel = this.indexSelections[id].get(key);
            if (!sel) {
                this.indexSelections[id].set(key, sel = stream.transform(indexSel(key), id));
            }
            return sel;
        }
        return this.allSelections[id];
    }
}

export const indexSel = (key: any): Transducer<Edit, FactIds> =>
    (rfn: Reducer<any, FactIds>) => {
        const r = rfn[2];
        return compR(rfn,
            (acc, e) => {
                DEBUG && console.log("index sel", e.key, key);
                if (equiv(e.key, key)) {
                    return r(acc, e.index);
                }
                return acc;
            }
        );
    };

export const asFacts = (graph: FactGraph) =>
    map<FactIds, Set<Fact>>(
        (ids) => {
            const res = new Set<Fact>();
            for (let id of ids) res.add(graph.facts[id]);
            return res;
        });
