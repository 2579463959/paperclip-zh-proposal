import { describe, expect, it } from "vitest";
import { buildCodexLocalConfig } from "@paperclipai/adapter-codex-local/ui";

const baseValues = {
  adapterType: "codex_local",
  cwd: "",
  promptTemplate: "",
  thinkingEffort: "",
  chrome: false,
  dangerouslySkipPermissions: false,
  search: false,
  dangerouslyBypassSandbox: true,
  command: "",
  args: "",
  extraArgs: "",
  envVars: "",
  envBindings: {},
  url: "",
  bootstrapPrompt: "",
  maxTurnsPerRun: 1,
  heartbeatEnabled: true,
  intervalSec: 300,
};

describe("buildCodexLocalConfig", () => {
  it("omits model when no override is selected", () => {
    const config = buildCodexLocalConfig({
      ...baseValues,
      model: "",
      instructionsFilePath: "",
    });

    expect(config).not.toHaveProperty("model");
  });

  it("preserves an explicit model override", () => {
    const config = buildCodexLocalConfig({
      ...baseValues,
      model: " gpt-5.4 ",
      instructionsFilePath: "",
    });

    expect(config.model).toBe("gpt-5.4");
  });
});
