import * as tx from "@thi.ng/transducers";
import * as fs from "fs";
import { Channel, Mult } from "../src/index.js"

// compose transducer to split source file into words
// and filter out short strings
const proc: tx.Transducer<string, string> = tx.comp(
    tx.mapcat((src: string) => src.toLowerCase().split(/[^\w]+/g)),
    tx.filter((w: string) => w.length > 1)
);

// define a channel which receives file paths
// and resolves them with their contents
const paths = new Channel<any>(
    tx.map(
        (path: string) =>
            new Promise<string>((resolve) =>
                fs.readFile(path, (_, data) => resolve(data.toString()))
            )
    )
);

// define multiplexed output channel
// items in this channel will have this form: `[word, count]`
const results = new Mult<[string, number]>("results");

// tap result channel and sum word counts
const counter = results.tap(tx.map((x) => x[1]))!.reduce(tx.add());

// 2nd output channel with streaming sort transducer
// (using a sliding window size of 500 items) and dropping
// words with < 20 occurrences
const sorted = results.tap(
    tx.comp(
        tx.streamSort(500, { key: (x) => x[1] }),
        tx.dropWhile((x) => x[1] < 20)
    )
)!;

// define workflow:
// pipe source files into a new channel and
// reduce this channel using `frequencies` reducer
// finally stream the result map (word frequencies)
// into the `sorted` channel
// (`freqs` is a JS Map and is iterable)
paths
    .pipe(proc)
    .reduce(tx.frequencies())
    .then((freqs) => results.channel().into(freqs));

// kick off process by writing file paths into the 1st channel
paths.into(["src/channel.ts", "src/mult.ts", "src/pubsub.ts"]);

// start tracing sorted outputs and
// wait for all to finish
Promise.all([sorted.consume(), counter]).then(([_, num]) =>
    console.log("total words:", num)
);
