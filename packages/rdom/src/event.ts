import type { ISubscriber } from "@thi.ng/rstream";
import { maybeParseFloat } from "@thi.ng/strings/parse";

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
export const $inputNum =
    (stream: ISubscriber<number>, fallback = 0) =>
    (e: Event) =>
        stream.next(maybeParseFloat((<any>e.target).value, fallback));

/**
 * HOF DOM event listener to emit a checkbox input's value on given stream.
 *
 * @param stream
 */
export const $inputCheckbox = (stream: ISubscriber<boolean>) => (e: Event) =>
    stream.next((<HTMLInputElement>e.target).checked);

/**
 * HOF DOM event listener to emit `true` on given stream when event is
 * triggered.
 *
 * @param stream
 */
export const $inputTrigger = (stream: ISubscriber<boolean>) => () =>
    stream.next(true);

/**
 * HOF DOM event listener to emit a file input's first selected file on given
 * stream.
 *
 * @param stream
 */
export const $inputFile = (stream: ISubscriber<File>) => (e: Event) =>
    stream.next((<HTMLInputElement>e.target).files![0]);

/**
 * HOF DOM event listener to emit a file input's entire selected list of files
 * on given stream.
 *
 * @param stream
 */
export const $inputFiles = (stream: ISubscriber<FileList>) => (e: Event) =>
    stream.next((<HTMLInputElement>e.target).files!);
