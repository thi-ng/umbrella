import { Channel } from "@thi.ng/csp";
import { DEBUG, Stream } from "@thi.ng/rstream";

/**
 *
 * @param src
 * @param closeWhenCancelled
 */
export const fromChannel =
    <T>(src: Channel<T>, closeWhenCancelled = true) =>
        new Stream<T>(
            (stream) => {
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
                        DEBUG && console.log("closed channel", src.id);
                    }
                    isActive = false;
                };
            },
            `channel-${src.id}`
        );
