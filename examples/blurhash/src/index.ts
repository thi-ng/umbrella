import { decodeToCanvas, encodeFromCanvas } from "@thi.ng/blurhash";
import { imageCanvas } from "@thi.ng/canvas";
import { div, h1, h2, section, textArea } from "@thi.ng/hiccup-html";
import { MIME_IMAGE_COMMON } from "@thi.ng/mime/presets";
import { imageFromFile } from "@thi.ng/pixel";
import { $compile, $replace } from "@thi.ng/rdom";
import { compileForm, container, file, range } from "@thi.ng/rdom-forms";
import { reactive, stream, sync } from "@thi.ng/rstream";

// reactive state values
const imageFile = stream<File>();
const srcCanvas = stream<HTMLCanvasElement>();
const destCanvas = stream<HTMLCanvasElement>();
const encodeRes = reactive(256);
const decodeRes = reactive(32);
const detail = reactive(4);
const blurHash = stream<string>();
const contrast = reactive(1);

// reactive processing steps if input file or encoding resolution changes
sync({
	src: { file: imageFile, res: encodeRes },
}).subscribe({
	next: async ({ file, res }) => {
		const img = await imageFromFile(file);
		const scale = Math.min(res / img.width, res / img.height);
		srcCanvas.next(
			imageCanvas(img, (img.width * scale) | 0, (img.height * scale) | 0)
				.canvas
		);
	},
});

// reactive processing steps if resized source image or encoding detail changes
sync({ src: { img: srcCanvas, detail } }).subscribe({
	next({ img, detail }) {
		const aspect = img.width / img.height;
		const [dx, dy] =
			aspect >= 1
				? [detail, Math.max(1, Math.round(detail / aspect))]
				: [Math.max(1, Math.round(detail * aspect)), detail];
		// actual blurhash computation
		blurHash.next(encodeFromCanvas(img, dx, dy));
	},
});

// reactive processing steps if computed hash or decoding resolution/contrast changes
sync({
	src: { hash: blurHash, res: decodeRes, contrast },
}).subscribe({
	next({ hash, res, contrast }) {
		const { width, height } = srcCanvas.deref()!;
		const dest = decodeToCanvas(hash, res, res, contrast);
		// rescale canvas using CSS only (see /css/style.mcss)
		// need to manually configure aspect ratio though
		dest.style.aspectRatio = String(width / height);
		// notify UI components
		destCanvas.next(dest);
	},
});

// compile reactive UI/DOM
$compile(
	div(
		{},
		h1({}, "Blurhash generator"),
		compileForm(
			container(
				{},
				file({
					label: "Image",
					desc: "No data will leave your device!",
					accept: MIME_IMAGE_COMMON,
					value: imageFile,
				}),
				range({
					label: "Level of detail",
					desc: "Encoding detail (the number of DCT components to use for the longest side of the image)",
					min: 1,
					max: 9,
					step: 1,
					value: detail,
					vlabel: 0,
				}),
				range({
					label: "Enccode res",
					desc: "Encoding resolution (hash will be computed from this resized image)",
					min: 32,
					max: 480,
					list: [32, 64, 128, 256, 320, 480],
					value: encodeRes,
					vlabel: 0,
				}),
				range({
					label: "Decode res",
					desc: "Decoding resolution (the default is usually sufficient)",
					min: 4,
					max: 64,
					list: [4, 8, 16, 32, 48, 64],
					value: decodeRes,
					vlabel: 0,
				}),
				range({
					label: "Contrast",
					desc: "Scale factor for decoding",
					min: 0.5,
					max: 1.5,
					step: 0.1,
					value: contrast,
					vlabel: 1,
				})
			),
			{
				wrapperAttribs: { class: "widget" },
				descAttribs: { class: "desc" },
				typeAttribs: {
					rangeLabel: { class: "value" },
				},
			}
		),
		section("#images", {}, $replace(destCanvas), $replace(srcCanvas)),
		$replace(
			blurHash.map((value) =>
				section(
					{},
					h2({}, "Computed hash"),
					textArea("#hash", {
						readonly: true,
						rows: 4,
						value,
					})
				)
			)
		)
	)
).mount(document.getElementById("app")!);
