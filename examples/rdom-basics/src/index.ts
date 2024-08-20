import { isString } from "@thi.ng/checks";
import { delayed } from "@thi.ng/compose";
import { px } from "@thi.ng/hiccup-css";
import { button, div, h1, header, li, span } from "@thi.ng/hiccup-html";
import { SYSTEM, pickRandomUnique } from "@thi.ng/random";
import { $compile, $list, $replace } from "@thi.ng/rdom";
import {
	fromDOMEvent,
	fromInterval,
	fromIterable,
	metaStream,
	stream,
	sync,
	toggle,
} from "@thi.ng/rstream";
import { choices, dedupe, map, take } from "@thi.ng/transducers";

const blur = toggle(false);
const body = stream<string>();
const date = fromInterval(1000).transform(map(() => new Date()));
const items = stream<any[]>();

const typewriter = (min: number, max: number) => (src: string) =>
	stream<string>((s) => {
		let active = true;
		(async () => {
			for (let i = 1; active && i <= src.length; i++) {
				s.next(src.substring(0, i));
				await delayed(null, SYSTEM.minmax(min, max));
			}
			s.done();
		})();
		return () => (active = false);
	});

const names = [
	"TypeScript",
	"@thi.ng/rdom",
	"@thi.ng/rstream",
	"mastodon.thi.ng",
	"toxi",
];

const typing = fromIterable(dedupe(choices(names)), { delay: 2000 }).subscribe(
	metaStream(typewriter(16, 100), { closeOut: "never" })
);

const itemChoices = [date.map((d) => d.toISOString()), body, typing, ...names];

const randomizeBody = () =>
	body.next(pickRandomUnique(1, names, [body.deref()!])[1]);

const randomizeList = () =>
	items.next([...take(SYSTEM.minmaxInt(100, 500), choices(itemChoices))]);

const demoButton = (onclick: EventListener, label: string) =>
	button({ onclick }, label);

const mpos = fromDOMEvent(window, "mousemove").map((e) => [e.pageX, e.pageY]);

randomizeBody();
randomizeList();

$compile(
	div(
		{},
		h1(
			{
				class: { blur },
				style: mpos.map(([x, y]) => ({ left: px(x), top: px(y) })),
			},
			$replace(
				sync({
					src: { body, mpos },
					xform: map((x) =>
						span({}, x.body, span(".subtitle", {}, `[${x.mpos}]`))
					),
				})
			)
		),
		header(
			{},
			demoButton(() => blur.next(), "toggle blur"),
			demoButton(randomizeBody, "randomize title"),
			demoButton(randomizeList, "randomize list")
		),
		div(".date", {}, date),
		div(
			".stats",
			{},
			items.map((x) => `${x.length} items`)
		),
		$list(items, "ul", {}, (x) =>
			li(
				{
					class: isString(x)
						? "item-string"
						: x === typing
						? "item-typing"
						: "item-default",
				},
				x
			)
		)
	)
).mount(document.getElementById("app")!);
