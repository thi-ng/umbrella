import {
	AGen,
	adsr,
	biquadLP,
	filterFeedbackDelay,
	osc,
	pipe,
	product,
	sawAdditive,
	sin,
	svfLP,
	type ADSR,
	type IGen,
	type Osc,
	type SVF,
} from "@thi.ng/dsp";
import { clamp11 } from "@thi.ng/math";
import { SYSTEM, XsAdd, pickRandom } from "@thi.ng/random";
import { map, range } from "@thi.ng/transducers";

// sample frequency/rate (in Hz)
export const FS = 44100;

// global PRNG for reproducible results
export let SEED = 0xdecafbad;
const RND = new XsAdd(SEED);

export const randomizeSeed = () => {
	RND.seed((SEED = SYSTEM.int()));
	return SEED;
};

// compute frequency of C1, derived from A0 (27.5Hz = A4/(2^4) = 440/16)
// reference: https://newt.phys.unsw.edu.au/jw/notes.html
const C1 = 2 ** (3 / 12) * 27.5;

// Major scale (https://en.wikipedia.org/wiki/Equal_temperament)
// the numbers are semitone offsets within a single octave
const SCALE = [0, 2, 4, 5, 7, 9, 11];

// compute actual frequency for tone index in given scale
const freqForScaleTone = (i: number) =>
	2 ** (Math.floor(i / SCALE.length) + SCALE[i % SCALE.length] / 12) * C1;

// stochastic polyphonic synth/sequencer
// randomly triggers notes/voices mapped over specified octave range
// and yields stream of bounced (mixed down) samples of all voices
export class Sequencer extends AGen<number> {
	voices: Voice[];
	attackLFO: Osc;
	time = 0;

	constructor(
		baseOctave: number,
		numOctaves: number,
		public probability: number
	) {
		super(0);
		const numNotes = SCALE.length;
		const noteRange = numOctaves * numNotes;
		const maxGain = 4 / noteRange;
		this.voices = [
			...map(
				(i) =>
					new Voice(
						freqForScaleTone(i + baseOctave * numNotes),
						maxGain
					),
				range(noteRange)
			),
		];
		// LFO for modulating attack length
		this.attackLFO = osc(sin, 0.1 / FS, 0.15 * FS, 0.15 * FS);
	}

	next() {
		// always read next value from LFO
		const attackTime = this.attackLFO.next();
		// only tiny chance of new note/voice trigger per frame
		// (`N / FS` means statistically N triggers per second)
		if (RND.probability(this.probability)) {
			for (let i = this.voices.length * 2; i-- > 0; ) {
				// choose a random free(!) voice
				const voice = pickRandom(this.voices, RND);
				if (voice.isFree(this.time)) {
					// reset & play note
					voice.play(this.time, attackTime);
					break;
				}
			}
		}
		this.time++;
		// mixdown all voices & clamp to [-1..1] interval
		return clamp11(
			this.voices.reduce((acc, voice) => acc + voice.gen.next(), 0)
		);
	}
}

// an individual voice for the above synth/sequencer
class Voice {
	osc: Osc;
	env: ADSR;
	filter: SVF;
	gen: IGen<number>;
	lastTrigger: number;

	// creates & initializes a voice (aka oscillator + envelope) for given
	// frequency (in Hz). initial volume is set to zero.
	constructor(freq: number, maxGain: number) {
		// configure oscillator (try different waveforms, see thi.ng/dsp readme)
		// use frequency assigned to this voice (normalized to FS)
		this.osc = osc(sawAdditive(10), freq / FS, maxGain);
		// const voiceOsc = osc(saw, freq / FS, maxGain);

		// define volume envelope generator
		// https://en.wikipedia.org/wiki/Envelope_(music)#ADSR
		this.env = adsr({
			a: FS * 0.01,
			d: FS * 0.05,
			s: 0.8,
			slen: 0,
			r: FS * 0.5,
		});
		// turn down volume until activated
		this.env.setGain(0);
		// warm sounding lowpass filter (state variable filter)
		this.filter = svfLP(1000 / FS);
		// compose signal generator & processor pipeline:
		// multiply osc with envelope, then pass through filter and filter delay
		this.gen = pipe(
			product(this.osc, this.env),
			this.filter,
			// pick random delay length
			filterFeedbackDelay(
				(FS * pickRandom([0.25, 0.375, 0.5], RND)) | 0,
				biquadLP(1000 / FS, 1.1),
				0.66
			)
		);
		// mark voice as free/available
		this.lastTrigger = -Infinity;
	}

	play(time: number, attack: number) {
		// reset envelope & set attack time & volume
		this.env.reset();
		this.env.setAttack(attack);
		this.env.setGain(RND.minmax(0.2, 1));
		// pick random cutoff freq & resonance for voice's filter
		this.filter.setFreq(RND.minmax(200, 12000) / FS);
		this.filter.setQ(RND.minmax(0.5, 0.95));
		// update timestamp
		this.lastTrigger = time;
	}

	// returns true if voice is playable again (here arbitrarily after 0.5 seconds)
	isFree(time: number) {
		return time - this.lastTrigger > 0.5 * FS;
	}
}
