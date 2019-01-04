import { alts } from "@thi.ng/fsm/alts";
import { ResultBody } from "@thi.ng/fsm/api";
import { fsm } from "@thi.ng/fsm/fsm";
import { not } from "@thi.ng/fsm/not";
import { whitespace } from "@thi.ng/fsm/range";
import { repeat } from "@thi.ng/fsm/repeat";
import { seq } from "@thi.ng/fsm/seq";
import { str } from "@thi.ng/fsm/str";
import { until } from "@thi.ng/fsm/until";
import { peek } from "@thi.ng/transducers/func/peek";

// parse state IDs
// TODO use const enum once moved to own package
const BLOCKQUOTE = "blockquote";
const CODE = "code";
const CODEBLOCK = "codeblock";
const EMPHASIS = "em";
const END_BLOCKQUOTE = "end-blockquote";
const END_LI = "end-li";
const END_PARA = "end-para";
const END_TITLE = "end-title";
const END_TABLE = "end-table";
const IMG = "img";
const LINK = "link";
const LI = "li";
const PARA = "para";
const START = "start";
const START_CODEBLOCK = "start-codeblock";
const TABLE = "table";
const STRIKE = "strike";
const STRONG = "strong";
const TITLE = "title";

// parse context
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

// hiccup element factories
export interface TagFactories {
    blockquote(...children: any[]): any[];
    code(body: string): any[];
    codeblock(lang: string, body: string): any[];
    em(body: string): any[];
    img(src: string, alt: string): any[];
    link(href: string, body: string): any[];
    list(type: string, items: any[]): any[];
    li(children: any[]): any[];
    paragraph(children: any[]): any[];
    strong(body: string): any[];
    strike(body: string): any[];
    title(level, children: any[]): any[];
    table(rows: any[]): any[];
    tr(i: number, cells: any[]): any[];
    td(i: number, children: any[]): any[];
    hr(): any[];
}

const DEFAULT_TAGS: TagFactories = {
    blockquote: (...xs) => ["blockquote", ...xs],
    code: (body) => ["code", body],
    codeblock: (lang, body) => ["pre", { lang }, body],
    em: (body) => ["em", body],
    img: (src, alt) => ["img", { src, alt }],
    li: (xs: any[]) => ["li", ...xs],
    link: (href, body) => ["a", { href }, body],
    list: (type, xs) => [type, ...xs],
    paragraph: (xs) => ["p", ...xs],
    strong: (body) => ["strong", body],
    strike: (body) => ["del", body],
    title: (level, xs) => [level < 7 ? `h${level}` : "p", ...xs],
    table: (rows) => ["table", ...rows],
    tr: (_, xs) => ["tr", ...xs],
    td: (_, xs) => ["td", ...xs],
    hr: () => ["hr"],
};

// state / context handling helpers

const transition =
    (ctx: FSMCtx, id: string): ResultBody<any> => (
        ctx.children = [],
        ctx.body = "",
        [id]
    );

const push =
    (id: string, next: string) =>
        (ctx: FSMCtx): ResultBody<any> => (
            ctx.stack.push({ id, children: ctx.children.concat(ctx.body) }),
            transition(ctx, next)
        );

const pop =
    (result) =>
        (ctx, body): ResultBody<any> => {
            const { id, children } = ctx.stack.pop();
            children.push(result(ctx, body));
            ctx.children = children;
            ctx.body = "";
            return [id];
        };

const collectChildren =
    (ctx: FSMCtx) => (ctx.children.push(ctx.body), ctx.children);

const collect =
    (id: string) =>
        (ctx: FSMCtx, buf: string[]): ResultBody<any> => (
            ctx.body += buf.join(""),
            [id]
        );

const collectHeading =
    (tag: (i: number, xs: any[]) => any[]) =>
        (ctx) => [START, [tag(ctx.hd, collectChildren(ctx))]];

const collectAndRestart =
    (tag: (xs: any[]) => any[]) =>
        (ctx) => [START, [tag(collectChildren(ctx))]];

const collectBlockQuote =
    (ctx) => (
        ctx.children.push(ctx.body, ["br"]),
        ctx.body = "",
        [BLOCKQUOTE]
    );

const collectCodeBlock =
    (tag: (lang: string, body: string) => any[]) =>
        (ctx, body) => [START, [tag(ctx.lang, body)]];

const collectLi =
    (ctx: FSMCtx, tag: (xs: any[]) => any[]) =>
        ctx.container.push(tag(collectChildren(ctx)));

const collectList = (
    type: string,
    list: (type: string, xs: any[]) => any[],
    item: (xs: any[]) => any[]
) =>
    (ctx) => (
        collectLi(ctx, item),
        [START, [list(type, ctx.container)]]
    );

const collectTD =
    (tag: (i: number, xs: any[]) => any[]) =>
        (ctx: FSMCtx) => (
            ctx.children.push(ctx.body),
            ctx.container.push(
                tag(peek(ctx.stack).container.length, ctx.children)
            ),
            transition(ctx, TABLE)
        );

const collectTR =
    (tag: (i: number, xs: any[]) => any[]) =>
        (ctx: FSMCtx) => {
            const rows = peek(ctx.stack).container;
            rows.push(tag(rows.length, ctx.container));
            ctx.container = [];
            return transition(ctx, END_TABLE);
        };

const collectTable =
    (tag: (xs: any[]) => any) =>
        (ctx) => [START, [tag(ctx.stack.pop().container)]];

const collectInline =
    (fn: (body: string) => any[]) =>
        pop((ctx, body: string) => fn(ctx.body + body.trim()));

