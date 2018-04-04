// @thi.ng/hdom UI component function
export function circle(col: string, x: number, y: number, w: number, h = w) {
    return ["div", {
        class: "absolute z-1 white f7 tc br-100 " + col,
        style: {
            left: `${x - w / 2}px`,
            top: `${y - h / 2}px`,
            width: `${w}px`,
            height: `${h}px`,
            "line-height": `${h}px`,
        }
    }, `${x};${y}`];
}
