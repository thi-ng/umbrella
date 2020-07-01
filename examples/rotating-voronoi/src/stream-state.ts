import {
    fromDOMEvent,
    fromRAF,
    reactive,
    sidechainToggle,
    sync,
} from "@thi.ng/rstream";
import { count, mapcat, scan } from "@thi.ng/transducers";

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

export const mainStream = sync<any, any>({
    src: {
        scaleValue: scaleStream,
        animationValue: animationStream,
        frameValue: frameStreamConditional,
        keyValue: keyStreamConditional,
    },
});
