import { IID } from "@thi.ng/api/api";
import { fromEvent } from "@thi.ng/rstream/from/event";
import { merge, StreamMerge } from "@thi.ng/rstream/stream-merge";
import { map } from "@thi.ng/transducers/xform/map";

export const enum GestureType {
    START,
    MOVE,
    DRAG,
    END,
    ZOOM,
}

/**
 * Reverse lookup for `GestureType` enums
 */
export const __GestureType = (<any>exports).GestureType;

export interface GestureInfo {
    pos: number[];
    click: number[];
    delta: number[];
    zoom: number;
}

export interface GestureEvent {
    [0]: GestureType;
    [1]: GestureInfo;
}

export interface GestureStreamOpts extends IID<string> {
    /**
     * Event listener options (see standard `addEventListener()`)
     * Default: false
     */
    eventOpts: boolean | AddEventListenerOptions;
    /**
     * If `true`, calls `preventDefault()` for each event.
     * Default: true
     */
    preventDefault: boolean;
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
     * If true (default: false), all positions and delta values are
     * scaled by `window.devicePixelRatio`. Note: Only enable if `local`
     * is true.
     */
    scale: boolean;
}

/**
 * Attaches mouse & touch event listeners to given DOM element and
 * returns a stream of custom "gesture" events in the form of tuples:
 *
 * ```
 * [type, {pos, click?, delta?, zoom}]
 * ```
 *
 * The `click` and `delta` values are only present if `type ==
 * GestureType.DRAG`. Both (and `pos` too) are 2-element arrays of
 * `[x,y]` coordinates.
 *
 * The `zoom` value is always present, but is only updated with wheel
 * events. The value will be constrained to `minZoom` ... `maxZoom`
 * interval (provided via options object).
 *
 * Note: If using `preventDefault` and attaching the event stream to
 * `document.body`, the following event listener options SHOULD be used:
 *
 * ```
 * eventOpts: { passive: false }
 * ```
 *
 * See: https://www.chromestatus.com/features/5093566007214080
 *
 * @param el
 * @param opts
 */
export function gestureStream(el: HTMLElement, opts?: Partial<GestureStreamOpts>): StreamMerge<any, GestureEvent> {
    let isDown = false,
        clickPos: number[];
    opts = Object.assign(<GestureStreamOpts>{
        id: "gestures",
        zoom: 1,
        absZoom: true,
        minZoom: 0.25,
        maxZoom: 4,
        smooth: 1,
        eventOpts: { capture: true },
        preventDefault: true,
        local: true,
        scale: false,
    }, opts);
    let zoom = Math.min(Math.max(opts.zoom, opts.minZoom), opts.maxZoom);
    const dpr = window.devicePixelRatio || 1;
    return merge({
        id: opts.id,
        src: [
            "mousedown", "mousemove", "mouseup",
            "touchstart", "touchmove", "touchend", "touchcancel",
            "wheel"
        ].map((e) => fromEvent(el, e, opts.eventOpts)),
        xform: map((e: MouseEvent | TouchEvent | WheelEvent) => {
            let evt, type;
            opts.preventDefault && e.preventDefault();
            if ((<TouchEvent>e).touches) {
                type = {
                    "touchstart": GestureType.START,
                    "touchmove": GestureType.DRAG,
                    "touchend": GestureType.END,
                    "touchcancel": GestureType.END
                }[e.type];
                evt = (<TouchEvent>e).changedTouches[0];
            } else {
                type = {
                    "mousedown": GestureType.START,
                    "mousemove": isDown ? GestureType.DRAG : GestureType.MOVE,
                    "mouseup": GestureType.END,
                    "wheel": GestureType.ZOOM,
                }[e.type];
                evt = e;
            }
            const pos = [evt.clientX | 0, evt.clientY | 0];
            if (opts.local) {
                const rect = el.getBoundingClientRect();
                pos[0] -= rect.left;
                pos[1] -= rect.top;
            }
            if (opts.scale) {
                pos[0] *= dpr;
                pos[1] *= dpr;
            }
            const body = <GestureInfo>{ pos, zoom };
            switch (type) {
                case GestureType.START:
                    isDown = true;
                    clickPos = [...pos];
                    break;
                case GestureType.END:
                    isDown = false;
                    clickPos = null;
                    break;
                case GestureType.DRAG:
                    body.click = clickPos;
                    body.delta = [pos[0] - clickPos[0], pos[1] - clickPos[1]];
                    break;
                case GestureType.ZOOM:
                    body.zoom = zoom = opts.absZoom ?
                        Math.min(Math.max(zoom + (<WheelEvent>e).deltaY * opts.smooth, opts.minZoom), opts.maxZoom) :
                        (<WheelEvent>e).deltaY * opts.smooth;
                    break;
                default:
            }
            return <GestureEvent>[type, body];
        })
    });
}
