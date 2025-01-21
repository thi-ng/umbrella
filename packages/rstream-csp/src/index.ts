// SPDX-License-Identifier: Apache-2.0
import type { Channel } from "@thi.ng/csp";
import type { CommonOpts } from "@thi.ng/rstream";
import { LOGGER } from "@thi.ng/rstream/logger";
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
 * [`Channel`](https://docs.thi.ng/umbrella/csp/classes/Channel.html).
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
			while ((x = await src.read()) !== undefined) {
				if (!isActive) break;
				stream.next(x);
				x = null;
			}
			stream.done();
		})();
		return () => {
			if (opts!.closeChannel !== false) {
				src.close();
				LOGGER.info("closed channel", src.id);
			}
			isActive = false;
		};
	}, opts);
};
