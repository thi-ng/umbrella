import { defmulti } from "@thi.ng/defmulti";
import { float } from "@thi.ng/strings/float";
import { padLeft } from "@thi.ng/strings/pad-left";
import { padRight } from "@thi.ng/strings/pad-right";
import { comp } from "@thi.ng/transducers/func/comp";
import { wrap } from "@thi.ng/transducers/iter/wrap";
import { push } from "@thi.ng/transducers/rfn/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { map } from "@thi.ng/transducers/xform/map";
import { mapIndexed } from "@thi.ng/transducers/xform/map-indexed";
import { mapcat } from "@thi.ng/transducers/xform/mapcat";
import { partition } from "@thi.ng/transducers/xform/partition";
import { wordWrap } from "@thi.ng/transducers/xform/word-wrap";
import {
    DEFAULT_GLOBALS,
    DictEntry,
    EntityStatus,
    GlobalParams,
    IGESDocument,
    Param,
    PolylineMode,
    Type,
    Unit
} from "./api";

const LINEWIDTH_GLOBALS = 72;
const LINEWIDTH_PARAMS = 64;

const $Z2 = padLeft(2, "0");
const $Z7 = padLeft(7, "0");
const $F8 = padLeft(8, " ");
const $STR = (x: any) => (x != null ? (x = x.toString(), `${x.length}H${x}`) : "");
const $SEQ = padLeft(7, " ");
const $BODY = padRight(72, " ");
const $PBODY = padRight(64, " ");
const $DATE = (d: Date) =>
    $STR([
        d.getUTCFullYear(),
        $Z2(d.getUTCMonth() + 1),
        $Z2(d.getUTCDate()),
        ".",
        $Z2(d.getUTCHours()),
        $Z2(d.getUTCMinutes()),
        $Z2(d.getUTCSeconds())
    ].join(""));

export const newDocument = (g?: Partial<GlobalParams>, start?: string[]): IGESDocument => {
    const globals = <GlobalParams>{ ...DEFAULT_GLOBALS, ...g };
    const $FF = float(globals.precision);
    const $PARAM = defmulti<any[], string>((x) => x[1]);
    $PARAM.add(Type.INT, (x) => x[0].toString());
    $PARAM.add(Type.FLOAT, (x) => $FF(x[0]));
    $PARAM.add(Type.STR, (x) => x[0]);
    $PARAM.add(Type.HSTR, (x) => $STR(x[0]));
    $PARAM.add(Type.DATE, (x) => $DATE(x[0]));

    return {
        globals,
        start: start || [],
        dict: [],
        param: [],
        offsets: {
            S: 0,
            G: 0,
            P: 1,
            D: 0,
        },
        $FF,
        $PARAM,
    };
};

export const serialize = (doc: IGESDocument) => [
    ...formatStart(doc),
    ...formatGlobals(doc),
    ...doc.dict,
    ...doc.param,
    formatTerminate(doc)
].join("\n");

const formatLine = (body: string, type: string, i: number) =>
    `${$BODY(body)}${type}${$SEQ(i + 1)}`;

const formatStart = (doc: IGESDocument) => {
    const res = [...mapIndexed((i, x: string) => formatLine(x, "S", i), doc.start)];
    doc.offsets.S += res.length;
    return res;
};

const formatGlobals = (doc: IGESDocument) => {
    const g = doc.globals;
    const res = formatParams(
        doc,
        [
            [g.delimParam, Type.HSTR],
            [g.delimRecord, Type.HSTR],
            [g.senderProductID, Type.HSTR],
            [g.fileName, Type.HSTR],
            [g.generator, Type.HSTR],
            [g.generatorVersion, Type.HSTR],
            [g.intBits, Type.INT],
            [g.singleMaxPow, Type.INT],
            [g.singleDigits, Type.INT],
            [g.doubleMaxPow, Type.INT],
            [g.doubleDigits, Type.INT],
            [g.receiverProductID, Type.HSTR],
            [g.modelScale, Type.FLOAT],
            [g.units, Type.INT],
            [Unit[g.units], Type.HSTR],
            [g.numLineWeights, Type.INT],
            [g.maxLineWeight, Type.FLOAT],
            [g.created || new Date(), Type.DATE],
            [1 / Math.pow(10, g.precision), Type.FLOAT],
            [g.maxCoord || 1000, Type.FLOAT],
            [g.author, Type.HSTR],
            [g.authorOrg, Type.HSTR],
            [g.specVersion, Type.INT],
            [g.draftVersion, Type.INT],
            [g.modified || new Date(), Type.DATE],
        ],
        (body, i) => `${$BODY(body)}G${$SEQ(i + 1)}`,
        LINEWIDTH_GLOBALS
    );
    doc.offsets.G += res.length;
    return res;
};

