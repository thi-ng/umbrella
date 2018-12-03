import { renderOnce } from "@thi.ng/hdom/render-once";
import { clamp } from "@thi.ng/math/interval";
import { fromEvent } from "@thi.ng/rstream/from/event";
import { fromInterval } from "@thi.ng/rstream/from/interval";
import { stream } from "@thi.ng/rstream/stream";
import { sync } from "@thi.ng/rstream/stream-sync";
import { padLeft } from "@thi.ng/strings/pad-left";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { reducer } from "@thi.ng/transducers/reduce";
import { dedupe } from "@thi.ng/transducers/xform/dedupe";
import { map } from "@thi.ng/transducers/xform/map";
import { scan } from "@thi.ng/transducers/xform/scan";
import { sideEffect } from "@thi.ng/transducers/xform/side-effect";
import { app, printApp } from "./components";
import { ctx } from "./config";
import { SLIDES } from "./slides";

const INTERACTIVE = true;

const D2 = padLeft(2, "0");

const initKeys = (stream) =>
    fromEvent(window, "keydown").transform(
        map((e: KeyboardEvent) => {
            // console.log(e.code);
            switch (e.code) {
                case "KeyR":
                    stream.next(-1000);
                    break;
                case "ArrowLeft":
                    stream.next(-1);
                    break;
                case "ArrowRight":
                case "Space":
                    stream.next(1);
                    break;
            }
        })
    );

const parseSlideID = (str: string) => {
    const id = parseInt(str);
    return isNaN(id) ? 0 : id;
};

const slideCTRL = ctx.slide = stream<number>();
const slideID = slideCTRL.transform(
    scan(reducer(() => 0, (x, y) => clamp(x + y, 0, SLIDES.length - 1))),
    dedupe(),
    sideEffect((id) => (location.hash = "#" + id))
);

const main = sync({
    src: {
        slideID,
        content: slideID.transform(map((id: number) => SLIDES[id])),
        time: fromInterval(1000).transform(map((x: number) => `${D2((x / 60) | 0)}:${D2(x % 60)}`)),
    }
});

if (INTERACTIVE) {
    main.transform(
        map(app(SLIDES.length, ctx)),
        updateDOM({ ctx }),
    );
    initKeys(slideCTRL);
    slideCTRL.next(parseSlideID(location.hash.substr(1)));
} else {
    renderOnce(() => [printApp, SLIDES], { ctx });
}

if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(() => {
        slideCTRL.done();
        main.done();
    });
}
