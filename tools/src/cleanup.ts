import { files } from "@thi.ng/file-io";
import { unlinkSync } from "fs";

for (let f of files("packages", ".map")) {
	if (f.indexOf("/lib/") === -1) {
		console.log(f);
		unlinkSync(f);
	}
}
