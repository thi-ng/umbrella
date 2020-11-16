import type { IObjectOf } from "@thi.ng/api";
import { illegalState } from "@thi.ng/errors";
import { rad } from "@thi.ng/math";
import { WS } from "@thi.ng/strings";
import type { Vec } from "@thi.ng/vectors";
import { PathBuilder } from "./path-builder";

const CMD_RE = /[achlmqstvz]/i;
const WSC: IObjectOf<boolean> = { ...WS, ",": true };

export const pathFromSvg = (svg: string) => {
    const b = new PathBuilder();
    try {
        let cmd = "";
        for (let n = svg.length, i = 0; i < n; ) {
            i = skipWS(svg, i);
            const c = svg.charAt(i);
            if (CMD_RE.test(c)) {
                cmd = c;
                i++;
            }
            let p, pa, pb, t1, t2, t3;
            switch (cmd.toLowerCase()) {
                case "m":
                    [p, i] = readPoint(svg, i);
                    b.moveTo(p, cmd === "m");
                    break;
                case "l":
                    [p, i] = readPoint(svg, i);
                    b.lineTo(p, cmd === "l");
                    break;
                case "h":
                    [p, i] = readFloat(svg, i);
                    b.hlineTo(p, cmd === "h");
                    break;
                case "v":
                    [p, i] = readFloat(svg, i);
                    b.vlineTo(p, cmd === "v");
                    break;
                case "q":
                    [pa, i] = readPoint(svg, i);
                    [p, i] = readPoint(svg, i);
                    b.quadraticTo(pa, p, cmd === "q");
                    break;
                case "c":
                    [pa, i] = readPoint(svg, i);
                    [pb, i] = readPoint(svg, i);
                    [p, i] = readPoint(svg, i);
                    b.cubicTo(pa, pb, p, cmd === "c");
                    break;
                case "s":
                    [pa, i] = readPoint(svg, i);
                    [p, i] = readPoint(svg, i);
                    b.cubicChainTo(pa, p, cmd === "s");
                    break;
                case "t":
                    [p, i] = readPoint(svg, i);
                    b.quadraticChainTo(p, cmd === "t");
                    break;
                case "a": {
                    [pa, i] = readPoint(svg, i);
                    [t1, i] = readFloat(svg, i);
                    [t2, i] = readFlag(svg, i);
                    [t3, i] = readFlag(svg, i);
                    [pb, i] = readPoint(svg, i);
                    b.arcTo(pb, pa, rad(t1), t2, t3, cmd === "a");
                    break;
                }
                case "z":
                    b.closePath();
                    break;
                default:
                    throw new Error(
                        `unsupported segment type: ${c} @ pos ${i}`
                    );
            }
        }
        return b.paths;
    } catch (e) {
        throw e instanceof Error
            ? e
            : new Error(`illegal char '${svg.charAt(e)}' @ ${e}`);
    }
};

const skipWS = (src: string, i: number) => {
    const n = src.length;
    while (i < n && WSC[src.charAt(i)]) i++;
    return i;
};

const readPoint = (src: string, index: number): [Vec, number] => {
    let x, y;
    [x, index] = readFloat(src, index);
    index = skipWS(src, index);
    [y, index] = readFloat(src, index);
    return [[x, y], index];
};

const readFlag = (src: string, i: number): [boolean, number] => {
    i = skipWS(src, i);
    const c = src.charAt(i);
    return [
        c === "0"
            ? false
            : c === "1"
            ? true
            : illegalState(`expected '0' or '1' @ pos: ${i}`),
        i + 1,
    ];
};

const readFloat = (src: string, index: number) => {
    index = skipWS(src, index);
    let signOk = true;
    let dotOk = true;
    let expOk = false;
    let commaOk = false;
    let i = index;
    for (let n = src.length; i < n; i++) {
        const c = src.charAt(i);
        if ("0" <= c && c <= "9") {
            expOk = true;
            commaOk = true;
            signOk = false;
            continue;
        }
        if (c === "-" || c === "+") {
            if (!signOk) break;
            signOk = false;
            continue;
        }
        if (c === ".") {
            if (!dotOk) break;
            dotOk = false;
            continue;
        }
        if (c === "e") {
            if (!expOk) throw i;
            expOk = false;
            dotOk = false;
            signOk = true;
            continue;
        }
        if (c === ",") {
            if (!commaOk) throw i;
            i++;
        }
        break;
    }
    if (i === index) {
        illegalState(`expected coordinate @ pos: ${i}`);
    }
    return [parseFloat(src.substring(index, i)), i];
};
