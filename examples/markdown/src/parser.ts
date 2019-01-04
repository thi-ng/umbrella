import { alts } from "@thi.ng/fsm/alts";
import { ResultBody } from "@thi.ng/fsm/api";
import { fsm } from "@thi.ng/fsm/fsm";
import { not } from "@thi.ng/fsm/not";
import { whitespace } from "@thi.ng/fsm/range";
import { repeat } from "@thi.ng/fsm/repeat";
import { seq } from "@thi.ng/fsm/seq";
import { str } from "@thi.ng/fsm/str";
import { until } from "@thi.ng/fsm/until";

// parse state IDs
const BLOCKQUOTE = "blockquote";
const CODE = "code";
const CODEBLOCK = "codeblock";
const EMPHASIS = "em";
const END_BLOCKQUOTE = "end-blockquote";
const END_LI = "end-li";
const END_PARA = "end-para";
const END_TITLE = "end-title";
const IMG = "img";
const LINK = "link";
const LI = "li";
const PARA = "para";
const START = "start";
const START_CODEBLOCK = "start-codeblock";
const STRIKE = "strike";
const STRONG = "strong";
const TITLE = "title";

// hiccup element factories
export interface TagFactories {
    blockquote(...children: any[]): any[];
    code(body: string): any[];
    codeblock(lang: string, body: string): any[];
    em(body: string): any[];
    img(src: string, alt: string): any[];
    link(href: string, body: string): any[];
    list(type: string): any[];
    li(...children: any[]): any[];
    paragraph(...children: any[]): any[];
    strong(body: string): any[];
    strike(body: string): any[];
    title(level, ...children: any[]): any[];
}

// parse context
interface FSMCtx {
    stack: any[];
    list?: any[];
    children?: any[];
    body?: string;
    title?: string;
    href?: string;
    lang?: string;
    hd?: number;
}

// state / context handling helpers

const transition =
    (ctx: FSMCtx, id: string): ResultBody<any> =>
        (ctx.children = [], ctx.body = "", [id]);

const push =
    (curr: string, next: string) =>
        (ctx: FSMCtx): ResultBody<any> => {
            ctx.stack.push({ id: curr, children: [...ctx.children, ctx.body] });
            return transition(ctx, next);
        };

const pop =
    (result) =>
        (ctx, body): ResultBody<any> => {
            const { id, children } = ctx.stack.pop();
            children.push(result(ctx, body));
            ctx.children = children;
            ctx.body = "";
            return [id];
        };

const collect =
    (id: string) =>
        (ctx, buf): ResultBody<any> =>
            (ctx.body += buf.join(""), [id]);

const collectList =
    (ctx: FSMCtx, tag: (...xs: any[]) => any[]) =>
        ctx.list.push(tag(...ctx.children, ctx.body));

const resultBody =
    (fn: (body: string) => any[]) =>
        (ctx, body: string) => fn(ctx.body + body.trim());

const title =
    (ctx: FSMCtx, body: string[]): ResultBody<any> =>
        (ctx.hd = body.length, transition(ctx, TITLE));

const inline =
    (id: string) => [
        str("![", push(id, IMG)),
        str("[", push(id, LINK)),
        str("~~", push(id, STRIKE)),
        str("**", push(id, STRONG)),
        str("_", push(id, EMPHASIS)),
        str("`", push(id, CODE))
    ];

const link =
    (result: (href, body) => any[]) =>
        seq<string, FSMCtx, any>(
            [
                until("]", (ctx, body) => (ctx.title = body, null)),
                str("("),
                until(")", (ctx, body) => (ctx.href = body, null)),
            ],
            pop((ctx) => result(ctx.href, ctx.title))
        );

const newPara =
    (next: string) =>
        (ctx: FSMCtx): ResultBody<any> => {
            ctx.stack.push({ id: PARA, children: [] });
            return transition(ctx, next);
        };

const newParaCode =
    (ctx: FSMCtx, x: string[]): ResultBody<any> => {
        ctx.body = x[1];
        ctx.stack.push({ id: PARA, children: [] });
        return [CODE];
    };

