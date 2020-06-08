import {
    fromDOMEvent,
    fromRAF,
    sidechainToggle,
    stream,
    sync,
} from "@thi.ng/rstream";
import { add, map, mapcat, scan } from "@thi.ng/transducers";

export const keyStreamConditional = fromDOMEvent(document, "keyup").transform(
    mapcat((x) => [x.key, null])
);

export const scaleStream = stream<number>();
export const animationStream = stream<boolean>();
export const frameStreamConditional = fromRAF()
    .subscribe(sidechainToggle<number, boolean>(animationStream))
    .transform(
        map(() => 1),
        scan(add())
    );

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
