// swizzle gen:
// console.log([...permutations("xyz","xyz")].map((x) =>`"${x.join("")}"`).join(" | "))
// Although it is better to use template literals to generate this,
// we are still using this stupid enumeration,
// because of some historical issues with typescript handling large number of template literals.
// prettier-ignore
type SwizzleXY_1 = "x" | "y";
// prettier-ignore
type SwizzleXY_2 = "xx" | "xy" | "yx" | "yy";
// prettier-ignore
type SwizzleXY_3 = "xxx" | "xxy" | "xyx" | "xyy" | "yxx" | "yxy" | "yyx" | "yyy";
// prettier-ignore
type SwizzleXY_4 = "xxxx" | "xxxy" | "xxyx" | "xxyy" | "xyxx" | "xyxy" | "xyyx" | "xyyy" | "yxxx" | "yxxy" | "yxyx" | "yxyy" | "yyxx" | "yyxy" | "yyyx" | "yyyy";
// prettier-ignore
type SwizzleRG_1 = "r" | "g";
// prettier-ignore
type SwizzleRG_2 = "rr" | "rg" | "gr" | "gg";
// prettier-ignore
type SwizzleRG_3 = "rrr" | "rrg" | "rgr" | "rgg" | "grr" | "grg" | "ggr" | "ggg";
// prettier-ignore
type SwizzleRG_4 = "rrrr" | "rrrg" | "rrgr" | "rrgg" | "rgrr" | "rgrg" | "rggr" | "rggg" | "grrr" | "grrg" | "grgr" | "grgg" | "ggrr" | "ggrg" | "gggr" | "gggg";
// prettier-ignore
type SwizzleST_1 = "s" | "t";
// prettier-ignore
type SwizzleST_2 = "ss" | "st" | "ts" | "tt";
// prettier-ignore
type SwizzleST_3 = "sss" | "sst" | "sts" | "stt" | "tss" | "tst" | "tts" | "ttt";
// prettier-ignore
type SwizzleST_4 = "ssss" | "ssst" | "ssts" | "sstt" | "stss" | "stst" | "stts" | "sttt" | "tsss" | "tsst" | "tsts" | "tstt" | "ttss" | "ttst" | "ttts" | "tttt";
// prettier-ignore
type SwizzleXYZ_1 = "x" | "y" | "z";
// prettier-ignore
type SwizzleXYZ_2 = "xx" | "xy" | "xz" | "yx" | "yy" | "yz" | "zx" | "zy" | "zz";
// prettier-ignore
type SwizzleXYZ_3 = "xxx" | "xxy" | "xxz" | "xyx" | "xyy" | "xyz" | "xzx" | "xzy" | "xzz" | "yxx" | "yxy" | "yxz" | "yyx" | "yyy" | "yyz" | "yzx" | "yzy" | "yzz" | "zxx" | "zxy" | "zxz" | "zyx" | "zyy" | "zyz" | "zzx" | "zzy" | "zzz";
// prettier-ignore
type SwizzleXYZ_4 = "xxxx" | "xxxy" | "xxxz" | "xxyx" | "xxyy" | "xxyz" | "xxzx" | "xxzy" | "xxzz" | "xyxx" | "xyxy" | "xyxz" | "xyyx" | "xyyy" | "xyyz" | "xyzx" | "xyzy" | "xyzz" | "xzxx" | "xzxy" | "xzxz" | "xzyx" | "xzyy" | "xzyz" | "xzzx" | "xzzy" | "xzzz" | "yxxx" | "yxxy" | "yxxz" | "yxyx" | "yxyy" | "yxyz" | "yxzx" | "yxzy" | "yxzz" | "yyxx" | "yyxy" | "yyxz" | "yyyx" | "yyyy" | "yyyz" | "yyzx" | "yyzy" | "yyzz" | "yzxx" | "yzxy" | "yzxz" | "yzyx" | "yzyy" | "yzyz" | "yzzx" | "yzzy" | "yzzz" | "zxxx" | "zxxy" | "zxxz" | "zxyx" | "zxyy" | "zxyz" | "zxzx" | "zxzy" | "zxzz" | "zyxx" | "zyxy" | "zyxz" | "zyyx" | "zyyy" | "zyyz" | "zyzx" | "zyzy" | "zyzz" | "zzxx" | "zzxy" | "zzxz" | "zzyx" | "zzyy" | "zzyz" | "zzzx" | "zzzy" | "zzzz";
// prettier-ignore
type SwizzleRGB_1 = "r" | "g" | "b";
// prettier-ignore
type SwizzleRGB_2 = "rr" | "rg" | "rb" | "gr" | "gg" | "gb" | "br" | "bg" | "bb";
// prettier-ignore
type SwizzleRGB_3 = "rrr" | "rrg" | "rrb" | "rgr" | "rgg" | "rgb" | "rbr" | "rbg" | "rbb" | "grr" | "grg" | "grb" | "ggr" | "ggg" | "ggb" | "gbr" | "gbg" | "gbb" | "brr" | "brg" | "brb" | "bgr" | "bgg" | "bgb" | "bbr" | "bbg" | "bbb";
// prettier-ignore
type SwizzleRGB_4 = "rrrr" | "rrrg" | "rrrb" | "rrgr" | "rrgg" | "rrgb" | "rrbr" | "rrbg" | "rrbb" | "rgrr" | "rgrg" | "rgrb" | "rggr" | "rggg" | "rggb" | "rgbr" | "rgbg" | "rgbb" | "rbrr" | "rbrg" | "rbrb" | "rbgr" | "rbgg" | "rbgb" | "rbbr" | "rbbg" | "rbbb" | "grrr" | "grrg" | "grrb" | "grgr" | "grgg" | "grgb" | "grbr" | "grbg" | "grbb" | "ggrr" | "ggrg" | "ggrb" | "gggr" | "gggg" | "gggb" | "ggbr" | "ggbg" | "ggbb" | "gbrr" | "gbrg" | "gbrb" | "gbgr" | "gbgg" | "gbgb" | "gbbr" | "gbbg" | "gbbb" | "brrr" | "brrg" | "brrb" | "brgr" | "brgg" | "brgb" | "brbr" | "brbg" | "brbb" | "bgrr" | "bgrg" | "bgrb" | "bggr" | "bggg" | "bggb" | "bgbr" | "bgbg" | "bgbb" | "bbrr" | "bbrg" | "bbrb" | "bbgr" | "bbgg" | "bbgb" | "bbbr" | "bbbg" | "bbbb";
// prettier-ignore
type SwizzleSTP_1 = "s" | "t" | "p";
// prettier-ignore
type SwizzleSTP_2 = "ss" | "st" | "sp" | "ts" | "tt" | "tp" | "ps" | "pt" | "pp";
// prettier-ignore
type SwizzleSTP_3 = "sss" | "sst" | "ssp" | "sts" | "stt" | "stp" | "sps" | "spt" | "spp" | "tss" | "tst" | "tsp" | "tts" | "ttt" | "ttp" | "tps" | "tpt" | "tpp" | "pss" | "pst" | "psp" | "pts" | "ptt" | "ptp" | "pps" | "ppt" | "ppp";
// prettier-ignore
type SwizzleSTP_4 = "ssss" | "ssst" | "sssp" | "ssts" | "sstt" | "sstp" | "ssps" | "sspt" | "sspp" | "stss" | "stst" | "stsp" | "stts" | "sttt" | "sttp" | "stps" | "stpt" | "stpp" | "spss" | "spst" | "spsp" | "spts" | "sptt" | "sptp" | "spps" | "sppt" | "sppp" | "tsss" | "tsst" | "tssp" | "tsts" | "tstt" | "tstp" | "tsps" | "tspt" | "tspp" | "ttss" | "ttst" | "ttsp" | "ttts" | "tttt" | "tttp" | "ttps" | "ttpt" | "ttpp" | "tpss" | "tpst" | "tpsp" | "tpts" | "tptt" | "tptp" | "tpps" | "tppt" | "tppp" | "psss" | "psst" | "pssp" | "psts" | "pstt" | "pstp" | "psps" | "pspt" | "pspp" | "ptss" | "ptst" | "ptsp" | "ptts" | "pttt" | "pttp" | "ptps" | "ptpt" | "ptpp" | "ppss" | "ppst" | "ppsp" | "ppts" | "pptt" | "pptp" | "ppps" | "pppt" | "pppp";
// prettier-ignore
type SwizzleXYZW_1 = "x" | "y" | "z" | "w";
// prettier-ignore
type SwizzleXYZW_2 = "xx" | "xy" | "xz" | "xw" | "yx" | "yy" | "yz" | "yw" | "zx" | "zy" | "zz" | "zw" | "wx" | "wy" | "wz" | "ww";
// prettier-ignore
type SwizzleXYZW_3 = "xxx" | "xxy" | "xxz" | "xxw" | "xyx" | "xyy" | "xyz" | "xyw" | "xzx" | "xzy" | "xzz" | "xzw" | "xwx" | "xwy" | "xwz" | "xww" | "yxx" | "yxy" | "yxz" | "yxw" | "yyx" | "yyy" | "yyz" | "yyw" | "yzx" | "yzy" | "yzz" | "yzw" | "ywx" | "ywy" | "ywz" | "yww" | "zxx" | "zxy" | "zxz" | "zxw" | "zyx" | "zyy" | "zyz" | "zyw" | "zzx" | "zzy" | "zzz" | "zzw" | "zwx" | "zwy" | "zwz" | "zww" | "wxx" | "wxy" | "wxz" | "wxw" | "wyx" | "wyy" | "wyz" | "wyw" | "wzx" | "wzy" | "wzz" | "wzw" | "wwx" | "wwy" | "wwz" | "www";
// prettier-ignore
type SwizzleXYZW_4 = "xxxx" | "xxxy" | "xxxz" | "xxxw" | "xxyx" | "xxyy" | "xxyz" | "xxyw" | "xxzx" | "xxzy" | "xxzz" | "xxzw" | "xxwx" | "xxwy" | "xxwz" | "xxww" | "xyxx" | "xyxy" | "xyxz" | "xyxw" | "xyyx" | "xyyy" | "xyyz" | "xyyw" | "xyzx" | "xyzy" | "xyzz" | "xyzw" | "xywx" | "xywy" | "xywz" | "xyww" | "xzxx" | "xzxy" | "xzxz" | "xzxw" | "xzyx" | "xzyy" | "xzyz" | "xzyw" | "xzzx" | "xzzy" | "xzzz" | "xzzw" | "xzwx" | "xzwy" | "xzwz" | "xzww" | "xwxx" | "xwxy" | "xwxz" | "xwxw" | "xwyx" | "xwyy" | "xwyz" | "xwyw" | "xwzx" | "xwzy" | "xwzz" | "xwzw" | "xwwx" | "xwwy" | "xwwz" | "xwww" | "yxxx" | "yxxy" | "yxxz" | "yxxw" | "yxyx" | "yxyy" | "yxyz" | "yxyw" | "yxzx" | "yxzy" | "yxzz" | "yxzw" | "yxwx" | "yxwy" | "yxwz" | "yxww" | "yyxx" | "yyxy" | "yyxz" | "yyxw" | "yyyx" | "yyyy" | "yyyz" | "yyyw" | "yyzx" | "yyzy" | "yyzz" | "yyzw" | "yywx" | "yywy" | "yywz" | "yyww" | "yzxx" | "yzxy" | "yzxz" | "yzxw" | "yzyx" | "yzyy" | "yzyz" | "yzyw" | "yzzx" | "yzzy" | "yzzz" | "yzzw" | "yzwx" | "yzwy" | "yzwz" | "yzww" | "ywxx" | "ywxy" | "ywxz" | "ywxw" | "ywyx" | "ywyy" | "ywyz" | "ywyw" | "ywzx" | "ywzy" | "ywzz" | "ywzw" | "ywwx" | "ywwy" | "ywwz" | "ywww" | "zxxx" | "zxxy" | "zxxz" | "zxxw" | "zxyx" | "zxyy" | "zxyz" | "zxyw" | "zxzx" | "zxzy" | "zxzz" | "zxzw" | "zxwx" | "zxwy" | "zxwz" | "zxww" | "zyxx" | "zyxy" | "zyxz" | "zyxw" | "zyyx" | "zyyy" | "zyyz" | "zyyw" | "zyzx" | "zyzy" | "zyzz" | "zyzw" | "zywx" | "zywy" | "zywz" | "zyww" | "zzxx" | "zzxy" | "zzxz" | "zzxw" | "zzyx" | "zzyy" | "zzyz" | "zzyw" | "zzzx" | "zzzy" | "zzzz" | "zzzw" | "zzwx" | "zzwy" | "zzwz" | "zzww" | "zwxx" | "zwxy" | "zwxz" | "zwxw" | "zwyx" | "zwyy" | "zwyz" | "zwyw" | "zwzx" | "zwzy" | "zwzz" | "zwzw" | "zwwx" | "zwwy" | "zwwz" | "zwww" | "wxxx" | "wxxy" | "wxxz" | "wxxw" | "wxyx" | "wxyy" | "wxyz" | "wxyw" | "wxzx" | "wxzy" | "wxzz" | "wxzw" | "wxwx" | "wxwy" | "wxwz" | "wxww" | "wyxx" | "wyxy" | "wyxz" | "wyxw" | "wyyx" | "wyyy" | "wyyz" | "wyyw" | "wyzx" | "wyzy" | "wyzz" | "wyzw" | "wywx" | "wywy" | "wywz" | "wyww" | "wzxx" | "wzxy" | "wzxz" | "wzxw" | "wzyx" | "wzyy" | "wzyz" | "wzyw" | "wzzx" | "wzzy" | "wzzz" | "wzzw" | "wzwx" | "wzwy" | "wzwz" | "wzww" | "wwxx" | "wwxy" | "wwxz" | "wwxw" | "wwyx" | "wwyy" | "wwyz" | "wwyw" | "wwzx" | "wwzy" | "wwzz" | "wwzw" | "wwwx" | "wwwy" | "wwwz" | "wwww";
// prettier-ignore
type SwizzleRGBA_1 = "r" | "g" | "b" | "a";
// prettier-ignore
type SwizzleRGBA_2 = "rr" | "rg" | "rb" | "ra" | "gr" | "gg" | "gb" | "ga" | "br" | "bg" | "bb" | "ba" | "ar" | "ag" | "ab" | "aa";
// prettier-ignore
type SwizzleRGBA_3 = "rrr" | "rrg" | "rrb" | "rra" | "rgr" | "rgg" | "rgb" | "rga" | "rbr" | "rbg" | "rbb" | "rba" | "rar" | "rag" | "rab" | "raa" | "grr" | "grg" | "grb" | "gra" | "ggr" | "ggg" | "ggb" | "gga" | "gbr" | "gbg" | "gbb" | "gba" | "gar" | "gag" | "gab" | "gaa" | "brr" | "brg" | "brb" | "bra" | "bgr" | "bgg" | "bgb" | "bga" | "bbr" | "bbg" | "bbb" | "bba" | "bar" | "bag" | "bab" | "baa" | "arr" | "arg" | "arb" | "ara" | "agr" | "agg" | "agb" | "aga" | "abr" | "abg" | "abb" | "aba" | "aar" | "aag" | "aab" | "aaa";
// prettier-ignore
type SwizzleRGBA_4 = "rrrr" | "rrrg" | "rrrb" | "rrra" | "rrgr" | "rrgg" | "rrgb" | "rrga" | "rrbr" | "rrbg" | "rrbb" | "rrba" | "rrar" | "rrag" | "rrab" | "rraa" | "rgrr" | "rgrg" | "rgrb" | "rgra" | "rggr" | "rggg" | "rggb" | "rgga" | "rgbr" | "rgbg" | "rgbb" | "rgba" | "rgar" | "rgag" | "rgab" | "rgaa" | "rbrr" | "rbrg" | "rbrb" | "rbra" | "rbgr" | "rbgg" | "rbgb" | "rbga" | "rbbr" | "rbbg" | "rbbb" | "rbba" | "rbar" | "rbag" | "rbab" | "rbaa" | "rarr" | "rarg" | "rarb" | "rara" | "ragr" | "ragg" | "ragb" | "raga" | "rabr" | "rabg" | "rabb" | "raba" | "raar" | "raag" | "raab" | "raaa" | "grrr" | "grrg" | "grrb" | "grra" | "grgr" | "grgg" | "grgb" | "grga" | "grbr" | "grbg" | "grbb" | "grba" | "grar" | "grag" | "grab" | "graa" | "ggrr" | "ggrg" | "ggrb" | "ggra" | "gggr" | "gggg" | "gggb" | "ggga" | "ggbr" | "ggbg" | "ggbb" | "ggba" | "ggar" | "ggag" | "ggab" | "ggaa" | "gbrr" | "gbrg" | "gbrb" | "gbra" | "gbgr" | "gbgg" | "gbgb" | "gbga" | "gbbr" | "gbbg" | "gbbb" | "gbba" | "gbar" | "gbag" | "gbab" | "gbaa" | "garr" | "garg" | "garb" | "gara" | "gagr" | "gagg" | "gagb" | "gaga" | "gabr" | "gabg" | "gabb" | "gaba" | "gaar" | "gaag" | "gaab" | "gaaa" | "brrr" | "brrg" | "brrb" | "brra" | "brgr" | "brgg" | "brgb" | "brga" | "brbr" | "brbg" | "brbb" | "brba" | "brar" | "brag" | "brab" | "braa" | "bgrr" | "bgrg" | "bgrb" | "bgra" | "bggr" | "bggg" | "bggb" | "bgga" | "bgbr" | "bgbg" | "bgbb" | "bgba" | "bgar" | "bgag" | "bgab" | "bgaa" | "bbrr" | "bbrg" | "bbrb" | "bbra" | "bbgr" | "bbgg" | "bbgb" | "bbga" | "bbbr" | "bbbg" | "bbbb" | "bbba" | "bbar" | "bbag" | "bbab" | "bbaa" | "barr" | "barg" | "barb" | "bara" | "bagr" | "bagg" | "bagb" | "baga" | "babr" | "babg" | "babb" | "baba" | "baar" | "baag" | "baab" | "baaa" | "arrr" | "arrg" | "arrb" | "arra" | "argr" | "argg" | "argb" | "arga" | "arbr" | "arbg" | "arbb" | "arba" | "arar" | "arag" | "arab" | "araa" | "agrr" | "agrg" | "agrb" | "agra" | "aggr" | "aggg" | "aggb" | "agga" | "agbr" | "agbg" | "agbb" | "agba" | "agar" | "agag" | "agab" | "agaa" | "abrr" | "abrg" | "abrb" | "abra" | "abgr" | "abgg" | "abgb" | "abga" | "abbr" | "abbg" | "abbb" | "abba" | "abar" | "abag" | "abab" | "abaa" | "aarr" | "aarg" | "aarb" | "aara" | "aagr" | "aagg" | "aagb" | "aaga" | "aabr" | "aabg" | "aabb" | "aaba" | "aaar" | "aaag" | "aaab" | "aaaa";
// prettier-ignore
type SwizzleSTPQ_1 = "s" | "t" | "p" | "q";
// prettier-ignore
type SwizzleSTPQ_2 = "ss" | "st" | "sp" | "sq" | "ts" | "tt" | "tp" | "tq" | "ps" | "pt" | "pp" | "pq" | "qs" | "qt" | "qp" | "qq";
// prettier-ignore
type SwizzleSTPQ_3 = "sss" | "sst" | "ssp" | "ssq" | "sts" | "stt" | "stp" | "stq" | "sps" | "spt" | "spp" | "spq" | "sqs" | "sqt" | "sqp" | "sqq" | "tss" | "tst" | "tsp" | "tsq" | "tts" | "ttt" | "ttp" | "ttq" | "tps" | "tpt" | "tpp" | "tpq" | "tqs" | "tqt" | "tqp" | "tqq" | "pss" | "pst" | "psp" | "psq" | "pts" | "ptt" | "ptp" | "ptq" | "pps" | "ppt" | "ppp" | "ppq" | "pqs" | "pqt" | "pqp" | "pqq" | "qss" | "qst" | "qsp" | "qsq" | "qts" | "qtt" | "qtp" | "qtq" | "qps" | "qpt" | "qpp" | "qpq" | "qqs" | "qqt" | "qqp" | "qqq";
// prettier-ignore
type SwizzleSTPQ_4 = "ssss" | "ssst" | "sssp" | "sssq" | "ssts" | "sstt" | "sstp" | "sstq" | "ssps" | "sspt" | "sspp" | "sspq" | "ssqs" | "ssqt" | "ssqp" | "ssqq" | "stss" | "stst" | "stsp" | "stsq" | "stts" | "sttt" | "sttp" | "sttq" | "stps" | "stpt" | "stpp" | "stpq" | "stqs" | "stqt" | "stqp" | "stqq" | "spss" | "spst" | "spsp" | "spsq" | "spts" | "sptt" | "sptp" | "sptq" | "spps" | "sppt" | "sppp" | "sppq" | "spqs" | "spqt" | "spqp" | "spqq" | "sqss" | "sqst" | "sqsp" | "sqsq" | "sqts" | "sqtt" | "sqtp" | "sqtq" | "sqps" | "sqpt" | "sqpp" | "sqpq" | "sqqs" | "sqqt" | "sqqp" | "sqqq" | "tsss" | "tsst" | "tssp" | "tssq" | "tsts" | "tstt" | "tstp" | "tstq" | "tsps" | "tspt" | "tspp" | "tspq" | "tsqs" | "tsqt" | "tsqp" | "tsqq" | "ttss" | "ttst" | "ttsp" | "ttsq" | "ttts" | "tttt" | "tttp" | "tttq" | "ttps" | "ttpt" | "ttpp" | "ttpq" | "ttqs" | "ttqt" | "ttqp" | "ttqq" | "tpss" | "tpst" | "tpsp" | "tpsq" | "tpts" | "tptt" | "tptp" | "tptq" | "tpps" | "tppt" | "tppp" | "tppq" | "tpqs" | "tpqt" | "tpqp" | "tpqq" | "tqss" | "tqst" | "tqsp" | "tqsq" | "tqts" | "tqtt" | "tqtp" | "tqtq" | "tqps" | "tqpt" | "tqpp" | "tqpq" | "tqqs" | "tqqt" | "tqqp" | "tqqq" | "psss" | "psst" | "pssp" | "pssq" | "psts" | "pstt" | "pstp" | "pstq" | "psps" | "pspt" | "pspp" | "pspq" | "psqs" | "psqt" | "psqp" | "psqq" | "ptss" | "ptst" | "ptsp" | "ptsq" | "ptts" | "pttt" | "pttp" | "pttq" | "ptps" | "ptpt" | "ptpp" | "ptpq" | "ptqs" | "ptqt" | "ptqp" | "ptqq" | "ppss" | "ppst" | "ppsp" | "ppsq" | "ppts" | "pptt" | "pptp" | "pptq" | "ppps" | "pppt" | "pppp" | "pppq" | "ppqs" | "ppqt" | "ppqp" | "ppqq" | "pqss" | "pqst" | "pqsp" | "pqsq" | "pqts" | "pqtt" | "pqtp" | "pqtq" | "pqps" | "pqpt" | "pqpp" | "pqpq" | "pqqs" | "pqqt" | "pqqp" | "pqqq" | "qsss" | "qsst" | "qssp" | "qssq" | "qsts" | "qstt" | "qstp" | "qstq" | "qsps" | "qspt" | "qspp" | "qspq" | "qsqs" | "qsqt" | "qsqp" | "qsqq" | "qtss" | "qtst" | "qtsp" | "qtsq" | "qtts" | "qttt" | "qttp" | "qttq" | "qtps" | "qtpt" | "qtpp" | "qtpq" | "qtqs" | "qtqt" | "qtqp" | "qtqq" | "qpss" | "qpst" | "qpsp" | "qpsq" | "qpts" | "qptt" | "qptp" | "qptq" | "qpps" | "qppt" | "qppp" | "qppq" | "qpqs" | "qpqt" | "qpqp" | "qpqq" | "qqss" | "qqst" | "qqsp" | "qqsq" | "qqts" | "qqtt" | "qqtp" | "qqtq" | "qqps" | "qqpt" | "qqpp" | "qqpq" | "qqqs" | "qqqt" | "qqqp" | "qqqq";

