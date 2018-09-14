import { isArray } from "@thi.ng/checks/is-array";
import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { ff, points } from "./format";

const TEXT_ALIGN = {
    left: "start",
    right: "end",
    center: "middle",
    start: "start",
    end: "end",
};

export const convertTree = (s: any[]) => {
    const type = s[0];
    if (isArray(type)) {
        return s.map(convertTree);
    }
    let attribs = convertAttribs(s[1]);
    switch (s[0]) {
        case "svg":
        case "defs":
        case "g": {
            const res: any[] = [type, attribs];
            for (let i = 2, n = s.length; i < n; i++) {
                const c = convertTree(s[i]);
                c != null && res.push(c);
            }
            return res;
        }
        case "linearGradient":
            return [type,
                {
                    id: attribs.id,
                    x1: ff(attribs.from[0]),
                    y1: ff(attribs.from[1]),
                    x2: ff(attribs.to[0]),
                    y2: ff(attribs.to[1]),
                    gradientUnits: attribs.gradientUnits || "userSpaceOnUse",
                    gradientTransform: attribs.gradientTransform,
                },
                ...s[2].map(gradientStop)
            ];
        case "radialGradient":
            return [type,
                {
                    id: attribs.id,
                    fx: ff(attribs.from[0]),
                    fy: ff(attribs.from[1]),
                    cx: ff(attribs.to[0]),
                    cy: ff(attribs.to[1]),
                    fr: ff(attribs.r1),
                    r: ff(attribs.r2),
                    gradientUnits: attribs.gradientUnits || "userSpaceOnUse",
                    gradientTransform: attribs.gradientTransform,
                },
                ...s[2].map(gradientStop)
            ];
        case "circle":
            return [type, {
                ...attribs,
                cx: ff(s[2][0]), cy: ff(s[2][1]),
                r: ff(s[3])
            }];
        case "rect": {
            attribs = {
                ...attribs,
                x: ff(s[2][0]), y: ff(s[2][1]),
                width: ff(s[3]), height: ff(s[4]),
            };
            const r = s[5];
            if (r != null) {
                attribs.rx = attribs.ry = ff(r);
            }
            return [type, attribs];
        }
        case "line":
            return [type, {
                ...attribs,
                x1: ff(s[2][0]), y1: ff(s[2][1]),
                x2: ff(s[3][0]), y2: ff(s[3][1])
            }];
        case "hline":
            return [type, {
                ...attribs,
                x1: ff(-1e6), y1: ff(s[2][1]),
                x2: ff(1e6), y2: ff(s[3][1])
            }];
        case "vline":
            return [type, {
                ...attribs,
                x1: ff(s[2][0]), y1: ff(-1e6),
                x2: ff(s[3][0]), y2: ff(1e6)
            }];
        case "polyline":
        case "polygon":
            return [type, {
                ...attribs,
                points: points(s[2])
            }];
        case "path": {
            let res = [];
            for (let seg of s[2]) {
                res.push(seg[0]);
                switch (seg[0].toLowerCase()) {
                    case "a":
                        // TODO
                        // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#Elliptical_Arc_Curve
                        break;
                    case "s":
                    case "t":
                        // TODO
                        // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#Cubic_B%C3%A9zier_Curve
                        // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#Quadratic_B%C3%A9zier_Curve
                        break;
                    case "h":
                    case "v":
                        res.push(ff(seg[1]));
                    case "z":
                        break;
                    default:
                        res.push(points(seg.slice(1), ","));
                }
            }
            attribs.d = res.join("");
            return [type, attribs];
        }
        case "text": {
            return [type, {
                ...attribs,
                x: ff(s[2][0]),
                y: ff(s[2][1])
            }, s[3]];
        }
        case "img": {
            return ["image", {
                ...attribs,
                "xlink:href": s[2].src,
                x: ff(s[3][0]), y: ff(s[3][1]),
            }];
        }
        case "points": {
            const size = ff(attribs.size || 1);
            const a = { width: size, height: size };
            delete attribs.size;
            const res = ["g", attribs];
            for (let p of s[2]) {
                res.push(["rect", { ...a, x: ff(p[0]), y: ff(p[1]) }]);
            }
            return res;
        }
        default:
    }
};

const convertAttribs = (attribs: any) => {
    const res: any = convertTransforms(attribs);
    for (let id in attribs) {
        const v = attribs[id];
        switch (id) {
            case "fill":
            case "stroke":
                res[id] = v[0] === "$" ? `url(#${v.substr(1)})` : v;
                break;
            case "weight":
                res["stroke-width"] = v;
                break;
            case "dash":
                res["stroke-dasharray"] = v;
                break;
            case "dashOffset":
                res["stroke-dashoffset"] = v;
                break;
            case "font": {
                const i = v.indexOf(" ");
                res["font-size"] = v.substr(0, i);
                res["font-family"] = v.substr(i + 1);
                break;
            }
            case "align":
                res["text-anchor"] = TEXT_ALIGN[v];
                break;
            case "baseLine":
            case "transform":
            case "translate":
            case "rotate":
            case "scale":
                break;
            default:
                res[id] = v;
        }
    }
    return res;
};

const convertTransforms = (attribs: any) => {
    const res: any = {};
    if (!attribs) return res;
    let v: any;
    if ((v = attribs.transform) ||
        attribs.translate ||
        attribs.scale ||
        attribs.rotate) {

        const tx: string[] = [];
        (v = attribs.transform) && tx.push(`matrix(${v.map(ff).join(" ")})`);
        (v = attribs.translate) && tx.push(`translate(${ff(v[0])} ${ff(v[1])})`);
        (v = attribs.rotate) && tx.push(`rotate(${ff(v * 180 / Math.PI)})`);
        (v = attribs.scale) &&
            tx.push(
                isArrayLike(v) ?
                    `scale(${ff(v[0])} ${ff(v[1])})` :
                    `scale(${ff(v)})`
            );
        res.transform = tx.join(" ");
    }
    return res;
};

const gradientStop = (s: [number, string]) =>
    ["stop", { offset: s[0], "stop-color": s[1] }];
