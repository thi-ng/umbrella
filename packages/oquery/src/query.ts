import type { Predicate } from "@thi.ng/api";
import { isArray, isFunction, isSet } from "@thi.ng/checks";
import { defmulti } from "@thi.ng/defmulti";
import { equiv } from "@thi.ng/equiv";
import type {
    FTerm,
    OTerm,
    QueryFn,
    QueryImpl,
    QueryImpls,
    QueryObj,
    QueryOpts,
    SPTerm,
} from "./api";

/**
 * Classifies a single S,P,O term. See {@link QueryType} for explanations.
 *
 * @param x
 */
const classify = (x: any) => (x != null ? (isFunction(x) ? "f" : "l") : "n");

const coerce = (x: any) =>
    isArray(x)
        ? (y: any) => x.includes(y)
        : isSet(x)
        ? (y: any) => x.has(y)
        : x;

const coerceStr = (x: any) =>
    isArray(x)
        ? coerce(x.map((y) => String(y)))
        : isSet(x)
        ? coerce(new Set([...x].map((y) => String(y))))
        : x == null || isFunction(x)
        ? x
        : String(x);

const addTriple = (acc: any, s: any, p: any, o: any) => {
    const sval = acc[s];
    sval ? (sval[p] = o) : (acc[s] = { [p]: o });
};

const match = (o: any, val: any, opts: QueryOpts) => {
    if (val != null) {
        const pred = <Predicate<any>>(
            (isFunction(o) ? o : ($: any) => opts.equiv(o, $))
        );
        return opts.inspect && isArray(val) ? val.some(pred) : pred(val);
    }
    return false;
};

const collect = (
    acc: any,
    s: any,
    p: any,
    o: any,
    val: any,
    opts: QueryOpts
) => {
    if (val != null) {
        const pred = isFunction(o) ? o : ($: any) => opts.equiv(o, $);
        if (opts.inspect && isArray(val)) {
            val = val.filter(pred);
            val.length && addTriple(acc, s, p, val);
        } else if (pred(val)) {
            addTriple(acc, s, p, val);
        }
    }
};

const collectFull = (res: QueryObj, s: any, val: any) => (res[s] = val);

const collectSP = (
    res: QueryObj,
    sval: any,
    s: SPTerm,
    p: SPTerm,
    o: any,
    opts: QueryOpts
) => {
    if (opts.full) {
        for (let $p in sval) {
            if ((<FTerm>p)($p) && match(o, sval[$p], opts)) {
                collectFull(res, s, sval);
                return;
            }
        }
    } else {
        for (let $p in sval) {
            (<FTerm>p)($p) && collect(res, s, $p, o, sval[$p], opts);
        }
    }
};

const collectSO = (
    res: QueryObj,
    sval: any,
    s: SPTerm,
    o: any,
    opts: QueryOpts
) => {
    if (opts.full) {
        for (let p in sval) {
            if (match(o, sval[p], opts)) {
                collectFull(res, s, sval);
                return;
            }
        }
    } else {
        for (let p in sval) {
            collect(res, s, p, o, sval[p], opts);
        }
    }
};

const queryLL: QueryImpl = (res, db: any, s, p, o, opts) => {
    const sval = db[<any>s];
    const val = sval?.[<string>p];
    if (opts.full) {
        match(o, val, opts) && collectFull(res, s, sval);
    } else {
        collect(res, s, p, o, val, opts);
    }
};

const queryLF: QueryImpl = (res, db: any, s, p, o, opts) => {
    const sval = db[<string>s];
    sval != null && collectSP(res, sval, s, p, o, opts);
};

const queryLN: QueryImpl = (res, db: any, s, _, o, opts) => {
    const sval = db[<string>s];
    sval != null && collectSO(res, sval, s, o, opts);
};

const queryFL: QueryImpl = (res, db: any, s, p, o, opts) => {
    if (opts.full) {
        for (let $s in db) {
            const sval = db[$s];
            (<FTerm>s)($s) &&
                match(o, sval?.[<string>p], opts) &&
                collectFull(res, $s, sval);
        }
    } else {
        for (let $s in db) {
            (<FTerm>s)($s) && collect(res, $s, p, o, db[$s]?.[<string>p], opts);
        }
    }
};

const queryFF: QueryImpl = (res, db: any, s, p, o, opts) => {
    for (let $s in db) {
        (<FTerm>s)($s) && collectSP(res, db[$s], $s, p, o, opts);
    }
};

const queryFN: QueryImpl = (res, db: any, s, _, o, opts) => {
    for (let $s in db) {
        (<FTerm>s)($s) && collectSO(res, db[$s], $s, o, opts);
    }
};

