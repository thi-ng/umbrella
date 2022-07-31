import type { IDeref } from "@thi.ng/api";
import { defAtom } from "@thi.ng/atom/atom";
import { canvas2D } from "@thi.ng/hdom-components/canvas";
import { dropdown } from "@thi.ng/hdom-components/dropdown";
import { start } from "@thi.ng/hdom/start";
import { serialize } from "@thi.ng/hiccup/serialize";

// basic state container
const state = defAtom<any>({
	bg: "red",
	freq: 0.01,
});

// state updates
const setBg = (x: string) => state.resetIn(["bg"], x);
const setFreq = (x: number) => state.resetIn(["freq"], x);

// root component with different types of child components
const app = () => {
	// HOF canvas component w/ life cycle methods see for further
	// reference:
	// https://docs.thi.ng/umbrella/hdom-components/modules.html#canvas2D
	//
	// when serializing to html only the component's `render` method
	// will be invoked. the component's `init` is invoked later when
	// hydrating the DOM the `update` fn given here is canvas specific
	const canvas = canvas2D({
		update: (el, ctx, _, time, __, ___, bg, freq) => {
			const y = el.height / 2;
			ctx.fillStyle = bg;
			ctx.fillRect(0, 0, el.width, el.height);
			ctx.strokeStyle = "white";
			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.moveTo(0, y + y * Math.sin(time * freq));
			for (let x = 5; x < el.width; x += 5) {
				ctx.lineTo(x, y + y * Math.sin((time + x) * freq));
			}
			ctx.stroke();
		},
	});
	// when serializing to HTML all event attributes w/ function values
	// will be excluded, however the event listeners will be attached
	// during hydration (1st frame of hdom update loop)

	// btw. the class names are for tachyons css
	return (_state: IDeref<any>) => {
		const state = _state.deref();
		return [
			"div#root.w-50-ns.flex.ma2.sans-serif",
			[
				"div.w-50-ns",
				[canvas, { width: 200, height: 200 }, state.bg, state.freq],
			],
			[
				"div.w-50-ns",
				[
					"label.db.mb3",
					{ for: "#bg" },
					"Background color",
					[
						dropdown,
						{
							id: "bg",
							class: "w-100",
							onchange: (e: Event) =>
								setBg((<HTMLSelectElement>e.target).value),
						},
						[
							["", "Choose..."],
							["red", "Red"],
							["green", "Green"],
							["blue", "Blue"],
						],
						state.bg,
					],
				],
				[
					"label.db.mb3",
					{ for: "#freq" },
					"Frequency",
					[
						"input",
						{
							id: "freq",
							class: "w-100",
							type: "range",
							min: 0.001,
							max: 0.02,
							step: 0.001,
							value: state.freq,
							oninput: (e: Event) =>
								setFreq(
									parseFloat(
										(<HTMLInputElement>e.target).value
									)
								),
						},
					],
				],
			],
		];
	};
};

// emulate SSR by serializing to HTML
const html = serialize(app()(state), null, false, true);
document.getElementById("app")!.innerHTML = html;
console.log(html);

// ..then start hdom update loop w/ hydrate enabled
start(app(), { hydrate: true, ctx: state });
