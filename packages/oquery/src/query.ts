import { meldDeepObj } from "@thi.ng/associative";
import { isArray, isFunction, isSet } from "@thi.ng/checks";
import { defmulti } from "@thi.ng/defmulti";
import { equiv } from "@thi.ng/equiv";
import type {
    FTerm,
    QueryImpl,
    QueryImpls,
    QueryObj,
    QueryOpts,
    SPTerm,
    OTerm,
    SPInputTerm,
} from "./api";

const classify = (x: any) => (x != null ? (isFunction(x) ? "f" : "l") : "n");

const coerce = (x: any) =>
    isArray(x)
        ? (y: any) => x.includes(y)
        : isSet(x)
        ? (y: any) => x.has(y)
        : x;

const addTriple = (acc: any, s: any, p: any, o: any) => {
    const sval = acc[s];
    sval ? (sval[p] = o) : (acc[s] = { [p]: o });
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
        if (isArray(val)) {
            val = val.filter(pred);
            val.length && addTriple(acc, s, p, val);
        } else if (pred(val)) {
            addTriple(acc, s, p, val);
        }
    }
};

const queryLL: QueryImpl = (res, db, s, p, o, opts) =>
    collect(res, s, p, o, db[<string>s]?.[<string>p], opts);

const queryLF: QueryImpl = (res, db, s, p, o, opts) => {
    const sval = db[<string>s];
    if (sval != null) {
        for (let q in sval) {
            (<FTerm>p)(q) && collect(res, s, q, o, sval[q], opts);
        }
    }
};

const queryLN: QueryImpl = (res, db, s, _, o, opts) => {
    const sval = db[<string>s];
    if (sval != null) {
        for (let q in sval) {
            collect(res, s, q, o, sval[q], opts);
        }
    }
};

const queryFL: QueryImpl = (res, db, s, p, o, opts) => {
    for (let $s in db) {
        (<FTerm>s)($s) && collect(res, $s, p, o, db[$s]?.[<string>p], opts);
    }
};

const queryFF: QueryImpl = (res, db, s, p, o, opts) => {
    for (let $s in db) {
        if ((<FTerm>s)($s)) {
            const sval = db[$s];
            for (let $p in sval) {
                (<FTerm>p)($p) && collect(res, $s, $p, o, sval[$p], opts);
            }
        }
    }
};

const queryFN: QueryImpl = (res, db, s, _, o, opts) => {
    for (let $s in db) {
        if ((<FTerm>s)($s)) {
            const sval = db[$s];
            for (let p in sval) {
                collect(res, $s, p, o, sval[p], opts);
            }
        }
    }
};

const queryNL: QueryImpl = (res, db, _, p, o, opts) => {
    for (let s in db) {
        collect(res, s, p, o, db[s][<string>p], opts);
    }
};

const queryNF: QueryImpl = (res, db, _, p, o, opts) => {
    for (let s in db) {
        const sval = db[s];
        for (let $p in sval) {
            (<FTerm>p)($p) && collect(res, s, $p, o, sval[$p], opts);
        }
    }
};

const queryNN: QueryImpl = (res, db, _, __, o, opts) => {
    for (let s in db) {
        const sval = db[s];
        for (let p in sval) {
            collect(res, s, p, o, sval[p], opts);
        }
    }
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
    lln: (res, db, s, p, _) => {
        const val = db[<string>s]?.[<string>p];
        val != null && addTriple(res, s, p, val);
    },
    lfl: queryLF,
    lff: queryLF,
    lfn: (res, db, s, p, _) => {
        const sval = db[<string>s];
        if (sval != null) {
            for (let q in sval) {
                if ((<FTerm>p)(q)) {
                    const val = sval[q];
                    val != null && addTriple(res, s, q, val);
                }
            }
        }
    },
    lnl: queryLN,
    lnf: queryLN,
    lnn: (res, db, s, _, __) => {
        const sval = db[<string>s];
        if (sval != null) {
            res[<string>s] = meldDeepObj({}, sval);
        }
    },
    fll: queryFL,
    flf: queryFL,
    fln: (res, db, s, p, _) => {
        for (let $s in db) {
            if ((<FTerm>s)($s)) {
                const val = db[$s]?.[<string>p];
                val != null && addTriple(res, $s, p, val);
            }
        }
    },
    ffl: queryFF,
    fff: queryFF,
    ffn: (res, db, s, p, _) => {
        for (let $s in db) {
            if ((<FTerm>s)($s)) {
                const sval = db[$s];
                for (let $p in sval) {
                    (<FTerm>p)($p) && addTriple(res, $s, $p, sval[$p]);
                }
            }
        }
    },
    fnl: queryFN,
    fnf: queryFN,
    fnn: (res, db, s, _, __) => {
        for (let $s in db) {
            if ((<FTerm>s)($s)) {
                const sval = db[$s];
                if (sval != null) {
                    res[$s] = meldDeepObj({}, sval);
                }
            }
        }
    },
    nll: queryNL,
    nlf: queryNL,
    nln: (res, db, _, p, __) => {
        for (let s in db) {
            const val = db[s][<string>p];
            val != null && addTriple(res, s, p, val);
        }
    },
    nfl: queryNF,
    nff: queryNF,
    nfn: (res, db, _, p, __) => {
        for (let s in db) {
            const sval = db[s];
            for (let $p in sval) {
                if ((<FTerm>p)($p)) {
                    const val = sval[$p];
                    val != null && addTriple(res, s, $p, val);
                }
            }
        }
    },
    nnl: queryNN,
    nnf: queryNN,
    nnn: (res, db) => meldDeepObj(res, db),
});

export const defQuery = (opts?: Partial<QueryOpts>) => {
    opts = { equiv, ...opts };
    return (
        obj: QueryObj,
        s: SPInputTerm,
        p: SPInputTerm,
        o: OTerm,
        res: QueryObj = {}
    ) => (
        impl(res, obj, coerce(s), coerce(p), coerce(o), <QueryOpts>opts), res
    );
};
