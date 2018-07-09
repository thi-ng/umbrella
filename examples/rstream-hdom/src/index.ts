import { Atom } from "@thi.ng/atom";
import { diffElement, normalizeTree } from "@thi.ng/hdom";
import { fromRAF, fromView, sidechainPartition } from "@thi.ng/rstream";
import { reducer, scan } from "@thi.ng/transducers";

/**
 * Reactively triggers DOM update whenever state atom embedded in given
 * user context object has value changes (the context object is assumed
 * to have a `state` key holding the atom). Additionally, a RAF side
 * chain stream is used to synchronize DOM updates to be processed
 * during RAF.
 *
 * Returns stream of hdom trees.
 *
 * @param parent root DOM element
 * @param root root hdom component
 * @param ctx user context object
 */
const domUpdate = (parent, root, ctx) => {
    return fromView(ctx.state, "")
        // use RAF stream as side chain trigger to
        // force DOM updates to execute during RAF
        .subscribe(sidechainPartition(fromRAF()))
        // transform atom value changes using transducers
        .transform(
            scan<any, any>(
                reducer(
                    () => [],
                    (prev, curr) => {
                        curr = normalizeTree(root, ctx);
                        diffElement(parent, prev, curr);
                        return curr;
                    }
                )
            )
        );
};

/**
 * Generic button
 * @param ctx hdom user context
 * @param onclick event handler
 * @param body button body
 */
const button = (ctx, onclick, body) =>
    ["button", { ...ctx.ui.button, onclick }, body];

/**
 * Specialized button for counters.
 *
 * @param ctx hdom user context
 * @param idx index in `clicks` array
 * @param val current click val
 */
const clickButton = (ctx, idx, val) =>
    [button, () => ctx.state.swapIn(["clicks", idx], (n: number) => n + 1), `clicks: ${val}`];

/**
 * Root component function
 *
 * @param ctx
 */
const root = (ctx) =>
    ["div",
        ctx.state.deref().clicks.map((x, i) => [clickButton, i, x]),
        [button, () => ctx.state.resetIn("clicks", [0, 0, 0]), "reset"]
    ];

// example user context w/ embedded app state atom
const ctx = {
    state: new Atom({ clicks: [0, 0, 0] }),
    ui: {
        button: {
            style: {
                background: "yellow",
                margin: "0.5rem",
                padding: "0.5rem"
            }
        }
    }
};

// start app
domUpdate(document.getElementById("app"), root, ctx)
    // attach debug subscription
    .subscribe({ next(tree) { console.log("DOM updated", tree); } });
