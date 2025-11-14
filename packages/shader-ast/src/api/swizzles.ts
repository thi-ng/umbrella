// SPDX-License-Identifier: Apache-2.0
// swizzle gen:
// console.log([...permutations("xyz","xyz")].map((x) =>`"${x.join("")}"`).join(" | "))

export type Swizzle2_1 = "x" | "y";
export type Swizzle2_2 = "xx" | "xy" | "yx" | "yy";
// prettier-ignore
export type Swizzle2_3 = "xxx" | "xxy" | "xyx" | "xyy" | "yxx" | "yxy" | "yyx" | "yyy";
// prettier-ignore
export type Swizzle2_4 = "xxxx" | "xxxy" | "xxyx" | "xxyy" | "xyxx" | "xyxy" | "xyyx" | "xyyy" | "yxxx" | "yxxy" | "yxyx" | "yxyy" | "yyxx" | "yyxy" | "yyyx" | "yyyy";

export type Swizzle3_1 = "x" | "y" | "z";
// prettier-ignore
export type Swizzle3_2 = "xx" | "xy" | "xz" | "yx" | "yy" | "yz" | "zx" | "zy" | "zz";
// prettier-ignore
export type Swizzle3_3 = "xxx" | "xxy" | "xxz" | "xyx" | "xyy" | "xyz" | "xzx" | "xzy" | "xzz" | "yxx" | "yxy" | "yxz" | "yyx" | "yyy" | "yyz" | "yzx" | "yzy" | "yzz" | "zxx" | "zxy" | "zxz" | "zyx" | "zyy" | "zyz" | "zzx" | "zzy" | "zzz";
// prettier-ignore
export type Swizzle3_4 = "xxxx" | "xxxy" | "xxxz" | "xxyx" | "xxyy" | "xxyz" | "xxzx" | "xxzy" | "xxzz" | "xyxx" | "xyxy" | "xyxz" | "xyyx" | "xyyy" | "xyyz" | "xyzx" | "xyzy" | "xyzz" | "xzxx" | "xzxy" | "xzxz" | "xzyx" | "xzyy" | "xzyz" | "xzzx" | "xzzy" | "xzzz" | "yxxx" | "yxxy" | "yxxz" | "yxyx" | "yxyy" | "yxyz" | "yxzx" | "yxzy" | "yxzz" | "yyxx" | "yyxy" | "yyxz" | "yyyx" | "yyyy" | "yyyz" | "yyzx" | "yyzy" | "yyzz" | "yzxx" | "yzxy" | "yzxz" | "yzyx" | "yzyy" | "yzyz" | "yzzx" | "yzzy" | "yzzz" | "zxxx" | "zxxy" | "zxxz" | "zxyx" | "zxyy" | "zxyz" | "zxzx" | "zxzy" | "zxzz" | "zyxx" | "zyxy" | "zyxz" | "zyyx" | "zyyy" | "zyyz" | "zyzx" | "zyzy" | "zyzz" | "zzxx" | "zzxy" | "zzxz" | "zzyx" | "zzyy" | "zzyz" | "zzzx" | "zzzy" | "zzzz";

