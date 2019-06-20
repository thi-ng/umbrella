// Single file WASM backend / runtime for shader-ast
// WIP only
//
// Build WASM binary via:
// https://webassembly.studio/?f=tubtxi5k02

#include <math.h>
#include <stddef.h>
#include <stdint.h>

#define WASM_EXPORT __attribute__((visibility("default")))

#define GLOBALS_SIZE (4 * 1024)
#define LOCALS_SIZE (8 * 1024)
#define STACK_SIZE (32)

#define ERR_NONE (0)
#define ERR_MEM_FULL (1)
#define ERR_STACK_FULL (2)
#define ERR_STACK_EMPTY (3)

// #define MEMCHECK

/**
 * JS error callback
 */
extern void error(size_t id);

typedef union {
  struct {
    float x, y;
  };
  float data[2];
} Vec2;

typedef union {
  struct {
    float x, y, z;
  };
  float data[3];
} Vec3;

typedef union {
  struct {
    float x, y, z, w;
  };
  float data[4];
} Vec4;

typedef union {
  struct {
    int32_t x, y;
  };
  int32_t data[2];
} IVec2;

typedef union {
  struct {
    int32_t x, y, z;
  };
  int32_t data[3];
} IVec3;

typedef union {
  struct {
    int32_t x, y, z, w;
  };
  int32_t data[4];
} IVec4;

typedef union {
  struct {
    uint8_t x, y;
  };
  // ensure min 4 bytes
  uint8_t data[4];
} BVec2;

typedef union {
  struct {
    uint8_t x, y, z;
  };
  // ensure min 4 bytes
  int32_t data[4];
} BVec3;

typedef union {
  struct {
    uint8_t x, y, z, w;
  };
  uint8_t data[4];
} BVec4;

typedef struct {
  float data[4];
} Mat2;

typedef struct {
  float data[6];
} Mat23;

typedef struct {
  float data[9];
} Mat3;

typedef struct {
  float data[16];
} Mat4;

/**
 * Arena for storing global state / vars
 */
static const uint8_t globals[GLOBALS_SIZE];
static const void *globals_end = &globals + GLOBALS_SIZE;
static void *global_ptr = &globals;
/**
 * Arena for storing local state / vars
 */
static const uint8_t locals[LOCALS_SIZE];
static const void *locals_end = &locals + LOCALS_SIZE;
static void *local_ptr = &locals;

/**
 * Array of scope start pointers in `locals` space
 */
static const void *frames[STACK_SIZE] = {&locals};
static size_t curr_frame = 0;

/**
 * Allocates space for new global var.
 */
WASM_EXPORT
void *alloc_global(size_t size) {
#ifdef MEMCHECK
  if (global_ptr + size > globals_end) {
    error(ERR_MEM_FULL);
    return NULL;
  }
#endif
  void *ptr = global_ptr;
  global_ptr += size;
  return ptr;
}

/**
 * Allocates space for new local var. Called by all non-destructive
 * vector operations (currently all of them, apart from `set_vecXXX`).
 */
WASM_EXPORT
void *alloc_local(size_t size) {
#ifdef MEMCHECK
  if (local_ptr + size > locals_end) {
    error(ERR_MEM_FULL);
    return NULL;
  }
#endif
  void *ptr = local_ptr;
  local_ptr += size;
  return ptr;
}

/**
 * Resets heap top for globals. Should only be called at
 * beginning or end of a new program invocation.
 */
WASM_EXPORT
void free_globals() { global_ptr = &globals; }

/**
 * Resets heap top for locals AND the clears stack frame counter, i.e.
 * removes all stack frames at once.
 */
WASM_EXPORT
void free_locals() {
  local_ptr = &locals;
  frames[0] = &locals;
  curr_frame = 0;
}

/**
 * Stores current locals heap top in stack. MUST be called at the
 * beginning of each scope, prior to any other operations. Calls
 * `error()` if stack is full.
 *
 * @see end_frame()
 */
WASM_EXPORT
void begin_frame() {
  if (curr_frame >= STACK_SIZE) {
    error(ERR_STACK_FULL);
  } else {
    frames[curr_frame] = local_ptr;
    curr_frame++;
  }
}

/**
 * Restores locals heap top to last saved address on stack with the
 * effect of freeing / invalidating all locals of the current scope.
 * MUST be called at the end of each scope. Calls `error()` if stack is
 * already empty.
 */
