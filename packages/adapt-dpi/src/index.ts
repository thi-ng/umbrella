/**
 * Sets the canvas size to given `width` & `height` and adjusts style to
 * compensate for HDPI devices. Note: For 2D canvases, this will
 * automatically clear any prior canvas content.
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
    if (dpr != 1) {
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
    }
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    return dpr;
};
