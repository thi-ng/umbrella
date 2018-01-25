import { Channel } from "@thi.ng/csp/channel";

import { Stream } from "../stream";

/**
 *
 * @param src
 * @param closeWhenCancelled
 */
export function fromChannel<T>(src: Channel<T>, closeWhenCancelled = true) {
    return new Stream<T>((stream) => {
        let isActive = true;
        (async () => {
            let x;
            while ((x = null, x = await src.read()) !== undefined) {
                if (x === undefined || !isActive) {
                    break;
                }
                stream.next(x);
            }
            stream.done();
        })();
        return () => {
            if (closeWhenCancelled) {
                src.close(true);
                console.log("closed channel", src.id);
            }
            isActive = false;
        };
    }, `obs-${src.id}`);
}
