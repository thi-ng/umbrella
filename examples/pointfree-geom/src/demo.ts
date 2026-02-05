// SPDX-License-Identifier: Apache-2.0
export const DEMO = `
// Forth-like DSL for 2D geometry generation
// please consult the detailed readme's for:
// https://thi.ng/pointfree & https://thi.ng/pointfree-lang

// line comments can be toggled via ctrl+/ or cmd+/

// math helpers
: fract ( x -- y ) 1 mod ;
: normf ( f x -- y ) * fract ;
: normtau ( f x -- rad ) normf tau * ;
: madd ( a b c -- a+b*c ) * +;

// stateless sine oscillator
: osc-sin ( dc amp freq x -- y ) normtau sin madd ;

// timebased vertex distortion/rotation
: wave ^{ pos amp freq }
    0 @amp time cos * @freq @pos .y osc-sin
    0 @amp time sin * @freq @pos .x osc-sin
    vec2
    translate-tx ;

// timebased shape scaling effect
: squares ^{ pos amp freq }
    0.5 @amp @freq @pos .x time 100 madd osc-sin
    0.5 @amp @freq @pos .y time 100 madd osc-sin * ;

// hex grid generation
6 npoly [ hex 60 regular ] 16 16 grid
// scale shapes individually (to create spacing)
// 0.9 scale-center

// timebased shape tessellation (insetting)
0.5 0.5 0.2 time osc-sin inset
// additional tessellators
// trifan
// quadfan

// apply global wave deformation
// [ 50 0.0025 wave ] transform-points
// apply global shape scaling
// [ 0.45 0.002 squares ] scale-center
`;
