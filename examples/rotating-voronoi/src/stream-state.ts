import { fromDOMEvent } from "@thi.ng/rstream/event";
import { fromRAF } from "@thi.ng/rstream/raf";
import { sidechainToggle } from "@thi.ng/rstream/sidechain-toggle";
import { reactive } from "@thi.ng/rstream/stream";
import { sync } from "@thi.ng/rstream/sync";
import { count } from "@thi.ng/transducers/count";
import { mapcat } from "@thi.ng/transducers/mapcat";
import { scan } from "@thi.ng/transducers/scan";

export const keyStreamConditional = fromDOMEvent(document, "keyup").transform(
    mapcat((x) => [x.key, null])
);
keyStreamConditional.next(<any>{});

export const scaleStream = reactive(1);
export const animationStream = reactive(true);
export const frameStreamConditional = fromRAF()
    .subscribe(sidechainToggle<number, boolean>(animationStream))
    .transform(scan(count()));

export type AppState = {
    scaleValue: number;
    animationValue: boolean;
    frameValue: number;
    keyValue: string | null;
};

export const mainStream = sync({
    src: {
        scaleValue: scaleStream,
        animationValue: animationStream,
        frameValue: frameStreamConditional,
        keyValue: keyStreamConditional,
    },
});
