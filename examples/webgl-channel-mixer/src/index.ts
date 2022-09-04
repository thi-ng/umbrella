import { downloadCanvas } from "@thi.ng/dl-asset";
import {
	button,
	div,
	h4,
	inputFile,
	inputRange,
	main,
} from "@thi.ng/hiccup-html";
import { $compile, $inputTrigger, Component, NumOrElement } from "@thi.ng/rdom";
import { ISubscribable, reactive, Stream, stream, sync } from "@thi.ng/rstream";
import { gestureStream } from "@thi.ng/rstream-gestures";
import {
	compileModel,
	defQuadModel,
	defShader,
	defTexture,
	draw,
	FX_SHADER_SPEC_UV,
	ModelSpec,
	Texture,
} from "@thi.ng/webgl";

type Vec4 = [number, number, number, number];
type Controls = Record<"r" | "g" | "b", Vec4>;

// each color channel's controls consist of:
// RGB weights + offset (all in [-1 .. +1] interval)
const DEFAULT_R: Vec4 = [1, 0, 0, 0];
const DEFAULT_G: Vec4 = [0, 1, 0, 0];
const DEFAULT_B: Vec4 = [0, 0, 1, 0];

/**
 * Reactive WebGL based image component implementing the actual channel editing,
 * the A/B preview and fullsize image download feature
 */
class WebGLImageCanvas extends Component {
	img!: HTMLImageElement;
	gl!: WebGL2RenderingContext;
	model!: ModelSpec;
	tex!: Texture;

	constructor(
		public imageSrc: ISubscribable<HTMLImageElement>,
		public controls: ISubscribable<Controls>,
		public download: ISubscribable<boolean>
	) {
		super();
	}

	async mount(parent: Element, index?: NumOrElement | undefined) {
		const canvas = <HTMLCanvasElement>(
			this.$el(
				"canvas",
				{ width: 0, height: 0 },
				undefined,
				parent,
				index
			)
		);

		// precreate all WebGL resources
		this.gl = canvas.getContext("webgl2")!;
		this.tex = defTexture(this.gl);
		// define & precompile model & shader
		this.model = compileModel(this.gl, {
			// use fullscreen quad as basic temple
			...defQuadModel(),
			// define channel mixer shader (also partially re-using a shader template)
			// i.e. we only need to modify our custom fragment shader
			shader: defShader(this.gl, {
				...FX_SHADER_SPEC_UV,
				fs: `void main() {
	vec3 src = texture(tex, v_uv).xyz;
	vec3 dest = vec3(0.);
	// only show color adjustments in LHS
	if (v_uv.x < maskX) {
		dest.r = dot(src, chanR.xyz) + chanR.w;
		dest.g = dot(src, chanG.xyz) + chanG.w;
		dest.b = dot(src, chanB.xyz) + chanB.w;
	} else {
		dest = mix(vec3(1.), src, step(sepWidth, v_uv.x - maskX));
	}
	fragColor = vec4(dest, 1.);
				}`,
				uniforms: {
					tex: "sampler2D",
					chanR: ["vec4", DEFAULT_R],
					chanG: ["vec4", DEFAULT_G],
					chanB: ["vec4", DEFAULT_B],
					maskX: ["float", 0.5],
					sepWidth: "float",
				},
			}),
			textures: [this.tex],
		});

		// setup internal subscriptions
		this.imageSrc.subscribe({ next: this.updateImage.bind(this) });
		// subscribe to control changes to re-render image w/ new settings
		this.controls.subscribe({
			next: (controls) => {
				const uniforms = this.model.uniforms!;
				uniforms.chanR = controls.r;
				uniforms.chanG = controls.g;
				uniforms.chanB = controls.b;
				draw(this.model);
			},
		});
		// allow user to move the A/B preview separator
		gestureStream(canvas).subscribe({
			next: (e) => {
				if (e.type === "drag") {
					this.model.uniforms!.maskX = e.pos[0] / canvas.width;
					draw(this.model);
				}
			},
		});
		// when user requests to download the image, first render it at full resolution
		// then reset viewport to fit window
		this.download.subscribe({
			next: (x) => {
				if (!x || !this.img) return;
				const uniforms = this.model.uniforms!;
				const maskX = uniforms.maskX;
				const width = this.gl.drawingBufferWidth;
				const height = this.gl.drawingBufferHeight;
				uniforms.maskX = 1000;
				this.resizeCanvas(this.img.width, this.img.height);
				draw(this.model);
				downloadCanvas(canvas, "channel-mix", "jpeg");
				this.resizeCanvas(width, height);
				uniforms.maskX = maskX;
				draw(this.model);
			},
		});

		/**
		 * Resize image (if any) to always fit vertically in window
		 */
		window.addEventListener(
			"resize",
			() => this.img && this.updateImage(this.img)
		);

		// store canvas for future ref
		this.el = canvas;
		return this.el;
	}

