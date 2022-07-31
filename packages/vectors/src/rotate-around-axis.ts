import type { ReadonlyVec, Vec } from "./api.js";
import { setC3 } from "./setc.js";

export const rotateAroundAxis3 = (
	out: Vec,
	v: ReadonlyVec,
	axis: ReadonlyVec,
	theta: number
) => {
	const x = v[0];
	const y = v[1];
	const z = v[2];
	const ax = axis[0];
	const ay = axis[1];
	const az = axis[2];
	const ux = ax * x;
	const uy = ax * y;
	const uz = ax * z;
	const vx = ay * x;
	const vy = ay * y;
	const vz = ay * z;
	const wx = az * x;
	const wy = az * y;
	const wz = az * z;
	const uvw = ux + vy + wz;
	const s = Math.sin(theta);
	const c = Math.cos(theta);
	return setC3(
		out || v,
		ax * uvw +
			(x * (ay * ay + az * az) - ax * (vy + wz)) * c +
			(-wy + vz) * s,
		ay * uvw +
			(y * (ax * ax + az * az) - ay * (ux + wz)) * c +
			(wx - uz) * s,
		az * uvw +
			(z * (ax * ax + ay * ay) - az * (ux + vy)) * c +
			(-vx + uy) * s
	);
};
