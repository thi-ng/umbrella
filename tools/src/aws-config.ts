// SPDX-License-Identifier: Apache-2.0
export const AWS_PROFILE = "--profile default";

export const RCLONE_PROFILE = "hetzner";

export const S3_BUCKET_DOCS = "docs-thi-ng";
export const S3_BUCKET_EXAMPLES = "demo-thi-ng";
export const S3_BUCKET_DEPS = "dependencies-thi-ng";

export const S3_PREFIX = "/umbrella";
export const S3_OPTS = `${AWS_PROFILE} --acl public-read`;
export const S3_COMPRESS_OPTS = `${S3_OPTS} --content-encoding br`;
