import type { Fn2 } from "@thi.ng/api";
import { transduce } from "@thi.ng/transducers/transduce";
import { frequencies, normFrequencies } from "./frequencies.js";
import type { Vocab } from "./vocab.js";
import { vocabOnly } from "./xform.js";

const { log10 } = Math;

export const tfCount = (vocab: Vocab, docTokens: Iterable<string>) =>
	transduce(vocabOnly(vocab), frequencies(), docTokens);

export const tfNormalized = (vocab: Vocab, docTokens: Iterable<string>) =>
	transduce(vocabOnly(vocab), normFrequencies(), docTokens);

export const tfLog = (vocab: Vocab, docTokens: Iterable<string>) => {
	const res = transduce(vocabOnly(vocab), frequencies(), docTokens);
	for (const [word, count] of res) res.set(word, log10(1 + count));
	return res;
};

export const defIDF =
	(fnIDF: (count: number, numDocs: number) => number) =>
	(vocab: Vocab, tokenizedDocs: string[][]) => {
		const acc = new Map<string, number>();
		for (const word of vocab.keys()) {
			let n = 0;
			for (const doc of tokenizedDocs) {
				if (doc.includes(word)) n++;
			}
			acc.set(word, fnIDF(n, tokenizedDocs.length));
		}
		return acc;
	};

export const idfClassic = defIDF((count, numDocs) =>
	Math.log10(numDocs / count)
);

export const idfSmooth = defIDF(
	(count, numDocs) => 1 + log10(numDocs / (1 + count))
);

export const idfProbabilistic = defIDF((count, numDocs) =>
	log10((numDocs - count) / count)
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
			return { tf, idf, tfidf: acc };
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
 * Also see {@link defTFIDF}
 *
 * @param vocab
 * @param tokenizedDocs
 */
export const tfidf = defTFIDF(tfNormalized, idfClassic);
