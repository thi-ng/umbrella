import type { IEnable, IID, IObjectOf } from "@thi.ng/api";
import { implementsFunction } from "@thi.ng/checks";
import { map, type Transducer } from "@thi.ng/transducers";
import {
	Channel,
	Mult,
	type IBuffer,
	type IWriteableChannel,
} from "../src/index.js";

export type NodeInput =
	| NodeInputSpec
	| Channel<any>
	| Mult<any>
	| Transducer<any, any>;
export type NodeOutput = NodeOutputSpec | IWriteableChannel<any>;

export interface NodeInputSpec {
	src: Channel<any> | Mult<any>;
	buf?: number | IBuffer<any>;
	tx?: Transducer<any, any>;
}

export interface NodeOutputSpec {
	dest?: IWriteableChannel<any>;
	buf?: number | IBuffer<any>;
	tx?: Transducer<any, any>;
}

export interface NodeHandlers {
	shouldUpdate?: (node: Node) => boolean;
	update: (node: Node) => any;
}

export interface NodeSpec extends IID<string> {
	ins: IObjectOf<NodeInput>;
	outs: IObjectOf<NodeOutput>;
	impl: NodeHandlers;
	required?: string[];
	close?: boolean;
	reset?: boolean;
	state?: any;
}

export class Node implements IEnable<string>, IID<string> {
	static hasRequiredInputs(n: Node) {
		for (let i of n.required) {
			if (n.enabled[i] && n.state[i] === undefined) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Creates new input channel based on given port spec.
	 * If `buf` or `tx` are given, creates new channel (piped from src).
	 * If only `src` is given, returns it unmodified (if channel) or
	 * creates a new tap (if Mult).
	 *
	 * @param id - node id
	 * @param spec - node spec
	 */
	static inputFromSpec(id: string, spec: NodeInputSpec) {
		if (spec.buf || spec.tx) {
			const ch = new Channel(id, spec.buf!, spec.tx!);
			return spec.src instanceof Channel
				? spec.src.pipe(ch)
				: spec.src.tap(ch);
		} else {
			return spec.src instanceof Channel ? spec.src : spec.src.tap()!;
		}
	}

	static outputFromSpec(id: string, spec: NodeOutputSpec) {
		const mult = new Mult(
			<any>(
				(spec.buf || spec.tx
					? new Channel(id, spec.buf!, spec.tx!)
					: id)
			)
		);
		if (spec.dest) {
			mult.tap(spec.dest.channel());
		}
		return mult;
	}

	static NEXT_ID = 0;

	id: string;
	state: any;

	ins: IObjectOf<Channel<any>> = {};
	outs: IObjectOf<Mult<any>> = {};
	enabled: IObjectOf<boolean> = {};
	required: string[];
	autoClose: boolean;
	autoReset: boolean;
	impl: NodeHandlers;

	constructor(spec: NodeSpec) {
		this.id = spec.id;
		this.state = {};
		this.required = spec.required || Object.keys(spec.ins);
		this.autoClose = spec.close !== false;
		this.autoReset = spec.reset !== false;
		this.impl = spec.impl;
		this.impl.shouldUpdate =
			this.impl.shouldUpdate || Node.hasRequiredInputs;
		for (let i of Object.keys(spec.ins)) {
			this.addInput(i, spec.ins[i], spec.state[i]);
		}
		for (let o of Object.keys(spec.outs)) {
			this.addOutput(o, spec.outs[o]);
		}
		this.process();
	}

	addInput(id: string, val: NodeInput, init?: any) {
		this.ins[id] =
			val instanceof Channel
				? ((val.id = id), val)
				: val instanceof Mult
				? val.tap(new Channel(id))!
				: val == null || typeof val === "function"
				? new Channel(id, <any>val)
				: Node.inputFromSpec(id, val)!;
		if (init !== undefined) {
			this.state[id] = init;
			this.enabled[id] = val != null;
		} else {
			this.enabled[id] = true;
		}
	}

	addOutput(id: string, val: NodeOutput) {
		const spec = implementsFunction(val, "channel")
			? { dest: <IWriteableChannel<any>>val }
			: <NodeOutputSpec>val;
		const pid = this.id + "-" + id;
		this.outs[id] =
			spec != null ? Node.outputFromSpec(pid, spec) : new Mult(pid);
	}

	disable(id?: string) {
		if (id) {
			if (this.enabled[id] != null) {
				this.enabled[id] = false;
			}
		} else {
			for (let id of Object.keys(this.enabled)) {
				this.enabled[id] = false;
			}
		}
	}

	enable(id?: string) {
		if (id) {
			if (this.enabled[id] != null) {
				this.enabled[id] = true;
			}
		} else {
			for (let id of Object.keys(this.enabled)) {
				this.enabled[id] = true;
			}
		}
	}

	isEnabled(id?: string): boolean {
		if (id) {
			return !!this.enabled[id];
		} else {
			let ok = true;
			for (let id of Object.keys(this.enabled)) {
				ok = ok && this.enabled[id];
				if (!ok) {
					break;
				}
			}
			return ok;
		}
	}

	solo(...ids: string[]) {
		const sel = new Set(ids);
		for (let id of Object.keys(this.enabled)) {
			this.enabled[id] = sel.has(id);
		}
	}

	clearState() {
		for (let id of Object.keys(this.enabled)) {
			if (this.enabled[id]) {
				delete this.state[id];
			}
		}
	}

	protected async process() {
		while (true) {
			let ports = Object.keys(this.ins).map((k) => this.ins[k]);
			let [x, c] = await Channel.select(ports);
			if (x === undefined) {
				if (this.autoClose) {
					break;
				} else {
					continue;
				}
			}
			if (this.enabled[c.id]) {
				this.state[c.id] = x;
				if (this.impl.shouldUpdate!(this)) {
					await this.impl.update(this);
					this.autoReset && this.clearState();
				}
			}
		}
		for (let i of Object.keys(this.ins)) {
			this.ins[i].close();
		}
		for (let o of Object.keys(this.outs)) {
			this.outs[o].close();
		}
		console.log(this.id, "done");
	}
}

export interface AddSpec {
	id: string;
	ins: Partial<{ a: NodeInput; b: NodeInput }>;
	outs: Partial<{ out: NodeOutput }>;
	state: any;
	close: boolean;
	clear: boolean;
}

export function add(spec: Partial<AddSpec>) {
	return new Node({
		id: spec.id || `node-${Node.NEXT_ID++}`,
		state: Object.assign({}, spec.state),
		ins: <IObjectOf<NodeInput>>(
			Object.assign({ a: null, b: null }, spec.ins)
		),
		outs: <IObjectOf<NodeOutput>>Object.assign({ out: null }, spec.outs),
		close: spec.close,
		reset: spec.close,
		impl: {
			update: (n) => {
				const res = n.state.a + n.state.b;
				return n.outs.out.channel().write(res);
			},
		},
	});
}

export const res = new Channel("res");
export const a = add({ id: "a", state: { b: 42 } });
export const b = add({
	id: "b",
	ins: { a: { src: a.outs.out, tx: map((x) => x * 1) } },
	state: { b: 100 },
});
export const c = add({
	id: "c",
	ins: { a: b.outs.out, b: b.outs.out },
	outs: { out: res },
});

// b.disable("b");

a.outs.out.tap()!.consume();
b.outs.out.tap()!.consume();
c.outs.out.tap()!.consume();
res.consume();

Channel.range(10).pipe(a.ins.a);
