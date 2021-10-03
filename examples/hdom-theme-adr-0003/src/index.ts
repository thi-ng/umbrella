import type { IObjectOf, Path } from "@thi.ng/api";
import { start } from "@thi.ng/hdom/start";
import { getInUnsafe } from "@thi.ng/paths/get-in";

interface ButtonBehavior {
    /**
     * Element name to use for enabled buttons.
     * Default: "a"
     */
    tag: string;
    /**
     * Element name to use for disabled buttons.
     * Default: "span"
     */
    tagDisabled: string;
    /**
     * Default attribs, always injected for active button states
     * and overridable at runtime.
     * Default: `{ href: "#", role: "button" }`
     */
    attribs: IObjectOf<any>;
}

interface ButtonArgs {
    /**
     * Click event handler to be wrapped with preventDefault() call
     */
    onclick: EventListener;
    /**
     * Disabled flag. Used to determine themed version.
     */
    disabled: boolean;
    /**
     * Selected flag. Used to determine themed version.
     */
    selected: boolean;
    /**
     * Link target.
     */
    href: string;
}

const button = (themeCtxPath: Path, behavior?: Partial<ButtonBehavior>) => {
    // init with defaults
    behavior = {
        tag: "a",
        tagDisabled: "span",
        ...behavior,
    };
    behavior.attribs = { href: "#", role: "button", ...behavior.attribs };
    // return component function as closure
    return (ctx: any, args: Partial<ButtonArgs>, ...body: any[]) => {
        // lookup component theme config in context
        const theme = getInUnsafe(ctx, themeCtxPath);
        if (args.disabled) {
            return [
                behavior!.tagDisabled,
                {
                    ...behavior!.attribs,
                    ...theme.disabled,
                    ...args,
                },
                ...body,
            ];
        } else {
            const attribs = {
                ...behavior!.attribs,
                ...theme[args.selected ? "selected" : "default"],
                ...args,
            };
            if (
                args &&
                args.onclick &&
                (args.href == null || args.href === "#")
            ) {
                attribs.onclick = (e: Event) => (
                    e.preventDefault(), args.onclick!(e)
                );
            }
            return [behavior!.tag, attribs, ...body];
        }
    };
};

const link = (ctx: any, href: string, body: any) => [
    "a",
    { ...ctx.theme.link, href },
    body,
];

const lightTheme = {
    id: "light",
    body: {
        class: "vh-100 bg-white dark-gray pa3 sans-serif",
    },
    link: {
        class: "link dim b black",
    },
    button: {
        default: {
            class: "dib link mr2 ph3 pv2 bg-lightest-blue blue hover-bg-blue hover-white bg-animate br-pill",
        },
        selected: {
            class: "dib link mr2 ph3 pv2 bg-gold washed-yellow hover-bg-orange hover-gold bg-animate br-pill",
        },
        disabled: {
            class: "dib mr2 ph3 pv2 bg-moon-gray gray br-pill",
        },
    },
};

const darkTheme = {
    id: "dark",
    body: {
        class: "vh-100 bg-black moon-gray pa3 sans-serif",
    },
    link: {
        class: "link dim b light-silver",
    },
    button: {
        default: {
            class: "dib link mr2 ph3 pv2 blue hover-lightest-blue hover-b--current br3 ba b--blue",
        },
        selected: {
            class: "dib link mr2 ph3 pv2 red hover-gold hover-b--current br3 ba b--red",
        },
        disabled: {
            class: "dib mr2 ph3 pv2 mid-gray br3 ba b--mid-gray",
        },
    },
};

// source: https://fontawesome.com
const icon = [
    "svg",
    {
        class: "mr1",
        width: "1rem",
        viewBox: "0 0 576 512",
        fill: "currentcolor",
    },
    [
        "path",
        {
            d: "M576 24v127.984c0 21.461-25.96 31.98-40.971 16.971l-35.707-35.709-243.523 243.523c-9.373 9.373-24.568 9.373-33.941 0l-22.627-22.627c-9.373-9.373-9.373-24.569 0-33.941L442.756 76.676l-35.703-35.705C391.982 25.9 402.656 0 424.024 0H552c13.255 0 24 10.745 24 24zM407.029 270.794l-16 16A23.999 23.999 0 0 0 384 303.765V448H64V128h264a24.003 24.003 0 0 0 16.97-7.029l16-16C376.089 89.851 365.381 64 344 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V287.764c0-21.382-25.852-32.09-40.971-16.97z",
        },
    ],
];

const ctx = { theme: darkTheme };

const toggleTheme = () => {
    ctx.theme = ctx.theme === lightTheme ? darkTheme : lightTheme;
};

const bt = button("theme.button");
const btFixed = button("theme.button", {
    attribs: { style: { width: "8rem" } },
});

const app = (ctx: any) => [
    "div",
    ctx.theme.body,
    "Current theme: ",
    ctx.theme.id,
    [
        "p",
        [bt, { onclick: toggleTheme }, "Toggle"],
        [bt, { href: "https://github.com/thi-ng/umbrella" }, icon, "External"],
        [btFixed, { onclick: () => alert("hi"), selected: true }, "Selected"],
        [btFixed, { disabled: true }, "Disabled"],
    ],
    [
        "p",
        "Please see ",
        [
            link,
            "https://github.com/thi-ng/umbrella/blob/develop/packages/hdom-components/adr/0003-component-configuration-via-context.md",
            "ADR-0003",
        ],
        " for details of this approach.",
    ],
    [
        "p",
        [
            link,
            "https://github.com/thi-ng/umbrella/blob/develop/examples/hdom-theme-adr-0003",
            "Source",
        ],
    ],
];

start(app, { ctx });