WASM_EXPORT
void end_frame() {
  if (curr_frame < 1) {
    error(ERR_STACK_EMPTY);
  } else {
    curr_frame--;
    local_ptr = frames[curr_frame];
  }
}

// Heap / stack inspection

WASM_EXPORT
void *globals_top() { return global_ptr; }

WASM_EXPORT
void *locals_top() { return global_ptr; }

WASM_EXPORT
size_t num_frames() { return curr_frame; }

WASM_EXPORT
void *curr_scope_start() {
  return curr_frame > 0 ? frames[curr_frame - 1] : &locals;
}

// Vector operations (largely generated for DRY reasons)

#define VEC_CTORS(TYPE, BASE, NAME)                                            \
  WASM_EXPORT                                                                  \
  BASE##2 * set_##NAME##2(BASE##2 * out, TYPE x, TYPE y) {                     \
    out->x = x;                                                                \
    out->y = y;                                                                \
    return out;                                                                \
  }                                                                            \
                                                                               \
  WASM_EXPORT                                                                  \
  BASE##2 * set_##NAME##2n(BASE##2 * out, TYPE n) {                            \
    out->x = n;                                                                \
    out->y = n;                                                                \
    return out;                                                                \
  }                                                                            \
                                                                               \
  WASM_EXPORT                                                                  \
  BASE##3 * set_##NAME##3(BASE##3 * out, TYPE x, TYPE y, TYPE z) {             \
    out->x = x;                                                                \
    out->y = y;                                                                \
    out->z = z;                                                                \
    return out;                                                                \
  }                                                                            \
                                                                               \
  WASM_EXPORT                                                                  \
  BASE##3 * set_##NAME##3n(BASE##3 * out, TYPE n) {                            \
    out->x = n;                                                                \
    out->y = n;                                                                \
    out->z = n;                                                                \
    return out;                                                                \
  }                                                                            \
                                                                               \
  WASM_EXPORT                                                                  \
  BASE##3 * set_##NAME##3vn(BASE##3 * out, const BASE##2 * xy, TYPE z) {       \
    out->x = xy->x;                                                            \
    out->y = xy->y;                                                            \
    out->z = z;                                                                \
    return out;                                                                \
  }                                                                            \
                                                                               \
  WASM_EXPORT                                                                  \
  BASE##4 * set_##NAME##4(BASE##4 * out, TYPE x, TYPE y, TYPE z, TYPE w) {     \
    out->x = x;                                                                \
    out->y = y;                                                                \
    out->z = z;                                                                \
    out->w = w;                                                                \
    return out;                                                                \
  }                                                                            \
                                                                               \
  WASM_EXPORT                                                                  \
  BASE##4 * set_##NAME##4n(BASE##4 * out, TYPE n) {                            \
    out->x = n;                                                                \
    out->y = n;                                                                \
    out->z = n;                                                                \
    out->w = n;                                                                \
    return out;                                                                \
  }                                                                            \
                                                                               \
  WASM_EXPORT                                                                  \
  BASE##4 * set_##NAME##4vn(BASE##4 * out, const BASE##3 * xyz, TYPE w) {      \
    out->x = xyz->x;                                                           \
    out->y = xyz->y;                                                           \
    out->z = xyz->z;                                                           \
    out->w = w;                                                                \
    return out;                                                                \
  }                                                                            \
                                                                               \
  WASM_EXPORT                                                                  \
  BASE##4 *                                                                    \
      set_##NAME##4vv(BASE##4 * out, const BASE##2 * xy, const BASE##2 * zw) { \
    out->x = xy->x;                                                            \
    out->y = xy->y;                                                            \
    out->z = zw->x;                                                            \
    out->w = zw->y;                                                            \
    return out;                                                                \
  }                                                                            \
                                                                               \
  WASM_EXPORT                                                                  \
  BASE##2 * NAME##2(TYPE x, TYPE y) {                                          \
    return set_##NAME##2((BASE##2 *)alloc_local(sizeof(BASE##2)), x, y);       \
  }                                                                            \
                                                                               \
  WASM_EXPORT                                                                  \
  BASE##2 * NAME##2n(TYPE n) {                                                 \
    return set_##NAME##2n((BASE##2 *)alloc_local(sizeof(BASE##2)), n);         \
  }                                                                            \
                                                                               \
  WASM_EXPORT                                                                  \
  BASE##3 * NAME##3(TYPE x, TYPE y, TYPE z) {                                  \
    return set_##NAME##3((BASE##3 *)alloc_local(sizeof(BASE##3)), x, y, z);    \
  }                                                                            \
                                                                               \
  WASM_EXPORT                                                                  \
  BASE##3 * NAME##3n(TYPE n) {                                                 \
    return set_##NAME##3n((BASE##3 *)alloc_local(sizeof(BASE##3)), n);         \
  }                                                                            \
                                                                               \
  WASM_EXPORT                                                                  \
  BASE##3 * NAME##3vn(const BASE##2 * xy, TYPE z) {                            \
    return set_##NAME##3vn((BASE##3 *)alloc_local(sizeof(BASE##3)), xy, z);    \
  }                                                                            \
                                                                               \
  WASM_EXPORT                                                                  \
  BASE##4 * NAME##4(TYPE x, TYPE y, TYPE z, TYPE w) {                          \
    return set_##NAME##4((BASE##4 *)alloc_local(sizeof(BASE##4)), x, y, z, w); \
  }                                                                            \
                                                                               \
  WASM_EXPORT                                                                  \
  BASE##4 * NAME##4n(TYPE n) {                                                 \
    return set_##NAME##4n((BASE##4 *)alloc_local(sizeof(BASE##4)), n);         \
  }                                                                            \
                                                                               \
  WASM_EXPORT                                                                  \
  BASE##4 * NAME##4vn(const BASE##3 * xyz, TYPE w) {                           \
    return set_##NAME##4vn((BASE##4 *)alloc_local(sizeof(BASE##4)), xyz, w);   \
  }                                                                            \
                                                                               \
  WASM_EXPORT                                                                  \
  BASE##4 * NAME##4vv(const BASE##2 * xy, const BASE##2 * zw) {                \
    return set_##NAME##4vv((BASE##4 *)alloc_local(sizeof(BASE##4)), xy, zw);   \
  }

