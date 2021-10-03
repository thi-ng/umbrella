import { start } from "@thi.ng/hdom/start";
import { U24 } from "@thi.ng/strings/radix";
import { repeatedly } from "@thi.ng/transducers/repeatedly";

const width = window.innerWidth;
const height = window.innerHeight;

const updateParticle = (p: any, v: number[]) => {
    let x = p.cx + v[0];
    let y = p.cy + v[1];
    x < 0 && ((x *= -1), (v[0] *= -1));
    y < 0 && ((y *= -1), (v[1] *= -1));
    x > width && ((x = width - (x - width)), (v[0] *= -1));
    y > height && ((y = height - (y - height)), (v[1] *= -1));
    p.cx = x | 0;
    p.cy = y | 0;
};

const rand = (a: number, b: number) =>
    (a + (b - a) * Math.random()) * (Math.random() < 0.5 ? 1 : -1);

const randomParticle = () => {
    velocities.push([rand(1, 5), rand(1, 5)]);
    return [
        "circle",
        {
            cx: Math.random() * width,
            cy: Math.random() * height,
            r: (Math.random() * 6 + 3) | 0,
            fill: "#" + U24((Math.random() * 0x1000000) | 0),
        },
    ];
};

const velocities: any[] = [null, null];
const particles: any[] = ["g", {}, ...repeatedly(randomParticle, 200)];

const app = () => {
    for (let i = particles.length - 1; i > 1; i--) {
        updateParticle(particles[i][1], velocities[i]);
    }
    return [
        "svg",
        { width, height, __diff: false, __normalize: false },
        particles,
    ];
};

start(app);
