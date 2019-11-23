import { isNode } from "@thi.ng/checks";
import { CommonOpts } from "../api";
import { Stream } from "../stream";
import { optsWithID } from "../utils/idgen";
import { fromInterval } from "./interval";

/**
 * Yields the stream of a monotonically increasing counter, triggered by
 * a `requestAnimationFrame()` loop (only available in browser
 * environments). In NodeJS, this function falls back to
 * `fromInterval(16)`, yielding a similar (approx. 60Hz) stream.
 *
 * Subscribers to this stream will be processed during that same loop
 * iteration.
 */
export const fromRAF = (opts?: Partial<CommonOpts>) =>
    isNode()
        ? fromInterval(16, opts)
        : new Stream<number>((stream) => {
              let i = 0;
              let isActive = true;
              let loop = () => {
                  isActive && stream.next(i++);
                  isActive && (id = requestAnimationFrame(loop));
              };
              let id = requestAnimationFrame(loop);
              return () => {
                  isActive = false;
                  cancelAnimationFrame(id);
              };
          }, optsWithID("raf", opts));
