import { diffArray } from "@thi.ng/diff";
import { escape } from "@thi.ng/hiccup";
import { padLeft } from "@thi.ng/strings";

const FMT_LN = padLeft(4, " ");

export const computeDiff = (a: string, b: string) => {
    const edits = diffArray(
        a.split("\n"),
        b.split("\n"),
        "only-distance-linear"
    ).linear!;
    for (let i = 0; i < edits.length; i += 3) {
        const lineID = <number>edits[i];
        if (lineID) updateOffset(edits, i, lineID);
    }
    const result: any[] = ["div", {}];
    let block: any[] | undefined;
    let numSame = 0;
    for (let i = 0; i < edits.length; i += 3) {
        if (!block) block = ["pre", {}];
        const lineID = <number>edits[i];
        if (lineID == 0) {
            numSame++;
            if (numSame > 2) {
                numSame = 0;
                // scan forward to check if foldable
                let j = i;
                do {
                    j += 3;
                } while (j < edits.length && edits[j] === 0);
                if (j - i > 12) {
                    result.push(block, foldedBlock(edits, i, j - 6));
                    block = undefined;
                    i = j - 9;
                    continue;
                }
            }
        } else {
            numSame = 0;
        }
        block!.push(codeLine(edits, i, true));
    }
    if (block) result.push(block);
    return result;
};

const updateOffset = (edits: any[], i: number, delta: number) => {
    for (; i < edits.length; i += 3) {
        if (edits[i] === 0) edits[i + 1] += delta;
    }
};

const codeLine = (edits: any[], i: number, body = false): any[] => [
    "code",
    {
        "data-diff": ["-", " ", "+"][edits[i] + 1],
        "data-lnum": FMT_LN(edits[i + 1] + 1),
    },
    body ? escape(edits[i + 2]) : null,
];

const foldedBlock = (edits: any[], i: number, j: number): any[] => {
    const block = [
        "pre",
        { "data-fold": true },
        [
            "code",
            {
                "data-fold-range": `${edits[i + 4]} - ${edits[j + 1]}`,
            },
        ],
    ];
    for (; i < j; i += 3) {
        block.push(codeLine(edits, i, true));
    }
    return block;
};
