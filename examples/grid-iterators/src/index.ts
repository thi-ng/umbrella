import { hueRgb, srgbCss } from "@thi.ng/color";
import {
	diagonal2d,
	diagonalSlopeX,
	diagonalSlopeY,
	hilbert2d,
	interleaveColumns2d,
	interleaveRows2d,
	random2d,
	spiral2d,
	zcurve2d,
	zigzagColumns2d,
	zigzagDiagonal2d,
	zigzagRows2d,
} from "@thi.ng/grid-iterators";
import { canvas2d } from "@thi.ng/pixel";
import { concat, cycle } from "@thi.ng/transducers";

const W = 256;
const H = 256;
const { canvas, ctx } = canvas2d(W, H, document.getElementById("app")!);

const NB: any = 16;
const BW = Math.ceil(W / NB);
const BH = Math.ceil(H / NB);
// create infinite sequence of all grid iterators
const buckets = cycle(
	concat(
		diagonal2d({ cols: NB }),
		diagonalSlopeX({ cols: NB, slope: 3 }),
		diagonalSlopeY({ cols: NB, slope: 3 }),
		zigzagRows2d({ cols: NB }),
		hilbert2d({ cols: NB }),
		zigzagColumns2d({ cols: NB }),
		spiral2d({ cols: NB }),
		zigzagDiagonal2d({ cols: NB }),
		interleaveColumns2d({ cols: NB, step: 4 }),
		interleaveRows2d({ cols: NB, step: 4 }),
		zcurve2d({ cols: NB }),
		random2d({ cols: NB })
	)
);

let frame = 0;
setInterval(() => {
	const b = buckets.next();
	let [x, y] = <number[]>b.value;
	x *= BW;
	y *= BH;
	ctx.fillStyle = srgbCss(hueRgb([], frame++ / (NB * NB)));
	ctx.fillRect(x, y, BW, BH);
}, 16);
