// SPDX-License-Identifier: Apache-2.0
// export const AWS_PROFILE = "--profile thing-umbrella";
export const AWS_PROFILE = "--profile thing-2025";

export const S3_BUCKET_DOCS = "s3://docs-thi-ng";
export const S3_BUCKET_EXAMPLES = `s3://demo-thi-ng`;
export const S3_BUCKET_DEPS = `s3://dependencies-thi-ng`;

export const S3_PREFIX = "/umbrella";
export const S3_OPTS = `${AWS_PROFILE} --acl public-read`;
export const S3_COMPRESS_OPTS = `${S3_OPTS} --content-encoding br`;

export const CF_DISTRO_DOCS = "E2855K70PVNL1D";
export const CF_DISTRO_EXAMPLES = "EL2F1HMDPZ2RL";
