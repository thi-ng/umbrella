import { IObjectOf } from "@thi.ng/api/api";
import { intersection } from "@thi.ng/associative/intersection";
import { join } from "@thi.ng/associative/join";
import { equiv } from "@thi.ng/equiv";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import {
    DotOpts,
    IToDot,
    toDot,
    walk
} from "@thi.ng/rstream-dot";
import { ISubscribable } from "@thi.ng/rstream/api";
import { Stream } from "@thi.ng/rstream/stream";
import { sync } from "@thi.ng/rstream/stream-sync";
import { Subscription } from "@thi.ng/rstream/subscription";
import { Reducer, Transducer } from "@thi.ng/transducers/api";
import { comp } from "@thi.ng/transducers/func/comp";
import { compR } from "@thi.ng/transducers/func/compr";
import { keySelector } from "@thi.ng/transducers/func/key-selector";
import { iterator } from "@thi.ng/transducers/iterator";
import { assocObj } from "@thi.ng/transducers/rfn/assoc-obj";
import { transduce } from "@thi.ng/transducers/transduce";
import { dedupe } from "@thi.ng/transducers/xform/dedupe";
import { map } from "@thi.ng/transducers/xform/map";
import { mapIndexed } from "@thi.ng/transducers/xform/map-indexed";

import {
    BindFn,
    DEBUG,
    Edit,
    PathPattern,
    PathQuerySpec,
    Pattern,
    QuerySolution,
    QuerySpec,
    Solutions,
    SubQuerySpec,
    Triple,
    TripleIds,
    Triples,
    WhereQuerySpec
} from "./api";
import { patternVars, resolvePathPattern } from "./pattern";
import { isQVar, qvarResolver } from "./qvar";

