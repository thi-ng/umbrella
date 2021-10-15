import type { AppConfig } from "./api";
import { main } from "./components/main";
import { EFFECTS, EVENTS } from "./handlers";

// main App configuration
export const CONFIG: AppConfig = {
    // event handlers events are queued and batch processed in app's RAF
    // render loop event handlers can be single functions, interceptor
    // objects with `pre`/`post` keys or arrays of either.

    // the event handlers' only task is to transform the event into a
    // number of side effects. event handlers should be pure functions
    // and only side effect functions execute any "real" work.

    // Docs here:
    // https://docs.thi.ng/umbrella/interceptors/#event-bus-interceptors-side-effects

    events: EVENTS,

    // custom side effects
    effects: EFFECTS,

    // DOM root element (or ID)
    domRoot: "app",

    // root component function used by the app
    rootComponent: main,

    // initial app state
    initialState: {
        page: 0,
        pagedTriples: [],
        sort: [0, false],
    },

    // derived view declarations
    // each key specifies the name of the view and each value is
    // a state path or `[path, transformer]` tuple
    // docs here:
    // https://github.com/thi-ng/umbrella/tree/develop/packages/atom#derived-views
    // also see `app.ts` for view initialization
    views: {
        page: "page",
        pagedTriples: "pagedTriples",
        cities: "queries.cities",
        countries: "queries.countries",
        sort: "sort",
    },

    // component CSS class config using http://tachyons.io/ these
    // attribs are made available to all components and allow for easy
    // re-skinning of the whole app
    ui: {
        button: {
            class: "pointer bg-black hover-bg-blue bg-animate white pa2 mr1 w-100 ttu b tracked-tight noselect",
        },
        buttonDisabled: {
            class: "bg-gray white pa2 mr1 w-100 ttu b tracked-tight noselect",
        },
        buttongroup: { class: "flex mb2" },
        link: { class: "pointer link dim black b" },
        root: { class: "pa2 mw7-ns center f7 f6-m f5-ns" },
        table: {
            root: { class: "w-100 collapse ba br2 b--black-10 pv2 ph3" },
            head: { class: "tl pv2 ph3 bg-black white" },
            headlink: { class: "pointer white" },
            row: { class: "striped--light-gray" },
            cell: { class: "pv2 ph3" },
        },
        pager: {
            root: { class: "w-100 mt3 f7 tc" },
            prev: { class: "fl mr3" },
            next: { class: "fr ml3" },
            pages: { class: "dib" },
        },
    },

    data: {
        cities: [
            ["accra", "gh"],
            ["amsterdam", "nl"],
            ["berlin", "de"],
            ["dublin", "ie"],
            ["johannesburg", "za"],
            ["london", "uk"],
            ["new york", "us"],
            ["san francisco", "us"],
            ["são paulo", "br"],
            ["shanghai", "cn"],
            ["tokyo", "jp"],
            ["toronto", "ca"],
        ],
        countries: [
            ["au", "australia", "oceania"],
            ["br", "brasil", "south-america"],
            ["ca", "canada", "north-america"],
            ["cn", "china", "asia"],
            ["de", "germany", "europe"],
            ["gh", "ghana", "africa"],
            ["ie", "ireland", "europe"],
            ["nl", "netherlands", "europe"],
            ["jp", "japan", "asia"],
            ["za", "south africa", "africa"],
            ["nz", "new zealand", "oceania"],
            ["us", "united states", "north-america"],
        ],
        regions: [
            "africa",
            "asia",
            "central-america",
            "europe",
            "middle-east",
            "north-america",
            "oceania",
            "south-america",
            "caribbean",
        ],
        queries: {
            cities: {
                q: [
                    {
                        where: [
                            ["?city", "type", "city"],
                            ["?city", "locatedIn", "?cid"],
                            ["?cid", "type", "country"],
                            ["?cid", "name", "?country"],
                            ["?cid", "partOf", "?region"],
                        ],
                    },
                ],
                select: ["city", "country", "region"],
            },
            countries: {
                q: [
                    {
                        where: [
                            ["?code", "type", "country"],
                            ["?code", "partOf", "?region"],
                            ["?region", "type", "region"],
                        ],
                    },
                ],
            },
        },
    },
};
