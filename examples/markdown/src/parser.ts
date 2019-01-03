import { IObjectOf } from "@thi.ng/api";
import {
    alts,
    fsm,
    ResultBody,
    seq,
    str,
    until,
    whitespace
} from "@thi.ng/fsm";

// parse state IDs
const CODE = "code";
const CODEBLOCK = "codeblock";
const EMPHASIS = "em";
const END_LI = "end_li";
const END_PARA = "end_para";
const HD = "hd";
const IMG = "img";
const LINK = "link";
const LI = "li";
const PARA = "para";
const START = "start";
const START_CODEBLOCK = "start_codeblock";
const STRIKE = "strike";
const STRONG = "strong";

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
            return [id];
        };

const collect =
    (id: string) =>
        (ctx, buf): ResultBody<any> =>
            (ctx.body += buf.join(""), [id]);

const hd =
    (level: number) =>
        (ctx: FSMCtx): ResultBody<any> => (ctx.hd = level, [HD]);

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
    (result: (ctx: FSMCtx) => any) =>
        seq<string, FSMCtx, any>(
            [
                until("]", (ctx, body) => (ctx.title = body, null)),
                str("("),
                until(")", (ctx, body) => (ctx.href = body, null)),
            ],
            pop(result)
        );

const newPara =
    (next: string) =>
        (ctx: FSMCtx): ResultBody<any> => {
            ctx.stack.push({ id: PARA, children: [] });
            return transition(ctx, next);
        };

const newList =
    (tag: string) =>
        (ctx: FSMCtx): ResultBody<any> => {
            ctx.list = [tag];
            return transition(ctx, LI);
        };

const DEFAULT_TAGS = {
    p: (ctx) => ["p", ...ctx.children, ctx.body],
    hd: (ctx, buf) => [`h${ctx.hd}`, buf],
    pre: (ctx, body) => ["pre", { lang: ctx.lang }, body],
    li: (ctx) => ["li", ...ctx.children, ctx.body],
    a: (ctx) => ["a", { href: ctx.href }, ctx.title],
    img: (ctx) => ["img", { src: ctx.href, alt: ctx.title }],
    strong: (_, body) => ["strong", body],
    strike: (_, body) => ["del", body],
    em: (_, body) => ["em", body],
    code: (_, body) => ["code", body],
};

/**
 * Main parser / transducer. Defines state map with various matchers and
 * transition handlers. The returned parser itself is only used in
 * `index.ts`.
 */
export const parseMD = (tags?: IObjectOf<(ctx: FSMCtx, body?: any) => any>) => {
    tags = { ...DEFAULT_TAGS, ...tags };
    return fsm<string, FSMCtx, any[]>(
        {
            [START]:
                alts(
                    [
                        whitespace(() => [START]),
                        str("# ", hd(1)),
                        str("## ", hd(2)),
                        str("### ", hd(3)),
                        str("#### ", hd(4)),
                        str("##### ", hd(5)),
                        str("###### ", hd(6)),
                        str("- ", newList("ul")),
                        str("```", () => [START_CODEBLOCK]),
                        str("![", newPara(IMG)),
                        str("[", newPara(LINK)),
                        str("**", newPara(STRONG)),
                        str("~~", newPara(STRIKE)),
                        str("_", newPara(EMPHASIS)),
                    ],
                    (ctx, buf) => (ctx.body = buf.join(""), ctx.children = [], [PARA]),
                ),

            [PARA]:
                alts(
                    [
                        ...inline(PARA),
                        str("\n", (ctx) => (ctx.body += " ", [END_PARA])),
                    ],
                    collect(PARA),
                ),

            [END_PARA]:
                alts(
                    [
                        ...inline(PARA),
                        str("\n", (ctx) => [START, [tags.p(ctx)]]),
                    ],
                    collect(PARA)
                ),

            [HD]:
                until("\n\n", (ctx, buf) => [START, [tags.hd(ctx, buf)]]),

            [START_CODEBLOCK]:
                until("\n", (ctx, lang) => (ctx.lang = lang, [CODEBLOCK])),

            [CODEBLOCK]:
                until(
                    "\n```\n",
                    (ctx, body) => [START, [tags.pre(ctx, body)]]
                ),

            [LI]:
                alts(
                    [
                        ...inline(LI),
                        str("\n", (ctx) => (ctx.list.push(tags.li(ctx)), [END_LI])),
                    ],
                    collect(LI)
                ),

            [END_LI]:
                alts([
                    str("\n", (ctx) => [START, [ctx.list]]),
                    str("- ", (ctx) => transition(ctx, LI))
                ]),

            [LINK]:
                link(tags.a),

            [IMG]:
                link(tags.img),

            [STRONG]:
                until("**", pop(tags.strong)),

            [STRIKE]:
                until("~~", pop(tags.strike)),

            [EMPHASIS]:
                until("_", pop(tags.em)),

            [CODE]:
                until("`", pop(tags.code)),
        },
        {
            stack: []
        },
        START
    );
};
