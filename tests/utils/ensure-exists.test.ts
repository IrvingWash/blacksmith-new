import { describe, expect, test } from "vitest";
import { ensureExists } from "@utils/ensure-exists";

describe("ensureExists", () => {
    test("should return the passed value if it exists", () => {
        const primitive = 5;
        const complex = [{ key: "value" }];

        expect(ensureExists(primitive)).toEqual(primitive);
        expect(ensureExists(complex)).toEqual(complex);
    });

    test("should throw an error if the value doesn't exist", () => {
        expect(() => ensureExists(undefined)).toThrow("Value is undefined");
        expect(() => ensureExists(null)).toThrow("Value is null");

        const customErrorMessage = "Custom error";

        expect(() => ensureExists(undefined, customErrorMessage)).toThrow(
            customErrorMessage
        );

        expect(() => ensureExists(null, customErrorMessage)).toThrow(
            customErrorMessage
        );
    });
});
