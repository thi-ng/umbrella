import { assert } from "@thi.ng/api";
import { argmin, DIST_SQ, IDistance } from "@thi.ng/distance";
import { SYSTEM, uniqueIndices, weightedRandom } from "@thi.ng/random";
import { add, median, mulN, ReadonlyVec, Vec, zeroes } from "@thi.ng/vectors";
import type { CentroidStrategy, Cluster, KMeansOpts } from "./api";

export const kmeans = <T extends ReadonlyVec>(
    k: number,
    samples: T[],
    opts?: Partial<KMeansOpts>
) => {
    let { dist, initial, maxIter, rnd, strategy } = {
        dist: DIST_SQ,
        maxIter: 32,
        strategy: means,
        ...opts,
    };
    const num = samples.length;
    const dim = samples[0].length;
    const centroidIDs = initial || initKmeanspp(k, samples, dist, rnd);
    assert(centroidIDs.length === k, `wrong number of initial centroids`);
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

/**
 * k-means++ initialization / selection of initial cluster centroids.
 *
 * @remarks
 * References:
 * - https://en.wikipedia.org/wiki/K-means%2B%2B
 * - http://ilpubs.stanford.edu:8090/778/1/2006-13.pdf
 * - http://vldb.org/pvldb/vol5/p622_bahmanbahmani_vldb2012.pdf (TODO)
 *
 * @param k
 * @param samples
 * @param dist
 * @param rnd
 */
export const initKmeanspp = <T extends ReadonlyVec>(
    k: number,
    samples: T[],
    dist: IDistance<ReadonlyVec> = DIST_SQ,
    rnd = SYSTEM
) => {
    const num = samples.length;
    const centroidIDs = [rnd.int() % num];
    const centroids = [samples[centroidIDs[0]]];
    const indices = new Array(num).fill(0).map((_, i) => i);
    while (centroidIDs.length < k) {
        let probs = samples.map(
            (p) =>
                dist.from(dist.metric(p, centroids[argmin(p, centroids)!])) ** 2
        );
        const id = weightedRandom(indices, probs)();
        centroidIDs.push(id);
        centroids.push(samples[id]);
    }
    return centroidIDs;
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
