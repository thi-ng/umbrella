import { lengthAnsi } from "./ansi";

export const wordWrap = (str: string, lineWidth?: number) =>
    wordWrapLines(str, lineWidth).join("\n");

export const wordWrapLines = (str: string, lineWidth = 80) => {
    const res: string[] = [];
    for (let line of str.split("\n")) {
        if (!line.length) {
            res.push("");
            continue;
        }
        wordWrapLine(line, lineWidth, res);
    }
    return res;
};

export const wordWrapLine = (
    line: string,
    lineWidth = 80,
    acc: string[] = []
) => {
    let ln = 0;
    let curr: string[] = [];
    for (let w of line.split(" ")) {
        const l = lengthAnsi(w) + (ln > 0 ? 1 : 0);
        if (ln + l <= lineWidth) {
            curr.push(w, " ");
            ln += l;
        } else {
            acc.push(trimLine(curr));
            curr = [w, " "];
            ln = l;
        }
    }
    ln && acc.push(trimLine(curr));
    return acc;
};

const trimLine = (x: string[]) => {
    /^\s+$/.test(x[x.length - 1]) && x.pop();
    return x.join("");
};
