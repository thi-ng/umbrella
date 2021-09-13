import { weightedRandom } from "@thi.ng/random/weighted-random";
import { range } from "@thi.ng/transducers/iter/range";
import { map } from "@thi.ng/transducers/xform/map";
import { updateAudio } from "./audio";
import { NUM_BINS } from "./config";
import { DB, updateSpectrumBin } from "./state";

const weights = [
    0,
    ...map(
        (x) => 1 - Math.pow((x - 1) / NUM_BINS, 0.15) * 0.99,
        range(1, NUM_BINS)
    ),
];

const rnd = weightedRandom([...range(0, NUM_BINS)], weights);

const startAutoMode = () => {
    let i = 0;
    DB.resetIn(
        ["auto"],
        setInterval(() => {
            let { decay, attenuate, interval } = DB.value;
            attenuate = 1 + attenuate;
            DB.swapIn(["bins"], (buf: number[]) =>
                buf.map((x, i) => (x * decay) / attenuate ** i)
            );
            if (i % interval === 0) {
                const bin = rnd();
                updateSpectrumBin(
                    bin,
                    Math.random() * (1 - Math.pow((bin - 1) / NUM_BINS, 0.8))
                );
            }
            updateAudio();
            i++;
        }, 16)
    );
};

const stopAutoMode = () => {
    clearInterval(DB.value.auto);
    DB.resetIn(["auto"], null);
};

export const toggleAutoMode = () =>
    DB.value.auto == null ? startAutoMode() : stopAutoMode();
