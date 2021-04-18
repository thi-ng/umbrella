import { argmin, DIST_SQ, IDistance } from "@thi.ng/distance";
import { uniqueIndices } from "@thi.ng/random";
import { add, median, mulN, ReadonlyVec, Vec, zeroes } from "@thi.ng/vectors";
import type { CentroidStrategy, Cluster, KMeansOpts } from "./api";

export const kmeans = <T extends ReadonlyVec>(
    k: number,
    samples: T[],
    opts?: Partial<KMeansOpts>
) => {
    let { strategy, dist, maxIter, rnd } = {
        strategy: means,
        dist: DIST_SQ,
        maxIter: 32,
        ...opts,
    };
    const num = samples.length;
    const dim = samples[0].length;
    const centroidIDs = uniqueIndices(k, num, undefined, undefined, rnd);
    const centroids: Vec[] = centroidIDs.map((i) => samples[i]);
    const clusters: number[] = [];
    let update = true;
    outer: while (update && maxIter-- > 0) {
        update = assign(samples, centroids, clusters, dist);
        for (let i = 0; i < k; i++) {
            const impl = strategy(dim);
            for (let j = 0; j < num; j++) {
                i === clusters[j] && impl.update(samples[j]);
            }
            const centroid = impl.finish();
            if (centroid) {
                centroids[i] = centroid;
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

export const means: CentroidStrategy = (dim) => {
    const acc = zeroes(dim);
    let n = 0;
    return {
        update: (p) => {
            add(acc, acc, p);
            n++;
        },
        finish: () => (n ? mulN(acc, acc, 1 / n) : undefined),
    };
};

export const medians: CentroidStrategy = () => {
    const acc: ReadonlyVec[] = [];
    return {
        update: (p) => acc.push(p),
        finish: () => (acc.length ? median([], acc) : undefined),
    };
};
