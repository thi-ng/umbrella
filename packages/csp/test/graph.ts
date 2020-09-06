import type { IObjectOf } from "@thi.ng/api";
import { Channel, Mult } from "../src";
// import * as tx from "@thi.ng/transducers";

export interface Node {
    ins: IObjectOf<Channel<any>>;
    outs: IObjectOf<Mult<any>>;
    state: any;
}

export type NodeFn = (n: Node) => void;

export function node(
    id: string,
    ins: IObjectOf<Channel<any> | Mult<any>>,
    outs: string[],
    init: any,
    fn: NodeFn
) {
    const $: Node = {
        ins: <IObjectOf<Channel<any>>>{},
        outs: <IObjectOf<Mult<any>>>{},
        state: init || {},
    };
    for (let k of Object.keys(ins)) {
        const val = ins[k];
        $.ins[k] =
            val instanceof Channel
                ? ((val.id = k), val)
                : val instanceof Mult
                ? val.tap(new Channel(k))!
                : new Channel(k);
    }
    for (let o of outs) {
        $.outs[o] = new Mult(id + "-" + o);
    }
    (async () => {
        while (true) {
            let ports = Object.keys($.ins)
                .map((k) => $.ins[k])
                .filter((x) => !!x);
            let [x, c] = await Channel.select(ports);
            if (x === undefined) {
                break;
            }
            if ($.state[c.id] !== x) {
                $.state[c.id] = x;
                fn($);
            }
        }
        for (let i of Object.keys($.ins)) {
            $.ins[i].close();
        }
        for (let o of Object.keys($.outs)) {
            $.outs[o].close();
        }
        console.log(id, "done");
    })();
    return $;
}

export function add(
    id: string,
    ins?: IObjectOf<Channel<any> | Mult<any>>,
    init?: any
) {
    return node(
        id,
        Object.assign({ a: null, b: null }, ins),
        ["out"],
        init,
        (n) => {
            if (n.state.a && n.state.b) {
                n.outs.out.channel().write(n.state.a + n.state.b);
            }
        }
    );
}

export function mul(
    id: string,
    ins?: IObjectOf<Channel<any> | Mult<any>>,
    init?: any
) {
    return node(
        id,
        Object.assign({ a: null, b: null }, ins),
        ["out"],
        init,
        (n) => {
            if (n.state.a && n.state.b) {
                n.outs.out.channel().write(n.state.a * n.state.b);
            }
        }
    );
}

const add1 = add("add1", {}, { b: 100 });
const add2 = add("add2", { b: add1.outs.out }, { a: 1000 });
const mul1 = mul("mul1", { a: add2.outs.out, b: Channel.range(0, 10, 1, 500) });

mul1.outs.out
    .tap()!
    .consume(console.log)
    .then(() => (add1.ins.a.close(), add2.ins.a.close()));

(async () => {
    let i = 0;
    while (mul1.outs.out.channel()) {
        await add1.ins.a.write(i++);
        await Channel.sleep(100);
    }
})();
