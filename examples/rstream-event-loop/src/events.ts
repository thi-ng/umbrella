import type { Fn } from "@thi.ng/api";
import { setInManyUnsafe } from "@thi.ng/paths";
import { ISubscriber, pubsub, stream, trace } from "@thi.ng/rstream";
import { filter, Transducer } from "@thi.ng/transducers";
import { Event, EventType, EventTypeMap, NEXT, PAGE_READY, PREV } from "./api";
import { state } from "./state";

/**
 * Event input stream (not exported)
 * All use code MUST use `dispatch()` function below.
 */
const events = stream<Event>();

// optionally, add event logging
// (also see @thi.ng/rstream-log for a more
// elaborate/customizable solution)
events.subscribe(trace("event:"));

/**
 * Event handler distribution construct. Attached to event stream and
 * will delegate to event ID based child subscriptions (the actual event
 * handlers).
 */
const eventProc = pubsub<Event, Event>({ topic: (x) => x[0] });
events.subscribe(eventProc);

/**
 * Event dispatch function. Sends given event into the event stream.
 *
 * @param e
 */
export const dispatch = (e: Event) => events.next(e);

/**
 * Registers event handler for given `id`, incl. optional validation
 * transducer, which when given, is applied prior to the actual handler.
 * The handler's subscription also includes an error handler to display
 * errors in the console.
 *
 * @param id
 * @param handler
 * @param xform
 */
export const defHandler = <E extends EventType>(
    id: E,
    handler: Fn<EventTypeMap[E], void>,
    xform?: Transducer<Event, Event>
) => {
    const sub: ISubscriber<Event> = {
        next: <Fn<Event, void>>handler,
        error: console.warn,
    };
    return xform
        ? eventProc.subscribeTopic(id, {}, {}).subscribe(sub, xform)
        : eventProc.subscribeTopic(id, sub);
};

/**
 * Event handler helper which sets `nextPageID` & `isLoading` flag in
 * app state and simulates a pre-loading step (with delay), after which
 * it emits a `PAGE_READY` event.
 *
 * @param offset
 */
const requestPage = (offset: number) => {
    // get current app state
    const curr = state.deref()!;
    // just for illustration, not actually required in current example
    // clear any active timeout before creating new one...
    curr.timeoutID !== undefined && clearTimeout(curr.timeoutID);
    // simulate pre-loading delay
    const timeoutID = setTimeout(() => dispatch([PAGE_READY]), 250);
    // IMMUTABLY(!) update app state
    state.next(
        setInManyUnsafe(
            curr,
            "nextPageID",
            curr.pageID + offset,
            "timeoutID",
            timeoutID,
            "isLoading",
            true
        )
    );
};

// event handlers

defHandler(
    PREV,
    ([_, step]) => requestPage(-step!),
    // don't allow event if new page ID would be negative
    filter(([_, x]) => state.deref()!.pageID >= x!)
    // alternatively, use `map()` transducer to clamp new pageID to 0
    // map((e) => state.deref()!.pageID < e[1]! ? [PREV, state.deref()!.pageID] : e)
);

defHandler(
    NEXT,
    ([_, step]) => requestPage(step!),
    // don't allow event if new page ID would be >= 20
    filter(([_, x]) => state.deref()!.pageID < 20 - x!)
);

defHandler(PAGE_READY, () => {
    const curr = state.deref()!;
    // apply `nextPageID` and clear preload flag
    state.next(
        setInManyUnsafe(curr, "pageID", curr.nextPageID, "isLoading", false)
    );
});
