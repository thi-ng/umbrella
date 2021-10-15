/**
 * Sets the canvas size to given `width` & `height` (given as CSS pixels,
 * applied as device pixels) and adjusts canvas' `style` to compensate for HDPI
 * devices. Note: For 2D canvases, this will automatically clear any prior
 * canvas content. Returns the window's devicePixelRatio (or 1, if not
 * available).
 *
 * @param canvas -
 * @param width - uncompensated pixel width
 * @param height - uncompensated pixel height
 */
export const adaptDPI = (
    canvas: HTMLCanvasElement,
    width: number,
    height: number
) => {
    const dpr = window.devicePixelRatio || 1;
    if (dpr !== 1) {
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
    }
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    return dpr;
};

/**
 * Returns true if device's DPR > 1 (aka HighDPI)
 */
export const isHighDPI = () => (window.devicePixelRatio || 1) > 1;