const paragraph =
    (id: string, next: string) =>
        alts(
            [
                ...inline(id),
                str("\n", (ctx: FSMCtx) => (ctx.body += " ", [next])),
            ],
            collect(id),
        );

const newList =
    (factory: (type: string) => any[], type: string) =>
        (ctx: FSMCtx): ResultBody<any> => {
            ctx.list = factory(type);
            return transition(ctx, LI);
        };

const DEFAULT_TAGS: TagFactories = {
    blockquote: (...xs) => ["blockquote", ...xs],
    code: (body) => ["code", body],
    codeblock: (lang, body) => ["pre", { lang }, body],
    em: (body) => ["em", body],
    img: (src, alt) => ["img", { src, alt }],
    li: (...xs: any[]) => ["li", ...xs],
    link: (href, body) => ["a", { href }, body],
    list: (type) => [type],
    paragraph: (...xs) => ["p", ...xs],
    strong: (body) => ["strong", body],
    strike: (body) => ["del", body],
    title: (level, ...xs) => [level < 7 ? `h${level}` : "p", ...xs],
};

/**
 * Main parser / transducer. Defines state map with various matchers and
 * transition handlers. The returned parser itself is only used in
 * `index.ts`.
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
                        str("- ", newList(tags.list, "ul")),
                        alts(
                            [
                                seq([str("`"), not(str("`"))], newParaCode),
                                str("```", () => [START_CODEBLOCK])
                            ],
                            null, (_, next) => next
                        ),
                        str("---\n", () => [START, [["hr"]]]),
                        str("![", newPara(IMG)),
                        str("[", newPara(LINK)),
                        str("**", newPara(STRONG)),
                        str("~~", newPara(STRIKE)),
                        str("_", newPara(EMPHASIS)),
                    ],
                    (ctx, buf) => (ctx.body = buf.join(""), ctx.children = [], [PARA]),
                ),

            [PARA]:
                paragraph(PARA, END_PARA),

            [END_PARA]:
                alts(
                    [
                        ...inline(PARA),
                        str("\n", (ctx) => [START, [tags.paragraph(...ctx.children, ctx.body)]]),
                    ],
                    collect(PARA)
                ),

            [BLOCKQUOTE]:
                paragraph(BLOCKQUOTE, END_BLOCKQUOTE),

            [END_BLOCKQUOTE]:
                alts(
                    [
                        ...inline(BLOCKQUOTE),
                        str(">", (ctx) => (ctx.children.push(ctx.body, ["br"]), ctx.body = "", [BLOCKQUOTE])),
                        str("\n", (ctx) => [START, [tags.blockquote(...ctx.children, ctx.body)]]),
                    ],
                    collect(BLOCKQUOTE)
                ),

            [TITLE]:
                paragraph(TITLE, END_TITLE),

            [END_TITLE]:
                alts(
                    [
                        ...inline(TITLE),
                        str("\n", (ctx) => [START, [tags.title(ctx.hd, ...ctx.children, ctx.body)]]),
                    ],
                    collect(TITLE)
                ),

            [START_CODEBLOCK]:
                until("\n", (ctx, lang) => (ctx.lang = lang, [CODEBLOCK])),

            [CODEBLOCK]:
                until(
                    "\n```\n",
                    (ctx, body) => [START, [tags.codeblock(ctx.lang, body)]]
                ),

            [LI]:
                alts(
                    [
                        ...inline(LI),
                        str("\n", () => [END_LI]),
                    ],
                    collect(LI)
                ),

            [END_LI]:
                alts(
                    [
                        str("\n", (ctx) => (collectList(ctx, tags.li), [START, [ctx.list]])),
                        str("- ", (ctx) => (collectList(ctx, tags.li), transition(ctx, LI)))
                    ],
                    (ctx, body) => (ctx.body += " " + body.join(""), [LI])
                ),

            [LINK]:
                link(tags.link),

            [IMG]:
                link(tags.img),

            [STRONG]:
                until("**", pop(resultBody(tags.strong))),

            [STRIKE]:
                until("~~", pop(resultBody(tags.strike))),

            [EMPHASIS]:
                until("_", pop(resultBody(tags.em))),

            [CODE]:
                until("`", pop(resultBody(tags.code))),
        },
        {
            stack: []
        },
        START
    );
};
