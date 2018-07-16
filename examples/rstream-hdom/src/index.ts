import { diffElement, normalizeTree } from "@thi.ng/hdom";
import { ISubscribable } from "@thi.ng/rstream/api";
import { fromRAF } from "@thi.ng/rstream/from/raf";
import { sync } from "@thi.ng/rstream/stream-sync";
import { sidechainPartition } from "@thi.ng/rstream/subs/sidechain-partition";
import { Subscription } from "@thi.ng/rstream/subscription";
import { vals } from "@thi.ng/transducers/iter/vals";
import { reducer } from "@thi.ng/transducers/reduce";
import { map } from "@thi.ng/transducers/xform/map";
import { scan } from "@thi.ng/transducers/xform/scan";

// example user context object
// here only used to provide style / theme config using
// Tachyons CSS classes
const ctx = {
    ui: {
        root: {
            class: "pa2"
        },
        button: {
            class: "w4 h2 bg-black white bn br2 mr2 pointer"
        }
    }
};

/**
 * Takes a `parent` DOM element, a stream of `root` component values and
 * an arbitrary user context object which will be implicitly passed to
 * all component functions embedded in the root component. Subscribes to
 * `root` stream & performs DOM updates using incoming values (i.e. UI
 * components). Additionally, a RAF side chain stream is used to
 * synchronize DOM updates to be processed during RAF.
 *
 * Returns stream of hdom trees.
 *
 * @param parent root DOM element
 * @param root root hdom component stream
 * @param ctx user context object
 */
const domUpdate = (parent: HTMLElement, root: ISubscribable<any>, ctx: any) => {
    return root
        // use RAF stream as side chain trigger to
        // force DOM updates to execute during RAF
        .subscribe(sidechainPartition(fromRAF()))
        // transform atom value changes using transducers
        .transform(
            // first normalize/expand hdom component tree
            // only use very last received value
            map((curr: any[]) => normalizeTree(curr[curr.length - 1], ctx)),
            // then perform diff & selective DOM update
            scan<any, any>(
                reducer(
                    () => [],
                    (prev, curr) => (diffElement(parent, prev, curr), curr)
                )
            )
        );
};

/**
 * Generic button component.
 *
 * @param ctx hdom user context
 * @param onclick event handler
 * @param body button body
 */
const button = (ctx: any, onclick: EventListener, body: any) =>
    ["button", { ...ctx.ui.button, onclick }, body];

/**
 * Specialized button component for counters.
 *
 * @param _ hdom user context (unused)
 * @param stream counter stream
 */
const clickButton = (_, stream: Subscription<boolean, number>) =>
    [button, () => stream.next(true), stream.deref()];

/**
 * Specialized button to reset all counters.
 *
 * @param _ hdom user context (unused)
 * @param counters streams to reset
 */
const resetButton = (_, counters: Subscription<boolean, number>[]) =>
    [button, () => counters.forEach((c) => c.next(false)), "reset"];

/**
 * Creates a stream of counter values. Each time `true` is written to
 * the stream, the counter increases by given step value. If false is
 * written, the counter resets to the `start` value.
 *
 * @param start
 * @param step
 */
const counter = (start: number, step: number) => {
    const s = new Subscription<boolean, number>(
        null,
        // the `scan` transducer is used to provide counter functionality
        // see: https://github.com/thi-ng/umbrella/blob/master/packages/transducers/src/xform/scan.ts
        scan(reducer(() => start, (x, y) => y ? x + step : start))
    );
    s.next(false);
    return s;
};

/**
 * Root component stream factory. Accepts array of initial counter
 * values and their step values, creates streams for each and returns a
 * StreamSync instance, which merges and converts these streams into a
 * single component.
 *
 * @param initial initial counter configs
 */
const app = (ctx: any, initial: number[][]) => {
    const counters = initial.map(([start, step]) => counter(start, step));
    return sync({
        src: counters.map((c) => c.transform(map(() => [clickButton, c]))),
        xform: map(
            // build the app's actual root component
            (buttons) => ["div", ctx.ui.root, ...vals(buttons), [resetButton, counters]]
        ),
        // this config ensures that only at the very beginning *all*
        // inputs must have delivered a value (i.e. stream
        // synchronization) before this stream itself delivers a value.
        // however, by stating `reset: false` any subsequent changes to
        // any of the inputs will not be synchronized
        // see here for further details:
        // https://github.com/thi-ng/umbrella/blob/master/packages/rstream/src/stream-sync.ts#L21
        // https://github.com/thi-ng/umbrella/blob/master/packages/transducers/src/xform/partition-sync.ts#L7
        reset: false,
    });
};

// start app & DOM updates
domUpdate(
    document.getElementById("app"),
    app(ctx, [[10, 1], [20, 5], [30, 10]]),
    ctx
);
