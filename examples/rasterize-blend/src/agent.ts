import {
	cartesian2,
	direction2,
	maddN2,
	mixN2,
	normalize2,
	randMinMax2,
	randNorm2,
	Vec,
} from "@thi.ng/vectors";

interface AgentOpts {
	margin: number;
	speed: number;
	steerSpeed: number;
	spinSpeed: number;
	spinRadius: number;
}

export class Agent {
	opts: AgentOpts;
	pos: Vec = [0.5, 0.5];
	globalPos: Vec;
	dir: Vec;
	targetDir: Vec;
	spin = 0;

	constructor(opts: Partial<AgentOpts> = {}) {
		this.opts = {
			margin: 0.02,
			speed: 0.001,
			steerSpeed: 0.05,
			spinSpeed: 0.05,
			spinRadius: 0.0,
			...opts,
		};
		this.globalPos = [...this.pos];
		this.targetDir = randNorm2([]);
		this.dir = [...this.targetDir];
		this.spin = 0;
	}

	update() {
		const [x, y] = this.pos;
		const { margin, speed, steerSpeed, spinSpeed, spinRadius } = this.opts;
		const imargin = 1 - margin;
		if (
			Math.random() < 0.005 ||
			x < margin ||
			x > imargin ||
			y < margin ||
			y > imargin
		) {
			this.targetDir = direction2(
				[],
				this.pos,
				randMinMax2([], [margin, margin], [imargin, imargin])
			);
		}
		normalize2(null, mixN2(null, this.dir, this.targetDir, steerSpeed));
		maddN2(this.pos, this.dir, speed, this.pos);
		this.spin += spinSpeed;
		return cartesian2(this.globalPos, [spinRadius, this.spin], this.pos);
	}
}
