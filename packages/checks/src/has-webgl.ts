export const hasWebGL = () => {
	try {
		document.createElement("canvas").getContext("webgl");
		return true;
	} catch (e) {
		return false;
	}
};
