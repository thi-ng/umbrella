// SPDX-License-Identifier: Apache-2.0
import { serialize } from "@thi.ng/hiccup";
import { anchor, div, span, type Attribs } from "@thi.ng/hiccup-html";
import { MIME_IMAGE_COMMON } from "@thi.ng/mime/presets";
import { imageFromFile } from "@thi.ng/pixel";
import { $compile, $refresh } from "@thi.ng/rdom";
import * as f from "@thi.ng/rdom-forms";
import { reactive, sync, type ISubscribable } from "@thi.ng/rstream";

export interface ThumbnailOpts {
	root: Partial<Attribs>;
	img: Partial<Attribs>;
}

// custom form widget to preview thumbnails of selected image files
const thumbnails = (
	src: ISubscribable<Promise<HTMLImageElement[]>>,
	opts: Partial<ThumbnailOpts>
) =>
	$refresh(src, async (promises) => {
		const images = await promises;
		return div(
			{ ...opts.root },
			...images.map((img) =>
				div({
					...opts.img,
					style: { "background-image": `url(${img.src})` },
				})
			)
		);
	});

const num = reactive(0.5);
const range = reactive(0.1);
const str = reactive("");
const text = reactive("hello world!\nMultiline string...");
const search = reactive("");
const pass = reactive("");
const email = reactive("a@boo.com");
const url = reactive("https://thi.ng/");
const fon = reactive("+1 123 456");
const date = reactive("2023-12-31");
const dt = reactive("2023-12-31T12:34");
const time = reactive("13:45");
const week = reactive("2023-W42");
const month = reactive("2023-11");
const choice = reactive(["boo"]);
const choice2 = reactive(20);
const flag = reactive(false);
const col = reactive("#ff33aa");
const radio = reactive("");
const files = reactive<Iterable<File>>([]);
const bt = reactive(false);

const FORM = f.container(
	{ id: "form" },
	f.group(
		{ label: "Common controls" },
		f.multiFile({
			label: "Image",
			accept: MIME_IMAGE_COMMON,
			value: files,
			desc: "Demo only. No data will leave your device!",
		}),
		f.custom(
			thumbnails(
				files.map((files) =>
					Promise.all([...files].map((x) => imageFromFile(x)))
				),
				{
					root: { class: "thumbnails" },
					img: { class: "thumb" },
				}
			)
		),
		f.num({
			label: "Number",
			min: 0.1,
			max: 1,
			step: 0.1,
			placeholder: "0.1 .. 1.0 interval",
			value: num,
		}),
		f.range({
			label: "Range",
			min: 0,
			max: 100,
			value: range,
			vlabel: 0,
			list: [0, 20, 25, 33, 50, 66, 75, 80, 100],
		}),
		f.color({
			label: "Color",
			list: ["#ff0000", "#00ff00", "#0000ff"],
			value: col,
		}),
		f.toggle({
			label: "Toggle",
			desc: span(
				{},
				"If checked, disables the ",
				anchor({ href: "#section2" }, "2nd section"),
				" of this form"
			),
			value: flag,
		}),
		f.radioStr({
			label: "Radio",
			desc: "Choose your hacker...",
			items: [
				{
					value: "white",
					label: "Option #1",
					desc: "The Good Guys™",
				},
				{
					value: "black",
					label: "Option #2",
					desc: "Are we baddies?",
				},
				{
					value: "gray",
					label: "Option #3",
					desc: "Ambiguous morals",
				},
			],
			value: radio,
		}),
		f.str({
			label: "String",
			value: str,
			pattern: "^[A-Z]*$",
			placeholder: "Only uppercase allowed",
			list: ["ABC", "XYZ"],
		}),
		f.text({
			label: "Textarea",
			rows: 10,
			required: true,
			value: text,
		}),
		f.search({
			label: "Search",
			placeholder: "Search for...",
			value: search,
			name: "q",
		}),
		f.password({
			label: "Password",
			placeholder: "Try test123",
			pattern: "^test123$",
			value: pass,
		}),
		f.email({
			label: "Email",
			value: email,
		}),
		f.phone({
			label: "Fon",
			value: fon,
		}),
		f.url({ label: "URL", value: url }),
		f.date({ label: "Date", value: date }),
		f.dateTime({ label: "Date & time", value: dt }),
		f.time({
			label: "Time",
			min: "09:00",
			max: "17:00",
			step: 5 * 60,
			value: time,
		}),
		f.week({ label: "Week", value: week }),
		f.month({ label: "Month", value: month }),
		f.trigger({ label: "Button", title: "Restart", value: bt })
	),
	f.group(
		{
			attribs: { id: "section2", disabled: flag },
			label: "Dropdowns",
		},
		f.multiSelectStr({
			label: "Dropdown",
			desc: "Multiple choice",
			value: choice,
			required: true,
			size: 10,
			items: [
				{
					name: "main",
					items: [{ label: "foo", value: "foo" }, { value: "bar" }],
				},
				{
					name: "other",
					items: ["baz", "boo"],
				},
			],
		}),
		f.selectNum({
			label: "Num Dropdown",
			desc: "Single choice",
			value: choice2,
			items: [10, 20, { value: 30, label: "last" }],
		}),
		f.text({
			attribs: { class: "output" },
			label: "Form state values",
			desc: "Readonly. For debugging purposes only...",
			rows: 25,
			readonly: true,
			value: sync({
				src: {
					num,
					range,
					col,
					flag,
					radio,
					str,
					text,
					search,
					pass,
					email,
					url,
					fon,
					date,
					dt,
					time,
					week,
					month,
					choice,
					choice2,
					files,
					bt,
				},
			}).map((x) => JSON.stringify(x, null, 2)),
		}),
		f.hidden({ name: "test", value: "123" }),
		f.submit({
			title: "Submit",
			desc: "Doesn't do anything here...",
			label: "",
		}),
		f.reset({ title: "Reset all", label: "" })
	)
);

const OPTS: Partial<f.FormOpts> = {
	// prefix: "main-",
	wrapperAttribs: { class: "widget" },
	descAttribs: { class: "desc" },
	typeAttribs: {
		container: { class: "container" },
		group: { class: "group" },
		radioItem: { class: "radio-item" },
		radioItems: { class: "radio-group" },
		rangeLabel: { class: "range-label" },
		select: { class: "single" },
	},
	behaviors: {
		// labels: false,
		// values: false,
		// strOnInput: false,
	},
};

$compile(f.compileForm(FORM, OPTS)).mount(document.getElementById("app")!);

// also serialize to HTML (e.g. for SSR purposes, excluding any value attribs)
console.log(serialize(f.compileForm(FORM, { behaviors: { values: false } })));
