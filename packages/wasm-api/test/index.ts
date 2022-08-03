import { MemoryLogger } from "@thi.ng/logger";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { readFileSync } from "fs";
import { IWasmAPI, WasmBridge, WasmExports } from "../src/index.js";

group("wasm-api", {
	custom: async ({ done }) => {
		interface CustomWasm extends WasmExports {
			test_setVec2: () => void;
		}
		class CustomAPI implements IWasmAPI {
			parent!: WasmBridge;

			async init(parent: WasmBridge) {
				this.parent = parent;
				return true;
			}

			getImports() {
				return {
					custom_setVec2: (addr: number) => {
						this.parent.f32.set([10, 20], addr >> 2);
					},
				};
			}
		}

		const logger = new MemoryLogger("wasm");
		const bridge = new WasmBridge<CustomWasm>(
			{ custom: new CustomAPI() },
			logger
		);
		bridge.init(
			<any>(
				(
					await WebAssembly.instantiate(
						readFileSync("test/custom.wasm"),
						bridge.getImports()
					)
				).instance.exports
			)
		);

		bridge.exports.test_setVec2();
		assert.strictEqual(logger.journal.length, 3);
		assert.strictEqual(logger.journal[1][3], "0, 0");
		assert.strictEqual(logger.journal[2][3], "10, 20");
		done();
	},
});
