import type { Fn, Fn2 } from "@thi.ng/api";
import { peek } from "@thi.ng/arrays/peek";
import type { ResultBody } from "@thi.ng/fsm";
import { alts } from "@thi.ng/fsm/alts";
import { fsm } from "@thi.ng/fsm/fsm";
import { not } from "@thi.ng/fsm/not";
import { whitespace } from "@thi.ng/fsm/range";
import { repeat } from "@thi.ng/fsm/repeat";
import { seq } from "@thi.ng/fsm/seq";
import { str } from "@thi.ng/fsm/str";
import { untilStr } from "@thi.ng/fsm/until";
import { comp } from "@thi.ng/transducers/comp";
import { filter } from "@thi.ng/transducers/filter";
import type { TagFactories } from "./api";

type ParseResult = ResultBody<any[]>;

/**
 * Parser state IDs
 */
const enum State {
    BLOCKQUOTE,
    CODE,
    CODEBLOCK,
    EMPHASIS,
    END_BLOCKQUOTE,
    END_LI,
    END_PARA,
    END_HEADING,
    END_TABLE,
    HEADING,
    IMG,
    LINK,
    LI,
    PARA,
    START,
    START_CODEBLOCK,
    STRIKE,
    STRONG,
    TABLE,
}

/**
 * Parser context / state
 */
interface FSMCtx {
    stack: any[];
    container?: any[];
    children?: any[];
    body?: string;
    title?: string;
    href?: string;
    lang?: string;
    hd?: number;
}

/**
 * Default hiccup element factories
 */
const DEFAULT_TAGS: TagFactories = {
    blockquote: (xs) => ["blockquote", {}, ...xs],
    code: (body) => ["code", {}, body],
    codeblock: (lang, body) => ["pre", { lang }, body],
    em: (body) => ["em", {}, body],
    heading: (level, xs) => [level < 7 ? `h${level}` : "p", {}, ...xs],
    hr: () => ["hr", {}],
    img: (src, alt) => ["img", { src, alt }],
    li: (xs: any[]) => ["li", {}, ...xs],
    link: (href, body) => ["a", { href }, body],
    list: (type, xs) => [type, {}, ...xs],
    paragraph: (xs) => ["p", {}, ...xs],
    strong: (body) => ["strong", {}, body],
    strike: (body) => ["del", {}, body],
    table: (rows) => ["table", {}, ["tbody", {}, ...rows]],
    td: (_, xs) => ["td", {}, ...xs],
    tr: (_, xs) => ["tr", {}, ...xs],
};

const BQUOTE = ">";
const CODE = "`";
const CODEBLOCK = "```";
const CODEBLOCK_END = "\n```\n";
const EM = "_";
const HD = "#";
const HR = "-";
const IMG = "![";
const LI = "- ";
const LINK_LABEL = "[";
const LINK_LABEL_END = "]";
const LINK_HREF = "(";
const LINK_HREF_END = ")";
const NL = "\n";
const STRIKE = "~~";
const STRONG = "**";
const TD = "|";

// state / context handling helpers

const transition = (ctx: FSMCtx, id: State): ParseResult => {
    ctx.children = [];
    ctx.body = "";
    return [id];
};

const push =
    (id: State, next: State) =>
    (ctx: FSMCtx): ParseResult => {
        ctx.stack.push({ id, children: ctx.children!.concat(ctx.body) });
        return transition(ctx, next);
    };

const pop =
    (result: Fn2<FSMCtx, string, any>) =>
    (ctx: FSMCtx, body: any): ParseResult => {
        const { id, children } = ctx.stack.pop();
        children.push(result(ctx, body));
        ctx.children = children;
        ctx.body = "";
        return [id];
    };

const collectChildren = (ctx: FSMCtx) => (
    ctx.children!.push(ctx.body), ctx.children!
);

const collect =
    (id: State) =>
    (ctx: FSMCtx, buf: string[]): ParseResult => {
        ctx.body += buf.join("");
        return [id];
    };

const collectHeading =
    (tag: Fn2<number, any[], any[]>) =>
    (ctx: FSMCtx): ParseResult =>
        [State.START, [tag(ctx.hd!, collectChildren(ctx))]];