const formatTerminate = (doc: IGESDocument) =>
    formatLine(
        `S${$Z7(doc.offsets.S)}G${$Z7(doc.offsets.G)}D${$Z7(doc.offsets.D)}P${$Z7(doc.offsets.P - 1)}`,
        "T", 0
    );

const formatStatus = (s: EntityStatus) =>
    [
        s.blank || 0,
        s.subord || 0,
        s.usage || 0,
        s.hierarchy || 0
    ].map($Z2).join("");

const formatDictEntry = (e: DictEntry) =>
    transduce(
        comp(
            map((x) => $F8(x)),
            partition(9),
            mapIndexed((i, x: string[]) => formatLine(x.join(""), "D", i), e.index)
        ),
        push(),
        [
            e.type,
            e.param || 0,
            e.struct || 0,
            e.pattern || 0,
            e.level || 0,
            e.view || 0,
            e.matrix || 0,
            e.labelAssoc || 0,
            formatStatus(e.status || <any>{}),
            //
            e.type,
            e.lineWeight || 0,
            e.color || 0,
            e.lineCount || 1,
            e.form || 0,
            0,
            0,
            e.label || "",
            e.subscript || 0
        ]
    );

const formatParam = (did: number, pid: number) =>
    (body: string, i: number) =>
        `${$PBODY(body)} ${$Z7(did + 1)}P${$SEQ(i + pid)}`;

const formatParams = (
    doc: IGESDocument,
    params: Param[],
    fmtBody: (body: string, i: number) => string,
    bodyWidth = LINEWIDTH_PARAMS) => {
    const lines = transduce(
        comp(
            map(doc.$PARAM),
            wordWrap(bodyWidth, { delim: 1, always: true }),
            map((p) => p.join(doc.globals.delimParam)),
        ),
        push(),
        params);
    const n = lines.length - 1;
    return lines.map(
        (line, i) => {
            const d = i < n ?
                doc.globals.delimParam :
                doc.globals.delimRecord;
            return fmtBody(line + d, i);
        }
    );
};

// type table: page 38 (67)

// sec 4.7, page 77 (106)
export const addPolyline2d = (doc: IGESDocument, pts: ArrayLike<number>[], form = PolylineMode.OPEN) => {
    const did = doc.offsets.D;
    const pid = doc.offsets.P;
    const params = formatParams(
        doc,
        [
            [106, Type.INT],
            [1, Type.INT],
            [pts.length + (form === PolylineMode.CLOSED ? 1 : 0), Type.INT],
            [0, Type.FLOAT],
            ...mapcat<number[], Param>(
                ([x, y]) => [[x, Type.FLOAT], [y, Type.FLOAT]],
                form === PolylineMode.CLOSED ?
                    <any>wrap(pts, 1, false, true) :
                    pts
            )
        ],
        formatParam(did, pid)
    );
    doc.offsets.P += params.length;
    doc.offsets.D += 2;
    doc.dict.push(...formatDictEntry(<DictEntry>{
        type: 106,
        form: form === PolylineMode.FILLED ? 63 : 11,
        param: pid,
        index: did,
        lineCount: params.length,
    }));
    doc.param.push(...params);
    return doc;
};

export const addPolygon2d = (doc: IGESDocument, pts: ArrayLike<number>[]) =>
    addPolyline2d(doc, pts, PolylineMode.FILLED);

// sec 4.23, page 123 (type 126)
// export const addNurbsCurve2d = (doc: IGESDocument, degree: number, pts: number[][], closed = false) => {
//     doc; degree; pts; closed;
// };

export * from "./api";