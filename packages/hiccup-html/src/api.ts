import type { Fn, IObjectOf, MaybeDeref, NumOrString } from "@thi.ng/api";

export type AttribVal<T> = MaybeDeref<T | undefined>;
export type BooleanAttrib = AttribVal<boolean>;
export type NumericAttrib = AttribVal<number>;
export type StringAttrib = AttribVal<string>;
export type MultiStringAttrib = AttribVal<string | string[]>;

export type EventAttribVal<T> =
    | Fn<T, any>
    | [Fn<T, any>, boolean | AddEventListenerOptions]
    | string;

export type EventAttribs<K extends string, T> = Record<K, EventAttribVal<T>>;

export type AnimationEventAttribs = EventAttribs<
    | "onanimationcancel"
    | "onanimationend"
    | "onanimationiteration"
    | "onanimationstart",
    AnimationEvent
>;

export type DragEventAttribs = EventAttribs<
    | "ondrag"
    | "ondragend"
    | "ondragenter"
    | "ondragexit"
    | "ondragleave"
    | "ondragover"
    | "ondragstart"
    | "ondrop",
    DragEvent
>;

export type FocusEventAttribs = EventAttribs<
    "onblur" | "onfocus" | "onfocusin" | "onfocusout",
    FocusEvent
>;

export type InputEventAttribs = EventAttribs<
    "onchange" | "oninput",
    InputEvent
>;

export type KeyboardEventAttribs = EventAttribs<
    "onkeydown" | "onkeypress" | "onkeyup",
    KeyboardEvent
>;

export type MouseEventAttribs = EventAttribs<
    | "onclick"
    | "ondblclick"
    | "oncontextmenu"
    | "onmousedown"
    | "onmouseenter"
    | "onmouseleave"
    | "onmousemove"
    | "onmouseout"
    | "onmouseover"
    | "onmouseup",
    MouseEvent
>;

export type PointerEventAttribs = EventAttribs<
    | "ongotpointercapture"
    | "onlostpointercapture"
    | "onpointercancel"
    | "onpointerdown"
    | "onpointerenter"
    | "onpointerleave"
    | "onpointermove"
    | "onpointerout"
    | "onpointerover"
    | "onpointerup",
    PointerEvent
>;

export type SelectionEventAttribs = EventAttribs<
    "onselect" | "onselectionchange" | "onselectstart",
    Event
>;

export type TouchEventAttribs = EventAttribs<
    "ontouchcancel" | "ontouchend" | "ontouchmove" | "ontouchstart",
    TouchEvent
>;

export type TransitionEventAttribs = EventAttribs<
    | "ontransitioncancel"
    | "ontransitionend"
    | "ontransitionrun"
    | "ontransitionstart",
    TransitionEvent
>;

export type WheelEventAttribs = EventAttribs<"onwheel", WheelEvent>;

export interface GlobalEventAttribs
    extends AnimationEventAttribs,
        DragEventAttribs,
        FocusEventAttribs,
        InputEventAttribs,
        KeyboardEventAttribs,
        MouseEventAttribs,
        PointerEventAttribs,
        SelectionEventAttribs,
        TouchEventAttribs,
        TransitionEventAttribs,
        WheelEventAttribs {
    onresize: EventAttribVal<UIEvent>;
    onscroll: EventAttribVal<Event>;
    onsubmit: EventAttribVal<Event>;
}

export interface MicroformatAttribs {
    itemid: StringAttrib;
    itemprop: StringAttrib;
    itemref: StringAttrib;
    itemscope: BooleanAttrib;
    itemtype: StringAttrib;
}

/**
 * RDFa attributes
 *
 * @remarks
 * - https://www.w3.org/TR/html-rdfa/
 * - https://www.w3.org/TR/rdfa-core/#rdfa-attributes
 */
export interface RDFaAttribs {
    about: StringAttrib;
    content: StringAttrib;
    datatype: StringAttrib;
    href: StringAttrib;
    inlist: BooleanAttrib;
    prefix: MultiStringAttrib;
    property: MultiStringAttrib;
    rel: MultiStringAttrib;
    resource: StringAttrib;
    rev: MultiStringAttrib;
    src: StringAttrib;
    typeof: MultiStringAttrib;
    vocab: StringAttrib;
}

