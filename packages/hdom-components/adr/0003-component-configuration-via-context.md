# 3. Component configuration via context

Date: 2018-05-09

## Status

WIP

Amends [ADR-0002](0002-component-configuration.md)

## Context

An alternative configuration procedure to ADR-0002, possibly better
suited for dynamic theming, theme changes and separating the component
configuration between behavioral and stylistic aspects. This new
approach utilizes the hdom context object to retrieve theme attributes,
whereas the previous solution ignored the context object entirely.

A live demo of the code discussed here is available at:

[demo.thi.ng/umbrella/hdom-theme-adr-0003](https://demo.thi.ng/umbrella/hdom-theme-adr-0003)

## Decision

### Split component configuration

#### Behavioral aspects

Component pre-configuration options SHOULD purely consist of behavioral
settings and NOT include any aesthetic / theme oriented options. To
better express this intention, it's recommended to suffix these
interface names with `Behavior`, e.g. `ButtonBehavior`.

```ts
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
```

#### Theme stored in hdom context

Even though there's work underway to develop a flexble theming system
for hdom components, the components themselves SHOULD be agnostic to
this and only expect to somehow obtain styling attributes from the hdom
context object passed to each component function. How is shown further
below.

In this example we define a `theme` key in the context object, under
which theme options for all participating components are stored.

```ts
const ctx = {
    ...
    theme: {
        primaryButton: {
            default: { class: ... },
            disabled: { class: ... },
            selected: { class: ... },
        },
        secondaryButton: {
            default: { class: ... },
            disabled: { class: ... },
            selected: { class: ... },
        },
        ...
    }
};
```

### Component definition

```ts
import { getIn, Path } from "@thi.ng/paths";

/**
 * Instance specific runtime args. All optional.
 */
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
        ...behavior
    };
    behavior.attribs = { href: "#", role: "button", ...behavior.attribs };
    // return component function as closure
    return (ctx: any, args: Partial<ButtonArgs>, ...body: any[]) => {
        // lookup component theme config in context
        const theme = getIn(ctx, themeCtxPath);
        if (args.disabled) {
            return [behavior.tagDisabled, {
                ...behavior.attribs,
                ...theme.disabled,
                ...args,
            }, ...body];
        } else {
            const attribs = {
                ...behavior.attribs,
                ...theme[args.selected ? "selected" : "default"],
                ...args
            };
            if (args && args.onclick && (args.href == null || args.href === "#")) {
                attribs.onclick = (e) => (e.preventDefault(), args.onclick(e));
            }
            return [behavior.tag, attribs, ...body];
        }
    };
};
```

### Component usage

```ts
const darkTheme = {
    id: "dark",
    body: {
        class: "vh-100 bg-black moon-gray pa3 sans-serif"
    },
    link: {
        class: "link dim b light-silver"
    },
    button: {
        default: {
            class: "dib link mr2 ph3 pv2 blue hover-lightest-blue hover-b--current br3 ba b--blue"
        },
        selected: {
            class: "dib link mr2 ph3 pv2 red hover-gold hover-b--current br3 ba b--red"
        },
        disabled: {
            class: "dib mr2 ph3 pv2 mid-gray br3 ba b--mid-gray"
        }
    }
};

const bt = button("theme.button");
const btFixed = button("theme.button", { attribs: { style: { width: "8rem" } } });

const app = (ctx) =>
    ["div", ctx.theme.body,
        [bt, { onclick: () => alert("toggle") }, "Toggle"],
        [bt, { href: "https://github.com/thi-ng/umbrella" }, "External"],
        [btFixed, { onclick: () => alert("hi"), selected: true }, "Selected"],
        [btFixed, { disabled: true }, "Disabled"] ];

// start app with theme in context
start("app", app, { theme: darkTheme })
```

## Consequences

Consequences here...
