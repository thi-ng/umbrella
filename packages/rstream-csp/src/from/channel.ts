import type { Channel } from "@thi.ng/csp";
import type { CommonOpts } from "@thi.ng/rstream";
import { LOGGER } from "@thi.ng/rstream/api";
import { Stream } from "@thi.ng/rstream/stream";

export interface FromChannelOpts extends CommonOpts {
    /**
     * If true, the parent CSP channel will be closed when this stream
     * closes.
     *
     * @defaultValue true
     */
    closeChannel: boolean;
}

/**
 * Returns a stream of values received from given
 * {@link @thi.ng/csp#Channel}.
 *
 * @param src -
 * @param opts -
 */
export const fromChannel = <T>(
    src: Channel<T>,
    opts?: Partial<FromChannelOpts>
) => {
    opts = { id: `channel-${src.id}`, closeChannel: true, ...opts };
    return new Stream<T>((stream) => {
        let isActive = true;
        (async () => {
            let x;
            while (((x = null), (x = await src.read())) !== undefined) {
                if (x === undefined || !isActive) {
                    break;
                }
                stream.next(x);
            }
            stream.done();
        })();
        return () => {
            if (opts!.closeChannel !== false) {
                src.close(true);
                LOGGER.info("closed channel", src.id);
            }
            isActive = false;
        };
    }, opts);
};
