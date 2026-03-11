export function mergeRecordPatch(
  existing: Record<string, unknown>,
  patch: Record<string, unknown>,
): Record<string, unknown> {
  const next = { ...existing };

  for (const [key, value] of Object.entries(patch)) {
    if (value === undefined) {
      delete next[key];
      continue;
    }
    next[key] = value;
  }

  return next;
}
