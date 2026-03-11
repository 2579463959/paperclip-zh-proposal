// @vitest-environment node

import { describe, expect, it } from "vitest";
import { mergeRecordPatch } from "./merge-record-patch";

describe("mergeRecordPatch", () => {
  it("deletes keys set to undefined", () => {
    const merged = mergeRecordPatch(
      { model: "gpt-5.3-codex", search: true },
      { model: undefined },
    );

    expect(merged).toEqual({ search: true });
  });

  it("overrides defined values", () => {
    const merged = mergeRecordPatch(
      { search: false, command: "codex" },
      { search: true },
    );

    expect(merged).toEqual({ search: true, command: "codex" });
  });
});
