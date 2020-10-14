import type { IID } from "@thi.ng/api";
import type { StreamMerge } from "@thi.ng/rstream";

export type GestureStream = StreamMerge<UIEvent, GestureEvent>;

export type UIEvent = MouseEvent | TouchEvent | WheelEvent;

export type UIEventID =
    | "mousedown"
    | "mousemove"
    | "mouseup"
    | "touchstart"
    | "touchmove"
    | "touchend"
    | "touchcancel"
    | "wheel";

export enum GestureType {
    START = "START",
    MOVE = "MOVE",
    DRAG = "DRAG",
    END = "END",
    ZOOM = "ZOOM",
}

export interface GestureInfo {
    /**
     * Touch/cursor ID. For mouse cursors this always is zero.
     */
    id: number;
    /**
     * Current cursor position (as per {@link GestureStreamOpts.local} &
     * {@link GestureStreamOpts.scale})
     */
    pos: number[];
    /**
     * Initial start position of this cursor.
     */
    start?: number[];
    /**
     * Difference vector between from `start` to `pos`.
     */
    delta?: number[];
    /**
     * Optional current force/pressure details. Only available for touch
     * gestures and if hardware supports it. Default value is hardware
     * specific too, usually 0 or 1.
     */
    force?: number;
}

export interface GestureEvent {
    /**
     * Current translated/abstracted event type.
     */
    type: GestureType;
    /**
     * Original DOM event.
     */
    event: UIEvent;
    /**
     * Event position (as per {@link GestureStreamOpts.local} &
     * {@link GestureStreamOpts.scale})
     */
    pos: number[];
    /**
     * Active cursors (i.e. ongoing drag / touch gestures)
     */
    active: GestureInfo[];
    /**
     * Mouse button bitmask (same as in standard `MouseEvent`), or, if
     * `isTouch` is true, number of `active` touches.
     */
    buttons: number;
    /**
     * Current zoom factor (as per {@link GestureStreamOpts} config)
     */
    zoom: number;
    /**
     * Last `WheelEvent`'s transformed `deltaY`, `wheelDeltaY`
     */
    zoomDelta: number;
    /**
     * True, if original event was a `TouchEvent`.
     */
    isTouch: boolean;
}

export interface GestureStreamOpts extends IID<string> {
    /**
     * Event listener options (see standard `addEventListener`).
     * Default: false
     */
    eventOpts: boolean | AddEventListenerOptions;
    /**
     * If `true`, calls `preventDefault()` for each event.
     * Default: true
     */
    preventDefault: boolean;
    /**
     * If true (default), wheel events on the element will prevent the
     * document from scrolling. If false, the wheel event will use the
     * eventOpts.passive argument (default: true) which should be true
     * in most cases for performance reasons:
     * https://www.chromestatus.com/feature/5745543795965952
     */
    preventScrollOnZoom: boolean;
    /**
     * If true (default), attaches dummy event handler disabling context
     * menu for the target element and thus allow using right mouse
     * button to be used normally.
     */
    preventContextMenu: boolean;
    /**
     * Initial zoom value. Default: 1
     */
    zoom: number;
    /**
     * If true, the produced `zoom` values are considered absolute and
     * will be constrained to the `minZoom .. maxZoom` interval. If
     * `false`, the zoom values are relative and simply the result of
     * `event.deltaY * smooth`.
     *
     * Default: true
     */
    absZoom: boolean;
    /**
     * Min zoom value. Default: 0.25
     */
    minZoom: number;
    /**
     * Max zoom value. Default: 4
     */
    maxZoom: number;
    /**
     * Scaling factor for zoom changes. Default: 1
     */
    smooth: number;
    /**
     * Local coordinate flag. If true (default), the elements position
     * offset is subtracted.
     */
    local: boolean;
    /**
     * If true, all positions and delta values are scaled by
     * `window.devicePixelRatio`. Note: Only enable if `local` is true.
     *
     * @defaultValue false
     */
    scale: boolean;
}
