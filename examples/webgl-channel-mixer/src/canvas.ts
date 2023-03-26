import { downloadCanvas } from "@thi.ng/dl-asset";
import { Component, type NumOrElement } from "@thi.ng/rdom";
import type { ISubscribable } from "@thi.ng/rstream";
import { gestureStream } from "@thi.ng/rstream-gestures";
import {
	FX_SHADER_SPEC_UV,
	Texture,
	compileModel,
	defQuadModel,
	defShader,
	defTexture,
	draw,
	type ModelSpec,
} from "@thi.ng/webgl";
import { DEFAULT_B, DEFAULT_G, DEFAULT_R, type Controls } from "./api";

/**
 * Reactive WebGL based image component implementing the actual channel editing,
 * the A/B preview and fullsize image download feature
 */
export class WebGLImageCanvas extends Component {
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
		dest = pow(clamp(dest + exposure.x * 0.5, 0., 1.), vec3(exposure.y + 1.));
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
					exposure: "vec2",
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
				uniforms.exposure = controls.exposure;
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
		this.model.uniforms!.sepWidth = 2 / width;
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
