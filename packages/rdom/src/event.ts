import type { ISubscriber } from "@thi.ng/rstream";
import { maybeParseFloat } from "@thi.ng/strings";

/**
 * HOF DOM event listener to emit element's value on given stream.
 *
 * @example
 * ```ts
 * const name = reactive("");
 *
 * $compile(
 *   ["input", { oninput: $input(name), value: name }]
 * ).mount(document.body);
 * ```
 *
 * @param stream -
 */
export const $input = (stream: ISubscriber<string>) => (e: Event) =>
    stream.next((<any>e.target).value);

/**
 * Similar to {@link $input}, but attempts to first coerce value using
 * `parseFloat()`. Uses given `fallback` value (default: 0) if coercion failed
 * (i.e. if the event target's `.value` isn't numeric).
 *
 * @param stream -
 * @param fallback -
 */
export const $inputNum = (stream: ISubscriber<number>, fallback = 0) => (
    e: Event
) => stream.next(maybeParseFloat((<any>e.target).value, fallback));
