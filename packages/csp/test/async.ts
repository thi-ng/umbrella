import * as tx from "@thi.ng/transducers";
import { Channel, PubSub } from "../src/index.js"

async function pingpong() {
    async function ping(ch: Channel<number>) {
        for (let i = 0; i < 10; i++) {
            await ch.write(i);
        }
        ch.close();
        console.log("ping done");
    }

    async function pong(id: number, ch: Channel<number>) {
        let x;
        while ((x = await ch.read()) !== undefined) {
            console.log("take", id, x);
        }
        console.log("pong", id, "done");
        done.write(true);
    }

    const a = new Channel<number>();
    const b = a.pipe(tx.map((x) => x * 10));
    const done = new Channel();
    ping(a);
    pong(1, b);
    pong(2, b);
    pong(3, b);
    await done.read();
    await done.read();
    await done.read();
    done.close();
}

async function alts() {
    const a = new Channel<number>("a");
    const b = new Channel<number>("b");
    const c = Channel.timeout(50);
    setTimeout(() => a.write(23), 50);
    setTimeout(() => b.write(42), 50);
    let [x, ch] = await Channel.select([a, b, c]);
    console.log("selected", ch.id, x);
}

async function throttle(d1: number, d2: number) {
    const a = Channel.range(0, 1000, 1, d1);
    const done = new Channel();
    const t0 = Date.now();
    a.pipe(tx.throttleTime(d2))
        .consume((x) => console.log("throttled", x, Date.now() - t0))
        .then(() => {
            console.log("throttle done");
            done.close();
        });
    await done.read();
}

async function pubsub() {
    const pub = new PubSub(
            new Channel<any>(
                "users",
                tx.map((x: string) => ({ type: x.charAt(0), val: x }))
            ),
            (x) => x.type
        ),
        done = new Channel(),
        topics = "abc";
    for (let i of topics) {
        pub.sub(i)!
            .consume()
            .then(() => done.write(i));
    }
    // pub.sub("*").consume();
    await pub.channel().into(["alice", "bert", "bella", "charlie", "arthur"]);
    for (let i of topics) {
        console.log("waiting for", i);
        await done.read();
    }
    console.log("---");
}

async function transducers() {
    let ch = new Channel<any>(tx.comp(tx.partition(2, true), tx.take(3)));
    ch.into([1, 2, 2, 2, 1, 5, 3, 3]);
    await ch.consume();
    console.log("---");
    ch = new Channel<any>(tx.comp(tx.take(3), tx.partition(2, true)));
    ch.into([1, 2, 2, 2, 1, 5, 3, 3]);
    await ch.consume();
    const src = [5, 2, 8, 10, 20, 15, 12, 18, 27, 78, 35, 16, 2, 99, 123, 42];
    ch = Channel.from<number>(src, <any>tx.delayed(100)).pipe(tx.streamSort(8));
    await ch.consume();
}

async function main() {
    await pingpong();
    await alts();
    await throttle(0, 100);
    await pubsub();
    await transducers();
    console.log("main done");
}

main();
