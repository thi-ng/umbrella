import { writeFileSync } from "fs";

import { ctx } from "../common/config";
import { buildRepoTableHTML } from "./build-table";
import { repoCommits } from "./git";

// generate as file in example directory
writeFileSync("table.html", buildRepoTableHTML(repoCommits(ctx.repo.path)));
