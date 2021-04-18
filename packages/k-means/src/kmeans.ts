import { argmin, DIST_SQ, IDistance } from "@thi.ng/distance";
import { uniqueIndices } from "@thi.ng/random";
import { add, mulN, ReadonlyVec, Vec, zeroes } from "@thi.ng/vectors";
import type { Cluster, KMeansOpts } from "./api";

export const kmeans = <T extends ReadonlyVec>(
    k: number,
    samples: T[],
    opts?: Partial<KMeansOpts>
) => {
    let { dist, maxIter, rnd } = { dist: DIST_SQ, maxIter: 32, ...opts };
    const num = samples.length;
    const dim = samples[0].length;
    const centroidIDs = uniqueIndices(k, num, undefined, undefined, rnd);
    const centroids: Vec[] = centroidIDs.map((i) => samples[i]);
    const clusters: number[] = [];
    let update = true;
    outer: while (update && maxIter-- > 0) {
        update = assign(samples, centroids, clusters, dist);
        for (let i = 0; i < k; i++) {
            const mean = zeroes(dim);
            let clusterSize = 0;
            for (let j = 0; j < num; j++) {
                if (i === clusters[j]) {
                    add(mean, mean, samples[j]);
                    clusterSize++;
                }
            }
            if (clusterSize > 0) {
                mulN(mean, mean, 1 / clusterSize);
                centroids[i] = mean;
            } else {
                const numC = centroidIDs.length;
                uniqueIndices(1, num, centroidIDs, undefined, rnd);
                if (centroidIDs.length === numC) break outer;
                centroids[i] = samples[centroidIDs[numC]];
                update = true;
            }
        }
    }
    return buildClusters(centroids, clusters);
};

const assign = <T extends ReadonlyVec>(
    samples: T[],
    centroids: ReadonlyVec[],
    clusters: number[],
    dist: IDistance<ReadonlyVec>
) => {
    let update = false;
    for (let i = 0, n = samples.length; i < n; i++) {
        const id = argmin(samples[i], centroids, dist)!;
        if (id !== clusters[i]) {
            clusters[i] = id;
            update = true;
        }
    }
    return update;
};

const buildClusters = (centroids: ReadonlyVec[], clusters: number[]) => {
    const indices: Cluster[] = [];
    for (let i = 0, n = clusters.length; i < n; i++) {
        const c = clusters[i];
        (
            indices[c] ||
            (indices[c] = { id: c, centroid: centroids[c], items: [] })
        ).items.push(i);
    }
    return indices;
};