export class TripleStore implements
    Iterable<Triple>,
    IToDot {

    NEXT_ID: number;
    freeIDs: number[];

    triples: Triple[];
    indexS: Map<any, TripleIds>;
    indexP: Map<any, TripleIds>;
    indexO: Map<any, TripleIds>;
    indexSelections: IObjectOf<Map<any, Subscription<Edit, TripleIds>>>;
    queries: Map<string, ISubscribable<TripleIds>>;
    allIDs: TripleIds;

    streamAll: Stream<TripleIds>;
    streamS: Stream<Edit>;
    streamP: Stream<Edit>;
    streamO: Stream<Edit>;

    constructor(triples?: Iterable<Triple>) {
        this.triples = [];
        this.freeIDs = [];
        this.queries = new Map();
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
        this.NEXT_ID = 0;
        if (triples) {
            this.into(triples);
        }
    }

    *[Symbol.iterator](): IterableIterator<Triple> {
        for (let t of this.triples) {
            if (t) {
                yield t;
            }
        }
    }

    has(t: Triple) {
        return this.get(t) !== undefined;
    }

    get(t: Triple, notFound?: any) {
        const id = this.findTriple(
            this.indexS.get(t[0]),
            this.indexP.get(t[1]),
            this.indexO.get(t[2]),
            t
        );
        return id !== -1 ? this.triples[id] : notFound;
    }

    add(t: Triple) {
        let s = this.indexS.get(t[0]);
        let p = this.indexP.get(t[1]);
        let o = this.indexO.get(t[2]);
        if (this.findTriple(s, p, o, t) !== -1) return false;
        const id = this.nextID();
        const is = s || new Set<number>();
        const ip = p || new Set<number>();
        const io = o || new Set<number>();
        this.triples[id] = t;
        is.add(id);
        ip.add(id);
        io.add(id);
        this.allIDs.add(id);
        !s && this.indexS.set(t[0], is);
        !p && this.indexP.set(t[1], ip);
        !o && this.indexO.set(t[2], io);
        this.broadcastTriple(is, ip, io, t);
        return true;
    }

    into(triples: Iterable<Triple>) {
        let ok = true;
        for (let f of triples) {
            ok = this.add(f) && ok;
        }
        return ok;
    }

    delete(t: Triple) {
        let s = this.indexS.get(t[0]);
        let p = this.indexP.get(t[1]);
        let o = this.indexO.get(t[2]);
        const id = this.findTriple(s, p, o, t);
        if (id === -1) return false;
        s.delete(id);
        !s.size && this.indexS.delete(t[0]);
        p.delete(id);
        !p.size && this.indexP.delete(t[1]);
        o.delete(id);
        !o.size && this.indexO.delete(t[2]);
        this.allIDs.delete(id);
        delete this.triples[id];
        this.freeIDs.push(id);
        this.broadcastTriple(s, p, o, t);
        return true;
    }

    /**
     * Replaces triple `a` with `b`, *iff* `a` is actually in the store.
     * Else does nothing.
     *
     * @param a
     * @param b
     */
    replace(a: Triple, b: Triple) {
        if (this.delete(a)) {
            return this.add(b);
        }
        return false;
    }

    /**
     * Creates a new query subscription from given SPO pattern. Any
     * `null` values in the pattern act as wildcard selectors and any
     * other value as filter for the given triple component. E.g. the
     * pattern `[null, "type", "person"]` matches all triples which have
     * `"type"` as predicate and `"person"` as object. Likewise the
     * pattern `[null, null, null]` matches ALL triples in the graph.
     *
     * By default, the returned rstream subscription emits sets of
     * matched triples. If only the raw triple IDs are wanted, set
     * `emitTriples` arg to `false`.
     *
     * @param id
     * @param param1
     */
    addPatternQuery(pattern: Pattern, id?: string): ISubscribable<Triples>;
    addPatternQuery(pattern: Pattern, id?: string, emitTriples?: boolean): ISubscribable<TripleIds | Triples>;
    addPatternQuery(pattern: Pattern, id?: string, emitTriples = true) {
        let results: ISubscribable<TripleIds | Triples>;
        const [s, p, o] = pattern;
        if (s == null && p == null && o == null) {
            results = this.streamAll;
        } else {
            const key = JSON.stringify(pattern);
            if (!(results = this.queries.get(key))) {
                const qs = this.getIndexSelection(this.streamS, s, "s");
                const qp = this.getIndexSelection(this.streamP, p, "p");
                const qo = this.getIndexSelection(this.streamO, o, "o");
                let src: IObjectOf<Subscription<any, TripleIds>>;
                let xform = intersect2;
                // optimize cases with 2 null terms (only needs single intersection w/ streamAll)
                if (s == null && p == null) {
                    src = { a: qo, b: qs };
                } else if (s == null && o == null) {
                    src = { a: qp, b: qs };
                } else if (p == null && o == null) {
                    src = { a: qs, b: qp };
                } else {
                    src = { s: qs, p: qp, o: qo };
                    xform = intersect3;
                }
                results = sync<TripleIds, TripleIds>({ id, src, xform, reset: true });
                this.queries.set(key, <ISubscribable<TripleIds>>results);
                submit(this.indexS, qs, s);
                submit(this.indexP, qp, p);
                submit(this.indexO, qo, o);
            }
        }
        return emitTriples ?
            results.subscribe(resultTriples(this)) :
            results;
    }

    /**
     * Creates a new parametric query using given pattern with at least
     * 1 query variable. Query vars are strings with `?` prefix. The
     * rest of the string is considered the variable name.
     *
     * ```
     * g.addParamQuery(["?a", "friend", "?b"]);
     * ```
     *
     * Internally, the query pattern is translated into a basic param
     * query with an additional result transformation to resolve the
     * stated query variable solutions. Returns a rstream subscription
     * emitting arrays of solution objects like:
     *
     * ```
     * [{a: "asterix", b: "obelix"}, {a: "romeo", b: "julia"}]
     * ```
     *
     * @param id
     * @param param1
     */
    addParamQuery([s, p, o]: Pattern, id?: string): QuerySolution {
        const vs = isQVar(s);
        const vp = isQVar(p);
        const vo = isQVar(o);
        const resolve = qvarResolver(vs, vp, vo, s, p, o);
        if (!resolve) {
            illegalArgs("at least 1 query variable is required in pattern");
        }
        id || (id = `query-${Subscription.NEXT_ID++}`);
        const query = <Subscription<TripleIds, Triples>>this.addPatternQuery(
            [vs ? null : s, vp ? null : p, vo ? null : o],
            id + "-raw"
        );
        return query.transform(
            map((triples) => {
                const res = new Set<any>();
                for (let f of triples) {
                    res.add(resolve(f));
                }
                return res;
            }),
            dedupe(equiv),
            id
        );
    }

    /**
     * Converts the given path pattern into a number of sub-queries and
     * return a rstream subscription of re-joined result solutions. If
     * `maxLen` is given and greater than the number of actual path
     * predicates, the predicates are repeated.
     *
     * @param path
     * @param maxDepth
     * @param id
     */
    addPathQuery(path: PathPattern, len = path[1].length, id?: string): QuerySolution {
        return this.addMultiJoin(
            this.addParamQueries(resolvePathPattern(path, len)[0]),
            patternVars(path),
            id
        );
    }

    /**
     * Like `addMultiJoin()`, but optimized for only two input queries.
     * Returns a rstream subscription computing the natural join of the
     * given input query results.
     *
     * @param id
     * @param a
     * @param b
     */
    addJoin(a: QuerySolution, b: QuerySolution, id?: string): QuerySolution {
        return sync<Solutions, Solutions>({
            id,
            src: { a, b },
            xform: comp(map(({ a, b }) => join(a, b)), dedupe(equiv)),
            reset: false,
        });
    }

    addMultiJoin(queries: Iterable<QuerySolution>, keepVars?: Iterable<string>, id?: string): QuerySolution {
        const src = transduce(
            mapIndexed<QuerySolution, [string, QuerySolution]>((i, q) => [String(i), q]),
            assocObj(),
            queries
        );
        let xforms: Transducer<any, any>[] = [joinSolutions(Object.keys(src).length), dedupe(equiv)];
        keepVars && (xforms.push(filterSolutions(keepVars)));
        return sync({ id, src, xform: <Transducer<any, any>>comp.apply(null, xforms), reset: false });
    }

    /**
     * Compiles given query spec into a number of sub-queries and result
     * transformations. Returns rstream subscription of final result
     * sets. See `QuerySpec` docs for further details.
     *
     * @param spec
     */
    addQueryFromSpec(spec: QuerySpec): QuerySolution {
        let query: QuerySolution;
        let curr: QuerySolution;
        for (let q of spec.q) {
            if (isWhereQuery(q)) {
                curr = this.addMultiJoin(this.addParamQueries(q.where));
                query && (curr = this.addJoin(query, curr));
            } else if (isPathQuery(q)) {
                curr = this.addPathQuery(q.path);
                query && (curr = this.addJoin(query, curr));
            }
            query = curr;
        }
        let xforms: Transducer<any, any>[] = [];
        if (spec.limit) {
            xforms.push(limitSolutions(spec.limit));
        }
        if (spec.bind) {
            xforms.push(bindVars(spec.bind));
        }
        if (spec.select) {
            xforms.push(filterSolutions(spec.select));
        }
        if (xforms.length) {
            query = <ISubscribable<any>>query.subscribe(comp.apply(null, xforms));
        }
        return query;
    }

    toDot(opts?: Partial<DotOpts>) {
        return toDot(walk([this.streamS, this.streamP, this.streamO, this.streamAll], opts), opts);
    }

    protected nextID() {
        if (this.freeIDs.length) {
            return this.freeIDs.pop();
        }
        return this.NEXT_ID++;
    }

    private broadcastTriple(s: TripleIds, p: TripleIds, o: TripleIds, t: Triple) {
        this.streamAll.next(this.allIDs);
        this.streamS.next({ index: s, key: t[0] });
        this.streamP.next({ index: p, key: t[1] });
        this.streamO.next({ index: o, key: t[2] });
    }

    protected findTriple(s: TripleIds, p: TripleIds, o: TripleIds, f: Triple) {
        if (s && p && o) {
            const triples = this.triples;
            const index = s.size < p.size ?
                s.size < o.size ? s : p.size < o.size ? p : o :
                p.size < o.size ? p : s.size < o.size ? s : o;
            for (let id of index) {
                if (equiv(triples[id], f)) {
                    return id;
                }
            }
        }
        return -1;
    }

    protected getIndexSelection(stream: Stream<Edit>, key: any, id: string): Subscription<any, TripleIds> {
        if (key == null) {
            return this.streamAll;
        }
        let sel = this.indexSelections[id].get(key);
        if (!sel) {
            this.indexSelections[id].set(key, sel = stream.transform(indexSel(key), id));
        }
        return sel;
    }

    protected addParamQueries(patterns: Iterable<Pattern>) {
        return iterator(
            map<Pattern, QuerySolution>((q) => this.addParamQuery(q)),
            patterns
        );
    }
}

