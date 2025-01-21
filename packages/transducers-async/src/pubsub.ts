// SPDX-License-Identifier: Apache-2.0
import type { Fn } from "@thi.ng/api";
import { MSub } from "./mult.js";

export const pubsub = <K, V>(src: AsyncIterable<V>, topicFn: Fn<V, K>) =>
	new PubSub<K, V>(src, topicFn);

export class PubSub<K, V> {
	protected topics: Map<K, MSub<V>[]> = new Map();
	protected isActive = false;

	constructor(public src: AsyncIterable<V>, public topicFn: Fn<V, K>) {}

	/**
	 * Creates a new subscription (aka custom `AsyncIterable`) which will
	 * receive any future values from `src` matching given topic `id`. The
	 * returned subscription can be removed again via
	 * {@link PubSub.unsubscribeTopic}.
	 */
	subscribeTopic(id: K): AsyncIterable<V> {
		const sub = new MSub<V>();
		let subs = this.topics.get(id);
		if (!subs) {
			this.topics.set(id, (subs = []));
		}
		subs.push(sub);
		if (!this.isActive) {
			this.isActive = true;
			this.process();
		}
		return sub;
	}

	/**
	 * Attempts to remove given child subscription (presumably created via
	 * {@link PubSub.subscribeTopic}). Returns true if removal was successful.
	 *
	 * @param sub
	 */
	unsubscribeTopic(id: K, sub: AsyncIterable<V>) {
		const subs = this.topics.get(id);
		if (!subs) return false;
		const idx = subs.findIndex((x) => x === sub) ?? -1;
		if (idx >= 0) {
			subs.splice(idx, 1);
			(<MSub<V>>sub).resolve(undefined);
			return true;
		}
		return false;
	}

	protected async process() {
		for await (let val of this.src) {
			const topic = this.topicFn(val);
			const subs = this.topics.get(topic);
			if (!subs?.length) continue;
			for (let s of subs) s.resolve(val);
			await Promise.all(subs.map((x) => x.notifyP));
		}
		for (let subs of this.topics.values()) {
			for (let s of subs) s.resolve(undefined);
		}
		this.topics.clear();
		this.isActive = false;
	}
}