#define VEC_OP(BASE, PREFIX, TYPE, NAME, OP)                         \
  WASM_EXPORT                                                        \
  BASE##2 * PREFIX##2_##NAME(const BASE##2 * a, const BASE##2 * b) { \
    BASE##2 *out = (BASE##2 *)alloc_local(sizeof(BASE##2));          \
    out->x = a->x OP b->x;                                           \
    out->y = a->y OP b->y;                                           \
    return out;                                                      \
  }                                                                  \
                                                                     \
  WASM_EXPORT                                                        \
  BASE##2 * PREFIX##2_##NAME##vn(const BASE##2 * a, TYPE n) {        \
    BASE##2 *out = (BASE##2 *)alloc_local(sizeof(BASE##2));          \
    out->x = a->x OP n;                                              \
    out->y = a->y OP n;                                              \
    return out;                                                      \
  }                                                                  \
                                                                     \
  WASM_EXPORT                                                        \
  BASE##2 * PREFIX##2_##NAME##nv(TYPE n, const BASE##2 * a) {        \
    BASE##2 *out = (BASE##2 *)alloc_local(sizeof(BASE##2));          \
    out->x = n OP a->x;                                              \
    out->y = n OP a->y;                                              \
    return out;                                                      \
  }                                                                  \
                                                                     \
  WASM_EXPORT                                                        \
  BASE##3 * PREFIX##3_##NAME(const BASE##3 * a, const BASE##3 * b) { \
    BASE##3 *out = (BASE##3 *)alloc_local(sizeof(BASE##3));          \
    out->x = a->x OP b->x;                                           \
    out->y = a->y OP b->y;                                           \
    out->z = a->z OP b->z;                                           \
    return out;                                                      \
  }                                                                  \
                                                                     \
  WASM_EXPORT                                                        \
  BASE##3 * PREFIX##3_##NAME##vn(const BASE##3 * a, TYPE n) {        \
    BASE##3 *out = (BASE##3 *)alloc_local(sizeof(BASE##3));          \
    out->x = a->x OP n;                                              \
    out->y = a->y OP n;                                              \
    out->z = a->z OP n;                                              \
    return out;                                                      \
  }                                                                  \
                                                                     \
  WASM_EXPORT                                                        \
  BASE##3 * PREFIX##3_##NAME##nv(TYPE n, const BASE##3 * a) {        \
    BASE##3 *out = (BASE##3 *)alloc_local(sizeof(BASE##3));          \
    out->x = n OP a->x;                                              \
    out->y = n OP a->y;                                              \
    out->z = n OP a->z;                                              \
    return out;                                                      \
  }                                                                  \
                                                                     \
  WASM_EXPORT                                                        \
  BASE##4 * PREFIX##4_##NAME(const BASE##4 * a, const BASE##4 * b) { \
    BASE##4 *out = (BASE##4 *)alloc_local(sizeof(BASE##4));          \
    out->x = a->x OP b->x;                                           \
    out->y = a->y OP b->y;                                           \
    out->z = a->z OP b->z;                                           \
    out->w = a->w OP b->w;                                           \
    return out;                                                      \
  }                                                                  \
                                                                     \
  WASM_EXPORT                                                        \
  BASE##4 * PREFIX##4_##NAME##vn(const BASE##4 * a, TYPE n) {        \
    BASE##4 *out = (BASE##4 *)alloc_local(sizeof(BASE##4));          \
    out->x = a->x OP n;                                              \
    out->y = a->y OP n;                                              \
    out->z = a->z OP n;                                              \
    out->w = a->w OP n;                                              \
    return out;                                                      \
  }                                                                  \
                                                                     \
  WASM_EXPORT                                                        \
  BASE##4 * PREFIX##4_##NAME##nv(TYPE n, const BASE##4 * a) {        \
    BASE##4 *out = (BASE##4 *)alloc_local(sizeof(BASE##4));          \
    out->x = n OP a->x;                                              \
    out->y = n OP a->y;                                              \
    out->z = n OP a->z;                                              \
    out->w = n OP a->w;                                              \
    return out;                                                      \
  }

