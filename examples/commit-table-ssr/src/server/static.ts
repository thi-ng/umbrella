// SPDX-License-Identifier: Apache-2.0
import { writeText } from "@thi.ng/file-io";
import { ctx } from "../common/config.js";
import { buildRepoTableHTML } from "./build-table.js";
import { repoCommits } from "./git.js";

// generate as file in example directory
writeText("dist/index.html", buildRepoTableHTML(repoCommits(ctx.repo.path)));