const title =
    (ctx: FSMCtx, body: string[]): ResultBody<any> => (
        ctx.hd = body.length,
        transition(ctx, TITLE)
    );

const matchInline =
    (id: string) => [
        str("![", push(id, IMG)),
        str("[", push(id, LINK)),
        str("~~", push(id, STRIKE)),
        str("**", push(id, STRONG)),
        str("_", push(id, EMPHASIS)),
        str("`", push(id, CODE))
    ];

const matchLink =
    (result: (href, body) => any[]) =>
        seq<string, FSMCtx, any>(
            [
                until("]", (ctx, body) => (ctx.title = body, null)),
                str("("),
                until(")", (ctx, body) => (ctx.href = body, null)),
            ],
            pop((ctx) => result(ctx.href, ctx.title))
        );

const matchPara =
    (id: string, next: string) =>
        alts<string, FSMCtx, any>(
            [
                ...matchInline(id),
                str("\n", (ctx: FSMCtx) => (ctx.body += " ", [next])),
            ],
            collect(id),
        );

const newPara =
    (ctx: FSMCtx, buf: string[]): ResultBody<any> => (
        ctx.body = buf.join(""),
        ctx.children = [],
        [PARA]
    );

const newParaInline =
    (next: string) =>
        (ctx: FSMCtx): ResultBody<any> => (
            ctx.stack.push({ id: PARA, children: [] }),
            transition(ctx, next)
        );

const newParaCode =
    (ctx: FSMCtx, x: string[]): ResultBody<any> => (
        ctx.body = x[1],
        ctx.stack.push({ id: PARA, children: [] }),
        [CODE]
    );

const newList =
    (ctx: FSMCtx): ResultBody<any> => (
        ctx.container = [],
        transition(ctx, LI)
    );

const newTable =
    (ctx: FSMCtx) => (
        ctx.stack.push({ id: TABLE, container: [] }),
        ctx.container = [],
        transition(ctx, TABLE)
    );

/**
 * Main parser / transducer. Defines state map with the various Markdown
 * syntax matchers and state transition handlers. The returned parser
 * itself is only used in `index.ts`.
 */
export const parseMD = (tags?: Partial<TagFactories>) => {
    tags = { ...DEFAULT_TAGS, ...tags };
    return fsm<string, FSMCtx, any[]>(
        {
            [START]:
                alts(
                    [
                        whitespace(() => [START]),
                        repeat(str("#"), 1, Infinity, title),
                        str(">", (ctx) => transition(ctx, BLOCKQUOTE)),
                        str("- ", newList),
                        alts(
                            [
                                seq([str("`"), not(str("`"))], newParaCode),
                                str("```", () => [START_CODEBLOCK])
                            ],
                            null, (_, next) => next
                        ),
                        seq(
                            [repeat(str("-"), 3, Infinity), str("\n")],
                            () => [START, [tags.hr()]]
                        ),
                        str("![", newParaInline(IMG)),
                        str("[", newParaInline(LINK)),
                        str("**", newParaInline(STRONG)),
                        str("~~", newParaInline(STRIKE)),
                        str("_", newParaInline(EMPHASIS)),
                        str("|", newTable),
                    ],
                    newPara,
                ),

            [PARA]:
                matchPara(PARA, END_PARA),

            [END_PARA]:
                alts(
                    [
                        ...matchInline(PARA),
                        str("\n", collectAndRestart(tags.paragraph)),
                    ],
                    collect(PARA)
                ),

            [BLOCKQUOTE]:
                matchPara(BLOCKQUOTE, END_BLOCKQUOTE),

            [END_BLOCKQUOTE]:
                alts(
                    [
                        ...matchInline(BLOCKQUOTE),
                        str(">", collectBlockQuote),
                        str("\n", collectAndRestart(tags.blockquote)),
                    ],
                    collect(BLOCKQUOTE)
                ),

            [TITLE]:
                matchPara(TITLE, END_TITLE),

            [END_TITLE]:
                alts(
                    [
                        ...matchInline(TITLE),
                        str("\n", collectHeading(tags.title)),
                    ],
                    collect(TITLE)
                ),

            [START_CODEBLOCK]:
                until("\n", (ctx, lang) => (ctx.lang = lang, [CODEBLOCK])),

            [CODEBLOCK]:
                until("\n```\n", collectCodeBlock(tags.codeblock)),

            [LI]:
                matchPara(LI, END_LI),

            [END_LI]:
                alts(
                    [
                        str("\n", collectList("ul", tags.list, tags.li)),
                        str("- ", (ctx) => (collectLi(ctx, tags.li), transition(ctx, LI)))
                    ],
                    collect(LI)
                ),

            [LINK]:
                matchLink(tags.link),

            [IMG]:
                matchLink(tags.img),

            [STRONG]:
                until("**", collectInline(tags.strong)),

            [STRIKE]:
                until("~~", collectInline(tags.strike)),

            [EMPHASIS]:
                until("_", collectInline(tags.em)),

            [CODE]:
                until("`", collectInline(tags.code)),

            [TABLE]:
                alts(
                    [
                        ...matchInline(TABLE),
                        str("|", collectTD(tags.td)),
                        str("\n", collectTR(tags.tr))
                    ],
                    collect(TABLE)
                ),

            [END_TABLE]:
                alts(
                    [
                        str("\n", collectTable(tags.table)),
                        str("|", () => [TABLE])
                    ],
                )
        },
        {
            stack: []
        },
        START
    );
};
