import { fromAtom } from "@thi.ng/rstream/from/atom";
import { fromInterval } from "@thi.ng/rstream/from/interval";
import { sync } from "@thi.ng/rstream/stream-sync";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { map } from "@thi.ng/transducers/xform/map";
import { app } from "./app";
import { state } from "./state";

// combine streams of atom values & timer
const ui = sync({
    src: {
        state: fromAtom(state),
        now: fromInterval(1000).transform(map((_) => new Date()))
    }
});
// then transform using root component function
// and hdom differential DOM updater
ui.transform(map(app), updateDOM());

// HMR handling
const hot = (<any>module).hot;
if (hot) {
    // terminate existing UI stream before applying updated module
    hot.dispose(() => ui.unsubscribe());
    // accept hot updates for app.ts & self
    hot.accept('./app.ts');
    hot.accept();
}
