import { readdirSync, writeFileSync } from "fs";
import { request } from "https";
import { delayed } from "@thi.ng/compose";

(async () => {
    const stats: any = {};
    for (let f of readdirSync("packages")) {
        console.log(f);
        const req = request(
            `https://api.npmjs.org/downloads/point/last-month/@thi.ng/${f}`,
            (res) => {
                console.log("status:", res.statusCode);
                res.setEncoding("utf8");
                res.on("data", (d) => {
                    stats[f] = JSON.parse(d.toString()).downloads || 0;
                });
            }
        );

        req.on("error", (e) => {
            console.error(e);
        });
        req.end();

        await delayed(null, 1000);
    }

    await delayed(null, 5000);
    writeFileSync("stats.json", JSON.stringify(stats));
    console.log("done");
})();
