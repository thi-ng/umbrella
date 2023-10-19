; partial functional application (currying)
(defn partial (f x) (fn (y) (f x y)))

; functional composition for 1-arg fns
(defn comp (f g) (fn (x) (f (g x))))

; functional composition for 2-arg fns
(defn comp2 (f g) (fn (x y z) (f (g x y) z)))

; list reduction
(defn reduce (f acc xs) (if xs (reduce f (f acc (first xs)) (next xs)) acc))

; list transformation (expressed as reduction)
(defn map (f xs) (reduce (fn (acc x) (concat acc (f x))) (list) xs))

; filter list with predicate function
(defn filter (f xs) (reduce (fn (acc x) (if (f x) (concat acc x) acc)) (list) xs))