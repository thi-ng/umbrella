import { isNode } from "@thi.ng/checks/is-node";

import { Stream } from "../stream";
import { Subscription } from "../subscription";
import { fromInterval } from "./interval";

/**
 * Yields a stream of monotonically increasing counter, triggered by a
 * `requestAnimationFrame()` loop (only available in browser
 * environments). In NodeJS, this function falls back to
 * `fromInterval(16)`, yielding a similar (approximately 60fps) stream.
 *
 * Subscribers to this stream will be processed during that same loop
 * iteration.
 */
export function fromRAF() {
    return isNode() ?
        fromInterval(16) :
        new Stream<number>((stream) => {
            let i = 0;
            let isActive = true;
            let loop = () => {
                isActive && stream.next(i++);
                isActive && (id = requestAnimationFrame(loop));
            };
            let id = requestAnimationFrame(loop);
            return () => (isActive = false, cancelAnimationFrame(id));
        }, `raf-${Subscription.NEXT_ID++}`);
}
