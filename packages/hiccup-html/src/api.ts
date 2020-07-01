import type { Fn, IObjectOf, MaybeDeref, NumOrString } from "@thi.ng/api";

export type AttribVal<T> = MaybeDeref<T | undefined>;

export type BooleanAttrib = AttribVal<boolean>;

export type NumericAttrib = AttribVal<number>;

export type StringAttrib = AttribVal<string>;

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

export interface Attribs extends GlobalEventAttribs, MicroformatAttribs {
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
        string | IObjectOf<AttribVal<NumOrString | Fn<any, NumOrString>>>
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

export interface RelAttribs {
    rel: AttribVal<LinkRel | LinkRel[]>;
}

export interface DimensionAttribs {
    width: NumericAttrib;
    height: NumericAttrib;
}

export interface LoadingAttribs {
    loading: AttribVal<"eager" | "lazy">;
}
