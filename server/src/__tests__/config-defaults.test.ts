import { describe, expect, it } from "vitest";
import { applyAdapterConfigDefaultsByType } from "../adapters/config-defaults.js";

describe("applyAdapterConfigDefaultsByType", () => {
  it("does not force a codex model when none is configured", () => {
    const config = applyAdapterConfigDefaultsByType("codex_local", {});

    expect(config).not.toHaveProperty("model");
    expect(config.dangerouslyBypassApprovalsAndSandbox).toBe(true);
  });

  it("preserves an explicit codex model override", () => {
    const config = applyAdapterConfigDefaultsByType("codex_local", {
      model: "gpt-5.4",
      dangerouslyBypassApprovalsAndSandbox: false,
    });

    expect(config.model).toBe("gpt-5.4");
    expect(config.dangerouslyBypassApprovalsAndSandbox).toBe(false);
  });

  it("still applies the cursor fallback model", () => {
    const config = applyAdapterConfigDefaultsByType("cursor", {});

    expect(config.model).toBe("auto");
  });
});