export type LinkRel =
    | "alternate"
    | "author"
    | "bookmark"
    | "canonical"
    | "dns-prefetch"
    | "external"
    | "help"
    | "icon"
    | "import"
    | "license"
    | "manifest"
    | "modulepreload"
    | "next"
    | "nofollow"
    | "noopener"
    | "noreferrer"
    | "opener"
    | "pingback"
    | "preconnect"
    | "prefetch"
    | "preload"
    | "prerender"
    | "prev"
    | "search"
    | "shortlink"
    | "stylesheet"
    | "tag";

/**
 * All CSS property names for auto-completion with `style` attrib.
 *
 * @remarks
 * Scraped from: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference
 */
export type CSSProperty =
    | "align-content"
    | "align-items"
    | "align-self"
    | "all"
    | "animation"
    | "animation-delay"
    | "animation-direction"
    | "animation-duration"
    | "animation-fill-mode"
    | "animation-iteration-count"
    | "animation-name"
    | "animation-play-state"
    | "animation-timing-function"
    | "backdrop-filter"
    | "backface-visibility"
    | "background"
    | "background-attachment"
    | "background-blend-mode"
    | "background-clip"
    | "background-color"
    | "background-image"
    | "background-origin"
    | "background-position"
    | "background-repeat"
    | "background-size"
    | "block-size"
    | "border"
    | "border-block"
    | "border-block-color"
    | "border-block-end"
    | "border-block-end-color"
    | "border-block-end-style"
    | "border-block-end-width"
    | "border-block-start"
    | "border-block-start-color"
    | "border-block-start-style"
    | "border-block-start-width"
    | "border-block-style"
    | "border-block-width"
    | "border-bottom"
    | "border-bottom-color"
    | "border-bottom-left-radius"
    | "border-bottom-right-radius"
    | "border-bottom-style"
    | "border-bottom-width"
    | "border-collapse"
    | "border-color"
    | "border-end-end-radius"
    | "border-end-start-radius"
    | "border-image"
    | "border-image-outset"
    | "border-image-repeat"
    | "border-image-slice"
    | "border-image-source"
    | "border-image-width"
    | "border-inline"
    | "border-inline-color"
    | "border-inline-end"
    | "border-inline-end-color"
    | "border-inline-end-style"
    | "border-inline-end-width"
    | "border-inline-start"
    | "border-inline-start-color"
    | "border-inline-start-style"
    | "border-inline-start-width"
    | "border-inline-style"
    | "border-inline-width"
    | "border-left"
    | "border-left-color"
    | "border-left-style"
    | "border-left-width"
    | "border-radius"
    | "border-right"
    | "border-right-color"
    | "border-right-style"
    | "border-right-width"
    | "border-spacing"
    | "border-start-end-radius"
    | "border-start-start-radius"
    | "border-style"
    | "border-top"
    | "border-top-color"
    | "border-top-left-radius"
    | "border-top-right-radius"
    | "border-top-style"
    | "border-top-width"
    | "border-width"
    | "bottom"
    | "box-decoration-break"
    | "box-shadow"
    | "box-sizing"
    | "break-after"
    | "break-before"
    | "break-inside"
    | "caption-side"
    | "caret-color"
    | "clear"
    | "clip"
    | "clip-path"
    | "color"
    | "color-adjust"
    | "column-count"
    | "column-fill"
    | "column-gap"
    | "column-rule"
    | "column-rule-color"
    | "column-rule-style"
    | "column-rule-width"
    | "column-span"
    | "column-width"
    | "columns"
    | "contain"
    | "content"
    | "counter-increment"
    | "counter-reset"
    | "counter-set"
    | "cursor"
    | "direction"
    | "display"
    | "empty-cells"
    | "filter"
    | "flex"
    | "flex-basis"
    | "flex-direction"
    | "flex-flow"
    | "flex-grow"
    | "flex-shrink"
    | "flex-wrap"
    | "float"
    | "font"
    | "font-family"
    | "font-feature-settings"
    | "font-kerning"
    | "font-language-override"
    | "font-optical-sizing"
    | "font-size"
    | "font-size-adjust"
    | "font-stretch"
    | "font-style"
    | "font-synthesis"
    | "font-variant"
    | "font-variant-alternates"
    | "font-variant-caps"
    | "font-variant-east-asian"
    | "font-variant-ligatures"
    | "font-variant-numeric"
    | "font-variant-position"
    | "font-variation-settings"
    | "font-weight"
    | "gap"
    | "grid"
    | "grid-area"
    | "grid-auto-columns"
    | "grid-auto-flow"
    | "grid-auto-rows"
    | "grid-column"
    | "grid-column-end"
    | "grid-column-start"
    | "grid-gap"
    | "grid-row"
    | "grid-row-end"
    | "grid-row-start"
    | "grid-template"
    | "grid-template-areas"
    | "grid-template-columns"
    | "grid-template-rows"
    | "hanging-punctuation"
    | "height"
    | "hyphens"
    | "image-orientation"
    | "image-rendering"
    | "inline-size"
    | "inset"
    | "inset-block"
    | "inset-block-end"
    | "inset-block-start"
    | "inset-inline"
    | "inset-inline-end"
    | "inset-inline-start"
    | "isolation"
    | "justify-content"
    | "justify-items"
    | "justify-self"
    | "left"
    | "letter-spacing"
    | "line-break"
    | "line-height"
    | "list-style"
    | "list-style-image"
    | "list-style-position"
    | "list-style-type"
    | "margin"
    | "margin-block"
    | "margin-block-end"
    | "margin-block-start"
    | "margin-bottom"
    | "margin-inline"
    | "margin-inline-end"
    | "margin-inline-start"
    | "margin-left"
    | "margin-right"
    | "margin-top"
    | "mask"
    | "mask-border"
    | "mask-border-mode"
    | "mask-border-outset"
    | "mask-border-repeat"
    | "mask-border-slice"
    | "mask-border-source"
    | "mask-border-width"
    | "mask-clip"
    | "mask-composite"
    | "mask-image"
    | "mask-mode"
    | "mask-origin"
    | "mask-position"
    | "mask-repeat"
    | "mask-size"
    | "mask-type"
    | "max-block-size"
    | "max-height"
    | "max-inline-size"
    | "max-width"
    | "min-block-size"
    | "min-height"
    | "min-inline-size"
    | "min-width"
    | "mix-blend-mode"
    | "object-fit"
    | "object-position"
    | "offset"
    | "offset-anchor"
    | "offset-distance"
    | "offset-path"
    | "offset-rotate"
    | "opacity"
    | "order"
    | "orphans"
    | "outline"
    | "outline-color"
    | "outline-offset"
    | "outline-style"
    | "outline-width"
    | "overflow"
    | "overflow-anchor"
    | "overflow-block"
    | "overflow-inline"
    | "overflow-wrap"
    | "overflow-x"
    | "overflow-y"
    | "overscroll-behavior"
    | "overscroll-behavior-block"
    | "overscroll-behavior-inline"
    | "overscroll-behavior-x"
    | "overscroll-behavior-y"
    | "padding"
    | "padding-block"
    | "padding-block-end"
    | "padding-block-start"
    | "padding-bottom"
    | "padding-inline"
    | "padding-inline-end"
    | "padding-inline-start"
    | "padding-left"
    | "padding-right"
    | "padding-top"
    | "page-break-after"
    | "page-break-before"
    | "page-break-inside"
    | "paint-order"
    | "perspective"
    | "perspective-origin"
    | "place-content"
    | "place-items"
    | "place-self"
    | "pointer-events"
    | "position"
    | "quotes"
    | "resize"
    | "right"
    | "rotate"
    | "row-gap"
    | "scale"
    | "scroll-behavior"
    | "scroll-margin"
    | "scroll-margin-block"
    | "scroll-margin-block-end"
    | "scroll-margin-block-start"
    | "scroll-margin-bottom"
    | "scroll-margin-inline"
    | "scroll-margin-inline-end"
    | "scroll-margin-inline-start"
    | "scroll-margin-left"
    | "scroll-margin-right"
    | "scroll-margin-top"
    | "scroll-padding"
    | "scroll-padding-block"
    | "scroll-padding-block-end"
    | "scroll-padding-block-start"
    | "scroll-padding-bottom"
    | "scroll-padding-inline"
    | "scroll-padding-inline-end"
    | "scroll-padding-inline-start"
    | "scroll-padding-left"
    | "scroll-padding-right"
    | "scroll-padding-top"
    | "scroll-snap-align"
    | "scroll-snap-stop"
    | "scroll-snap-type"
    | "scrollbar-color"
    | "scrollbar-width"
    | "shape-image-threshold"
    | "shape-margin"
    | "shape-outside"
    | "tab-size"
    | "table-layout"
    | "text-align"
    | "text-align-last"
    | "text-combine-upright"
    | "text-decoration"
    | "text-decoration-color"
    | "text-decoration-line"
    | "text-decoration-skip-ink"
    | "text-decoration-style"
    | "text-decoration-thickness"
    | "text-emphasis"
    | "text-emphasis-color"
    | "text-emphasis-position"
    | "text-emphasis-style"
    | "text-indent"
    | "text-justify"
    | "text-orientation"
    | "text-overflow"
    | "text-rendering"
    | "text-shadow"
    | "text-transform"
    | "text-underline-offset"
    | "text-underline-position"
    | "top"
    | "touch-action"
    | "transform"
    | "transform-box"
    | "transform-origin"
    | "transform-style"
    | "transition"
    | "transition-delay"
    | "transition-duration"
    | "transition-property"
    | "transition-timing-function"
    | "translate"
    | "turn"
    | "unicode-bidi"
    | "unset"
    | "vertical-align"
    | "visibility"
    | "white-space"
    | "widows"
    | "width"
    | "will-change"
    | "word-break"
    | "word-spacing"
    | "word-wrap"
    | "writing-mode"
    | "z-index";