	/**
	 * Receives new image and updates WebGL texture
	 *
	 * @param image
	 */
	updateImage(image: HTMLImageElement) {
		this.img = image;
		const height = Math.min(image.height, window.innerHeight);
		const width = height * (image.width / image.height);
		this.resizeCanvas(width, height);
		this.tex.configure({
			image,
			width: image.width,
			height: image.height,
			flip: true,
		});
		// set separator with to equivalent of 1px
		this.model.uniforms!.sepWidth = 1 / width;
		draw(this.model);
	}

	/**
	 * Resize canvas & WebGL viewport
	 *
	 * @param width
	 * @param height
	 */
	resizeCanvas(width: number, height: number) {
		this.$attribs({ width, height });
		this.gl.viewport(
			0,
			0,
			this.gl.drawingBufferWidth,
			this.gl.drawingBufferHeight
		);
	}
}

// reactive state variables
const src = stream<File>();
const image = stream<HTMLImageElement>();
const download = reactive(false);
const controls = {
	r: reactive(DEFAULT_R),
	g: reactive(DEFAULT_G),
	b: reactive(DEFAULT_B),
};

// subscribe to File stream, load as image and place result into the image
// stream which the editor component is subscribed to (see further below)
src.subscribe({
	next(file) {
		const url = URL.createObjectURL(file);
		const img = new Image();
		img.onload = () => {
			image.next(img);
			URL.revokeObjectURL(url);
		};
		img.src = url;
	},
});

/**
 * Creates reactive component tree of all controls for a single color channel.
 *
 * @param ctrl
 * @param name
 */
const channelControls = (ctrl: Stream<Vec4>, name: string) => {
	const slider = (c: number) =>
		inputRange({
			class: "w-100 range",
			min: -1,
			max: 1,
			step: 0.05,
			value: ctrl.map((x) => x[c]),
			oninput: (e: InputEvent) => {
				let val = <Vec4>ctrl.deref()!.slice();
				val[c] = +(<HTMLInputElement>e.target).value;
				ctrl.next(val);
			},
		});
	return div(
		{},
		h4(".fw4.mb1", {}, name),
		slider(0),
		slider(1),
		slider(2),
		slider(3)
	);
};

const STYLE_BT = ".dib.h2.w-100.bn.bg-dark-gray.white";

// compile & mount the entire UI component tree
$compile(
	main(
		{},
		// side bar
		div(
			".vh-100.bg-near-black.white.pa2.f7",
			{},
			div(
				"relative.overflow-hidden",
				{},
				button(
					STYLE_BT,
					{},
					inputFile({
						class: "absolute o-0",
						accept: ["image/jpeg"],
						onchange: (e) =>
							src.next((<HTMLInputElement>e.target).files![0]),
					}),
					"Choose image"
				)
			),
			channelControls(controls.r, "Red"),
			channelControls(controls.g, "Green"),
			channelControls(controls.b, "Blue"),
			button(
				STYLE_BT + ".mt3",
				{
					onclick: () => {
						controls.r.next(DEFAULT_R);
						controls.g.next(DEFAULT_G);
						controls.b.next(DEFAULT_B);
					},
				},
				"Reset controls"
			),
			button(
				STYLE_BT + ".mt2",
				{
					onclick: $inputTrigger(download),
				},
				"Download JPG"
			)
		),
		// image canvas
		new WebGLImageCanvas(image, sync({ src: controls }), download)
	)
).mount(document.body);
