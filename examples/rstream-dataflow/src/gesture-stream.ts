import { Event } from "@thi.ng/interceptors/api";
import { fromEvent } from "@thi.ng/rstream/from/event";
import { merge } from "@thi.ng/rstream/stream-merge";
import { map } from "@thi.ng/transducers/xform/map";

export enum GestureType {
    START,
    MOVE,
    DRAG,
    END
}

export interface GestureEvent extends Event {
    [0]: GestureType;
    [1]: number[][];
}

/**
 * Attaches mouse & touch event listeners to given DOM element and
 * returns a stream of custom "gesture" events in the form of tuples:
 *
 * ```
 * [type, [currpos, clickpos, delta]]
 * ```
 *
 * The `clickpos` and `delta` values are only present if `type ==
 * GestureType.DRAG`. Both (and `currpos` too) are 2-element arrays of
 * `[x,y]` coordinates.
 *
 * Note: For touch events `preventDefault()` is called automatically.
 * Since Chrome 56 (other browsers too), this means the event target
 * element cannot be `document.body` anymore.
 *
 * See: https://www.chromestatus.com/features/5093566007214080
 *
 * @param el
 */
export function gestureStream(el: Element) {
    let isDown = false,
        clickPos: number[];
    return merge({
        src: [
            "mousedown", "mousemove", "mouseup",
            "touchstart", "touchmove", "touchend", "touchcancel"
        ].map((e) => fromEvent(el, e)),

        xform: map((e: MouseEvent | TouchEvent) => {
            let evt, type;
            if (e instanceof TouchEvent) {
                e.preventDefault();
                type = {
                    "touchstart": GestureType.START,
                    "touchmove": GestureType.DRAG,
                    "touchend": GestureType.END,
                    "touchcancel": GestureType.END
                }[e.type];
                evt = e.changedTouches[0];
            } else {
                type = {
                    "mousedown": GestureType.START,
                    "mousemove": isDown ? GestureType.DRAG : GestureType.MOVE,
                    "mouseup": GestureType.END
                }[e.type];
                evt = e;
            }
            const body = [[evt.clientX | 0, evt.clientY | 0]];
            switch (type) {
                case GestureType.START:
                    isDown = true;
                    clickPos = body[0];
                    break;
                case GestureType.END:
                    isDown = false;
                    clickPos = null;
                    break;
                case GestureType.DRAG:
                    body.push(clickPos, [body[0][0] - clickPos[0], body[0][1] - clickPos[1]]);
                default:
            }
            return <GestureEvent>[type, body];
        })
    });
}
