const px = (x: number) => x.toFixed(3) + "px";

// @thi.ng/hdom UI component function
export const circle = (col: string, x: number, y: number, w: number, h = w) => [
    "div",
    {
        class: "absolute z-1 white f7 tc br-100 o-80 " + col,
        style: {
            left: px(x - w / 2),
            top: px(y - h / 2),
            width: px(w),
            height: px(h),
            "line-height": px(h),
        },
    },
    `${x};${y}`,
];
