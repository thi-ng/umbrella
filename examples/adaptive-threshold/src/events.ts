import type { Fn } from "@thi.ng/api";
import { setIn } from "@thi.ng/paths/set-in";
import { floatBufferFromImage } from "@thi.ng/pixel/float";
import { FLOAT_GRAY } from "@thi.ng/pixel/format/float-gray";
import type { ISubscriber } from "@thi.ng/rstream";
import { pubsub } from "@thi.ng/rstream/pubsub";
import { stream } from "@thi.ng/rstream/stream";
import { trace } from "@thi.ng/rstream/trace";
import type { Transducer } from "@thi.ng/transducers";
import {
    type Event,
    type EventType,
    type EventTypeMap,
    SET_IMAGE,
    SET_KERNEL_OFFSET,
    SET_KERNEL_WIDTH,
    UPDATE_IMAGE,
} from "./api";
import { state } from "./state";
import { adaptiveThreshold } from "./threshold";

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
        error: (e) => {
            console.warn(e);
            return false;
        },
    };
    return xform
        ? eventProc.subscribeTopic(id, sub, { xform })
        : eventProc.subscribeTopic(id, sub);
};

// event handlers

defHandler(SET_IMAGE, ([_, file]) => {
    const reader = new FileReader();
    reader.onload = async (e: any) => {
        const img = new Image();
        img.src = e.target.result;
        await img.decode();
        state.next(
            setIn(
                state.deref()!,
                ["srcImg"],
                floatBufferFromImage(img, FLOAT_GRAY)
            )
        );
        dispatch([UPDATE_IMAGE]);
    };
    reader.readAsDataURL(file);
});

defHandler(UPDATE_IMAGE, () => {
    const curr = state.deref()!;
    // create & store threshold image in state
    state.next(
        setIn(
            curr,
            ["destImg"],
            adaptiveThreshold(
                curr.srcImg!,
                curr.threshold.windowSize,
                curr.threshold.offset
            )
        )
    );
});

defHandler(SET_KERNEL_WIDTH, ([_, width]) => {
    state.next(setIn(state.deref()!, ["threshold", "windowSize"], width));
    dispatch([UPDATE_IMAGE]);
});

defHandler(SET_KERNEL_OFFSET, ([_, offset]) => {
    state.next(setIn(state.deref()!, ["threshold", "offset"], offset));
    dispatch([UPDATE_IMAGE]);
});
