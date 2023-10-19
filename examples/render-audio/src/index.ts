import { download } from "@thi.ng/dl-asset";
import { adsr, product } from "@thi.ng/dsp";
import { wavByteArray } from "@thi.ng/dsp-io-wav";
import { fiber, timeSliceIterable } from "@thi.ng/fibers";
import {
	progress as $progress,
	button,
	div,
	h1,
	inputRange,
	option,
	select,
	span,
	type InputNumericAttribs,
} from "@thi.ng/hiccup-html";
import { SYSTEM } from "@thi.ng/random";
import { $compile, $inputNum } from "@thi.ng/rdom";
import { reactive, type ISubscription } from "@thi.ng/rstream";
import { U32, defFormat, float, int, percent } from "@thi.ng/strings";
import { map, take, throttleTime } from "@thi.ng/transducers";
import { FS, Sequencer } from "./audio";

interface Progress {
	total: number;
	rate: number;
}

// number of milliseconds per processing slice
const TIME_SLICE = 16;

// reactive state values
const progress = reactive<Progress>({ total: 0, rate: 0 });
const seed = reactive(0xdecafbad);
const duration = reactive(60);
const octaves = reactive(4);
const bpm = reactive(120);
const noteLength = reactive(0.5);
const probability = reactive(0.65);

// formatting template/function for displaying progress info
const fmtProgress = defFormat([
	percent(),
	" @ ~",
	int,
	"k samples/sec (",
	float(1),
	"x realtime)",
]);

// formatting template/function for WAV filename
// the different partials are used to format various synth params
const fmtFilename = defFormat([
	U32,
	"-",
	int,
	"sec-",
	int,
	"bpm-",
	int,
	"th-",
	int,
	"oct-",
	float(2),
	"prob",
	".wav",
]);

// run audio generation as fiber/co-routine as alternative to having to use a
// worker in order to not freeze the main browser UI due to long running task.
// (with the default settings, generating 60 secs of audio takes ~7-8 secs on my
// MBA M1 2021). the fiber uses a time slice operator to break up the generation
// into chunks of 16ms...
const generateAudio = () =>
	fiber(function* () {
		// convert seconds to samples
		const numSamples = duration.deref()! * FS;
		// pre-allocate sample buffer
		let samples = new Float32Array(numSamples);
		let offset = 0;
		// render audio in a time-sliced manner of chunks of `TIME_SLICE`
		// milliseconds. using `yield*` here will cause the main fiber to wait
		// until this render sub-process is complete
		yield* timeSliceIterable(
			// only take required number of samples (from infinite sequence)
			take(
				numSamples,
				// combine generated audio with a global envelope to fade
				// everything in & out at beginning/end
				product(
					new Sequencer({
						baseOctave: 1,
						numOctaves: octaves.deref()!,
						bpm: bpm.deref()!,
						noteLength: noteLength.deref()!,
						seed: seed.deref()!,
						probability: probability.deref()!,
					}),
					// global volume envelope, configured to user defined
					// duration with fade in/out
					adsr({
						a: 3 * FS,
						r: 3 * FS,
						slen: (duration.deref()! - 6) * FS,
						acurve: 10000,
						dcurve: 10000,
					})
				)
			),
			// consumer function: records a chunk of generated samples into the
			// main sample buffer and then updates progress (which in turn will
			// trigger an update of the UI progress bar)
			(chunk) => {
				samples.set(chunk, offset);
				offset += chunk.length;
				progress.next({
					total: offset / numSamples,
					rate: chunk.length,
				});
			},
			// time slice duration (default is ~60 fps)
			TIME_SLICE
		);
		// trigger file download
		download(
			// format filename from params
			fmtFilename(
				seed.deref(),
				duration.deref(),
				bpm.deref(),
				4 / noteLength.deref()!,
				octaves.deref(),
				probability.deref()
			),
			// file body: convert raw audio into WAV byte array
			wavByteArray(
				{ sampleRate: FS, channels: 1, length: numSamples, bits: 16 },
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
	return fmtProgress(total, perSecond / 1000, perSecond / FS);
};

const slider = (
	sub: ISubscription<number, number>,
	attribs: Partial<InputNumericAttribs>,
	...label: any[]
) =>
	div(
		".mt2",
		{},
		inputRange(".w-50", {
			...attribs,
			value: sub,
			oninput: $inputNum(sub),
		}),
		span(".ml2", {}, ...label)
	);

// create & mount minimal UI/DOM (given in thi.ng/hiccup format)
$compile(
	div(
		".w-100.w-50-l",
		{},
		h1({}, "Stochastic sequencer"),
		slider(
			duration,
			{ min: 10, max: 300, step: 10 },
			"duration: ",
			duration,
			" seconds"
		),
		slider(bpm, { min: 60, max: 160, step: 1 }, "tempo: ", bpm, " bpm"),
		div(
			".mt2",
			{},
			select(
				".w-50",
				{ onchange: $inputNum(noteLength) },
				option({ value: 1 }, "1/4"),
				option({ value: 0.5, selected: true }, "1/8"),
				option({ value: 0.25 }, "1/16")
			),
			span(".ml2", {}, "note length")
		),
		slider(octaves, { min: 1, max: 4, step: 1 }, "octaves: ", octaves),
		slider(
			probability,
			{
				min: 0.2,
				max: 1,
				step: 0.05,
			},
			"probability: ",
			probability.map(float(2))
		),
		slider(
			seed,
			{
				min: 1,
				max: 0xffff_ffff,
				step: 1,
			},
			seed.map((x) => `seed: 0x${U32(x)}`)
		),
		button(
			".mt2.w-50.db",
			{
				onclick: () => seed.next(SYSTEM.int()),
			},
			"Randomize seed"
		),
		button(
			".mt4.w-100.db",
			{
				onclick: generateAudio,
				// disable button during rendering
				disabled: progress.map(({ total }) => total > 0),
			},
			"Render audio"
		),
		// progress bar widget will auto-update via reactive `progess` state value
		$progress(".db.mv2.w-100", { value: progress.map((x) => x.total) }),
		div(
			".mb4.code.f7",
			{},
			// display formatted progress details, but at throttled framerate (4pfs)
			// to avoid flickering text
			progress.transform(throttleTime(250), map(formatProgress))
		)
	)
).mount(document.getElementById("app")!);