/**
 * Additional CSS properties for SVG elements.
 *
 * @remarks
 * Reference:
 *
 * - https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation
 * - https://css-tricks.com/svg-properties-and-css/
 */
export type CSSSVGProperty =
    | "alignment-baseline"
    | "baseline-shift"
    | "clip"
    | "clip-path"
    | "clip-rule"
    | "color-interpolation"
    | "color-interpolation-filters"
    | "color-profile"
    | "color-rendering"
    | "cursor"
    | "d"
    | "direction"
    | "display"
    | "dominant-baseline"
    | "enable-background"
    | "fill"
    | "fill-opacity"
    | "fill-rule"
    | "filter"
    | "flood-color"
    | "flood-opacity"
    | "font-family"
    | "font-size"
    | "font-size-adjust"
    | "font-stretch"
    | "font-variant"
    | "font-weight"
    | "glyph-orientation-horizontal"
    | "glyph-orientation-vertical"
    | "image-rendering"
    | "kerning"
    | "letter-spacing"
    | "lighting-color"
    | "marker"
    | "marker-end"
    | "marker-mid"
    | "marker-start"
    | "mask"
    | "opacity"
    | "overflow"
    | "pointer-events"
    | "shape-rendering"
    | "solid-color"
    | "solid-opacity"
    | "stop-color"
    | "stop-opacity"
    | "stroke"
    | "stroke-dasharray"
    | "stroke-dashoffset"
    | "stroke-linecap"
    | "stroke-linejoin"
    | "stroke-miterlimit"
    | "stroke-opacity"
    | "stroke-width"
    | "text-anchor"
    | "text-decoration"
    | "text-rendering"
    | "transform"
    | "unicode-bidi"
    | "vector-effect"
    | "visibility"
    | "word-spacing"
    | "writing-mode";

