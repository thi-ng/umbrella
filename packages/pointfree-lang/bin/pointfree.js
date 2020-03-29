#!/usr/bin/env node

const api = require("@thi.ng/api");
const bench = require("@thi.ng/bench");
const pf = require("@thi.ng/pointfree");
const pfl = require("@thi.ng/pointfree-lang");
const fs = require("fs");
const { program } = require("commander");

program
    .version(require("../package.json").version)
    .arguments("[file]")
    .option("-d, --debug", "print debug info")
    .option("-e, --exec <src>", "execute given string")
    .parse(process.argv);

let src = program.exec;
if (!src) {
    const fname = program.args[0];
    if (!fname) {
        process.stderr.write("no input given...\n\n");
        program.help();
    }
    try {
        src = fs.readFileSync(fname).toString();
    } catch (e) {
        process.stderr.write(`error reading source file ${e.message}`);
        process.exit(1);
    }
}

try {
    const logger = program.debug
        ? new api.ConsoleLogger("pointfree")
        : api.NULL_LOGGER;
    const includeCache = new Set();
    const rootEnv = { args: program.args };
    const builtins = {
        include: (ctx) => {
            const stack = ctx[0];
            pf.ensureStack(stack, 1);
            const path = stack.pop();
            if (!includeCache.has(path)) {
                // cycle breaker
                // TODO use dgraph
                includeCache.add(path);
                logger.debug(`including: ${path}`);
                pfl.run(fs.readFileSync(path).toString(), {
                    ...ctx[2],
                    __vars: null,
                });
            } else {
                logger.debug(`\t${path} already included, skipping...`);
            }
            return ctx;
        },
        "read-file": (ctx) => {
            const stack = ctx[0];
            pf.ensureStack(stack, 1);
            const path = stack.pop();
            logger.debug(`reading file: ${path}`);
            stack.push(fs.readFileSync(path).toString());
            return ctx;
        },
        "write-file": (ctx) => {
            const stack = ctx[0];
            pf.ensureStack(stack, 2);
            const path = stack.pop();
            logger.debug(`writing file: ${path}`);
            fs.writeFileSync(path, stack.pop());
            return ctx;
        },
        "read-dir": (ctx) => {
            const stack = ctx[0];
            pf.ensureStack(stack, 1);
            const path = stack.pop();
            logger.debug(`reading directory: ${path}`);
            stack.push(fs.readdirSync(path));
            return ctx;
        },
    };
    const env = pfl.ffi(rootEnv, builtins);
    const [res, time] = bench.timedResult(() => pfl.runU(src, env));
    logger.debug(`executed in ${time}ms`);
    process.exit(typeof res === "number" ? res : 0);
} catch (e) {
    console.log(e);
}
process.exit(1);
