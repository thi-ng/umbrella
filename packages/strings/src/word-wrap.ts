import { lengthAnsi } from "./ansi.js";
import type { IWordSplit, WordWrapOpts } from "./api.js";
import { split } from "./split.js";

/**
 * Internal representation of a single line (for word wrapping purposes). A thin
 * wrapper of individual word and the _logical_ line length (rather than the
 * actualy string width).
 *
 * @internal
 */
class Line {
    n = 0;
    w: string[] = [];

    constructor(word?: string, n?: number) {
        word != null && this.add(word, n);
    }

    add(word: string, n = word.length) {
        this.w.push(word);
        this.n += n + ~~(this.n > 0);
        return this;
    }

    toString() {
        return this.w.join(" ");
    }
}

/**
 * (Default) wordwrap word splitting strategy for plain text.
 */
export const SPLIT_PLAIN: IWordSplit = {
    length: (x) => x.length,
    split: (_, max) => max,
};

/**
 * Wordwrap word splitting strategy for text containing ANSI control sequences.
 */
export const SPLIT_ANSI: IWordSplit = {
    length: lengthAnsi,
    split: (x, max) => {
        const re = /\x1b\[[0-9;]+m/g;
        let i = max;
        let match: RegExpExecArray | null;
        while ((match = re.exec(x))) {
            if (match.index >= max) break;
            const n = match[0].length;
            i += n;
            max += n;
        }
        return i;
    },
};

/**
 * Attempts to append given word to current line or else creates a new line.
 *
 * @internal
 */
const append = (acc: Line[], word: string, wordLen: number, width: number) => {
    const curr = acc[acc.length - 1];
    curr && width - curr.n > wordLen
        ? curr.add(word, wordLen)
        : acc.push(new Line(word, wordLen));
};

/**
 * Depending on wrap mode (hard/soft), splits too long words into multiple lines
 * and appends them to `acc`.
 *
 * @remarks
 * Splitting uses the provided {@link IWordSplit} impl (or, if missing,
 * {@link SPLIT_PLAIN}). If the current start line only has less than
 * {@link WordWrapOpts.min} chars available and the word is longer than that, it
 * will be placed into a new line (thus minimizing legibility issues).
 *
 * @param word - 
 * @param opts - 
 * @param offset - 
 * @param acc - 
 *
 * @internal
 */
const wrapWord = (
    word: string,
    { width, min, hard, splitter }: WordWrapOpts,
    offset = 0,
    acc: Line[] = []
) => {
    let len = splitter.length(word);
    let free = width - offset;
    // don't start word in current line if only
    // a few chars left...
    if (free < min && free < len) {
        free = width;
    }
    // (maybe) hardwrap long word
    while (hard && len > free) {
        const split = splitter.split(word, free);
        const chunk = word.substr(0, split);
        append(acc, chunk, free, width);
        word = word.substr(split);
        free = width;
        len = splitter.length(word);
    }
    append(acc, word, len, width);
    return acc;
};

/**
 * Wordwraps a single-`line` string using provided options. Returns array of
 * {@link Line} objects, which can simply be `.join("\n")`ed to convert back
 * into text.
 *
 * @see {@link wordWrap} for main user facing alternative.
 *
 * @param line - 
 * @param opts - 
 * @param acc - 
 *
 * @internal
 */
export const wordWrapLine = (
    line: string,
    opts: Partial<WordWrapOpts>,
    acc: Line[] = []
) => {
    if (!line.length) {
        acc.push(new Line());
        return acc;
    }
    const $opts = <WordWrapOpts>{
        width: 80,
        min: 4,
        hard: false,
        splitter: SPLIT_PLAIN,
        ...opts,
    };
    for (let word of split(line, opts.delimWord || /\s/g)) {
        const curr = acc[acc.length - 1];
        wrapWord(word, $opts, curr && curr.n > 0 ? curr.n + 1 : 0, acc);
    }
    return acc;
};

/**
 * Wordwraps a multi-`line` string using provided options. Returns array of
 * {@link Line} objects, which can simply be `.join("\n")`ed to convert back
 * into text.
 *
 * @see {@link wordWrap} for main user facing alternative.
 *
 * @param lines - 
 * @param opts - 
 */
export const wordWrapLines = (lines: string, opts: Partial<WordWrapOpts>) => {
    let acc: Line[] = [];
    for (let line of split(lines, opts.delimLine)) {
        acc = acc.concat(wordWrapLine(line, opts));
    }
    return acc;
};

/**
 * Same as {@link wordWrapLines}, but returns wordwrapped result as string. See
 * {@link WordWrapOpts} for options.
 *
 * @param str - 
 * @param opts - 
 */
export const wordWrap = (str: string, opts: Partial<WordWrapOpts>) =>
    wordWrapLines(str, opts).join("\n");