const collectAndRestart =
    (tag: (xs: any[]) => any[]) =>
    (ctx: FSMCtx): ParseResult =>
        [State.START, [tag(collectChildren(ctx))]];

const collectBlockQuote = (ctx: FSMCtx): ParseResult => (
    ctx.children!.push(ctx.body, ["br", {}]),
    (ctx.body = ""),
    [State.BLOCKQUOTE]
);

const collectCodeBlock =
    (tag: Fn2<string, string, any[]>) =>
    (ctx: FSMCtx, body: string): ParseResult =>
        [State.START, [tag(ctx.lang!, body)]];

const collectLi = (ctx: FSMCtx, tag: Fn<any[], any[]>) =>
    ctx.container!.push(tag(collectChildren(ctx)));

const collectList =
    (type: string, list: Fn2<string, any[], any[]>, item: Fn<any[], any[]>) =>
    (ctx: FSMCtx): ParseResult => {
        collectLi(ctx, item);
        return [State.START, [list(type, ctx.container!)]];
    };

const collectTD = (tag: Fn2<number, any[], any[]>) => (ctx: FSMCtx) => {
    ctx.children!.push(ctx.body);
    ctx.container!.push(tag(peek(ctx.stack).container.length, ctx.children!));
    return transition(ctx, State.TABLE);
};

const collectTR = (tag: Fn2<number, any[], any[]>) => (ctx: FSMCtx) => {
    const rows = peek(ctx.stack).container;
    rows.push(tag(rows.length, ctx.container!));
    ctx.container = [];
    return transition(ctx, State.END_TABLE);
};

const collectTable =
    (tag: Fn<any[], any[]>) =>
    (ctx: FSMCtx): ParseResult => {
        const rows = ctx.stack.pop().container;
        rows.splice(1, 1);
        return [State.START, [tag(rows)]];
    };

const collectInline = (fn: Fn<string, any[]>) =>
    pop((ctx, body: string) => fn(ctx.body + body.trim()));

const heading = (ctx: FSMCtx, body: string[]): ParseResult => (
    (ctx.hd = body.length), transition(ctx, State.HEADING)
);

const matchInline = (id: State) => [
    str("![", push(id, State.IMG)),
    str(LINK_LABEL, push(id, State.LINK)),
    str(STRIKE, push(id, State.STRIKE)),
    str(STRONG, push(id, State.STRONG)),
    str(EM, push(id, State.EMPHASIS)),
    str(CODE, push(id, State.CODE)),
];

const matchLink = (result: Fn2<string, string, any[]>) =>
    seq<string, FSMCtx, any>(
        [
            untilStr(
                LINK_LABEL_END,
                (ctx, body) => ((ctx.title = body), undefined)
            ),
            str(LINK_HREF),
            untilStr(
                LINK_HREF_END,
                (ctx, body) => ((ctx.href = body), undefined)
            ),
        ],
        pop((ctx: FSMCtx) => result(ctx.href!, ctx.title!))
    );

const matchPara = (id: State, next: State) =>
    alts<string, FSMCtx, any>(
        [
            ...matchInline(id),
            str(NL, (ctx: FSMCtx) => ((ctx.body += " "), [next])),
        ],
        collect(id)
    );

const newPara = (ctx: FSMCtx, buf: string[]): ParseResult => (
    (ctx.body = buf.join("")), (ctx.children = []), [State.PARA]
);

const newParaInline =
    (next: State) =>
    (ctx: FSMCtx): ParseResult => {
        ctx.stack.push({ id: State.PARA, children: [] });
        return transition(ctx, next);
    };

const newParaCode = (ctx: FSMCtx, x: string[]): ParseResult => (
    (ctx.body = x[1]),
    ctx.stack.push({ id: State.PARA, children: [] }),
    [State.CODE]
);

const newList = (ctx: FSMCtx): ParseResult => (
    (ctx.container = []), transition(ctx, State.LI)
);

const newTable = (ctx: FSMCtx) => (
    ctx.stack.push({ id: State.TABLE, container: [] }),
    (ctx.container = []),
    transition(ctx, State.TABLE)
);

