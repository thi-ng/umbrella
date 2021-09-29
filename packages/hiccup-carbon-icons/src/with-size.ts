const px = (x: number | string) => (typeof x === "string" ? x : x + "px");

/**
 * Returns shallow copy of `icon` with `width` & `height` attribs set to given
 * value(s). If either is given a number, it will be interpreted as `px`
 * (pixels). If no `height` is given, `width` is used. Additional attribs can be
 * provided via optional `attribs`.
 *
 * @param icon
 * @param width
 * @param height
 */
export const withSize = (
    icon: any[],
    width: number | string,
    height = width,
    attribs?: any
) => [
    icon[0],
    {
        ...icon[1],
        width: px(width),
        height: px(height),
        ...attribs,
    },
    ...icon.slice(2),
];
