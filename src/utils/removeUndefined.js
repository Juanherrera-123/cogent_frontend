export function removeUndefined(obj) {
    if (Array.isArray(obj)) {
        return obj
            .filter((v) => v !== undefined)
            .map((v) => removeUndefined(v));
    }
    else if (obj && typeof obj === "object") {
        const result = {};
        Object.entries(obj).forEach(([key, value]) => {
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
