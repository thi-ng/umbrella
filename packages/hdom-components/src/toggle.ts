export interface ToggleOpts {
    anim: number;
    vertical: boolean;
    pad: number;
    margin: number;
    bgOn: object;
    bgOff: object;
    fgOn: object;
    fgOff: object;
}

export interface ToggleDotOpts extends ToggleOpts {
    r: number;
}

export interface ToggleRectOpts extends ToggleOpts {
    w: number;
    h: number;
}

const DEFAULT_OPTS: ToggleOpts = {
    anim: 100,
    pad: 1,
    margin: 0,
    vertical: false,
    bgOn: { fill: "#000" },
    bgOff: { fill: "#999" },
    fgOn: { fill: "#fff" },
    fgOff: { fill: "#fff" },
};

export const slideToggleDot = (opts: Partial<ToggleDotOpts> = {}) => {
    const _opts: ToggleDotOpts = {
        r: 5,
        ...DEFAULT_OPTS,
        ...opts,
    };
    const { r, pad, margin, vertical } = _opts;
    const m2 = margin * 2;
    const br = r + pad;
    const cx = br + margin;
    const width = (r * 2 + pad) * 2;
    const height = br * 2;
    const totalW = width + m2;
    const totalH = height + m2;
    const svgSize = vertical
        ? { width: totalH, height: totalW }
        : { width: totalW, height: totalH };
    const style = { transition: `all ${_opts.anim}ms ease-out` };
    const bgOn = {
        x: margin,
        y: margin,
        rx: br,
        ry: br,
        ...(vertical ? { width: height, height: width } : { width, height }),
        ..._opts.bgOn,
    };
    const bgOff = { ...bgOn, ..._opts.bgOff };
    const shapeOn: any = {
        ...(vertical ? { cx, cy: cx } : { cx: width + margin - br, cy: cx }),
        ..._opts.fgOn,
        style,
        r,
    };
    const shapeOff: any = {
        ...shapeOn,
        ...(vertical ? { cy: width + margin - br } : { cx }),
        ..._opts.fgOff,
    };
    return (_: any, attribs: any, state: boolean) => [
        "svg",
        { ...svgSize, ...attribs },
        ["rect", state ? bgOn : bgOff],
        ["circle", state ? shapeOn : shapeOff],
    ];
};

export const slideToggleRect = (opts: Partial<ToggleRectOpts> = {}) => {
    const _opts: ToggleRectOpts = {
        w: 10,
        h: 10,
        ...DEFAULT_OPTS,
        ...opts,
    };
    const { w, h, pad, margin, vertical } = _opts;
    const m2 = margin * 2;
    const pm = pad + margin;
    const width = vertical ? w + pad * 2 : (w + pad) * 2;
    const height = vertical ? (h + pad) * 2 : h + pad * 2;
    const svgSize = { width: width + m2, height: height + m2 };
    const style = { transition: `all ${_opts.anim}ms ease-out` };
    const bgOn = {
        ..._opts.bgOn,
        width,
        height,
        x: margin,
        y: margin,
    };
    const bgOff = { ...bgOn, ..._opts.bgOff };
    const shapeOn: any = {
        ...(vertical
            ? { x: pm, y: pm }
            : { x: width + margin - pad - w, y: pm }),
        ..._opts.fgOn,
        style,
        width: w,
        height: h,
    };
    const shapeOff: any = {
        ...shapeOn,
        ...(vertical ? { y: height + margin - pad - h } : { x: pm }),
        ..._opts.fgOff,
    };
    return (_: any, attribs: any, state: boolean) => [
        "svg",
        { ...svgSize, ...attribs },
        ["rect", state ? bgOn : bgOff],
        ["rect", state ? shapeOn : shapeOff],
    ];
};
