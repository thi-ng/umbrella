import * as assert from "assert";
import { timeout } from "../src/subs/timeout";

describe("Timeout", () => {
	it("times out", function(done) {
		this.timeout(20);

		timeout(10).subscribe({
			error: () => done()
		})
	});

	it("times out with error object", function (done) {
		this.timeout(20);

		const error = 'error object';

		timeout(10, error).subscribe({
			error: (err) => { assert.equal(err, error); done() }
		})
	});

	it("cancels timeout in cleanup()", function (done) {
		this.timeout(40);

		timeout(10)
			.subscribe({
				error: () => assert.fail('timed out'),
			})
			.unsubscribe();

		setTimeout(() => done(), 20)
	});
});
