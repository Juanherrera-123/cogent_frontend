export function removeUndefined<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj
      .filter((v) => v !== undefined)
      .map((v) => removeUndefined(v)) as unknown as T;
  } else if (obj && typeof obj === "object") {
    const result: any = {};
    Object.entries(obj as any).forEach(([key, value]) => {
      if (value !== undefined) {
        const cleaned = removeUndefined(value);
        if (cleaned !== undefined) {
          result[key] = cleaned;
        }
      }
    });
    return result;
  }
  return obj;
}
export default removeUndefined;