#define VEC_FN1(BASE, PREFIX, NAME, FN)                     \
  WASM_EXPORT                                               \
  BASE##2 * PREFIX##2_##NAME(const BASE##2 * a) {           \
    BASE##2 *out = (BASE##2 *)alloc_local(sizeof(BASE##2)); \
    out->x = FN(a->x);                                      \
    out->y = FN(a->y);                                      \
    return out;                                             \
  }                                                         \
                                                            \
  WASM_EXPORT                                               \
  BASE##3 * PREFIX##3_##NAME(const BASE##3 * a) {           \
    BASE##3 *out = (BASE##3 *)alloc_local(sizeof(BASE##3)); \
    out->x = FN(a->x);                                      \
    out->y = FN(a->y);                                      \
    out->z = FN(a->z);                                      \
    return out;                                             \
  }                                                         \
                                                            \
  WASM_EXPORT                                               \
  BASE##4 * PREFIX##4_##NAME(const BASE##4 * a) {           \
    BASE##4 *out = (BASE##4 *)alloc_local(sizeof(BASE##4)); \
    out->x = FN(a->x);                                      \
    out->y = FN(a->y);                                      \
    out->z = FN(a->z);                                      \
    out->w = FN(a->w);                                      \
    return out;                                             \
  }

#define VEC_FN2(BASE, PREFIX, NAME, FN)                              \
  WASM_EXPORT                                                        \
  BASE##2 * PREFIX##2_##NAME(const BASE##2 * a, const BASE##2 * b) { \
    BASE##2 *out = (BASE##2 *)alloc_local(sizeof(BASE##2));          \
    out->x = FN(a->x, b->x);                                         \
    out->y = FN(a->y, b->y);                                         \
    return out;                                                      \
  }                                                                  \
                                                                     \
  WASM_EXPORT                                                        \
  BASE##3 * PREFIX##3_##NAME(const BASE##3 * a, const BASE##3 * b) { \
    BASE##3 *out = (BASE##3 *)alloc_local(sizeof(BASE##3));          \
    out->x = FN(a->x, b->x);                                         \
    out->y = FN(a->y, b->y);                                         \
    out->z = FN(a->z, b->z);                                         \
    return out;                                                      \
  }                                                                  \
                                                                     \
  WASM_EXPORT                                                        \
  BASE##4 * PREFIX##4_##NAME(const BASE##4 * a, const BASE##4 * b) { \
    BASE##4 *out = (BASE##4 *)alloc_local(sizeof(BASE##4));          \
    out->x = FN(a->x, b->x);                                         \
    out->y = FN(a->y, b->y);                                         \
    out->z = FN(a->z, b->z);                                         \
    out->w = FN(a->w, b->w);                                         \
    return out;                                                      \
  }

