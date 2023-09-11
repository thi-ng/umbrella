import type { Fn2, Nullable, Predicate } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isSet } from "@thi.ng/checks/is-set";
import { compare } from "@thi.ng/compare/compare";
import { compareByKey } from "@thi.ng/compare/keys";
import { reverse } from "@thi.ng/compare/reverse";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import { equiv } from "@thi.ng/equiv";
import type {
	ArrayQueryFn,
	FTerm,
	KeyQueryFn,
	KeyQueryOpts,
	MultiQueryOpts,
	OTerm,
	QueryFn,
	QueryImpl,
	QueryImpls,
	QueryObj,
	QueryOpts,
	QueryTerm,
	QueryType,
	SPInputTerm,
	SPTerm,
} from "./api.js";

/**
 * Classifies a single S,P,O term. See {@link QueryType} for explanations.
 *
 * @param x -
 *
 * @internal
 */
const classify = (x: any) => (x != null ? (isFunction(x) ? "f" : "l") : "n");

/** @internal */
const ensureArray = (src: any[] | Set<any>) => (isArray(src) ? src : [...src]);

/** @internal */
const ensureSet = (src: any[] | Set<any>) =>
	isArray(src) ? new Set(src) : src;

/**
 * HOF predicate function for intersection queries (i.e. iff `opts.intersect =
 * true`). Takes an array or set query term and returns predicate to check if
 * ALL of the query term elements are present in a given object (assumed to be
 * an array or set too).
 *
 * @param src -
 *
 * @internal
 */
const intersect = (src: any[] | Set<any>) => {
	const a = ensureArray(src);
	const num = a.length;
	return (b: any) => {
		const $b = ensureSet(b);
		for (let i = num; i-- > 0; ) {
			if (!$b.has(a[i])) return false;
		}
		return true;
	};
};

/**
 * Checks the type of a single S,P,O term and if an array or Set, returns a
 * predicate function to check if an element is included. Otherwise, returns
 * input. If `isec` is true, the returned predicate will be the result of
 * {@link intersect}.
 *
 * @param x -
 * @param isec -
 *
 * @internal
 */
const coerce = (x: any, isec = false) =>
	isArray(x)
		? isec
			? intersect(x)
			: (y: any) => x.includes(y)
		: isSet(x)
		? isec
			? intersect(x)
			: (y: any) => x.has(y)
		: x;

