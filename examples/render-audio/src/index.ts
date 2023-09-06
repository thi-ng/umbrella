import { download } from "@thi.ng/dl-asset";
import { adsr, product } from "@thi.ng/dsp";
import { wavByteArray } from "@thi.ng/dsp-io-wav";
import { fiber, timeSliceIterable } from "@thi.ng/fibers";
import { $compile } from "@thi.ng/rdom";
import { reactive } from "@thi.ng/rstream";
import { U32, float, percent } from "@thi.ng/strings";
import { map, take, throttleTime } from "@thi.ng/transducers";
import { FS, SEED, Sequencer, randomizeSeed } from "./audio";

interface Progress {
	total: number;
	rate: number;
}

// number of milliseconds per processing slice
const TIME_SLICE = 16;

// reactive state values
const progress = reactive<Progress>({ total: 0, rate: 0 });
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
				progress.next({ total: offset / duration, rate: chunk.length });
			},
			// time slice duration (~60 fps)
			TIME_SLICE
		);
		// convert raw audio into WAV byte array & trigger file download
		download(
			`audio-0x${U32(SEED)}.wav`,
			wavByteArray(
				{ sampleRate: FS, channels: 1, length: duration, bits: 16 },
				samples
			)
		);
		// reset progress
		progress.next({ total: 0, rate: 0 });
	}).run();

// format progress & derived stats
const formatProgress = ({ total, rate }: Progress) => {
	if (!total) return "";
	const perSecond = rate * (1000 / TIME_SLICE);
	return `${percent(0)(total)} @ ~${~~(
		perSecond / 1000
	)}k samples/sec (${float(1)(perSecond / FS)}x realtime)`;
};

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
			disabled: progress.map(({ total }) => total > 0),
		},
		"Render audio",
	],
	[
		"button.ml2",
		{
			onclick: () => seed.next(randomizeSeed()),
			// disable button during rendering
			disabled: progress.map(({ total }) => total > 0),
		},
		"Randomize seed",
	],
	// display seed as formatted hex value
	["code.ml2.f7", {}, seed.map((x) => `seed: 0x${U32(x)}`)],
	// progress bar widget will auto-update via reactive `progess` state value
	["progress.db.mv2.w-100", { value: progress.map((x) => x.total) }],
	[
		"div.mb4.code.f7",
		{},
		// display progress details, but at throttled framerate (4fps)
		// (to avoid flickering text)
		progress.transform(throttleTime(250), map(formatProgress)),
	],
]).mount(document.getElementById("app")!);
