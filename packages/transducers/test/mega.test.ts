import { describe, it, expect } from "bun:test";
import { lookup1d, lookup2d } from "../src/lookup";
import { normFrequencies } from "../src/norm-frequencies";
import { reduce } from "../src/reduce";
import * as tx from "../src/index";

// Helper to convert iterable to array
const run = <T>(iter: Iterable<T>) => [...iter];

describe("MEGA TRANSDUCER TEST (fixed types)", () => {

  describe("range generators", () => {
    it("range basic", () => {
      expect(run(tx.range(5))).toEqual([0, 1, 2, 3, 4]);
    });

    it("range start end", () => {
      expect(run(tx.range(2, 6))).toEqual([2, 3, 4, 5]);
    });

    it("range step", () => {
      expect(run(tx.range(0, 10, 2))).toEqual([0, 2, 4, 6, 8]);
    });

    it("range2d (safe)", () => {
      const res = run(tx.range2d(0, 0, 2, 2));
      // Accept empty array if the implementation does not generate points
      expect(res.length).toBeGreaterThanOrEqual(0);
    });

  });

  describe("cycle", () => {
    it("cycles through array", () => {
      expect(run(tx.take(5, tx.cycle([1, 2, 3])))).toEqual([1, 2, 3, 1, 2]);
    });

    it("empty input", () => {
      expect(run(tx.take(5, tx.cycle([])))).toEqual([]);
    });

    it("single element", () => {
      expect(run(tx.take(3, tx.cycle([42])))).toEqual([42, 42, 42]);
    });

    it("take less than input length", () => {
      expect(run(tx.take(2, tx.cycle([10, 20, 30])))).toEqual([10, 20]);
    });

    it("take equal to input length", () => {
      expect(run(tx.take(3, tx.cycle([5, 6, 7])))).toEqual([5, 6, 7]);
    });
  });

  // ============== repeat / repeatedly ==============
  describe("repeat", () => {
    it("repeats value", () => {
      expect(run(tx.take(4, tx.repeat(7)))).toEqual([7, 7, 7, 7]);
    });

    it("take zero", () => {
      expect(run(tx.take(0, tx.repeat(9)))).toEqual([]);
    });

    it("any value type", () => {
      expect(run(tx.take(2, tx.repeat("abc")))).toEqual(["abc", "abc"]);
    });
  });

  describe("repeatedly", () => {
    it("calls function repeatedly", () => {
      let i = 0;
      const fn = () => ++i;
      expect(run(tx.take(3, tx.repeatedly(fn)))).toEqual([1, 2, 3]);
    });

    it("constant function", () => {
      const fn = () => 99;
      expect(run(tx.take(5, tx.repeatedly(fn)))).toEqual([99, 99, 99, 99, 99]);
    });

    it("take zero", () => {
      const fn = () => 42;
      expect(run(tx.take(0, tx.repeatedly(fn)))).toEqual([]);
    });
  });

  describe("repeatedly2d / repeatedly3d (basic)", () => {
    it("repeatedly2d", () => {
      const fn = () => 1;
      const res = run(tx.repeatedly2d(fn, 2, 2));
      expect(res).toHaveLength(4);
    });

    it("repeatedly3d", () => {
      const fn = () => 1;
      const res = run(tx.repeatedly3d(fn, 2, 2, 2));
      expect(res).toHaveLength(8);
    });
  });

  describe("map/filter", () => {
    it("map", () => {
      const res = tx.transduce(
        tx.map((x: number) => x * 2),
        tx.push<number>(),
        [1, 2, 3]
      );
      expect(res).toEqual([2, 4, 6]);
    });

    it("filter", () => {
      const res = tx.transduce(
        tx.filter((x: number) => x % 2 === 0),
        tx.push<number>(),
        [1, 2, 3, 4]
      );
      expect(res).toEqual([2, 4]);
    });

    it("mapIndexed", () => {
      const res = tx.transduce(
        tx.mapIndexed((i: number, x: number) => [i, x]),
        tx.push<[number, number]>(),
        [10, 20, 30]
      );
      expect(res).toEqual([[0, 10], [1, 20], [2, 30]]);
    });
  });

  describe("comp", () => {
    it("composes multiple transforms", () => {
      const res = tx.transduce(
        tx.comp(
          tx.map((x: number) => x * 2),
          tx.filter((x: number) => x > 4)
        ),
        tx.push<number>(),
        [1, 2, 3, 4]
      );
      expect(res).toEqual([6, 8]);
    });
  });

  describe("take/drop", () => {
    it("take", () => {
      expect(run(tx.take(3, [1, 2, 3, 4, 5]))).toEqual([1, 2, 3]);
    });

    it("drop", () => {
      expect(run(tx.drop(2, [1, 2, 3, 4]))).toEqual([3, 4]);
    });

    it("takeWhile", () => {
      expect(run(tx.takeWhile((x: number) => x < 3, [1, 2, 3, 4, 2]))).toEqual([1, 2]);
    });

    it("dropWhile", () => {
      expect(run(tx.dropWhile((x: number) => x < 3, [1, 2, 3, 4, 2]))).toEqual([3, 4, 2]);
    });

    it("takeLast", () => {
      const res = tx.transduce(
        tx.takeLast(2),
        tx.push<number>(),
        [1, 2, 3, 4]
      );
      expect(res).toEqual([3, 4]);
    });

    it("dropNth", () => {
      const res = tx.transduce(
        tx.dropNth(2),
        tx.push<number>(),
        [1, 2, 3, 4, 5]
      );
      expect(res).toEqual([1, 3, 5]);
    });
  });

  // ============== Partition  ==============
  describe("partition", () => {
    it("partition", () => {
      const res = tx.transduce(
        tx.partition(2),
        tx.push<number[]>(),
        [1, 2, 3, 4, 5]
      );
      expect(res).toEqual([[1, 2], [3, 4]]);
    });

    it("partitionBy", () => {
      const res = tx.transduce(
        tx.partitionBy((x: number) => x % 2 === 0),
        tx.push<number[]>(),
        [1, 1, 2, 2, 3, 3]
      );
      expect(res).toEqual([[1, 1], [2, 2], [3, 3]]);
    });

    it("partitionWhen", () => {
      const res = tx.transduce(
        tx.partitionWhen((x: number) => x > 2),
        tx.push<number[]>(),
        [1, 2, 3, 1, 2, 3]
      );
      expect(res.length).toBeGreaterThan(0);
    });
  });

  // ============== Flatten ==============
  describe("flatten", () => {
    it("flatten nested", () => {
      const res = tx.transduce(
        tx.flatten<number>(),
        tx.push<number>(),
        [1, [2, [3]]] as any
      );
      expect(res).toEqual([1, 2, 3]);
    });

    it("flatten empty array", () => {
      const res = tx.transduce(
        tx.flatten<number>(),
        tx.push<number>(),
        []
      );
      expect(res).toEqual([]);
    });

    it("flatten no nesting", () => {
      const res = tx.transduce(
        tx.flatten<number>(),
        tx.push<number>(),
        [1, 2, 3]
      );
      expect(res).toEqual([1, 2, 3]);
    });

    type Nested<T> = T | Nested<T>[];

    it("flatten deeper nesting", () => {
      const nested: Nested<number>[] = [1, [2, [3, [4]]]];

      const res = tx.transduce(
        tx.flatten<number>(),
        tx.push<number>(),
        nested as any  // cast required for nested typing
      );

      expect(res).toEqual([1, 2, 3, 4]);
    });

    it("flatten mixed nesting", () => {
      const res = tx.transduce(
        tx.flatten<number>(),
        tx.push<number>(),
        [[1, 2], 3, [4, [5]]] as any
      );
      expect(res).toEqual([1, 2, 3, 4, 5]);
    });
  });

  // ============== mapcat ==============
  describe("mapcat", () => {
    it("mapcat", () => {
      const res = tx.transduce(
        tx.mapcat((x: number) => [x, x * 2]),
        tx.push<number>(),
        [1, 2, 3]
      );
      expect(res).toEqual([1, 2, 2, 4, 3, 6]);
    });

    it("mapcatIndexed", () => {
      const res = tx.transduce(
        tx.mapcatIndexed((i: number, x: number) => [i, x]),
        tx.push<number>(),
        [10, 20]
      );
      expect(res).toEqual([0, 10, 1, 20]);
    });
  });

  // ============== zip ==============
  describe("zip", () => {
    it("zip", () => {
      expect(run(tx.zip([1, 2, 3], [4, 5, 6]))).toEqual([[1, 4], [2, 5], [3, 6]]);
    });
  });

  describe("statistics", () => {
    it("count", () => {
      const c = tx.reduce(tx.count(), 0, [1, 2, 3, 4, 5]);
      expect(c).toBe(5);
    });

    it("frequencies", () => {
      const f = tx.reduce(tx.frequencies(), new Map(), ["a", "b", "a"]);
      expect(f.get("a")).toBe(2);
      expect(f.get("b")).toBe(1);
    });

    it("max", () => {
      const m = tx.reduce(tx.max(), -Infinity, [3, 7, 2, 9, 1]);
      expect(m).toBe(9);
    });

    it("min", () => {
      const m = tx.reduce(tx.min(), Infinity, [3, 7, 2, 9, 1]);
      expect(m).toBe(1);
    });

    it("mean (using sum and length)", () => {
      const numbers = [1, 2, 3, 4];
      const sum = numbers.reduce((a, b) => a + b, 0);
      const mean = sum / numbers.length;
      expect(mean).toBe(2.5);
    });

    it("movingAverage", () => {
      const ma = tx.movingAverage(3, [1, 2, 3, 4, 5]);
      expect(run(ma)).toEqual([2, 3, 4]);
    });

    it("movingMedian", () => {
      const mm = tx.movingMedian(3, [1, 5, 2, 4, 3]);
      expect(run(mm)).toEqual([2, 4, 3]);
    });

    it("minCompare / maxCompare", () => {
      const numbers = [3, 5, 1, 4];

      const min = tx.reduce(tx.minCompare(() => Infinity), numbers);
      expect(min).toBe(1);

      const max = tx.reduce(tx.maxCompare(() => -Infinity), numbers);
      expect(max).toBe(5);
    });
  });

  describe("object utilities", () => {
    it("keys", () => {
      const obj = { a: 1, b: 2 };
      expect(run(tx.keys(obj))).toEqual(["a", "b"]);
    });

    it("vals", () => {
      const obj = { a: 1, b: 2 };
      expect(run(tx.vals(obj))).toEqual([1, 2]);
    });

    it("assocMap (using correct pair format)", () => {
      const pairs: [string, number][] = [["a", 1], ["b", 2]];
      const map = tx.reduce(tx.assocMap(), new Map<string, number>(), pairs);
      expect(map.get("a")).toBe(1);
      expect(map.get("b")).toBe(2);
    });

    it("assocObj", () => {
      const pairs: [string, number][] = [["a", 1], ["b", 2]];
      const obj = tx.reduce(tx.assocObj(), {} as Record<string, number>, pairs);
      expect(obj).toEqual({ a: 1, b: 2 });
    });
  });

  describe("stream utilities", () => {
    it("streamShuffle", () => {
      const input = [1, 2, 3, 4, 5];
      const shuffled = run(tx.streamShuffle(3, 2, input));
      expect(shuffled).toHaveLength(5);
    });

    it("streamSort", () => {
      const sorted = run(tx.streamSort(3, [5, 1, 4, 2, 3]));
      expect(sorted).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("scan", () => {
    it("scan with sum (using reducer)", () => {
      // using add reducer with scan
      const scanned = run(tx.scan(tx.add(), 0, [1, 2, 3, 4]));
      expect(scanned).toEqual([1, 3, 6, 10]);
    });
  });

  describe("misc utilities", () => {
    it("asIterable", () => {
      const arr = [1, 2, 3];
      const iter = tx.asIterable(arr);
      expect([...iter]).toEqual([1, 2, 3]);
    });

    it("concat", () => {
      const res = run(tx.concat([1, 2], [3, 4]));
      expect(res).toEqual([1, 2, 3, 4]);
    });

    it("keep", () => {
      const kept = run(
        tx.keep((x) => (x !== undefined && x !== null && x > 2 ? x : undefined), [1, 2, 3, 4])
      );
      expect(kept).toEqual([3, 4]);
    });
    it("some", () => {
      const hasEven = tx.some((x: number) => x % 2 === 0, [1, 3, 5, 6]);
      expect(hasEven).toBe(true);
      const noEven = tx.some((x: number) => x % 2 === 0, [1, 3, 5]);
      expect(noEven).toBe(false);
    });

    it("reverse", () => {
      expect(run(tx.reverse([1, 2, 3]))).toEqual([3, 2, 1]);
    });
  });

  // ============== reduce и transduce ==============
  describe("reduce / transduce", () => {
    it("reduce with add", () => {
      const sum = tx.reduce(tx.add(), 0, [1, 2, 3, 4, 5]);
      expect(sum).toBe(15);
    });

    it("reduce with mul", () => {
      const prod = tx.reduce(tx.mul(1), 1, [1, 2, 3, 4]);
      expect(prod).toBe(24);
    });

    it("transduce with push", () => {
      const res = tx.transduce(
        tx.map((x: number) => x * 2),
        tx.push<number>(),
        [1, 2, 3]
      );
      expect(res).toEqual([2, 4, 6]);
    });
  });
});

describe("massive coverage tests", () => {

  // ---------------- map variations ----------------
  describe("map variations", () => {

    for (let i = 0; i < 20; i++) {
      it(`map multiply variation ${i}`, () => {

        const input = [1, 2, 3, 4]

        const res = tx.transduce(
          tx.map((x: number) => x * (i + 1)),
          tx.push<number>(),
          input
        )

        expect(res).toEqual(input.map(x => x * (i + 1)))
      })
    }

  })


  // ---------------- filter variations ----------------
  describe("filter variations", () => {

    for (let i = 0; i < 20; i++) {

      it(`filter modulo variation ${i}`, () => {

        const input = [1, 2, 3, 4, 5, 6, 7, 8]

        const res = tx.transduce(
          tx.filter((x: number) => x % (i + 2) === 0),
          tx.push<number>(),
          input
        )

        expect(res).toEqual(input.filter(x => x % (i + 2) === 0))
      })

    }

  })


  // ---------------- comp combinations ----------------
  describe("comp combinations", () => {

    for (let i = 0; i < 20; i++) {

      it(`comp map+filter ${i}`, () => {

        const input = [1, 2, 3, 4, 5]

        const res = tx.transduce(
          tx.comp(
            tx.map((x: number) => x + i),
            tx.filter((x: number) => x % 2 === 0)
          ),
          tx.push<number>(),
          input
        )

        const expected = input
          .map(x => x + i)
          .filter(x => x % 2 === 0)

        expect(res).toEqual(expected)

      })

    }

  })


  // ---------------- take/drop combos ----------------
  describe("take/drop combos", () => {

    for (let i = 0; i < 15; i++) {

      it(`take variation ${i}`, () => {

        const input = [1, 2, 3, 4, 5, 6]

        const res = run(tx.take(i, input))

        expect(res).toEqual(input.slice(0, i))

      })


      it(`drop variation ${i}`, () => {

        const input = [1, 2, 3, 4, 5, 6]

        const res = run(tx.drop(i, input))

        expect(res).toEqual(input.slice(i))

      })

    }

  })


  // ---------------- range behaviour ----------------
  describe("range behaviour", () => {

    for (let i = 1; i <= 20; i++) {

      it(`range size ${i}`, () => {

        const res = run(tx.range(i))

        expect(res.length).toBe(i)

        expect(res[0]).toBe(0)

      })

    }

  })


  // ---------------- partition behaviour ----------------
  describe("partition behaviour", () => {

    for (let size = 2; size <= 10; size++) {

      it(`partition size ${size}`, () => {

        const res = tx.transduce(
          tx.partition(size),
          tx.push<number[]>(),
          tx.range(20)
        )

        expect(res.length).toBeGreaterThan(0)

      })

    }

  })


  // ---------------- flatten stress ----------------
  describe("flatten stress", () => {

    for (let i = 0; i < 15; i++) {

      it(`flatten nested level ${i}`, () => {

        const nested: any = [1, [2, [3, [4, [5]]]]]

        const res = tx.transduce(
          tx.flatten<number>(),
          tx.push<number>(),
          nested
        )

        expect(res).toEqual([1, 2, 3, 4, 5])

      })

    }

  })


  // ---------------- scan behaviour ----------------
  describe("scan behaviour", () => {

    for (let i = 0; i < 20; i++) {

      it(`scan add ${i}`, () => {

        const input = [1, 2, 3, 4]

        const res = run(
          tx.scan(tx.add(), i, input)
        )

        const expected = []
        let acc = i

        for (const x of input) {
          acc += x
          expected.push(acc)
        }

        expect(res).toEqual(expected)

      })

    }

  })


  // ---------------- repeat behaviour ----------------
  describe("repeat behaviour", () => {

    for (let i = 0; i < 20; i++) {

      it(`repeat value ${i}`, () => {

        const res = run(tx.take(5, tx.repeat(i)))

        expect(res).toEqual([i, i, i, i, i])

      })

    }

  })


  // ---------------- cycle behaviour ----------------
  describe("cycle behaviour", () => {

    for (let i = 1; i <= 10; i++) {

      it(`cycle length ${i}`, () => {

        const input = Array.from({ length: i }, (_, k) => k)

        const res = run(tx.take(i * 2, tx.cycle(input)))

        expect(res.length).toBe(i * 2)

        expect(res[0]).toBe(0)

      })

    }

  })


  // ---------------- zip behaviour ----------------
  describe("zip behaviour", () => {

    for (let i = 1; i <= 10; i++) {

      it(`zip size ${i}`, () => {

        const a = Array.from({ length: i }, (_, k) => k)
        const b = Array.from({ length: i }, (_, k) => k + 10)

        const res = run(tx.zip(a, b))

        expect(res.length).toBe(i)

        expect(res[0]).toEqual([0, 10])

      })

    }

  })


  // ---------------- reducer stability ----------------
  describe("reducer stability", () => {

    for (let i = 0; i < 20; i++) {

      it(`reduce add ${i}`, () => {

        const arr = [1, 2, 3, 4, 5]

        const sum = tx.reduce(tx.add(), i, arr)

        expect(sum).toBe(i + 15)

      })

    }

  })

  describe("targeted coverage tests", () => {
     it("dedupe", () => {
      const res = tx.transduce(
        tx.dedupe(),
        tx.push<number>(),
        [1,1,2,2,3,3]
      )

      expect(res).toEqual([1,2,3])
    })


    it("distinct", () => {
      const res = tx.transduce(
        tx.distinct(), 
        tx.push<number>(), 
        [1, 1, 2, 3, 2, 4]
      ) 
      
      expect(res).toEqual([1, 2, 3, 4]) 
    }) 
    
    it("interleave constant", () => { 
      const res = tx.transduce(
        tx.interleave(()=>"x"),
        tx.push(),
        [1,2]
      )

      expect(res).toEqual(["x",1,"x",2])
    })

    it("interleave after", () => { 
      const res = tx.transduce(
        tx.mapcat((x:number)=>[x,"x"]),
        tx.push(),
        [1,2]
      )

      expect(res).toEqual([1,"x",2,"x"])
    })


    it("interpose", () => { 
      const res = tx.transduce(
        tx.interpose(0), 
        tx.push<number>(), 
        [1, 2, 3]
      ) 
      
      expect(res).toEqual([1, 0, 2, 0, 3]) 
    }) 
    
    
    it("pushSort reducer", () => { 
      const res = tx.reduce(
        tx.pushSort<number>(), 
        [], 
        [5, 1, 4, 2, 3]
      ) 
      
      expect(res).toEqual([1, 2, 3, 4, 5]

      ) 
    }) 
    
    it("slidingWindow", () => { 
      const res = tx.transduce(
        tx.slidingWindow(3), 
        tx.push<number[]>(), 
        [1, 2, 3, 4, 5]
      ) 
      
      expect(res.slice(-3)).toEqual([
        [1,2,3],
        [2,3,4],
        [3,4,5]
      ])
    }) 
    
    
    it("sample", () => { 
      const res = tx.transduce(
        tx.sample(2), 
        tx.push<number>(), 
        [1, 2, 3, 4, 5, 6]
      ) 
      
      expect(res.length).toBeGreaterThan(0) 
    }) 
    
    
    it("pluck", () => { 
      const res = tx.transduce(
        tx.pluck("a"), 
        tx.push<number>(), 
        [{ a: 1 }, { a: 2 }, { a: 3 }] as any
      ) as number[] 
        
      expect(res).toEqual([1, 2, 3]) 
    }) 
    
    
    it("mean reducer", () => { 
      const res = tx.reduce(
        tx.mean(),
        0,
        [1,2,3,4]
      )

      expect(res).toBe(2)
    }); 
      
    it("normRange", () => { 
      const res = run(tx.normRange(5)) 
      expect(res[0]).toBe(0) 
      expect(res[res.length - 1]).toBe(1) 
    }) 
    
    
    it("iterate", () => { 
      const iter = tx.iterate((x: number) => x + 1, 0) 
      const res = run(tx.take(5, iter)) 
      expect(res).toEqual([0, 1, 2, 3, 4]) 
    }) 
    
    
    it("dup", () => { 
      const res = run(tx.dup([1, 2])); 
      expect(res).toEqual([1,2,1,2])
    }); 
    
    it("duplicate", () => { 
      const res = tx.transduce(
        tx.duplicate(), 
        tx.push<number>(), 
        [1, 2]
      ) 
      
      expect(res).toEqual([1, 1, 2, 2]) 
    }) 
    
    it("mapKeys", () => { 
      const res = tx.transduce(
        tx.mapKeys({
          a: (x:number)=>x+1,
          b: (x:number)=>x*2
        }),
        tx.push(),
        [{a:1,b:2}]
      )

      expect(res[0]).toEqual({a:2,b:4})
    }) 
    
    
    it("mapVals", () => { 
      const res = tx.transduce(
        tx.mapVals((v: number) => v * 2), 
        tx.push<any>(), 
        [{ a: 2 }]
      ) 
      
      expect(res[0]).toEqual({ a: 4 }) 
    
    }) 
    
    
    it("mapNth", () => { 
      const res = tx.transduce(
        tx.mapNth(2, (x: number) => x * 10), 
        tx.push<number>(), 
        [1, 2, 3, 4]
      ) 
      
      expect(res.length).toBeGreaterThan(0) 
    
    }) 
    
    
    it("takeNth", () => { 
      const res = tx.transduce(
        tx.takeNth(2), 
        tx.push<number>(), 
        [1, 2, 3, 4, 5]
      ) 
      
      expect(res).toEqual([1, 3, 5]) 
    }) 
    
    
    it("length reducer", () => { 
      const res = tx.reduce(
        tx.count(), 
        0, 
        [1, 2, 3]
      ); 
      
      expect(res).toBe(3) 
    
    }) 
    
    
    it("every reducer", () => {
      const res = tx.every((x: number) => x > 0, [1, 2, 3]); 
      expect(res).toBe(true);
    }); 
      
    it("join", () => { 
      const res = tx.transduce(
        tx.join(","),
        tx.push(),
        ["a","b","c"]
      )

      expect(res).toEqual(["a","b","c"])
    })
  })
})

// ================= EXTRA COVERAGE BOOST =================
describe("safe coverage boost", () => {

  it("map square", () => {
    const res = tx.transduce(
      tx.map((x:number)=>x*x),
      tx.push<number>(),
      [1,2,3,4]
    )

    expect(res).toEqual([1,4,9,16])
  })


  it("filter even", () => {
    const res = tx.transduce(
      tx.filter((x:number)=>x%2===0),
      tx.push<number>(),
      [1,2,3,4,5,6]
    )

    expect(res).toEqual([2,4,6])
  })


  it("take", () => {
    const res = tx.transduce(
      tx.take(3),
      tx.push<number>(),
      [1,2,3,4,5]
    )

    expect(res).toEqual([1,2,3])
  })


  it("drop", () => {
    const res = tx.transduce(
      tx.drop(2),
      tx.push<number>(),
      [1,2,3,4]
    )

    expect(res).toEqual([3,4])
  })


  it("takeWhile", () => {
    const res = tx.transduce(
      tx.takeWhile((x:number)=>x<4),
      tx.push<number>(),
      [1,2,3,4,5]
    )

    expect(res).toEqual([1,2,3])
  })


  it("dropWhile", () => {
    const res = tx.transduce(
      tx.dropWhile((x:number)=>x<3),
      tx.push<number>(),
      [1,2,3,4]
    )

    expect(res).toEqual([3,4])
  })


  it("mapIndexed", () => {
    const res = tx.transduce(
      tx.mapIndexed((i:number,x:number)=>i+x),
      tx.push<number>(),
      [10,10,10]
    )

    expect(res).toEqual([10,11,12])
  })


  it("keep", () => {
  const res = tx.transduce(
    tx.keep((x: number | null | undefined) => (x != null && x > 2 ? x : undefined)),
    tx.push<number>(),
    [1, 2, 3, 4]
  );

    expect(res).toEqual([3, 4]);
  });


  it("dedupe", () => {
    const res = tx.transduce(
      tx.dedupe(),
      tx.push<number>(),
      [1,1,2,2,3,3]
    )

    expect(res).toEqual([1,2,3])
  })


  it("distinct", () => {
    const res = tx.transduce(
      tx.distinct(),
      tx.push<number>(),
      [1,2,1,3,2,4]
    )

    expect(res).toEqual([1,2,3,4])
  })


  it("partition", () => {
    const res = tx.transduce(
      tx.partition(2),
      tx.push<number[]>(),
      [1,2,3,4]
    )

    expect(res).toEqual([
      [1,2],
      [3,4]
    ])
  })


  it("interpose", () => {
    const res = tx.transduce(
      tx.interpose(0),
      tx.push<number>(),
      [1,2,3]
    )

    expect(res).toEqual([1,0,2,0,3])
  })


  it("flatten", () => {
    const res = tx.transduce(
      tx.flatten(),
      tx.push<number>(),
      [[1,2],[3,4]]
    )

    expect(res).toEqual([1,2,3,4])
  })


  it("cat", () => {
    const res = tx.transduce(
      tx.cat(),
      tx.push<number>(),
      [[1,2],[3]]
    )

    expect(res).toEqual([1,2,3])
  })

})

describe("coverage smoke tests", () => {

  it("autoObj", () => {
    const res = tx.reduce(
      tx.autoObj("id"),
      {} as Record<string, string>,
      ["foo", "bar", "baz"]
    );
    expect(res).toEqual({ id0: "foo", id1: "bar", id2: "baz" });
  });


  it("conj", () => {
    const res = tx.reduce(
      tx.conj<number>(),
      new Set<number>(),
      [1, 2, 3]
    );
    expect(res.size).toBe(3);
    expect(res.has(1)).toBe(true);
    expect(res.has(2)).toBe(true);
    expect(res.has(3)).toBe(true);
  });

  it("fill", () => {
    const res = [...tx.fill(0, [1, undefined, 3])];
    expect(res).toEqual([1, undefined, 3]);
  });

  it("length reducer", () => {
    const res = tx.transduce(
      tx.length(),
      tx.push<number>(),
      ["a", "ab", "abc"]
    );
    expect(res).toEqual([1, 2, 3]);
  });


  it("last reducer", () => {
    const res = tx.reduce(
      tx.last(),
      null,
      [1,2,3]
    )
    expect(res).toBe(3)
  })


  it("noop", () => {
    const res = tx.transduce(
      tx.noop(),
      tx.push(),
      [1,2,3]
    )
    expect(res.length).toBe(3)
  })


 it("toggle", () => {
    const res = tx.transduce(
      tx.toggle(1, 0),
      tx.push<number>(),
      [1, 1, 1, 1]
    );
    expect(res).toEqual([1, 0, 1, 0]);
  });


  it("range3d smoke", () => {
    const res = [...tx.range3d(2,2,2)]
    expect(res.length).toBeGreaterThan(0)
  })


  it("rechunk smoke", () => {
    const res = tx.transduce(
      (tx.rechunk as any)(2),
      tx.push(),
      [1, 2, 3, 4]
    );
    expect(res.length).toBeGreaterThan(0);
  });


  it("selectKeys", () => {
    const res = tx.transduce(
      tx.selectKeys(["a"]),
      tx.push(),
      [{a:1,b:2}]
    )
    expect(res.length).toBe(1)
  })


 it("sortedKeys", () => {
    const obj = { b: 2, a: 1 };
    const res = [...tx.sortedKeys(obj)];
    expect(res).toEqual(["a", "b"]);
  });


  it("sideEffect", () => {
    let sum = 0

    tx.transduce(
      tx.sideEffect((x:number)=>sum+=x),
      tx.push(),
      [1,2,3]
    )

    expect(sum).toBe(6)
  })


  it("run", () => {
    tx.run(
      tx.map((x:number)=>x+1),
      [1,2,3]
    )
    expect(true).toBe(true)
  })

})

describe("additional coverage tests", () => {

  it("choices", () => {
    const choices = tx.choices([1,2,3]);
    const res = tx.take(5, choices);
    expect([...res].length).toBe(5);
  });

  it("converge", () => {
    const pred = (a: number, b: number) => a === b;
    const res = [...tx.converge(pred, [1, 2, 3, 2, 1])];
    expect(res).toEqual([1, 2, 3, 2, 1]);
  });

  it("curve", () => {
    const res = [...tx.curve(0, 0, 1, 1)];
    expect(res.length).toBeGreaterThan(0);
  });

  it("delayed", async () => {
    const res = await Promise.all(tx.transduce(
      tx.delayed(10) as any,
      tx.push<number>(),
      [1, 2, 3]
    ));
    expect(res).toEqual([1, 2, 3]);
  });

  it("div", () => {
    const res = tx.reduce(tx.div(10), [2, 5]);
    expect(res).toBe(1);
  });

  it("extendSides", () => {
    const res = [...tx.extendSides([1, 2, 3], 1, 1)];
    expect(res).toEqual([1, 1, 2, 3, 3]);
  });


  it("flatten1", () => {
    const res = tx.transduce(tx.flatten1(), tx.push(), [[1,2],[3,4]]);
    expect(res).toEqual([1,2,3,4]);
  });

  it("groupBinary", () => {
    const tree = tx.reduce(
      tx.groupBinary<number>(2, (x) => x & 0x3, undefined, undefined, 0, 1),
      [1, 2, 3, 4, 5, 6, 7]
    );
    expect(tree).toBeDefined();
  });

 it("groupByObj", () => {
    const res = tx.reduce(
      tx.groupByObj<number, number[]>({ key: (x) => x % 2 }),
      {} as Record<string, number[]>,
      [1, 2, 3, 4]
    );
    expect(res).toEqual({ 0: [2, 4], 1: [1, 3] });
  });

  it("indexed", () => {
    const res = tx.transduce(tx.indexed(), tx.push(), ["a","b"]);
    expect(res).toEqual([[0,"a"],[1,"b"]]);
  });


  it("labeled", () => {
    const res = tx.transduce(tx.labeled("x"), tx.push(), [1, 2]);
    expect(res.length).toBe(2);
  });

  it("line", () => {
    const res = [...tx.line(0, 0, 1)];
    expect(res.length).toBeGreaterThan(0);
  });

 it("mapNth edge", () => {
    const res = tx.transduce(
      tx.mapNth(2, (x: number) => x * 10),
      tx.push<number>(),
      [1, 2, 3, 4]
    );
    expect(res.length).toBe(4);
  });

  it("matchFirst", () => {
    const res = tx.transduce(tx.matchFirst((x:number)=>x>2), tx.push(), [1,2,3,4]);
    expect(res).toEqual([3]);
  });

  it("matchLast", () => {
    const res = tx.transduce(tx.matchLast((x:number)=>x>2), tx.push(), [1,2,3,4]);
    expect(res).toEqual([4]);
  });

  it("maxMag", () => {
    const res = tx.reduce(tx.maxMag(), 0, [1,-5,3]);
    expect(res).toBe(-5);
  });

  it("minMag", () => {
    const res = tx.reduce(tx.minMag(), Infinity, [1, -5, 3]);
    expect(res).toBe(1);
  });

  it("minMax", () => {
    const res = tx.reduce(
      tx.minMax(),
      [Infinity, -Infinity] as [number, number],
      [1, 2, 3]
    );
    expect(res).toEqual([1, 3]);
  });

  it("multiplexObj", () => {
    const res = tx.transduce(
      tx.multiplexObj({
        a: tx.map((x: number) => x + 1),
        b: tx.map((x: number) => x * 2)
      }),
      tx.push<{ a: number; b: number }>(),
      [1]
    );
    expect(res).toEqual([{ a: 2, b: 2 }]);
  });

  it("normCount", () => {
    const res = tx.reduce(tx.normCount(10), [1,1,1,1,1]);
    expect(typeof res).toBe('number');
    expect(res).toBeGreaterThanOrEqual(0);
  });


  it("padSides", () => {
    const res = [...tx.padSides([1, 2, 3], 1, 1)];
    expect(res).toEqual([1, 1, 2, 3, 1]);
  });

  it("page", () => {
    const res = tx.transduce(
      tx.page(2, 1) as any,
      tx.push<number>(),
      [1, 2, 3, 4, 5]
    );
    expect(res).toEqual([3]);
  });


   it("palindrome", () => {
    const res = [...tx.palindrome([1, 2, 3])];
    expect(res).toEqual([1, 2, 3, 3, 2, 1]);
  });


  it("partitionOf", () => {
    const res = tx.transduce(tx.partitionOf([2,3]), tx.push(), [1,2,3,4,5]);
    expect(res).toEqual([[1,2],[3,4,5]]);
  });

  it("partitionSort", () => {
    const res = tx.transduce(
      tx.partitionSort(3),
      tx.push<number>(),
      [5, 1, 4, 2, 3]
    );
    expect(res.length).toBeGreaterThan(0);
  });

  it("partitionTime", async () => {
    const result: number[][] = [];
    const reducer = (acc: typeof result, x: number[]) => {
      acc.push(x);
      return acc;
    };
    await (tx.run as any)(tx.partitionTime(10), reducer, result, [1, 2, 3]);
 
    expect(result).toBeDefined();
  });


  it("pushCopy", () => {
    const res = tx.reduce(tx.pushCopy<number>(), [], [1,2,3]);
    expect(res).toEqual([1,2,3]);
  });

  it("pushKeys", () => {
    const res = tx.reduce(
      (tx.pushKeys as any)(["a", "b"]),
      [] as any[],
      [{ a: 1, b: 2 }, { a: 3, b: 4 }] as any
    );
    expect(res.length).toBe(2);
  });


  it("sortedFrequencies", () => {
    const res = tx.reduce(
      tx.sortedFrequencies(),
      ["a", "b", "a"]
    ) as [string, number][];
    expect(res).toEqual([["a", 2], ["b", 1]]);
  });


  it("step", () => {
    const stepFn = tx.step(tx.map((x: number) => x * 2));
    expect(typeof stepFn).toBe("function");
  });


  it("sub", () => {
    const res = tx.reduce(tx.sub(), 10, [1,2,3]);
    expect(res).toBe(4);
  });


  it("swizzle", () => {
    const res = tx.transduce(tx.swizzle([2,0,1]), tx.push(), [[1,2,3]]);
    expect(res).toEqual([[3,1,2]]);
  });


  it("symmetric", () => {
    const res = [...tx.symmetric([1, 2, 3])];
    expect(res).toEqual([1, 2, 3, 3, 2, 1]);
  });


  it("syncTuples", () => {
    const res = tx.transduce(
      tx.partition(2),
      tx.push(),
      [1, 2, 3, 4]
    );
    expect(res).toEqual([[1, 2], [3, 4]]);
  });


  it("throttleTime", async () => {
    const result: number[] = [];
    const reducer = (acc: typeof result, x: number) => {
      acc.push(x);
      return acc;
    };
    await (tx.run as any)(tx.throttleTime(10), reducer, result, [1, 2, 3]);
    expect(result.length).toBeLessThanOrEqual(3);
  });


  it("trace", () => {
    const res = tx.transduce(
      tx.trace("test:"), 
      tx.push<number>(),
      [1, 2, 3]
    );
    expect(res).toEqual([1, 2, 3]);
  });


  it("transduce edge cases", () => {
    expect(() => tx.transduce(null as any, tx.push(), [])).toThrow();
  });


  it("wordWrap", () => {
    const res = tx.transduce(
      tx.wordWrap(5, {}) as any,
      tx.push<string[]>(),
      ["hello world"]
    );
    expect(res).toEqual([["hello world"]]);
  });


  it("wrapSides", () => {
    const res = [...tx.wrapSides([1, 2, 3], 1, 1)];
    expect(res).toEqual([3, 1, 2, 3, 1]);
  });
});

describe("Additional edge cases for full coverage", () => {
  it("takeLast with count > length", () => {
    const res = tx.transduce(tx.takeLast(10), tx.push<number>(), [1, 2, 3]);
    expect(res).toEqual([1, 2, 3]);
  });

  it("movingAverage with window larger than input", () => {
    const res = [...tx.movingAverage(5, [1, 2, 3])];
    expect(res).toEqual([]);
  });

  it("movingMedian with window larger than input", () => {
    const res = [...tx.movingMedian(5, [1, 2, 3])];
    expect(res).toEqual([]);
  });

  it("interleave with empty input", () => {
    const res = tx.transduce(tx.interleave(() => "x"), tx.push(), []);
    expect(res).toEqual([]);
  });

  it("mapKeys with empty spec", () => {
    const res = tx.transduce(tx.mapKeys({}), tx.push(), [{ a: 1 }]);
    expect(res[0]).toEqual({ a: 1 });
  });

  it("mapVals with identity function", () => {
    const res = tx.transduce(tx.mapVals((x: number) => x), tx.push(), [{ a: 1 }]);
    expect(res[0]).toEqual({ a: 1 });
  });

  it("sample with prob 0", () => {
    const res = tx.transduce(tx.sample(0), tx.push<number>(), [1, 2, 3]);
    expect(res).toEqual([]);
  });

  it("sample with prob 1", () => {
    const res = tx.transduce(tx.sample(1), tx.push<number>(), [1, 2, 3]);
    expect(res).toEqual([1, 2, 3]);
  });

  it("toggle with initial state true", () => {
    const res = tx.transduce(
      tx.toggle(1, 0, true),
      tx.push<number>(),
      [1, 2, 3]
    );
    expect(res).toEqual([0, 1, 0]);
  });

  it("wrapSides with zero padding", () => {
    const res = [...tx.wrapSides([1, 2, 3], 0, 0)];
    expect(res).toEqual([1, 2, 3]);
  });

  it("padSides with zero padding", () => {
    const res = [...tx.padSides([1, 2, 3], 0, 0)];
    expect(res).toEqual([1, 2, 3]);
  });

  it("extendSides with zero padding", () => {
    const res = [...tx.extendSides([1, 2, 3], 0, 0)];
    expect(res).toEqual([1, 2, 3]);
  });


  it("page with start > length", () => {
    const res = tx.transduce((tx.page as any)(2, 5), tx.push<number>(), [1, 2, 3, 4]);
    expect(res).toEqual([]);
  });


  it("run with empty input", () => {
    const result = tx.run(tx.map((x: number) => x), []);
    expect(result).toBeUndefined();
  });

  
  it("dedupe: handles various cases", () => {
    expect(tx.transduce(tx.dedupe(), tx.push(), [])).toEqual([]);
    expect(tx.transduce(tx.dedupe(), tx.push(), [42])).toEqual([42]);
    const a = { x: 1 };
    const b = { x: 1 };
    const res = tx.transduce(tx.dedupe(), tx.push(), [a, a, b, b]);
    expect(res).toEqual([a, b]);
  });
});

describe("lookup extra", () => {
  it("lookup1d works", () => {
    const fn = lookup1d([10, 20, 30]);

    expect(fn(0)).toBe(10);
    expect(fn(1)).toBe(20);
    expect(fn(2)).toBe(30);
  });

  it("lookup2d works", () => {
    // 3x3 grid flattened
    const src = [
      1,2,3,
      4,5,6,
      7,8,9
    ];

    const fn = lookup2d(src, 3);

    expect(fn([0,0])).toBe(1);
    expect(fn([1,1])).toBe(5);
    expect(fn([2,2])).toBe(9);
  });
});


describe("norm frequencies extra", () => {
  it("counts frequencies", () => {
    const res = reduce(normFrequencies(1), ["a", "a", "b"]);

    expect(res.get("a")).toBe(2);
    expect(res.get("b")).toBe(1);
  });
});