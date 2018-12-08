export const link =
    (ctx, href, body?) =>
        ["a", { ...ctx.link, href }, body || href];

export const twitterLink =
    (_, username) =>
        [link, `https://twitter.com/${username}`, "@" + username];

export const navButton =
    (ctx, step) =>
        ["a", {
            ...ctx.navButton[step < 0 ? "prev" : "next"],
            onclick: () => ctx.slide.next(step)
        }, step < 0 ? "<" : ">"];

export const footer =
    (ctx, ...body) =>
        ["footer", ctx.footer, ...body];

export const codeBlock =
    (ctx, body) =>
        ["pre", ctx.code, body.trim()];

export const list =
    (ctx, ...items) =>
        ["ul", ctx.list, ...items.map((i) => ["li", i])];

export const titlePage =
    (ctx, clazz, title, ...body) =>
        ["div",
            {
                ...ctx.titlePage.root,
                class: `${ctx.titlePage.root.class} ${clazz}`,
            },
            ["div", ctx.titlePage.wrapper,
                ["div",
                    ["h1", ctx.titlePage.title, title],
                    ["div", ctx.titlePage.body,
                        ...body]]]];

export const contentPage =
    (ctx, title, ...body) =>
        ["div", ctx.contentPage.root,
            ["h2", ctx.contentPage.title, title],
            ["div", ctx.contentPage.body, ...body]];

export const quotePage =
    (ctx, quote, author) =>
        ["div", ctx.quotePage.root,
            ["div", ctx.quotePage.quote, ...quote.map((x) => ["div", x])],
            ["div", ctx.quotePage.author, `— ${author}`]];

export const bgImagePage =
    (ctx, clazz, src, ...extra) =>
        ["div", {
            class: `${ctx.bgImagePage.class} ${clazz}`,
            style: {
                "background-image": `url(${src})`,
                "background-size": "cover",
                "background-position": "center",
            }
        }, ...extra];

export const imagePage =
    (ctx, clazz, src) =>
        ["div", { ...ctx.imagePage.root, class: `${ctx.imagePage.root.class} ${clazz}` },
            ["div.w-100",
                ["img", { ...ctx.imagePage.img, src }]]];

export const ytVideo =
    (ctx, id) =>
        ["div",
            ["iframe", {
                ...ctx.youtube,
                src: `https://www.youtube.com/embed/${id}?rel=0&amp;showinfo=0`,
                frameborder: 0,
                allowfullscreen: true
            }],
            [navButton, -1],
            [navButton, 1],
        ];

export const app =
    (slideCount, ctx) =>
        ({ slideID, content, time }) =>
            ["div", ctx.app.root,
                content,
                [footer,
                    ["div.w-33.tl", ctx.app.credits],
                    ["div.w-34.tc", time],
                    ["div.w-33.tr", `${slideID} / ${slideCount - 1}`]]];

export const printApp =
    (ctx, slides) =>
        ["div", ...slides.map((content) => ["div.slide", ctx.app.root, content])];
