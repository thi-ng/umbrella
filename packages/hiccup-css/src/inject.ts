// https://davidwalsh.name/add-rules-stylesheets

/**
 * Injects given CSS string as global stylesheet in DOM head. If `first`
 * is true, inserts it as first stylesheet, else (default) appends it.
 *
 * Returns created style DOM element.
 *
 * @param css - CSS string
 * @param first - true, if prepend to stylesheet list (else append)
 */
export const injectStyleSheet = (css: string, first = false) => {
	const head = document.getElementsByTagName("head")[0];
	const sheet = document.createElement("style");
	sheet.setAttribute("type", "text/css");
	if ((<any>sheet).styleSheet !== undefined) {
		(<any>sheet).styleSheet.cssText = css;
	} else {
		sheet.textContent = css;
	}
	if (first) {
		head.insertBefore(sheet, head.firstChild);
	} else {
		head.appendChild(sheet);
	}
	return sheet;
};