export interface Attribs
    extends GlobalEventAttribs,
        MicroformatAttribs,
        RDFaAttribs {
    accesskey: StringAttrib;
    autocapitalize: AttribVal<
        "off" | "on" | "sentences" | "words" | "characters"
    >;
    class: AttribVal<string | IObjectOf<BooleanAttrib>>;
    contenteditable: BooleanAttrib;
    data: IObjectOf<AttribVal<string | number | boolean>>;
    dir: AttribVal<"rtl" | "ltr">;
    draggable: BooleanAttrib;
    hidden: BooleanAttrib;
    id: StringAttrib;
    is: StringAttrib;
    lang: StringAttrib;
    scrollLeft: NumericAttrib;
    scrollTop: NumericAttrib;
    spellcheck: BooleanAttrib;
    style: AttribVal<
        | string
        | Partial<
              Record<
                  CSSProperty | CSSSVGProperty,
                  AttribVal<NumOrString | Fn<any, NumOrString>>
              >
          >
    >;
    tabindex: NumericAttrib;
    title: StringAttrib;
    translate: BooleanAttrib;
    [id: string]: any;
}

export interface CORSAttribs {
    crossorigin: AttribVal<"anonymous" | "use-credentials">;
}

export interface ReferrerAttribs {
    referrerpolicy: AttribVal<ReferrerPolicy>;
}

export interface ImportanceAttribs {
    importance: AttribVal<"high" | "low" | "auto">;
}

export interface RelAttribs extends Omit<Attribs, "rel"> {
    rel: AttribVal<LinkRel | LinkRel[]>;
}

export interface DimensionAttribs {
    width: NumericAttrib;
    height: NumericAttrib;
}

export interface LoadingAttribs {
    loading: AttribVal<"eager" | "lazy">;
}
