import type { IDeref } from "@thi.ng/api";
import { div } from "@thi.ng/hiccup-html";
import { $compile } from "@thi.ng/rdom";
import { $canvas } from "@thi.ng/rdom-canvas";
import { compileForm, container, range } from "@thi.ng/rdom-forms";
import {
	fromDOMEvent,
	fromRAF,
	reactive,
	sync,
	type ISubscription,
} from "@thi.ng/rstream";
import { map, slidingWindow } from "@thi.ng/transducers";

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
			{
				// clear canvas before drawing (see rdom-canvas readme)
				__clear: true,
				fill: "purple",
				translate: [width / 2, height / 2],
			},
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
		compileForm(
			container(
				{ class: "w-70-m w-50-l center-ns ma3" },
				range({
					value: a,
					label: "Curve A",
					min: 0,
					max: 10,
					step: 0.1,
				}),
				range({
					value: b,
					label: "Curve B",
					min: 0,
					max: 10,
					step: 0.1,
				}),
				range({
					value: num,
					label: "Trail length",
					min: 1,
					max: 100,
					vlabel: 0,
				}),
				range({
					value: radius,
					label: "Dot radius",
					min: 1,
					max: 50,
					vlabel: 0,
				}),
				range({
					value: scale,
					label: "Scale",
					min: 0,
					max: 1,
					step: 0.01,
				})
			),
			{
				wrapperAttribs: {
					style: {
						display: "grid",
						"grid-template-columns": "1fr 2fr",
						gap: "0.5rem",
					},
				},
				labelAttribs: { class: "v-top" },
				typeAttribs: {
					range: { class: "w-70" },
					rangeLabel: { class: "dib pl3 v-top tr" },
				},
			}
		),
		// subscribe canvas component to above reactive value
		$canvas(dots, size)
	)
).mount(document.body);
