import {
    stream,
    fromRAF,
    sidechainToggle,
    fromDOMEvent,
    sync
} from "@thi.ng/rstream";
import { map, mapcat, scan, add } from "@thi.ng/transducers";

export const keyStream = fromDOMEvent(document, "keyup");
export const keyStreamConditional = keyStream.transform(
    mapcat((x) => [x.key, null])
);

export const scaleStream = stream<number>();
export const animationStream = stream<boolean>();
export const frameStream = fromRAF();
export const frameStreamConditional = frameStream
    .subscribe(sidechainToggle<number, boolean>(animationStream))
    .transform(map(() => 1), scan(add()));

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
        keyValue: keyStreamConditional
    }
});
