import type {
	BVecOpRoV,
	BVecOpV,
	BVecOpVN,
	BVecOpVV,
	CompareOp,
	FromBVecOpV,
	ToBVecOpV,
	VecOpFN,
	VecOpFNO,
	VecOpN,
	VecOpNFO,
	VecOpNNO,
	VecOpOO,
	VecOpOOO,
	VecOpRoV,
	VecOpRoVV,
	VecOpRoVVO,
	VecOpSFN,
	VecOpV,
	VecOpVN,
	VecOpVNN,
	VecOpVNV,
	VecOpVO,
	VecOpVV,
	VecOpVVN,
	VecOpVVO,
	VecOpVVV,
	VecOpVVVVNN,
	VecOpVVVVV,
} from "@thi.ng/vec-api";

export interface MultiVecOp<VOP> {
	/**
	 * Adds / overwrites implementation for given vector size.
	 *
	 * @param dim -
	 * @param op -
	 */
	add(dim: number, op: VOP): VOP;
	/**
	 * Adds / overwrites default implementation (SHOULD support
	 * arbitrary vector sizes).
	 *
	 * @param op -
	 */
	default(op: VOP): VOP;
	/**
	 * Returns implementation for given vector size or default
	 * implementation.
	 *
	 * @param dim -
	 */
	impl(dim?: number): VOP;
}

export type MultiVecOpImpl<T> = T & MultiVecOp<T>;

export type MultiVecOpV = MultiVecOpImpl<VecOpV>;
export type MultiVecOpN = MultiVecOpImpl<VecOpN>;
export type MultiVecOpVV = MultiVecOpImpl<VecOpVV>;
export type MultiVecOpVN = MultiVecOpImpl<VecOpVN>;
export type MultiVecOpVVV = MultiVecOpImpl<VecOpVVV>;
export type MultiVecOpVVN = MultiVecOpImpl<VecOpVVN>;
export type MultiVecOpVNV = MultiVecOpImpl<VecOpVNV>;
export type MultiVecOpVNN = MultiVecOpImpl<VecOpVNN>;
export type MultiVecOpVVVVV = MultiVecOpImpl<VecOpVVVVV>;
export type MultiVecOpVVVVNN = MultiVecOpImpl<VecOpVVVVNN>;

export type MultiVecOpVO<T> = MultiVecOpImpl<VecOpVO<T>>;
export type MultiVecOpVVO<T> = MultiVecOpImpl<VecOpVVO<T>>;
export type MultiVecOpOO<A, B> = MultiVecOpImpl<VecOpOO<A, B>>;
export type MultiVecOpOOO<A, B, C> = MultiVecOpImpl<VecOpOOO<A, B, C>>;
export type MultiVecOpNNO<T> = MultiVecOpImpl<VecOpNNO<T>>;

export type MultiVecOpRoV<T> = MultiVecOpImpl<VecOpRoV<T>>;
export type MultiVecOpRoVV<T> = MultiVecOpImpl<VecOpRoVV<T>>;
export type MultiVecOpRoVVO<T, O> = MultiVecOpImpl<VecOpRoVVO<T, O>>;

export type MultiVecOpFN = MultiVecOpImpl<VecOpFN>;
export type MultiVecOpFNO = MultiVecOpImpl<VecOpFNO>;
export type MultiVecOpNFO = MultiVecOpImpl<VecOpNFO>;
export type MultiVecOpSFN = MultiVecOpImpl<VecOpSFN>;

export type MultiBVecOpV = MultiVecOpImpl<BVecOpV>;
export type MultiBVecOpVV = MultiVecOpImpl<BVecOpVV>;
export type MultiBVecOpVN = MultiVecOpImpl<BVecOpVN>;
export type MultiBVecOpRoV<T> = MultiVecOpImpl<BVecOpRoV<T>>;

export type MultiToBVecOpV = MultiVecOpImpl<ToBVecOpV>;
export type MultiFromBVecOpV = MultiVecOpImpl<FromBVecOpV>;

export type MultiCompareOp = MultiVecOpImpl<CompareOp>;
