/**
 * Recursively removes properties with `undefined` values from objects and arrays.
 *
 * Circular references are detected using a {@link WeakSet} to avoid infinite
 * recursion. The maximum depth of the traversal can be controlled via the
 * `maxDepth` option; by default the depth is unlimited.
 *
 * When the maximum depth is reached or a circular reference is encountered,
 * the value is returned as-is without further traversal.
 *
 * @param obj - Value to clean of `undefined` entries.
 * @param options - Optional settings for the operation.
 * @param options.maxDepth - Maximum recursion depth. Defaults to `Infinity`.
 */
export function removeUndefined<T>(
  obj: T,
  options: { maxDepth?: number } = {},
): T {
  const { maxDepth = Infinity } = options;
  const seen = new WeakSet<object>();

  const helper = (value: unknown, depth: number): unknown => {
    if (value && typeof value === "object") {
      if (seen.has(value as object)) {
        return value;
      }
      if (depth >= maxDepth) {
        return value;
      }
      seen.add(value as object);
      if (Array.isArray(value)) {
        return (value as unknown[])
          .filter((v) => v !== undefined)
          .map((v) => helper(v, depth + 1));
      }
      const result: Record<string, unknown> = {};
      Object.entries(value as Record<string, unknown>).forEach(([key, v]) => {
        if (v !== undefined) {
          const cleaned = helper(v, depth + 1);
          if (cleaned !== undefined) {
            result[key] = cleaned;
          }
        }
      });
      return result;
    }
    return value;
  };

  return helper(obj, 0) as T;
}

export default removeUndefined;