const submit = (index: Map<any, TripleIds>, stream: Subscription<Edit, TripleIds>, key: any) => {
    if (key != null) {
        const ids = index.get(key);
        ids && stream.next({ index: ids, key });
    }
};

const intersect2: Transducer<IObjectOf<TripleIds>, TripleIds> =
    comp(map(({ a, b }) => intersection(a, b)), dedupe(equiv));

const intersect3: Transducer<IObjectOf<TripleIds>, TripleIds> =
    comp(map(({ s, p, o }) => intersection(intersection(s, p), o)), dedupe(equiv));

const indexSel = (key: any): Transducer<Edit, TripleIds> =>
    (rfn: Reducer<any, TripleIds>) => {
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

const resultTriples = (graph: TripleStore) =>
    map<TripleIds, Set<Triple>>(
        (ids) => {
            const res = new Set<Triple>();
            for (let id of ids) res.add(graph.triples[id]);
            return res;
        });

const joinSolutions = (n: number) =>
    map<IObjectOf<Solutions>, Solutions>((src) => {
        let res: Solutions = src[0];
        for (let i = 1; i < n && res.size; i++) {
            res = join(res, src[i]);
        }
        return res;
    });

const filterSolutions = (qvars: Iterable<string>) => {
    const filterVars = keySelector([...qvars]);
    return map((sol: Solutions) => {
        const res: Solutions = new Set();
        for (let s of sol) {
            res.add(filterVars(s));
        }
        return res;
    });
};

const limitSolutions = (n: number) =>
    map((sol: Solutions) => {
        if (sol.size <= n) {
            return sol;
        }
        const res: Solutions = new Set();
        let m = n;
        for (let s of sol) {
            res.add(s);
            if (--m <= 0) break;
        }
        return res;
    });

const bindVars = (bindings: IObjectOf<BindFn>) =>
    map((sol: Solutions) => {
        const res: Solutions = new Set();
        for (let s of sol) {
            s = { ...s };
            res.add(s);
            for (let b in bindings) {
                s[b] = bindings[b](s);
            }
        }
        return res;
    });

const isWhereQuery = (q: SubQuerySpec): q is WhereQuerySpec => !!(<any>q).where;
const isPathQuery = (q: SubQuerySpec): q is PathQuerySpec => !!(<any>q).path;
