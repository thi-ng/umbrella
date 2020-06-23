import type { Fn, IObjectOf, MaybeDeref, NumOrString } from "@thi.ng/api";

export type AttribVal<T> = MaybeDeref<T | undefined>;

export type EventAttribVal<T> =
    | Fn<T, any>
    | [Fn<T, any>, boolean | AddEventListenerOptions];

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
    itemid: MaybeDeref<string>;
    itemprop: MaybeDeref<string>;
    itemref: MaybeDeref<string>;
    itemscope: MaybeDeref<boolean>;
    itemtype: MaybeDeref<string>;
}

export interface Attribs extends GlobalEventAttribs, MicroformatAttribs {
    accesskey: AttribVal<string>;
    autocapitalize: AttribVal<
        "off" | "on" | "sentences" | "words" | "characters"
    >;
    class: AttribVal<string | IObjectOf<AttribVal<boolean>>>;
    contenteditable: AttribVal<boolean>;
    data: IObjectOf<AttribVal<NumOrString>>;
    dir: AttribVal<"rtl" | "ltr">;
    draggable: AttribVal<boolean>;
    hidden: AttribVal<boolean>;
    id: AttribVal<string>;
    is: AttribVal<string>;
    lang: AttribVal<string>;
    scrollLeft: AttribVal<number>;
    scrollTop: AttribVal<number>;
    spellcheck: AttribVal<boolean>;
    style: AttribVal<
        string | IObjectOf<AttribVal<NumOrString | Fn<any, NumOrString>>>
    >;
    tabindex: AttribVal<number>;
    title: AttribVal<string>;
    translate: AttribVal<boolean>;
    [id: string]: any;
}
