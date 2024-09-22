const undefinedMessage = "Value is undefined";
const nullMessage = "Value is null";

/**
 * @throws
 */
export function ensureExists<T>(
    value: T | undefined | null,
    message?: string
): T {
    if (value === undefined) {
        throw new Error(message ?? undefinedMessage);
    }

    if (value === null) {
        throw new Error(message ?? nullMessage);
    }

    return value;
}
