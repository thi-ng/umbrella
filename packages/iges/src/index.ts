import { isArray } from "@thi.ng/checks";
import { defmulti } from "@thi.ng/defmulti";
import { float, hstr, padLeft, padRight } from "@thi.ng/strings";
import {
    comp,
    map,
    mapcat,
    mapIndexed,
    partition,
    push,
    transduce,
    wordWrap,
    wrapSides,
} from "@thi.ng/transducers";
import type { ReadonlyVec } from "@thi.ng/vectors";
import {
    BooleanNode,
    BooleanTree,
    DEFAULT_GLOBALS,
    DictEntry,
    EntityOpts,
    EntityStatus,
    EntityType,
    GlobalParams,
    IGESDocument,
    Param,
    PolylineMode,
    SectionType,
    Type,
    Unit,
} from "./api";

// https://wiki.eclipse.org/IGES_file_Specification
// http://paulbourke.net/dataformats/iges/IGES.pdf

const LINEWIDTH_GLOBALS = 72;
const LINEWIDTH_PARAMS = 64;

const $Z2 = padLeft(2, "0");
const $Z7 = padLeft(7, "0");
const $F8 = padLeft(8, " ");

const $SEQ = padLeft(7, " ");
const $BODY = padRight(72, " ");
const $PBODY = padRight(64, " ");
const $DATE = (d: Date) =>
    hstr(
        [
            d.getUTCFullYear(),
            $Z2(d.getUTCMonth() + 1),
            $Z2(d.getUTCDate()),
            ".",
            $Z2(d.getUTCHours()),
            $Z2(d.getUTCMinutes()),
            $Z2(d.getUTCSeconds()),
        ].join("")
    );

export const newDocument = (
    g?: Partial<GlobalParams>,
    start?: string[]
): IGESDocument => {
    const globals = <GlobalParams>{ ...DEFAULT_GLOBALS, ...g };
    const $FF = float(globals.precision);
    const $PARAM = defmulti<any[], string>((x) => x[1]);
    $PARAM.add(Type.INT, (x) => x[0].toString());
    $PARAM.add(Type.POINTER, (x) => (-x[0]).toString());
    $PARAM.add(Type.FLOAT, (x) => $FF(x[0]));
    $PARAM.add(Type.STR, (x) => x[0]);
    $PARAM.add(Type.HSTR, (x) => hstr(x[0]));
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

export const serialize = (doc: IGESDocument) =>
    [
        ...formatStart(doc),
        ...formatGlobals(doc),
        ...doc.dict,
        ...doc.param,
        formatTerminate(doc),
    ].join("\n");

const formatLine = (body: string, type: SectionType, i: number) =>
    `${$BODY(body)}${type}${$SEQ(i + 1)}`;

const formatStart = (doc: IGESDocument) => {
    const res = [
        ...mapIndexed((i, x: string) => formatLine(x, "S", i), doc.start),
    ];
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
        `S${$Z7(doc.offsets.S)}G${$Z7(doc.offsets.G)}D${$Z7(
            doc.offsets.D
        )}P${$Z7(doc.offsets.P - 1)}`,
        "T",
        0
    );

const formatStatus = (s: Partial<EntityStatus>) =>
    [s.blank || 0, s.subord || 0, s.usage || 0, s.hierarchy || 0]
        .map((x) => $Z2(x))
        .join("");

const formatDictEntry = (e: DictEntry) =>
    transduce(
        comp(
            map((x) => $F8(x)),
            partition(9),
            mapIndexed(
                (i, x: string[]) => formatLine(x.join(""), "D", i),
                e.index
            )
        ),
        push<string>(),
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
            e.subscript || 0,
        ]
    );

const formatParam = (did: number, pid: number) => (body: string, i: number) =>
    `${$PBODY(body)} ${$Z7(did + 1)}P${$SEQ(i + pid)}`;

const formatParams = (
    doc: IGESDocument,
    params: Param[],
    fmtBody: (body: string, i: number) => string,
    bodyWidth = LINEWIDTH_PARAMS
) => {
    const lines = transduce(
        comp(
            map(doc.$PARAM),
            wordWrap(bodyWidth, { delim: 1, always: true }),
            map((p) => p.join(doc.globals.delimParam))
        ),
        push(),
        params
    );
    const n = lines.length - 1;
    return lines.map((line, i) => {
        const d = i < n ? doc.globals.delimParam : doc.globals.delimRecord;
        return fmtBody(line + d, i);
    });
};

const addEntity = (
    doc: IGESDocument,
    type: EntityType,
    entry: Partial<DictEntry> | null,
    params: Param[],
    opts: Partial<EntityOpts> = {}
) => {
    const did = doc.offsets.D;
    const pid = doc.offsets.P;
    const fparams = formatParams(
        doc,
        [<Param>[type, Type.INT]].concat(params),
        formatParam(did, pid)
    );
    doc.offsets.P += fparams.length;
    doc.offsets.D += 2;
    doc.dict.push(
        ...formatDictEntry(<DictEntry>{
            type,
            pattern: opts.pattern || 0,
            color: opts.color || 0,
            param: pid,
            index: did,
            lineCount: fparams.length,
            ...entry,
        })
    );
    doc.param.push(...fparams);
    return did + 1;
};

