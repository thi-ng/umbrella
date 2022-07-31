export const simplifyRatio = (num: number, denom: number) => {
	let e1 = Math.abs(num);
	let e2 = Math.abs(denom);
	while (true) {
		if (e1 < e2) {
			const t = e1;
			e1 = e2;
			e2 = t;
		}
		const r = e1 % e2;
		if (r) {
			e1 = r;
		} else {
			return [num / e2, denom / e2];
		}
	}
};
