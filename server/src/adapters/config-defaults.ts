import { DEFAULT_CODEX_LOCAL_BYPASS_APPROVALS_AND_SANDBOX } from "@paperclipai/adapter-codex-local";
import { DEFAULT_CURSOR_LOCAL_MODEL } from "@paperclipai/adapter-cursor-local";

function asNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function applyAdapterConfigDefaultsByType(
  adapterType: string | null | undefined,
  adapterConfig: Record<string, unknown>,
): Record<string, unknown> {
  const next = { ...adapterConfig };

  if (adapterType === "codex_local") {
    const hasBypassFlag =
      typeof next.dangerouslyBypassApprovalsAndSandbox === "boolean" ||
      typeof next.dangerouslyBypassSandbox === "boolean";
    if (!hasBypassFlag) {
      next.dangerouslyBypassApprovalsAndSandbox = DEFAULT_CODEX_LOCAL_BYPASS_APPROVALS_AND_SANDBOX;
    }
    return next;
  }

  if (adapterType === "cursor" && !asNonEmptyString(next.model)) {
    next.model = DEFAULT_CURSOR_LOCAL_MODEL;
  }

  return next;
}