const queryNL: QueryImpl = (res, db: any, _, p, o, opts) => {
    if (opts.full) {
        for (let s in db) {
            const sval = db[s];
            match(o, sval[<string>p], opts) && collectFull(res, s, sval);
        }
    } else {
        for (let s in db) {
            collect(res, s, p, o, db[s][<string>p], opts);
        }
    }
};

const queryNF: QueryImpl = (res, db: any, _, p, o, opts) => {
    for (let s in db) {
        collectSP(res, db[s], s, p, o, opts);
    }
};

const queryNN: QueryImpl = (res, db: any, _, __, o, opts) => {
    for (let s in db) {
        collectSO(res, db[s], s, o, opts);
    }
};

const querySP: QueryImpl = (res, sval: any, s, p, _, opts) => {
    if (opts.full) {
        for (let q in sval) {
            if ((<FTerm>p)(q)) {
                collectFull(res, s, sval);
                return;
            }
        }
    } else {
        for (let q in sval) {
            if ((<FTerm>p)(q)) {
                const val = sval[q];
                val != null && addTriple(res, s, q, val);
            }
        }
    }
};

const queryO: QueryImpl = (res, db: any, s, p, _, opts) => {
    const sval = db[<string>s];
    const val = sval?.[<string>p];
    val != null &&
        (opts.full ? collectFull(res, s, sval) : addTriple(res, s, p, val));
};

const impl = defmulti<
    QueryObj,
    QueryObj,
    SPTerm,
    SPTerm,
    OTerm,
    QueryOpts,
    void
>((_, __, s, p, o) => classify(s) + classify(p) + classify(o));

impl.addAll(<QueryImpls>{
    lll: queryLL,
    llf: queryLL,
    lln: queryO,
    lfl: queryLF,
    lff: queryLF,
    lfn: (res, db: any, s, p, _, opts) => {
        const sval = db[<string>s];
        sval != null && querySP(res, sval, s, p, null, opts);
    },
    lnl: queryLN,
    lnf: queryLN,
    lnn: (res, db: any, s) => {
        const sval = db[<string>s];
        sval != null && collectFull(res, s, sval);
    },
    fll: queryFL,
    flf: queryFL,
    fln: (res, db, s, p, _, opts) => {
        for (let $s in db) {
            (<FTerm>s)($s) && queryO(res, db, $s, p, null, opts);
        }
    },
    ffl: queryFF,
    fff: queryFF,
    ffn: (res, db: any, s, p, _, opts) => {
        if (opts.full) {
            for (let $s in db) {
                if ((<FTerm>s)($s)) {
                    const sval = db[$s];
                    for (let $p in sval) {
                        if ((<FTerm>p)($p)) {
                            collectFull(res, $s, sval);
                            break;
                        }
                    }
                }
            }
        } else {
            for (let $s in db) {
                if ((<FTerm>s)($s)) {
                    const sval = db[$s];
                    for (let $p in sval) {
                        (<FTerm>p)($p) && addTriple(res, $s, $p, sval[$p]);
                    }
                }
            }
        }
    },
    fnl: queryFN,
    fnf: queryFN,
    fnn: (res, db: any, s) => {
        for (let $s in db) {
            if ((<FTerm>s)($s)) {
                const sval = db[$s];
                sval != null && collectFull(res, $s, sval);
            }
        }
    },
    nll: queryNL,
    nlf: queryNL,
    nln: (res, db: any, _, p, __, opts) => {
        if (opts.full) {
            for (let s in db) {
                const sval = db[s];
                const val = sval[<string>p];
                val != null && collectFull(res, s, sval);
            }
        } else {
            for (let s in db) {
                const val = db[s][<string>p];
                val != null && addTriple(res, s, p, val);
            }
        }
    },
    nfl: queryNF,
    nff: queryNF,
    nfn: (res, db: any, _, p, __, opts) => {
        for (let s in db) {
            querySP(res, db[s], s, p, null, opts);
        }
    },
    nnl: queryNN,
    nnf: queryNN,
    nnn: (res, db) => Object.assign(res, db),
});

export const defQuery = (opts?: Partial<QueryOpts>): QueryFn => {
    opts = { full: true, inspect: false, equiv, ...opts };
    return (src: any, ...args: any[]) => {
        if (isArray(src)) {
            let [p, o, res] = args;
            res = res || [];
            p = coerceStr(p);
            o = coerce(o);
            for (let i = 0, n = src.length; i < n; i++) {
                const curr: QueryObj = {};
                impl(curr, { _: src[i] }, null, p, o, <QueryOpts>opts);
                curr._ && res.push(curr._);
            }
            return res;
        } else {
            let [s, p, o, res] = args;
            res = res || {};
            impl(
                res,
                src,
                coerceStr(s),
                coerceStr(p),
                coerce(o),
                <QueryOpts>opts
            );
            return res;
        }
    };
};
