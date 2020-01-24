# 2. Component configuration

- **Date:** 2018-05-04
- **Revised:** 2018-05-07

## Status

WIP

Amended by [3. Component configuration via context](0003-component-configuration-via-context.md)

## Context

The components provided by this package SHOULD primarily be designed
with the following aims:

### Stateless

@thi.ng/hdom provides no guidance or opinion about how component state
should be handled. However, stateless components are generally more
reusable (same component function can be used multiple times) and easier
to test and reason about.

### Composable

The components provided by this package are often meant to be used as
building blocks for larger, more complex components. This often requires
extensive configuration points.

### Configurable

Components should be designed such that both their behavior and styling
can be configured as much as possible/feasible. At the same time, this
flexibility SHOULD NOT have too great an impact on user code.
Furthermore, the configuration process SHOULD be as uniform as possible
for all provided components.

### Unstyled, but skinnable & themable

The last point deals with the multi-step process and separation of:

1) configuring a raw component using a specific set of behavioral &
   aesthetic rules (usually via some form of CSS framework) and
2) application or instance specific theming as an additional
   customization step

Neither of these steps SHOULD be in direct scope of the
@thi.ng/hdom-components package, but the raw components themselves MUST
support these use cases for practical, real world usage.

It also worth pointing out that skinning and theming MIGHT not always be
separate steps and will be specific to the CSS framework used at
runtime.

## Decision

Define all suitable components in a way which enables this uniform
workflow:

### Raw component with configuration options

Where required, components SHOULD be pre-configured via an higher order
function accepting a configuration object with component-specific
options.

Whenever possible, the component SHOULD only require partial options and
merge them with its own defaults. Each option MUST be documented using
JSDoc comments. Likewise the HOF component function MUST be documented,
specifically to explain which runtime arguments are expected/accepted by
the returned function.

#### Runtime argument handling

If there are more than 2 runtime args and / or the majority of them is
optional, the returned component function SHOULD accept those args as
options object.

If the component can take child elements as arguments, these SHOULD be
accepted as varargs and NOT as part of the options object.

#### Example component

The following example button component demonstates these approaches.
Btw. It's the actual implementation of the [hdom-components button
component](../src/button.ts).

```ts
// button.ts
import { IObjectOf } from "@thi.ng/api";

export interface ButtonOpts {
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
     * Attribute object to use for enabled buttons.
     * Default: none
     */
    attribs: any;
    /**
     * Attribute object to use for disabled buttons.
     * Default: none
     */
    attribsDisabled: any;
    /**
     * Flag to indicate if user supplied `onclick` handler
     * should be wrapped in a function which automatically
     * calls `preventDefault()`.
     * Default: true
     */
    preventDefault: boolean;
}

export interface ButtonArgs {
    attribs: IObjectOf<any>;
    onclick: EventListener;
    disabled: boolean;
}

/**
 * Higher order function to create a new stateless button component,
 * pre-configured via user supplied options. The returned component
 * function accepts the following arguments:
 *
 * - hdom context object (unused)
 * - partial `ButtonArgs` object (extra attribs, onclick, disabled)
 * - body content (varargs)
 *
 * Any `attribs` provided as arg via `ButtonArgs` are merged with the
 * default options provided to the HOF. The `disabled` arg decides which
 * button version to create. The button can have any number of body
 * elements (e.g. icon and label), given as varargs.
 */
export const button = (opts?: Partial<ButtonOpts>) => {
    // init with defaults
    opts = {
        tag: "a",
        tagDisabled: "span",
        preventDefault: true,
        attribs: {},
        ...opts
    };
    !opts.attribs.role && (opts.attribs.role = "button");
    return (_: any, args: Partial<ButtonArgs>, ...body: any[]) =>
        args.disabled ?
            [opts.tagDisabled, {
                ...opts.attribsDisabled,
                ...args.attribs,
                disabled: true,
            }, ...body] :
            [opts.tag, {
                ...opts.attribs,
                ...args.attribs,
                onclick: opts.preventDefault ?
                    (e) => (e.preventDefault(), args.onclick(e)) :
                    args.onclick
            }, ...body];
};
```

### Create pre-configured components

To use the raw component, instantiate it via supplied options. Since the
component is stateless, the same instance can be used multiple times
from user code. Furthermore, this approach enables the publication of
dedicated packages, providing pre-defined, themed components, ready to
use without further pre-configuration.

In this example, we use [Tachyons](https://tachyons.io) CSS classes to
provide themed versions of the above raw button component. However, a
more "traditional" approach could inject CSS rules via the `style`
attribute. Also see
[@thi.ng/hiccup-css](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-css)
for this purpose.

```ts
// themed-button.ts
import { button as rawButton } from "./button";

// predefine skinned buttons
// here using Tachyons CSS classes as example
export const primaryButton = rawButton({
    attribs: {
        class: "dib ph3 pv2 mb2 mr2 br-pill link bg-blue hover-bg-black bg-animate white",
        href: "#"
    },
    attribsDisabled: {
        class: "dib ph3 pv2 mb2 mr2 br-pill bg-gray white"
    }
});

export const button = rawButton({
    attribs: {
        class: "dib ph3 pv2 mb2 mr2 link dim br2 ba blue",
        href: "#",
    },
    attribsDisabled: {
        class: "dib ph3 pv2 mb2 mr2 br2 ba gray"
    }
});
```

### Usage & composition

User code just needs to import pre-configured components and can further
customize them, e.g. to create an icon button (here using [Font
Awesome](https://fontawesome.com)).

```ts
// user.ts
import { start } from "@thi.ng/hdom";
import { button, primaryButton } from "./themed-button";

// derive icon buttons only accepting custom event handler arg
const confirmButton = (_, onclick) =>
    [primaryButton, { onclick }, ["i.fas.fa-check.mr2"], "Confirm"];

const cancelButton = (_, onclick) =>
    [button, { onclick }, ["i.fas.fa-times.mr2"], "Cancel"];

start("app",
    ["div",
        [primaryButton, { onclick: () => alert("bt1") }, "bt1"],
        [primaryButton, { onclick: () => alert("bt3"), disabled: true }, "bt2"],
        [button, { onclick: () => alert("bt3") }, "bt3"],
        [button, { onclick: () => alert("bt4"), disabled: true }, "bt4"],
        // icon buttons
        [confirmButton, () => alert("confirm")],
        [cancelButton, () => alert("cancel")],
    ]
);
```

## Consequences

Following the approach described above provides users with a predictable
workflow to integrate components into their projects and should also
provide sufficient flexibility in terms of customizing both behaviors
and the look and feel of the provided raw components.

## Discussion

Please use [#18](https://github.com/thi-ng/umbrella/issues/18) to
discuss any aspect of this ADR.
