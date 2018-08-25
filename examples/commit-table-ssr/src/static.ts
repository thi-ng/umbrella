import { writeFileSync } from "fs";
import { buildRepoTableHTML } from "./common";

writeFileSync("index.html", buildRepoTableHTML());