export const addPolyline = (
    doc: IGESDocument,
    pts: ReadonlyVec[],
    form = PolylineMode.OPEN,
    opts?: Partial<EntityOpts>
) => {
    const is2D = pts[0].length == 2;
    const params: Param[] = [
        [is2D ? 1 : 2, Type.INT],
        [pts.length + (form === PolylineMode.CLOSED ? 1 : 0), Type.INT],
    ];
    is2D && params.push([0, Type.FLOAT]);
    return addEntity(
        doc,
        EntityType.POLYLINE,
        {
            form: form === PolylineMode.FILLED ? 63 : 11,
        },
        [
            ...params,
            ...mapcat<ReadonlyVec, Param>(
                (p) => map((x) => <Param>[x, Type.FLOAT], p),
                form === PolylineMode.CLOSED ? wrapSides(pts, 0, 1) : pts
            ),
        ],
        opts
    );
};

export const addPolygon = (
    doc: IGESDocument,
    pts: ReadonlyVec[],
    opts?: Partial<EntityOpts>
) => addPolyline(doc, pts, PolylineMode.FILLED, opts);

export const addPoint = (
    doc: IGESDocument,
    p: ReadonlyVec,
    opts?: Partial<EntityOpts>
) =>
    addEntity(
        doc,
        EntityType.POINT,
        null,
        [
            [p[0], Type.FLOAT],
            [p[1], Type.FLOAT],
            [p[2] || 0, Type.FLOAT],
            [0, Type.POINTER],
        ],
        opts
    );

export const addLine = (
    doc: IGESDocument,
    a: ReadonlyVec,
    b: ReadonlyVec,
    opts?: Partial<EntityOpts>
) =>
    addEntity(
        doc,
        EntityType.LINE,
        null,
        [
            [a[0], Type.FLOAT],
            [a[1], Type.FLOAT],
            [a[2] || 0, Type.FLOAT],
            [b[0], Type.FLOAT],
            [b[1], Type.FLOAT],
            [b[2] || 0, Type.FLOAT],
        ],
        opts
    );

export const addBooleanTree = (
    doc: IGESDocument,
    tree: BooleanTree,
    opts?: Partial<EntityOpts>
) => {
    const params = postOrder([], tree);
    return addEntity(
        doc,
        EntityType.BOOLEAN_TREE,
        null,
        [[params.length, Type.INT], ...params],
        opts
    );
};

const postOrder = (acc: Param[], tree: BooleanNode) => {
    if (isArray(tree)) {
        postOrder(acc, tree[1]);
        postOrder(acc, tree[2]);
        acc.push([tree[0], Type.INT]);
    } else {
        acc.push([tree, Type.POINTER]);
    }
    return acc;
};

export const addCSGBox = (
    doc: IGESDocument,
    pos: ReadonlyVec,
    size: ReadonlyVec,
    xaxis: ReadonlyVec = [1, 0, 0],
    zaxis: ReadonlyVec = [0, 0, 1],
    opts?: Partial<EntityOpts>
) =>
    addEntity(
        doc,
        EntityType.CSG_BOX,
        null,
        [
            [size[0], Type.FLOAT],
            [size[1], Type.FLOAT],
            [size[2], Type.FLOAT],
            [pos[0], Type.FLOAT],
            [pos[1], Type.FLOAT],
            [pos[2], Type.FLOAT],
            [xaxis[0], Type.FLOAT],
            [xaxis[1], Type.FLOAT],
            [xaxis[2], Type.FLOAT],
            [zaxis[0], Type.FLOAT],
            [zaxis[1], Type.FLOAT],
            [zaxis[2], Type.FLOAT],
        ],
        opts
    );

export const addCSGCylinder = (
    doc: IGESDocument,
    pos: ReadonlyVec,
    normal: ReadonlyVec,
    radius: ReadonlyVec,
    height: ReadonlyVec,
    opts?: Partial<EntityOpts>
) =>
    addEntity(
        doc,
        EntityType.CSG_CYLINDER,
        null,
        [
            [pos[0], Type.FLOAT],
            [pos[1], Type.FLOAT],
            [pos[2], Type.FLOAT],
            [normal[0], Type.FLOAT],
            [normal[1], Type.FLOAT],
            [normal[2], Type.FLOAT],
            [radius, Type.FLOAT],
            [height, Type.FLOAT],
        ],
        opts
    );

// sec 4.23, page 123 (type 126)
// export const addNurbsCurve2d = (doc: IGESDocument, degree: number, pts: number[][], closed = false) => {
//     doc; degree; pts; closed;
// };

export * from "./api";
