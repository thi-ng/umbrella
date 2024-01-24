import { writeText } from "@thi.ng/file-io";
import { ctx } from "../common/config";
import { buildRepoTableHTML } from "./build-table";
import { repoCommits } from "./git";

// generate as file in example directory
writeText("dist/index.html", buildRepoTableHTML(repoCommits(ctx.repo.path)));