/**
 * Similar to {@link coerce}, but intended for S,P terms. Unless `x` is a
 * function or null, coerces `x` (or its elements) to strings first.
 *
 * @param x -
 *
 * @internal
 */
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
		return opts.cwise && isArray(val) ? val.some(pred) : pred(val);
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
		if (opts.cwise && isArray(val)) {
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
	if (opts.partial) {
		for (let $p in sval) {
			(<FTerm>p)($p) && collect(res, s, $p, o, sval[$p], opts);
		}
	} else {
		for (let $p in sval) {
			if ((<FTerm>p)($p) && match(o, sval[$p], opts)) {
				collectFull(res, s, sval);
				return;
			}
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
	if (opts.partial) {
		for (let p in sval) {
			collect(res, s, p, o, sval[p], opts);
		}
	} else {
		for (let p in sval) {
			if (match(o, sval[p], opts)) {
				collectFull(res, s, sval);
				return;
			}
		}
	}
};

const queryLL: QueryImpl = (res, db: any, s, p, o, opts) => {
	const sval = db[<any>s];
	const val = sval?.[<string>p];
	if (opts.partial) {
		collect(res, s, p, o, val, opts);
	} else {
		match(o, val, opts) && collectFull(res, s, sval);
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
	if (opts.partial) {
		for (let $s in db) {
			(<FTerm>s)($s) && collect(res, $s, p, o, db[$s]?.[<string>p], opts);
		}
	} else {
		for (let $s in db) {
			const sval = db[$s];
			(<FTerm>s)($s) &&
				match(o, sval?.[<string>p], opts) &&
				collectFull(res, $s, sval);
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
	if (opts.partial) {
		for (let s in db) {
			collect(res, s, p, o, db[s][<string>p], opts);
		}
	} else {
		for (let s in db) {
			const sval = db[s];
			match(o, sval[<string>p], opts) && collectFull(res, s, sval);
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
	if (opts.partial) {
		for (let q in sval) {
			if ((<FTerm>p)(q)) {
				const val = sval[q];
				val != null && addTriple(res, s, q, val);
			}
		}
	} else {
		for (let q in sval) {
			if ((<FTerm>p)(q)) {
				collectFull(res, s, sval);
				return;
			}
		}
	}
};

const queryO: QueryImpl = (res, db: any, s, p, _, opts) => {
	const sval = db[<string>s];
	const val = sval?.[<string>p];
	val != null &&
		(opts.partial ? addTriple(res, s, p, val) : collectFull(res, s, sval));
};

const IMPLS = <QueryImpls>{
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
		if (opts.partial) {
			for (let $s in db) {
				if ((<FTerm>s)($s)) {
					const sval = db[$s];
					for (let $p in sval) {
						(<FTerm>p)($p) && addTriple(res, $s, $p, sval[$p]);
					}
				}
			}
		} else {
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
		if (opts.partial) {
			for (let s in db) {
				const val = db[s][<string>p];
				val != null && addTriple(res, s, p, val);
			}
		} else {
			for (let s in db) {
				const sval = db[s];
				const val = sval[<string>p];
				val != null && collectFull(res, s, sval);
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
};

/**
 * Query function implementation, dispatches to one of the 27 optimized
 * functions based on given query pattern.
 *
 * @internal
 */
const impl = defmulti<
	QueryObj,
	QueryObj,
	SPTerm,
	SPTerm,
	OTerm,
	QueryOpts,
	void
>((_, __, s, p, o) => classify(s) + classify(p) + classify(o), {}, IMPLS);

const objQuery = (src: QueryObj[], opts: QueryOpts, args: any[]) => {
	const isIsec = opts.cwise && opts.intersect;
	isIsec && (opts.cwise = false);
	let [s, p, o, out] = <[SPInputTerm, SPInputTerm, OTerm, QueryObj?]>args;
	out = out || {};
	impl(
		out,
		src,
		coerceStr(s),
		coerceStr(p),
		coerce(o, isIsec),
		<QueryOpts>opts
	);
	return out;
};

const arrayQuery = (
	src: QueryObj[],
	opts: QueryOpts,
	p: SPInputTerm,
	o: OTerm,
	collect: Fn2<any, number, void>
) => {
	const isIsec = opts.cwise && opts.intersect;
	isIsec && (opts.cwise = false);
	const $p = coerceStr(p);
	const $o = coerce(o, isIsec);
	// pre-select implementation to avoid dynamic dispatch
	const impl = IMPLS[<QueryType>("n" + classify($p) + classify($o))];
	for (let i = 0, n = src.length; i < n; i++) {
		const res: QueryObj = {};
		impl(res, { _: src[i] }, "_", $p, $o, opts);
		res._ && collect(res._, i);
	}
};

const DEFAULT_OPTS: QueryOpts = {
	partial: false,
	cwise: true,
	intersect: false,
	equiv,
};

/**
 * Generic Higher-order function to return an actual query function based on
 * given behavior options.
 *
 * @remarks
 * @see {@link QueryOpts}
 * @see {@link ObjQueryFn}
 * @see {@link ArrayQueryFn}
 * @see {@link defKeyQuery}
 *
 * @param opts -
 */
export const defQuery = <T extends QueryObj | QueryObj[] = QueryObj>(
	opts?: Partial<QueryOpts>
): QueryFn<T> => {
	const $opts: QueryOpts = { ...DEFAULT_OPTS, ...opts };
	return <QueryFn<T>>((src: any, ...args: any[]): any => {
		if (isArray(src)) {
			const out: QueryObj[] = args[2] || [];
			arrayQuery(src, $opts, args[0], args[1], (x) => out.push(x));
			return out;
		} else {
			return objQuery(src, $opts, args);
		}
	});
};

/**
 * Generic Higher-order function to return an actual query function based on
 * given behavior options. Unlike {@link defQuery}, key query functions only
 * return sets of keys (or indices) of matching objects.
 *
 * @remarks
 * @see {@link KeyQueryOpts}
 * @see {@link ObjKeyQueryFn}
 * @see {@link ArrayKeyQueryFn}
 *
 * @param opts -
 */
export const defKeyQuery = <T extends QueryObj | QueryObj[] = QueryObj>(
	opts?: Partial<KeyQueryOpts>
) => {
	const $opts: QueryOpts = { ...DEFAULT_OPTS, ...opts };
	return <KeyQueryFn<T>>((src: any, ...args: any[]): any => {
		if (isArray(src)) {
			const out = args[2] || new Set<number>();
			arrayQuery(src, $opts, args[0], args[1], (_, i) => out.add(i));
			return out;
		} else {
			const res = objQuery(src, $opts, args.slice(0, 3));
			const out = args[3];
			if (!out) return new Set<string>(Object.keys(res));
			for (let k in res) out.add(k);
			return out;
		}
	});
};

/**
 * Multi-term query function for collections (arrays) of {@link QueryObj}ects.
 * Takes a number of {@link QueryTerm}s and matches each term in succession
 * against the array of results of the previous terms (i.e. each sub-query is
 * potentially further narrowing the result set). Returns final results,
 * possibly post-processed, depending on given options.
 *
 * @remarks
 * Each {@link QueryTerm} can provide its own options and post-processing
 * function. Furthermore, global post-processing (e.g. limiting number of final
 * results, sorting by key) can be configured via `opts`.
 *
 * @param db
 * @param terms
 * @param opts
 */
export const query = <T extends QueryObj = QueryObj>(
	db: T[],
	terms: Nullable<QueryTerm<T>>[],
	opts: Partial<MultiQueryOpts<T>> = {}
) => {
	for (let term of terms) {
		if (!term) continue;
		db = <T[]>(
			(<ArrayQueryFn<T[]>>defQuery<T[]>(term.opts))(
				db,
				<string>term.q[0],
				term.q[1]
			)
		);
		term.post && (db = term.post(db));
		if (!db.length) return db;
	}
	const limit = opts.limit || 0;
	if (limit > 0 && limit < db.length) {
		db.length = limit;
	}
	if (opts.sort) {
		db.sort(
			compareByKey(opts.sort, opts.reverse ? reverse(compare) : compare)
		);
	}
	return db;
};
