import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn (class name merge)", () => {
  it("joins multiple non-empty strings with space", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("returns single string as-is", () => {
    expect(cn("only")).toBe("only");
  });

  it("filters out undefined, null, false and empty string", () => {
    expect(cn("a", undefined, "b", null, false, "", "c")).toBe("a b c");
  });

  it("returns empty string when all inputs are falsy", () => {
    expect(cn(undefined, null, false, "")).toBe("");
  });

  it("returns empty string when no arguments", () => {
    expect(cn()).toBe("");
  });

  it("keeps single space between joined segments", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });
});
