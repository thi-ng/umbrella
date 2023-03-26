import type { IDeref } from "@thi.ng/api";
import { INFORMATION, withSize } from "@thi.ng/hiccup-carbon-icons";
import { div, inputRange, label } from "@thi.ng/hiccup-html";
import { $compile } from "@thi.ng/rdom";
import { $canvas } from "@thi.ng/rdom-canvas";
import {
	fromDOMEvent,
	fromRAF,
	reactive,
	sync,
	type ISubscription,
} from "@thi.ng/rstream";
import { map, slidingWindow } from "@thi.ng/transducers";

const slider = (
	dest: ISubscription<number, number>,
	desc: string,
	tooltip: string,
	attribs?: any
) =>
	div(
		null,
		label(
			{ class: "dib w-50", for: `input-${desc}` },
			["i.mr2", { data: { tooltip } }, withSize(INFORMATION, "12px")],
			`${desc}: `,
			dest.transform(map((x) => x.toFixed(2)))
		),
		inputRange({
			id: `input-${desc}`,
			class: "dib w-50",
			min: 0,
			max: 10,
			step: 0.1,
			...attribs,
			value: dest,
			oninput: (e: InputEvent) =>
				dest.next(parseFloat((<HTMLInputElement>e.target).value)),
		})
	);

const lissajous = (
	a: number,
	b: number,
	d: number,
	scale: number,
	t: number
) => [scale * Math.sin(a * t + d), scale * Math.sin(b * t)];

const a = reactive(3);
const b = reactive(4);
const num = reactive(25);
const scale = reactive(0.5);
const radius = reactive(20);
const size = fromDOMEvent(window, "resize").transform(
	map(() => [window.innerWidth, window.innerHeight - 100])
);
size.next(<any>null);

// combine various reactive parameters
// and transform via transducers
const dots: ISubscription<any, any[]> = sync({
	src: { a, b, scale, size, time: fromRAF() },
}).transform(
	// compute next lissajous point
	map(({ a, b, time, scale, size }) =>
		lissajous(
			a,
			b,
			Math.PI / 4,
			(scale / 2) * Math.min(size[0], size[1]),
			time * 0.05
		)
	),
	// only keep `num` last points
	slidingWindow(<IDeref<number>>num, true),
	// transform into a group of hiccup circle shapes
	// (drawing done thi.ng/hdom-canvas)
	map((points: number[][]) => {
		const [width, height] = size.deref()!;
		const r = radius.deref()!;
		return [
			"g",
			{ fill: "purple", translate: [width / 2, height / 2] },
			points.map((pos, i) => [
				"circle",
				{ alpha: (i + 1) / points.length },
				pos,
				(r * (i + 1)) / points.length,
			]),
		];
	})
);

// compile UI/DOM component from hiccup syntax
$compile(
	div(
		null,
		div(
			{ class: "w-50-ns center-ns ma3" },
			slider(a, "A", "Curve parameter"),
			slider(b, "B", "Curve parameter"),
			slider(num, "Length", "Trail length / number of dots", {
				min: 1,
				max: 100,
				step: 1,
			}),
			slider(radius, "Radius", "Dot radius", {
				min: 1,
				max: 50,
			}),
			slider(scale, "Scale", "Scale factor", {
				max: 1,
				step: 0.01,
			})
		),
		// subscribe canvas component to above reactive value
		$canvas(dots, size)
	)
).mount(document.body);
