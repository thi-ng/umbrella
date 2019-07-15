import {
    stream,
    fromRAF,
    sidechainToggle,
    fromDOMEvent,
    sync
} from "@thi.ng/rstream";
import { Transducer, Reducer, map, comp, mapcat } from "@thi.ng/transducers";

function increment(initialValue: number = 0): Transducer<number, number> {
    let frame = initialValue;
    return (rfn: Reducer<number, number>) => [
        () => rfn[0](),
        (acc) => rfn[1](acc),
        (acc) => rfn[2](acc, frame++)
    ];
}

export const keyStream = fromDOMEvent(document, "keyup");
export const keyStreamConditional = keyStream.transform(
    comp(map((x) => [x.key, null]), mapcat((x) => x))
);

export const scaleStream = stream<number>();
export const animationStream = stream<boolean>();
export const frameStream = fromRAF();
export const frameStreamConditional = frameStream
    .subscribe(sidechainToggle<number, boolean>(animationStream))
    .transform(increment());

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
