import type { Maybe } from "@thi.ng/api";
import { Channel, Mult, channel, mult } from "@thi.ng/csp";
import { button, div, progress } from "@thi.ng/hiccup-html";
import { Component, type NumOrElement } from "@thi.ng/rdom";
import { map } from "@thi.ng/transducers-async";
import type { EventBus } from "./api.js";

// counter component with local state in the form of CSP channels
export class Counter extends Component {
	value: Mult<number>;
	disabled: Channel<boolean>;

	constructor(public bus: EventBus, public delay: number, public id: number) {
		super();
		this.value = mult<any>();
		this.disabled = channel<boolean>();
		this.value.write(0);
		this.disabled.write(false);
	}

	// thi.ng/rdom component lifecycle hook
	// called when this component is mounted in the browser DOM
	async mount(parent: ParentNode, index?: Maybe<NumOrElement>) {
		return (this.el = await this.$compile(
			div(
				".counter",
				{},
				button(
					{
						disabled: this.disabled,
						onclick: () => this.bus.write(["start-counter", this]),
					},
					"start"
				),
				progress({
					max: 100,
					value: this.value.subscribe(),
				}),
				map((x) => `${x}%`, this.value.subscribe())
			)
		).mount(parent, index));
	}
}

// simple wrapper component for multiple counters (configurable number)
export class CounterGroup extends Component {
	constructor(public config: number[], public bus: EventBus) {
		super();
	}

	async mount(parent: ParentNode, index?: Maybe<NumOrElement>) {
		return (this.el = await this.$compile(
			div(
				{},
				...this.config.map(
					(delay, i) => new Counter(this.bus, delay, i + 1)
				)
			)
		).mount(parent, index));
	}
}

// syntax sugar for CounterGroup ctor
export const initCounters = async (config: number[], bus: EventBus) =>
	new CounterGroup(config, bus);
