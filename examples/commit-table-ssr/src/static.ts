import { writeFileSync } from "fs";
import { buildRepoTableHTML } from "./common";

// generate as file in example directory
writeFileSync("index.html", buildRepoTableHTML());
