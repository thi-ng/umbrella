// SPDX-License-Identifier: Apache-2.0
export interface WavSpec {
	/**
	 * Sample rate in Hz.
	 */
	sampleRate: number;
	/**
	 * Number of channels.
	 */
	channels: number;
	/**
	 * Number of samples (irrespective of channel count)
	 */
	length: number;
	/**
	 * Bits per sample
	 */
	bits: 8 | 16 | 24 | 32;
}