export type Swizzle4_1 = "x" | "y" | "z" | "w";
// prettier-ignore
export type Swizzle4_2 = "xx" | "xy" | "xz" | "xw" | "yx" | "yy" | "yz" | "yw" | "zx" | "zy" | "zz" | "zw" | "wx" | "wy" | "wz" | "ww";
// prettier-ignore
export type Swizzle4_3 = "xxx" | "xxy" | "xxz" | "xxw" | "xyx" | "xyy" | "xyz" | "xyw" | "xzx" | "xzy" | "xzz" | "xzw" | "xwx" | "xwy" | "xwz" | "xww" | "yxx" | "yxy" | "yxz" | "yxw" | "yyx" | "yyy" | "yyz" | "yyw" | "yzx" | "yzy" | "yzz" | "yzw" | "ywx" | "ywy" | "ywz" | "yww" | "zxx" | "zxy" | "zxz" | "zxw" | "zyx" | "zyy" | "zyz" | "zyw" | "zzx" | "zzy" | "zzz" | "zzw" | "zwx" | "zwy" | "zwz" | "zww" | "wxx" | "wxy" | "wxz" | "wxw" | "wyx" | "wyy" | "wyz" | "wyw" | "wzx" | "wzy" | "wzz" | "wzw" | "wwx" | "wwy" | "wwz" | "www";
// prettier-ignore
export type Swizzle4_4 = "xxxx" | "xxxy" | "xxxz" | "xxxw" | "xxyx" | "xxyy" | "xxyz" | "xxyw" | "xxzx" | "xxzy" | "xxzz" | "xxzw" | "xxwx" | "xxwy" | "xxwz" | "xxww" | "xyxx" | "xyxy" | "xyxz" | "xyxw" | "xyyx" | "xyyy" | "xyyz" | "xyyw" | "xyzx" | "xyzy" | "xyzz" | "xyzw" | "xywx" | "xywy" | "xywz" | "xyww" | "xzxx" | "xzxy" | "xzxz" | "xzxw" | "xzyx" | "xzyy" | "xzyz" | "xzyw" | "xzzx" | "xzzy" | "xzzz" | "xzzw" | "xzwx" | "xzwy" | "xzwz" | "xzww" | "xwxx" | "xwxy" | "xwxz" | "xwxw" | "xwyx" | "xwyy" | "xwyz" | "xwyw" | "xwzx" | "xwzy" | "xwzz" | "xwzw" | "xwwx" | "xwwy" | "xwwz" | "xwww" | "yxxx" | "yxxy" | "yxxz" | "yxxw" | "yxyx" | "yxyy" | "yxyz" | "yxyw" | "yxzx" | "yxzy" | "yxzz" | "yxzw" | "yxwx" | "yxwy" | "yxwz" | "yxww" | "yyxx" | "yyxy" | "yyxz" | "yyxw" | "yyyx" | "yyyy" | "yyyz" | "yyyw" | "yyzx" | "yyzy" | "yyzz" | "yyzw" | "yywx" | "yywy" | "yywz" | "yyww" | "yzxx" | "yzxy" | "yzxz" | "yzxw" | "yzyx" | "yzyy" | "yzyz" | "yzyw" | "yzzx" | "yzzy" | "yzzz" | "yzzw" | "yzwx" | "yzwy" | "yzwz" | "yzww" | "ywxx" | "ywxy" | "ywxz" | "ywxw" | "ywyx" | "ywyy" | "ywyz" | "ywyw" | "ywzx" | "ywzy" | "ywzz" | "ywzw" | "ywwx" | "ywwy" | "ywwz" | "ywww" | "zxxx" | "zxxy" | "zxxz" | "zxxw" | "zxyx" | "zxyy" | "zxyz" | "zxyw" | "zxzx" | "zxzy" | "zxzz" | "zxzw" | "zxwx" | "zxwy" | "zxwz" | "zxww" | "zyxx" | "zyxy" | "zyxz" | "zyxw" | "zyyx" | "zyyy" | "zyyz" | "zyyw" | "zyzx" | "zyzy" | "zyzz" | "zyzw" | "zywx" | "zywy" | "zywz" | "zyww" | "zzxx" | "zzxy" | "zzxz" | "zzxw" | "zzyx" | "zzyy" | "zzyz" | "zzyw" | "zzzx" | "zzzy" | "zzzz" | "zzzw" | "zzwx" | "zzwy" | "zzwz" | "zzww" | "zwxx" | "zwxy" | "zwxz" | "zwxw" | "zwyx" | "zwyy" | "zwyz" | "zwyw" | "zwzx" | "zwzy" | "zwzz" | "zwzw" | "zwwx" | "zwwy" | "zwwz" | "zwww" | "wxxx" | "wxxy" | "wxxz" | "wxxw" | "wxyx" | "wxyy" | "wxyz" | "wxyw" | "wxzx" | "wxzy" | "wxzz" | "wxzw" | "wxwx" | "wxwy" | "wxwz" | "wxww" | "wyxx" | "wyxy" | "wyxz" | "wyxw" | "wyyx" | "wyyy" | "wyyz" | "wyyw" | "wyzx" | "wyzy" | "wyzz" | "wyzw" | "wywx" | "wywy" | "wywz" | "wyww" | "wzxx" | "wzxy" | "wzxz" | "wzxw" | "wzyx" | "wzyy" | "wzyz" | "wzyw" | "wzzx" | "wzzy" | "wzzz" | "wzzw" | "wzwx" | "wzwy" | "wzwz" | "wzww" | "wwxx" | "wwxy" | "wwxz" | "wwxw" | "wwyx" | "wwyy" | "wwyz" | "wwyw" | "wwzx" | "wwzy" | "wwzz" | "wwzw" | "wwwx" | "wwwy" | "wwwz" | "wwww";

export type Swizzle2 = Swizzle2_1 | Swizzle2_2 | Swizzle2_3 | Swizzle2_4;
export type Swizzle3 = Swizzle3_1 | Swizzle3_2 | Swizzle3_3 | Swizzle3_4;
export type Swizzle4 = Swizzle4_1 | Swizzle4_2 | Swizzle4_3 | Swizzle4_4;
