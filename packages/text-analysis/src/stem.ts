const SUFFIXES_STEP2: Record<string, string> = {
	alism: "al",
	aliti: "al",
	alli: "al",
	anci: "ance",
	ation: "ate",
	ational: "ate",
	ator: "ate",
	biliti: "ble",
	bli: "ble",
	eli: "e",
	enci: "ence",
	entli: "ent",
	fulness: "ful",
	iveness: "ive",
	iviti: "ive",
	ization: "ize",
	izer: "ize",
	logi: "log",
	ousli: "ous",
	ousness: "ous",
	tional: "tion",
};

const SUFFIXES_STEP3: Record<string, string> = {
	alize: "al",
	ative: "",
	ful: "",
	ical: "ic",
	icate: "ic",
	iciti: "ic",
	ness: "",
};

const c = "[^aeiou]"; // consonant
const v = "[aeiouy]"; // vowel
const C = c + "[^aeiouy]*"; // consonant sequence
const V = v + "[aeiou]*"; // vowel sequence

const RE_MGR0 = new RegExp("^(" + C + ")?" + V + C); // [C]VC... is m>0
const RE_MEQ1 = new RegExp("^(" + C + ")?" + V + C + "(" + V + ")?$"); // [C]VC[V] is m=1
const RE_MGR1 = new RegExp("^(" + C + ")?" + V + C + V + C); // [C]VCVC... is m>1
const RE_STEM_VOWEL = new RegExp("^(" + C + ")?" + v); // vowel in stem
const OTHER = new RegExp("^" + C + v + "[^aeiouwxy]$");

const RE_STEP1A = /^(.+?)(ss|i)es$/;
const RE_STEP1A_ALT = /^(.+?)([^s])s$/;
const RE_STEP1B = /^(.+?)eed$/;
const RE_STEP1B_ALT = /^(.+?)(ed|ing)$/;
const RE_STEP1B_2 = /(at|bl|iz)$/;
const RE_STEP1B_3 = /([^aeiouylsz])\1$/;
const RE_STEP1B_4 = new RegExp("^" + C + v + "[^aeiouwxy]$");
const RE_STEP1C = /^(.+?)y$/;
const RE_STEP2 =
	/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
const RE_STEP3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
const RE_STEP4 =
	/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
const RE_STEP4A = /^(.+?)(s|t)(ion)$/;
const RE_STEP5 = /^(.+?)e$/;

/**
 * Porter stemmer for a single English word.
 *
 * @remarks
 * Based on Porter stemmer in Javascript (various refactoring/optimizations):
 *
 * http://www.tartarus.org/~martin/PorterStemmer
 *
 * Original paper by Porter, 1980: "An algorithm for suffix
 * stripping", Program, Vol. 14, no. 3, pp 130-137
 *
 * @param word
 */
export const stemWord = (word: string) => {
	let initialY: boolean;
	let fp: RegExpExecArray | null;
	let stem: string;
	let suffix: string;

	if (word.length < 3) return word;

	initialY = word[0] === "y";
	if (initialY) word = "Y" + word.substring(1);

	word = word.replace(RE_STEP1A, "$1$2").replace(RE_STEP1A_ALT, "$1$2");

	if ((fp = RE_STEP1B.exec(word))) {
		if (RE_MGR0.test(fp[1])) word = word.slice(0, -1);
	} else if ((fp = RE_STEP1B_ALT.exec(word))) {
		stem = fp[1];
		if (RE_STEM_VOWEL.test(stem)) {
			word = stem;
			if (RE_STEP1B_2.test(word)) {
				word = word + "e";
			} else if (RE_STEP1B_3.test(word)) {
				word = word.slice(0, -1);
			} else if (RE_STEP1B_4.test(word)) {
				word = word + "e";
			}
		}
	}

	if ((fp = RE_STEP1C.exec(word))) {
		stem = fp[1];
		if (RE_STEM_VOWEL.test(stem)) word = stem + "i";
	}

	if ((fp = RE_STEP2.exec(word))) {
		stem = fp[1];
		suffix = fp[2];
		if (RE_MGR0.test(stem)) word = stem + SUFFIXES_STEP2[suffix];
	}

	if ((fp = RE_STEP3.exec(word))) {
		stem = fp[1];
		suffix = fp[2];
		if (RE_MGR0.test(stem)) word = stem + SUFFIXES_STEP3[suffix];
	}

	if ((fp = RE_STEP4.exec(word))) {
		stem = fp[1];
		if (RE_MGR1.test(stem)) word = stem;
	} else if ((fp = RE_STEP4A.exec(word))) {
		stem = fp[1] + fp[2];
		if (RE_MGR1.test(stem)) word = stem;
	}

	if ((fp = RE_STEP5.exec(word))) {
		stem = fp[1];
		if (RE_MGR1.test(stem) || (RE_MEQ1.test(stem) && !OTHER.test(stem)))
			word = stem;
	}

	if (word.endsWith("ll") && RE_MGR1.test(word)) word = word.slice(0, -1);

	return initialY ? "y" + word.substring(1) : word;
};
