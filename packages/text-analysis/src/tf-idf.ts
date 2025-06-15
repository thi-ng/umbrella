import type { Fn2 } from "@thi.ng/api";
import { transduce } from "@thi.ng/transducers/transduce";
import type { Vocab } from "./api.js";
import { frequencies, normFrequencies } from "./frequencies.js";
import { vocabOnly } from "./xform.js";
import { defVocab } from "./vocab.js";

const { log10 } = Math;

/**
 * TF weighting function for {@link defTFIDF}. Computes {@link frequencies} for
 * given words/tokens (only includes those defined in `vocab`).
 */
export const tfCount = (vocab: Vocab, docTokens: Iterable<string>) =>
	transduce(vocabOnly(vocab), frequencies(), docTokens);

/**
 * TF weighting function for {@link defTFIDF}. Computes {@link normFrequencies}
 * for given words/tokens (only includes those defined in `vocab`).
 */
export const tfNormalized = (vocab: Vocab, docTokens: Iterable<string>) =>
	transduce(vocabOnly(vocab), normFrequencies(), docTokens);

/**
 * TF weighting function for {@link defTFIDF}. First computes
 * {@link frequencies} for given words/tokens (only includes those defined in
 * `vocab`), then transforms each value via `log10(1 + count)`.
 */
export const tfLog = (vocab: Vocab, docTokens: Iterable<string>) => {
	const res = transduce(vocabOnly(vocab), frequencies(), docTokens);
	for (const [word, count] of res) res.set(word, log10(1 + count));
	return res;
};

/**
 * Higher order Inverse Document Frequency, using provided weighting strategy
 * function.
 *
 * @remarks
 * Also see {@link defTFIDF} for full tf-idf implementation.
 *
 * References:
 *
 * - https://en.wikipedia.org/wiki/Tf%E2%80%93idf
 * - https://en.wikipedia.org/wiki/Tf%E2%80%93idf#Inverse_document_frequency
 *
 * Provided IDF impls for use with this function:
 *
 * - {@link idfClassic}
 * - {@link idfSmooth}
 * - {@link idfProbabilistic}
 *
 * @param fnIDF
 */
export const defIDF =
	(fnIDF: (docsWithTerm: number, numDocs: number) => number) =>
	(vocab: Vocab, tokenizedDocs: string[][]) => {
		const acc = new Map<string, number>();
		for (const word of vocab.keys()) {
			let count = 0;
			for (const doc of tokenizedDocs) {
				if (doc.includes(word)) count++;
			}
			acc.set(word, fnIDF(count, tokenizedDocs.length));
		}
		return acc;
	};

/**
 * IDF weighting function for {@link defIDF} and {@link defTFIDF}. Computes:
 * `log10(numDocs / docsWithTerm)`
 */
export const idfClassic = defIDF((docsWithTerm, numDocs) =>
	log10(numDocs / docsWithTerm)
);

/**
 * IDF weighting function for {@link defIDF} and {@link defTFIDF}. Computes:
 * `1 + log10(numDocs / (1 + docsWithTerm))`
 */
export const idfSmooth = defIDF(
	(docsWithTerm, numDocs) => 1 + log10(numDocs / (1 + docsWithTerm))
);

/**
 * IDF weighting function for {@link defIDF} and {@link defTFIDF}. Computes:
 * `log10((numDocs - docsWithTerm) / docsWithTerm)`
 */
export const idfProbabilistic = defIDF((docsWithTerm, numDocs) =>
	log10((numDocs - docsWithTerm) / docsWithTerm)
);

/**
 * Higher-order customizable tf-idf implementation, using provided fns for term
 * frequency and inverse document frequency.
 *
 * @remarks
 * See {@link tfidf} for default impl.
 *
 * Also see:
 *
 * - {@link tfCount}, {@link tfNormalized}, {@link tfLog}
 * - {@link idfClassic}, {@link idfSmooth}, {@link idfProbabilistic}.
 *
 * References:
 *
 * - https://en.wikipedia.org/wiki/Tf%E2%80%93idf
 *
 *
 * @param fnTF
 * @param fnIDF
 */
export const defTFIDF =
	(
		fnTF: Fn2<Vocab, string[], Map<string, number>>,
		fnIDF: Fn2<Vocab, string[][], Map<string, number>>
	) =>
	(vocab: Vocab, tokenizedDocs: string[][]) => {
		const idf = fnIDF(vocab, tokenizedDocs);
		return tokenizedDocs.map((doc) => {
			const tf = fnTF(vocab, doc);
			const acc = new Map<string, number>();
			for (const [word, f] of tf) {
				acc.set(word, f * idf.get(word)!);
			}
			return { doc, tf, idf, tfidf: acc };
		});
	};

/**
 * Default tf-idf implementation, using {@link tfNormalized} for term
 * frequency and {@link idfClassic} for inverse document frequency
 * calculation.
 *
 * @remarks
 * References:
 *
 * - https://en.wikipedia.org/wiki/Tf%E2%80%93idf
 *
 * Also see {@link defTFIDF}, {@link defIDF}.
 *
 * @param vocab
 * @param tokenizedDocs
 */
export const tfidf = defTFIDF(tfNormalized, idfClassic);

/**
 * Takes a vocab, an array of tokenized documents and a predicate function.
 * Computes the IDF (Inverse Document Frequency, default: {@link idfClassic})
 * and then filters each document using supplied predicate, which is called with
 * a single word/token and its computed IDF. Only words are kept for which the
 * predicate succeeds.
 *
 * @remarks
 * The IDF for common words is close to zero. This function can be used as a
 * pre-processing step for improved and more efficient vocabulary construction,
 * vector encoding (e.g. via {@link encodeDense}), clustering etc. by pre-excluding
 * tokens which do not contribute much information.
 *
 * @example
 * ```ts tangle:../export/filter-docs-idf.ts
 * import { filterDocsIDF } from "@thi.ng/text-analysis";
 *
 * const docs = [
 *   ["a", "b", "c"],
 *   ["a", "b", "d", "e"],
 *   ["b", "f", "g"],
 *   ["a", "b", "c", "f"],
 *   ["a", "g", "h"]
 * ];
 *
 * // remove common words, i.e. those with an IDF below given threshold
 * const filtered = filterDocsIDF(docs, (_, x) => x > 0.3);
 *
 * // show before & after
 * for(let i = 0; i < docs.length; i++) console.log(docs[i], "=>", filtered[i]);
 *
 * // [ "a", "b", "c" ] => [ "c" ]
 * // [ "a", "b", "d", "e" ] => [ "d", "e" ]
 * // [ "b", "f", "g" ] => [ "f", "g" ]
 * // [ "a", "b", "c", "f" ] => [ "c", "f" ]
 * // [ "a", "g", "h" ] => [ "g", "h" ]
 * ```
 *
 * @param docs
 * @param pred
 * @param vocab
 * @param fnIDF
 */
export const filterDocsIDF = (
	docs: string[][],
	pred: Fn2<string, number, boolean>,
	vocab?: Vocab,
	fnIDF: Fn2<Vocab, string[][], Map<string, number>> = idfClassic
) => {
	if (!vocab) vocab = defVocab(docs);
	const idf = fnIDF(vocab, docs);
	return docs.map((doc) =>
		doc.filter((word) => vocab.has(word) && pred(word, idf.get(word)!))
	);
};