/**
 * Main parser / transducer. Defines state map with the various Markdown
 * syntax matchers and state transition handlers. The returned parser
 * itself is only used in `index.ts`.
 */
export const parse = (_tags?: Partial<TagFactories>) => {
    const tags = <TagFactories>{ ...DEFAULT_TAGS, ..._tags };
    return comp(
        filter((x) => x !== "\r"),
        fsm<string, FSMCtx, any[]>(
            {
                [State.START]: alts(
                    [
                        whitespace(() => [State.START]),
                        repeat(str(HD), 1, Infinity, heading),
                        str(BQUOTE, (ctx) => transition(ctx, State.BLOCKQUOTE)),
                        str(LI, newList),
                        alts(
                            [
                                seq([str(CODE), not(str(CODE))], newParaCode),
                                str(CODEBLOCK, () => [State.START_CODEBLOCK]),
                            ],
                            undefined,
                            (_, next) => next
                        ),
                        seq([repeat(str(HR), 3, Infinity), str(NL)], () => [
                            State.START,
                            [tags.hr()],
                        ]),
                        str(IMG, newParaInline(State.IMG)),
                        str(LINK_LABEL, newParaInline(State.LINK)),
                        str(STRONG, newParaInline(State.STRONG)),
                        str(STRIKE, newParaInline(State.STRIKE)),
                        str(EM, newParaInline(State.EMPHASIS)),
                        str(TD, newTable),
                    ],
                    newPara
                ),

                [State.PARA]: matchPara(State.PARA, State.END_PARA),

                [State.END_PARA]: alts(
                    [
                        ...matchInline(State.PARA),
                        str(NL, collectAndRestart(tags.paragraph)),
                    ],
                    collect(State.PARA)
                ),

                [State.BLOCKQUOTE]: matchPara(
                    State.BLOCKQUOTE,
                    State.END_BLOCKQUOTE
                ),

                [State.END_BLOCKQUOTE]: alts(
                    [
                        ...matchInline(State.BLOCKQUOTE),
                        str(BQUOTE, collectBlockQuote),
                        str(NL, collectAndRestart(tags.blockquote)),
                    ],
                    collect(State.BLOCKQUOTE)
                ),

                [State.HEADING]: matchPara(State.HEADING, State.END_HEADING),

                [State.END_HEADING]: alts(
                    [
                        ...matchInline(State.HEADING),
                        str(NL, collectHeading(tags.heading)),
                    ],
                    collect(State.HEADING)
                ),

                [State.START_CODEBLOCK]: untilStr(
                    NL,
                    (ctx, lang) => ((ctx.lang = lang), [State.CODEBLOCK])
                ),

                [State.CODEBLOCK]: untilStr(
                    CODEBLOCK_END,
                    collectCodeBlock(tags.codeblock)
                ),

                [State.LI]: matchPara(State.LI, State.END_LI),

                [State.END_LI]: alts(
                    [
                        str(NL, collectList("ul", tags.list, tags.li)),
                        str(
                            LI,
                            (ctx) => (
                                collectLi(ctx, tags.li),
                                transition(ctx, State.LI)
                            )
                        ),
                    ],
                    collect(State.LI)
                ),

                [State.LINK]: matchLink(tags.link),

                [State.IMG]: matchLink(tags.img),

                [State.STRONG]: untilStr(STRONG, collectInline(tags.strong)),

                [State.STRIKE]: untilStr(STRIKE, collectInline(tags.strike)),

                [State.EMPHASIS]: untilStr(EM, collectInline(tags.em)),

                [State.CODE]: untilStr(CODE, collectInline(tags.code)),

                [State.TABLE]: alts(
                    [
                        ...matchInline(State.TABLE),
                        str(TD, collectTD(tags.td)),
                        str(NL, collectTR(tags.tr)),
                    ],
                    collect(State.TABLE)
                ),

                [State.END_TABLE]: alts([
                    str(NL, collectTable(tags.table)),
                    str(TD, () => [State.TABLE]),
                ]),
            },
            { stack: [] },
            State.START
        )
    );
};
