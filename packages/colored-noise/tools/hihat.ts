import { green } from "@thi.ng/colored-noise";
import { adsr, iterable, product } from "@thi.ng/dsp";
import { wavByteArray } from "@thi.ng/dsp-io-wav";
import { writeFileSync } from "fs";

const FS = 44100;

const signal = product(
    // wrap green noise as IGen
    iterable(green(16), 0),
    // apply gain envelope
    adsr({ a: 0.005 * FS, d: 0.2 * FS, s: 0 })
);

// output as WAV file
writeFileSync(
    "export/hihat.wav",
    wavByteArray(
        { bits: 16, channels: 1, length: 0.2 * FS, sampleRate: FS },
        signal
    )
);
