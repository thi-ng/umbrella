import type { Fn, IObjectOf, MaybeDeref, NumOrString } from "@thi.ng/api";

export type EventAttribs<K extends string, T> = Record<
    K,
    Fn<T, any> | [Fn<T, any>, boolean | AddEventListenerOptions]
>;

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
    onresize: Fn<UIEvent, any>;
    onscroll: Fn<Event, any>;
    onsubmit: Fn<Event, any>;
}

export interface MicroformatAttribs {
    itemid: MaybeDeref<string>;
    itemprop: MaybeDeref<string>;
    itemref: MaybeDeref<string>;
    itemscope: MaybeDeref<boolean>;
    itemtype: MaybeDeref<string>;
}

export interface Attribs extends GlobalEventAttribs, MicroformatAttribs {
    accesskey: MaybeDeref<string>;
    autocapitalize: MaybeDeref<
        "off" | "on" | "sentences" | "words" | "characters"
    >;
    class: MaybeDeref<string | IObjectOf<MaybeDeref<boolean>>>;
    contenteditable: MaybeDeref<boolean>;
    data: IObjectOf<MaybeDeref<NumOrString>>;
    dir: MaybeDeref<"rtl" | "ltr">;
    draggable: MaybeDeref<boolean>;
    hidden: MaybeDeref<boolean>;
    id: MaybeDeref<string>;
    is: MaybeDeref<string>;
    lang: MaybeDeref<string>;
    scrollLeft: MaybeDeref<number>;
    scrollTop: MaybeDeref<number>;
    spellcheck: MaybeDeref<boolean>;
    style: MaybeDeref<
        string | IObjectOf<MaybeDeref<NumOrString | Fn<any, NumOrString>>>
    >;
    tabindex: MaybeDeref<number>;
    title: MaybeDeref<string>;
    translate: MaybeDeref<boolean>;
    [id: string]: any;
}