#define VEC_FN3(BASE, PREFIX, NAME, FN)                            \
  WASM_EXPORT                                                      \
  BASE##2 * PREFIX##2_##NAME(const BASE##2 * a, const BASE##2 * b, \
                             const BASE##2 * c) {                  \
    BASE##2 *out = (BASE##2 *)alloc_local(sizeof(BASE##2));        \
    out->x = FN(a->x, b->x, c->x);                                 \
    out->y = FN(a->y, b->y, c->y);                                 \
    return out;                                                    \
  }                                                                \
                                                                   \
  WASM_EXPORT                                                      \
  BASE##3 * PREFIX##3_##NAME(const BASE##3 * a, const BASE##3 * b, \
                             const BASE##3 * c) {                  \
    BASE##3 *out = (BASE##3 *)alloc_local(sizeof(BASE##3));        \
    out->x = FN(a->x, b->x, c->x);                                 \
    out->y = FN(a->y, b->y, c->y);                                 \
    out->z = FN(a->z, b->z, c->z);                                 \
    return out;                                                    \
  }                                                                \
                                                                   \
  WASM_EXPORT                                                      \
  BASE##4 * PREFIX##4_##NAME(const BASE##4 * a, const BASE##4 * b, \
                             const BASE##4 * c) {                  \
    BASE##4 *out = (BASE##4 *)alloc_local(sizeof(BASE##4));        \
    out->x = FN(a->x, b->x, c->x);                                 \
    out->y = FN(a->y, b->y, c->y);                                 \
    out->z = FN(a->z, b->z, c->z);                                 \
    out->w = FN(a->w, b->w, c->w);                                 \
    return out;                                                    \
  }

VEC_CTORS(float, Vec, vec)
VEC_CTORS(int32_t, IVec, ivec)
VEC_CTORS(uint8_t, BVec, bvec)

VEC_OP(Vec, vec, float, add, +)
VEC_OP(Vec, vec, float, sub, -)
VEC_OP(Vec, vec, float, mul, *)
VEC_OP(Vec, vec, float, div, /)

VEC_OP(IVec, ivec, int32_t, add, +)
VEC_OP(IVec, ivec, int32_t, sub, -)
VEC_OP(IVec, ivec, int32_t, mul, *)
VEC_OP(IVec, ivec, int32_t, div, /)

WASM_EXPORT
float swizzle1(float *v, size_t a) { return v[a]; }

WASM_EXPORT
Vec2 *swizzle2(float *v, size_t a, size_t b) {
  return set_vec2((Vec2 *)alloc_local(sizeof(Vec2)), v[a], v[b]);
}

WASM_EXPORT
Vec3 *swizzle3(float *v, size_t a, size_t b, size_t c) {
  return set_vec3((Vec3 *)alloc_local(sizeof(Vec3)), v[a], v[b], v[c]);
}

WASM_EXPORT
Vec4 *swizzle4(float *v, size_t a, size_t b, size_t c, size_t d) {
  return set_vec4((Vec4 *)alloc_local(sizeof(Vec4)), v[a], v[b], v[c], v[d]);
}

WASM_EXPORT
float *set_swizzle1(float *out, float v, size_t a) {
  out[a] = v;
  return out;
}

WASM_EXPORT
float *set_swizzle2(float *out, const float *v, size_t a, size_t b) {
  out[a] = v[0];
  out[b] = v[1];
  return out;
}

WASM_EXPORT
float *set_swizzle3(float *out, const float *v, size_t a, size_t b, size_t c) {
  out[a] = v[0];
  out[b] = v[1];
  out[c] = v[2];
  return out;
}

WASM_EXPORT
float *set_swizzle4(float *out, const float *v, size_t a, size_t b, size_t c,
                    size_t d) {
  out[a] = v[0];
  out[b] = v[1];
  out[c] = v[2];
  out[d] = v[3];
  return out;
}

#define RAD 0.017453292519943295f
#define DEG 57.29577951308232f

float radians(float x) { return x * RAD; }

float degrees(float x) { return x * DEG; }

float fract(float x) { return x - floorf(x); }

float invsqrt(float x) { return 1.f / sqrtf(x); }

float minf(float a, float b) { return a < b ? a : b; }

float maxf(float a, float b) { return a > b ? a : b; }

float clampf(float a, float b, float c) { return minf(maxf(a, b), c); }

float mini(int32_t a, int32_t b) { return a < b ? a : b; }

float maxi(int32_t a, int32_t b) { return a > b ? a : b; }

float clampi(int32_t a, int32_t b, int32_t c) { return mini(maxi(a, b), c); }

float mix(float a, float b, float t) { return a + (b - a) * t; }

float step(float e, float x) { return x < e ? 0.f : 1.f; }

float smoothstep(float e1, float e2, float x) {
  x = clampf((x - e1) / (e2 - e1), 0.f, 1.f);
  return (3.f - 2.f * x) * x * x;
}

