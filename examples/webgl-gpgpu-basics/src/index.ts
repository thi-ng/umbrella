import {
    assign,
    defMain,
    index,
    mul,
    sym,
    texture,
    Vec4Sym
} from "@thi.ng/shader-ast";
import { range } from "@thi.ng/transducers";
import { gpgpu } from "@thi.ng/webgl";

const ctx = gpgpu({
    size: 64, // might be adjusted / rounded up to next power of 2
    inputs: 1, // max inputs
    outputs: 3, // max outputs
    version: 1 // webgl version
});

const job = ctx.newJob({
    inputs: 1,
    outputs: 2,
    src: (_, unis, ins, outs) => [
        defMain(() => {
            let val: Vec4Sym;
            return [
                (val = sym(texture(index(unis.inputs, 0), ins.v_uv))),
                assign(outs.output0, mul(val, unis.factorA)),
                assign(outs.output1, mul(val, unis.factorB))
            ];
        })
    ],
    uniforms: {
        // uniform params incl. default values
        // an `inputs` uniform (sampler2D[]) will be injected automatically
        factorA: ["float", 2],
        factorB: ["float", 3]
    }
});

const src = new Float32Array([...range(ctx.inputSize(0))]);
console.log("Original input data:");
console.log(src);

job.run({ inputs: [src] });
console.log("Results of first iteration:");
// obtain results as Float32Array
console.log(job.result(null, 0));
console.log(job.result(null, 1));

job.run({ inputs: [ctx.outputs[0].tex], outputs: [1, 2] });
console.log("Results of second iteration:");
console.log(job.result(null, 1));
console.log(job.result(null, 2));

job.run({
    inputs: [ctx.outputs[1].tex],
    outputs: [0, 2],
    uniforms: { factorA: 10, factorB: 100 }
});
console.log("Final results:");
console.log(job.result(null, 0));
console.log(job.result(null, 2));
