export const compress = (m: number, n: number, dense: ArrayLike<number>) => {
	const major: number[] = [0];
	const minor: number[] = [];
	const data: number[] = [];
	for (let i = 0, col = 0; col < n; col++) {
		let nnz = 0;
		for (let row = 0; row < m; i++, row++) {
			if (dense[i] !== 0) {
				data.push(dense[i]);
				minor.push(row);
				nnz++;
			}
		}
		major.push(major[major.length - 1] + nnz);
	}
	return [major, minor, data];
};

export const diag = (vals: number[]) => {
	const n = vals.length;
	const major: number[] = [];
	const minor: number[] = [];
	for (let i = 0; i < n; i++) {
		major.push(i);
		minor.push(i);
	}
	major.push(n);
	return [major, minor];
};

export const at = (
	id1: number,
	id2: number,
	major: number[],
	minor: number[],
	data: number[]
) => {
	const ii = major[id1 + 1];
	for (let i = major[id1]; i < ii; i++) {
		if (minor[i] === id2) {
			return data[i];
		}
	}
	return 0;
};

export const setAt = (
	id1: number,
	id2: number,
	id1max: number,
	val: number,
	major: number[],
	minor: number[],
	data: number[],
	compact = true
) => {
	const notZero = val !== 0;
	const ii = major[id1 + 1];
	for (let i = major[id1]; i < ii; i++) {
		const j = minor[i];
		if (j === id2) {
			if (notZero || !compact) {
				data[i] = val;
			} else {
				remove(id1, id1max, i, major, minor, data);
			}
			return [major, minor, data];
		} else if (j > id2 && notZero) {
			return insert(id1, id2, id1max, val, i, major, minor, data);
		}
	}
	if (notZero) {
		return insert(id1, id2, id1max, val, ii, major, minor, data);
	}
	return [major, minor, data];
};

export const insert = (
	id1: number,
	id2: number,
	id1max: number,
	x: number,
	idx: number,
	major: number[],
	minor: number[],
	data: number[]
) => {
	data = data.slice(0, idx).concat(x, data.slice(idx));
	minor = minor.slice(0, idx).concat(id2, minor.slice(idx));
	for (let i = id1 + 1; i <= id1max; i++) {
		major[i]++;
	}
	return [major, minor, data];
};

export const remove = (
	id1: number,
	id1max: number,
	idx: number,
	major: number[],
	minor: number[],
	data: number[]
) => {
	data.splice(idx, 1);
	minor.splice(idx, 1);
	for (let i = id1 + 1; i <= id1max; i++) {
		major[i]--;
	}
};
