import { isNode } from "@thi.ng/checks/is-node";

import { Stream } from "../stream";
import { fromInterval } from "./interval";

/**
 * Yields a stream of monotonically increasing counter,
 * triggered by a `requestAnimationFrame()` loop.
 * Only available in browser environments. In NodeJS,
 * this function falls back to `fromInterval(16)`, yielding
 * a similar (approximately 60fps) stream.
 *
 * Subscribers to this stream will be processed during
 * that same loop iteration.
 */
export function fromRAF() {
    return isNode() ?
        fromInterval(16) :
        new Stream<number>((stream) => {
            let i = 0, id,
                isActive = true,
                loop = () => {
                    isActive && stream.next(i++);
                    isActive && (id = requestAnimationFrame(loop));
                };
            id = requestAnimationFrame(loop);
            return () => (isActive = false, cancelAnimationFrame(id));
        }, `raf-${Stream.NEXT_ID++}`);
}
