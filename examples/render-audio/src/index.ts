import { download } from "@thi.ng/dl-asset";
import { adsr, product } from "@thi.ng/dsp";
import { wavByteArray } from "@thi.ng/dsp-io-wav";
import { fiber, timeSliceIterable } from "@thi.ng/fibers";
import { U32 } from "@thi.ng/hex";
import { $compile } from "@thi.ng/rdom";
import { reactive } from "@thi.ng/rstream";
import { take } from "@thi.ng/transducers";
import { FS, SEED, Sequencer, randomizeSeed } from "./audio";

// reactive state values
const progress = reactive(0);
const seed = reactive(SEED);

// run audio generation as fiber/co-routine as alternative to having to use a
// worker in order to not freeze the main browser UI due to long running task.
// (generating 60 secs of audio takes ~20-25 secs on my MBA M1 2021)
const generateAudio = (duration: number) =>
	fiber(function* () {
		// convert seconds to samples
		duration *= FS;
		// pre-allocate sample buffer
		let samples = new Float32Array(duration);
		let offset = 0;
		// render audio in a time-sliced manner of 16ms chunks.
		// using `yield*` here will cause the main fiber to wait until
		// this render sub-process is complete
		yield* timeSliceIterable(
			// only take required number of samples (from infinite sequence)
			take(
				duration,
				// combine generated audio with a global envelope to fade
				// everything in & out at beginning/end
				product(
					new Sequencer(1, 4, 4 / FS),
					adsr({
						a: 3 * FS,
						acurve: 10000,
						slen: 54 * FS,
						r: 3 * FS,
					})
				)
			),
			// consumer function: records a chunk of generated samples into the
			// main sample buffer and then updates progress (which in turn will
			// trigger an update of the UI progress bar)
			(chunk) => {
				samples.set(chunk, offset);
				offset += chunk.length;
				progress.next(offset / duration);
			},
			// time slice duration
			16
		);
		// convert raw audio into WAV byte array & trigger file download
		download(
			`audio-${Date.now()}.wav`,
			wavByteArray(
				{ sampleRate: FS, channels: 1, length: duration, bits: 16 },
				samples
			)
		);
		// reset progress
		progress.next(0);
	}).run();

// create & mount minimal UI/DOM (given in thi.ng/hiccup format)
$compile([
	"div",
	{},
	["h1", {}, "Stochastic sequencer"],
	[
		"button",
		{
			onclick: () => generateAudio(60),
			// disable button during rendering
			disabled: progress.map((x) => x > 0),
		},
		"Render audio",
	],
	[
		"button.ml2",
		{
			onclick: () => seed.next(randomizeSeed()),
			// disable button during rendering
			disabled: progress.map((x) => x > 0),
		},
		"Randomize seed",
	],
	// display seed as formatted hex value
	["span.ml2", {}, seed.map((x) => `0x${U32(x)}`)],
	// progress bar widget will auto-update via reactive `progess` state value
	["progress.db.mv2.w-100", { value: progress }],
]).mount(document.getElementById("app")!);
