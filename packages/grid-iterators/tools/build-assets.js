const g = require("@thi.ng/geom");
const gi = require("@thi.ng/grid-iterators");
const str = require("@thi.ng/strings");
const fs = require("fs");
const execSync = require("child_process").execSync;

try {
    fs.mkdirSync("export");
} catch (e) {}

[
    gi.columns2d,
    gi.rows2d,
    gi.diagonal2d,
    gi.hilbert2d,
    gi.interleaveColumns2d,
    gi.interleaveRows2d,
    gi.random2d,
    gi.spiral2d,
    gi.zcurve2d,
    gi.zigzagColumns2d,
    gi.zigzagDiagonal2d,
    gi.zigzagRows2d,
].forEach((fn) => {
    console.log(`generating ${fn.name}...`);
    const pts = [...fn(16)];
    const base = `export/${fn.name.toLowerCase()}`;
    for (let i = 1; i <= 128; i++) {
        fs.writeFileSync(
            `${base}-${str.Z3(i)}.svg`,
            g.asSvg(
                g.svgDoc(
                    {
                        width: 600,
                        height: 600,
                        viewBox: "-1 -1 18 18",
                        stroke: "black",
                        "stroke-width": 0.1,
                    },
                    g.polyline(
                        pts.slice(0, i * 2).map(([x, y]) => [x + 0.5, y + 0.5])
                    ),
                    g.group(
                        { fill: [0, 1, 0.5, 0.25], stroke: "none" },
                        pts.slice(0, i * 2 - 1).map((p) => g.rect(p, 1))
                    ),
                    g.rect(pts[i * 2 - 1], 1, {
                        fill: [0, 1, 0.5, 0.85],
                        stroke: "none",
                    })
                )
            )
        );
    }
    console.log(`\tconverting to PNG...`);
    execSync(`../../scripts/svg2png ${base}*.svg`);
    console.log(`\tremoving SVG files...`);
    execSync(`rm ${base}*.svg`);
    console.log(`\tbuilding GIFs...`);
    execSync(`gm convert -delay 6 ${base}*.png ${base}.gif`);
    execSync(
        `gm convert -delay 6 -resize 200x200 ${base}*.png ${base}-small.gif`
    );
    console.log(`\tbuilding MP4...`);
    execSync(
        `ffmpeg -r 30 -i ${base}-%03d.png -c:v libx264 -pix_fmt yuv420p -y ${base}.mp4`
    );
});