float sign(float x) { return x < 0 ? -1 : x > 0 ? 1 : 0; }

VEC_FN1(Vec, vec, abs, fabs)
VEC_FN1(Vec, vec, acos, acosf)
VEC_FN1(Vec, vec, asin, asinf)
VEC_FN1(Vec, vec, atan, atanf)
VEC_FN1(Vec, vec, ceil, ceilf)
VEC_FN3(Vec, vec, clamp, clampf)
VEC_FN1(Vec, vec, cos, cosf)
VEC_FN1(Vec, vec, degrees, degrees)
VEC_FN1(Vec, vec, exp, expf)
VEC_FN1(Vec, vec, exp2, exp2f)
VEC_FN1(Vec, vec, floor, floorf)
VEC_FN1(Vec, vec, fract, fract)
VEC_FN1(Vec, vec, invsqrt, invsqrt)
VEC_FN1(Vec, vec, log, logf)
VEC_FN1(Vec, vec, log2, log2f)
VEC_FN2(Vec, vec, max, maxf)
VEC_FN2(Vec, vec, min, minf)
VEC_FN3(Vec, vec, mix, mix)
VEC_FN2(Vec, vec, mod, fmod)
VEC_FN1(Vec, vec, radians, radians)
VEC_FN1(Vec, vec, sign, sign)
VEC_FN1(Vec, vec, sin, sinf)
VEC_FN1(Vec, vec, sqrt, sqrtf)
VEC_FN3(Vec, vec, smoothstep, smoothstep)
VEC_FN2(Vec, vec, step, step)
VEC_FN1(Vec, vec, tan, tanf)

VEC_FN2(IVec, ivec, min, mini)
VEC_FN2(IVec, ivec, max, maxi)
VEC_FN3(IVec, ivec, clamp, clampi)

WASM_EXPORT
float vec2_dot(const Vec2 *a, const Vec2 *b) {
  return a->x * b->x + a->y * b->y;
}

WASM_EXPORT
float vec3_dot(const Vec3 *a, const Vec3 *b) {
  return a->x * b->x + a->y * b->y + a->z * b->z;
}

WASM_EXPORT
float vec4_dot(const Vec4 *a, const Vec4 *b) {
  return a->x * b->x + a->y * b->y + a->z * b->z + a->w * b->w;
}

WASM_EXPORT
Vec3 *vec3_cross(const Vec3 *a, const Vec3 *b) {
  Vec3 *out = (Vec3 *)alloc_local(sizeof(Vec3));
  out->x = a->y * b->z - a->z * b->y;
  out->y = a->z * b->x - a->x * b->z;
  out->z = a->x * b->y - a->y * b->x;
  return out;
}

WASM_EXPORT
float vec2_length(const Vec2 *a) { return sqrtf(vec2_dot(a, a)); }

WASM_EXPORT
float vec3_length(const Vec3 *a) { return sqrtf(vec3_dot(a, a)); }

WASM_EXPORT
float vec4_length(const Vec4 *a) { return sqrtf(vec4_dot(a, a)); }

WASM_EXPORT
Vec2 *vec2_normalize(const Vec2 *a) {
  float mag = vec2_length(a);
  return vec2_mulvn(a, mag > 1e-6 ? 1.f / mag : 1.f);
}

WASM_EXPORT
Vec2 *vec3_normalize(const Vec3 *a) {
  float mag = vec3_length(a);
  return vec3_mulvn(a, mag > 1e-6 ? 1.f / mag : 1.f);
}

WASM_EXPORT
Vec2 *vec4_normalize(const Vec4 *a) {
  float mag = vec4_length(a);
  return vec4_mulvn(a, mag > 1e-6 ? 1.f / mag : 1.f);
}

WASM_EXPORT
float vec2_distance(const Vec2 *a, const Vec2 *b) {
  Vec2 v = {.x = a->x - b->x, .y = a->y - b->y};
  return vec2_length(&v);
}

WASM_EXPORT
float vec3_distance(const Vec3 *a, const Vec3 *b) {
  Vec3 v = {.x = a->x - b->x, .y = a->y - b->y, .z = a->z - b->z};
  return vec3_length(&v);
}

WASM_EXPORT
float vec4_distance(const Vec4 *a, const Vec4 *b) {
  Vec4 v = {
      .x = a->x - b->x, .y = a->y - b->y, .z = a->z - b->z, .w = a->w - b->w};
  return vec4_length(&v);
}
