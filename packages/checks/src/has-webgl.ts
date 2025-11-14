// SPDX-License-Identifier: Apache-2.0
export const hasWebGL = () => {
	try {
		document.createElement("canvas").getContext("webgl");
		return true;
	} catch (e) {
		return false;
	}
};
