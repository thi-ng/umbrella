# 2. Component configuration

Date: 2018-05-04

## Status

WIP

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

```ts
// button.ts
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

/**
 * Higher order function to create a new stateless button component,
 * pre-configured via user supplied options. The returned component
 * function accepts the following arguments:
 *
 * - hdom context object (unused)
 * - extra attribute object
 * - onclick event listener
 * - body content
 * - disabled flag (default: false)
 *
 * The `attribs` provided as arg are merged with the default options
 * provided to HOF. The `disabled` arg decides which button version
 * to create.
 */
export const button = (opts: Partial<ButtonOpts>) => {
    // init with defaults
    opts = {
        tag: "a",
        tagDisabled: "span",
        preventDefault: true,
        ...opts
    };
    // return component function as closure
    return (_, attribs, onclick, body, disabled) =>
        disabled ?
            [opts.tagDisabled, {
                ...opts.attribsDisabled,
                ...attribs,
                disabled: true,
            }, body] :
            [opts.tag, {
                ...opts.attribs,
                ...attribs,
                onclick: opts.preventDefault ?
                    (e) => (e.preventDefault(), onclick(e)) :
                    onclick
            }, body];
};
```

### Create pre-configured components

To use the raw component, instantiate it via supplied options. Since the
component is stateless, the same instance can be used multiple times
from user code. Furthermore, this approach enables the publication of
dedicated packages providing pre-defined, themed components, which are
ready to use without further pre-configuration.

In this example, we use [Tachyons](https://tachyons.io) CSS classes to
provide themed versions of the above raw button component. However, a
more "traditional" approach could inject CSS rules via the `style`
attribute. Also see
[@thi.ng/hiccup-css](https://github.com/thi-ng/umbrella/tree/master/packages/hiccup-css)
for this purpose.

```ts
// themed-button.ts
import { button as rawButton } from "./button";

// predefine skinned buttons
// here using Tachyons CSS classes as example
export const primaryButton = rawButton({
    attribs: {
        class: "dib pa2 mb2 mr2 br2 link bg-blue hover-bg-black bg-animate white",
        role: "button",
        href: "#"
    },
    attribsDisabled: {
        class: "dib pa2 mb2 mr2 br2 bg-gray pa2 white"
    }
});

export const button = rawButton({
    attribs: {
        class: "dib pa2 mb2 mr2 link dim br2 ba blue",
        role: "button",
        href: "#",
    },
    attribsDisabled: {
        class: "dib pa2 mb2 mr2 br2 ba gray"
    }
});
```

```ts
// user.ts
import { start } from "@thi.ng/hdom";
import { button, primaryButton } from "./themed-button";

start("app",
    ["div",
        [primaryButton, {}, ()=> alert("bt1"), "bt1"],
        [primaryButton, {}, ()=> alert("bt3"), "bt2", true],
        [button, {}, ()=> alert("bt3"), "bt3"],
        [button, {}, ()=> alert("bt4"), "bt4", true]
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
