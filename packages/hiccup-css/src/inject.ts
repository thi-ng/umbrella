/**
 * Syntax sugar for {@link appendStyleSheet}. Injects given CSS string as global
 * stylesheet in DOM head. If `first` is true, inserts it as first stylesheet,
 * else (default) appends it.
 *
 * Returns created style DOM element.
 *
 * @param css - CSS string
 * @param first - true, if prepend to stylesheet list (else append)
 */
export const injectStyleSheet = (css: string, first = false) =>
	appendStyleSheet(css, document.head, first);

/**
 * Injects given CSS string as <style> element and attaches it to `parent`. If
 * `first` is true, inserts it as first child, else (default) appends it.
 * Returns created style DOM element.
 *
 * @param css
 * @param parent
 * @param first
 * @returns
 */
export const appendStyleSheet = (
	css: string,
	parent: Element | ShadowRoot,
	first = false
) => {
	const sheet = document.createElement("style");
	sheet.setAttribute("type", "text/css");
	if ((<any>sheet).styleSheet !== undefined) {
		(<any>sheet).styleSheet.cssText = css;
	} else {
		sheet.textContent = css;
	}
	if (first) {
		parent.insertBefore(sheet, parent.firstChild);
	} else {
		parent.appendChild(sheet);
	}
	return sheet;
};
