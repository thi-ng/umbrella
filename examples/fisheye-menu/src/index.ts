import { anchor, li, ul, type Attribs } from "@thi.ng/hiccup-html";
import { clamp, lens } from "@thi.ng/math";
import { $compile } from "@thi.ng/rdom";
import { reactive } from "@thi.ng/rstream";
import { tags } from "./tags.js";

interface FisheyeOpts {
	attribs?: Partial<Attribs>;
	/**
	 * Menu items
	 */
	items: string[];
	/**
	 * Menu height (in CSS pixels)
	 */
	height: number;
	/**
	 * Lens dilation strength, [0..1] interval
	 *
	 * @defaultValue 0.7
	 */
	dilate?: number;
	/**
	 * Normalized margin (for clamping focal point)
	 *
	 * @defaultValue 0.001
	 */
	eps?: number;
}

/**
 * Fisheye menu list component with support for mouse & touch events and
 * keyboard navigation.
 *
 * @remarks
 * Ported from several old toxiclibs & thi.ng projects & examples, using
 * customizable `lens()` interpolation:
 *
 * References:
 *
 * - https://docs.thi.ng/umbrella/math/functions/lens.html
 * - https://github.com/thi-ng/geom/blob/feature/no-org/org/src/viz/core.org#lens-scale-dilating--bundling
 * - https://github.com/postspectacular/toxiclibs/blob/master/examples/core/interpolation/ZoomLens/ZoomLens.pde
 * - https://github.com/postspectacular/toxiclibs/blob/master/examples/core/mapping/TextHistogram/TextHistogram.pde
 *
 * @param opts
 */
const fisheye = ({
	attribs,
	items,
	height,
	dilate = 0.7,
	eps = 0.001,
}: FisheyeOpts) => {
	const num = items.length;
	const num1 = num - 1;
	const inveps = 1 - eps;
	const ypos = reactive(0.5);
	const updatePos = (y: number, el: Element) => {
		while (!(el instanceof HTMLUListElement)) el = el.parentElement!;
		ypos.next(
			clamp((y - el.getBoundingClientRect().top) / height, eps, inveps)
		);
	};
	return ul(
		{
			...attribs,
			style: { height: height + "px" },
			onmousemove: (e) => updatePos(e.clientY, <Element>e.target),
			ontouchmove: (e) => {
				updatePos(e.touches[0].clientY, <Element>e.target);
				e.preventDefault();
			},
		},
		...items.map((item, i) =>
			li(
				{
					style: ypos.map((y) => {
						const y1 = height * lens(y, dilate, i / num);
						const y2 = height * lens(y, dilate, (i + 1) / num);
						return {
							"--height": `${(y2 - y1) | 0}px`,
							top: `${y1 | 0}px`,
						};
					}),
				},
				anchor(
					{
						href: `#${item}`,
						onfocus: () => ypos.next(clamp(i / num1, eps, inveps)),
					},
					item
				)
			)
		)
	);
};

$compile(
	fisheye({
		attribs: { class: "fisheye" },
		height: window.innerHeight - 32,
		items: tags,
	})
).mount(document.getElementById("app")!);
