export const KERNEL = `
; partial functional application (currying for 1 arg)
(defn partial (f x) (fn (y) (f x y)))

; partial functional application (currying for 2 args)
(defn partial2 (f x y) (fn (z) (f x y z)))

; functional composition for 1-arg fns
(defn comp (f g) (fn (x) (f (g x))))

; functional composition for 2-arg fns
(defn comp2 (f g) (fn (x y z) (f (g x y) z)))

; calls f if x is nullish
(defn fnull? (x f) (if (null? x) (f) x))

; list reduction
(defn reduce (f acc xs) (if xs (reduce f (f acc (first xs)) (next xs)) acc))

; list transformation (expressed as reduction)
(defn map (f xs) (reduce (fn (acc x) (concat acc (f x))) (list) xs))

; filter list with predicate function
(defn filter (f xs) (reduce (fn (acc x) (if (f x) (concat acc x) acc)) (list) xs))
`;