export type Swizzle2_1 = SwizzleXY_1 | SwizzleRG_1 | SwizzleST_1;
export type Swizzle2_2 = SwizzleXY_2 | SwizzleRG_2 | SwizzleST_2;
export type Swizzle2_3 = SwizzleXY_3 | SwizzleRG_3 | SwizzleST_3;
export type Swizzle2_4 = SwizzleXY_4 | SwizzleRG_4 | SwizzleST_4;

export type Swizzle3_1 = SwizzleXYZ_1 | SwizzleRGB_1 | SwizzleSTP_1;
export type Swizzle3_2 = SwizzleXYZ_2 | SwizzleRGB_2 | SwizzleSTP_2;
export type Swizzle3_3 = SwizzleXYZ_3 | SwizzleRGB_3 | SwizzleSTP_3;
export type Swizzle3_4 = SwizzleXYZ_4 | SwizzleRGB_4 | SwizzleSTP_4;

export type Swizzle4_1 = SwizzleXYZW_1 | SwizzleRGBA_1 | SwizzleSTPQ_1;
export type Swizzle4_2 = SwizzleXYZW_2 | SwizzleRGBA_2 | SwizzleSTPQ_2;
export type Swizzle4_3 = SwizzleXYZW_3 | SwizzleRGBA_3 | SwizzleSTPQ_3;
export type Swizzle4_4 = SwizzleXYZW_4 | SwizzleRGBA_4 | SwizzleSTPQ_4;

export type Swizzle2 = Swizzle2_1 | Swizzle2_2 | Swizzle2_3 | Swizzle2_4;
export type Swizzle3 = Swizzle3_1 | Swizzle3_2 | Swizzle3_3 | Swizzle3_4;
export type Swizzle4 = Swizzle4_1 | Swizzle4_2 | Swizzle4_3 | Swizzle4_4;
