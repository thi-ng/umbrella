export const ctx: any = {
    // place holder for slide number stream
    slide: null,

    // theme attribs for various components
    app: {
        root: { class: "w-100 vh-100 sans-serif bg-lightest-blue" },
        credits: "ClojureX 2018",
    },

    footer: { class: "fixed bottom-1 f7 gray flex w-100 ph5 noprint" },

    link: { class: "link black hover-blue" },

    navButton: {
        prev: {
            class:
                "fixed top-50 left-0 z-999 pa3 bg-black white link f3 noprint",
            href: "#",
        },
        next: {
            class:
                "fixed top-50 right-0 z-999 pa3 bg-black white link f3 noprint",
            href: "#",
        },
    },

    code: { class: "pa3 f3 bg-dark-blue white code" },

    titlePage: {
        root: { class: "flex items-center vh-100" },
        wrapper: { class: "tc w-100" },
        title: { class: "f-headline lh-title ma0" },
        body: { class: "f2 lh-copy" },
    },

    contentPage: {
        root: { class: "pa5" },
        title: { class: "ma0 f-subheadline" },
        body: { class: "mt3 f2 lh-copy" },
    },

    quotePage: {
        root: { class: "vh-100 pa5 bg-yellow" },
        quote: { class: "georgia f1 lh-copy measure-narrow i" },
        author: { class: "mt3 f2" },
    },

    bgImagePage: { class: "vh-100 pa5 f2 lh-copy" },

    imagePage: {
        root: { class: "vh-100 flex items-center tc" },
        img: {
            class: "mw-100",
            style: { "max-height": "90vh" },
        },
    },

    youtube: {
        class: "w-100 vh-100 bg-black",
    },
};
