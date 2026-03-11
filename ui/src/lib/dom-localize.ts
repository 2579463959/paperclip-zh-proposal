import { translate, type Locale } from "./i18n";

const EXCLUDED_TAGS = new Set(["SCRIPT", "STYLE", "TEXTAREA"]);
const TEXT_NODE_ORIGINAL = new WeakMap<Text, string>();
const ATTRIBUTE_ORIGINAL = new WeakMap<Element, Map<string, string>>();
const ATTRIBUTES = ["placeholder", "title", "aria-label"] as const;

function normalizeText(text: string) {
  const match = text.match(/^(\s*)(.*?)(\s*)$/s);
  if (!match) {
    return { prefix: "", core: text, suffix: "" };
  }
  return { prefix: match[1] ?? "", core: match[2] ?? "", suffix: match[3] ?? "" };
}

function shouldTranslateTextNode(node: Text) {
  const parent = node.parentElement;
  if (!parent) return false;
  return !EXCLUDED_TAGS.has(parent.tagName);
}

function applyToTextNode(node: Text, locale: Locale, recordOriginal: boolean) {
  if (!shouldTranslateTextNode(node)) return;

  const current = node.textContent ?? "";
  if (!current.trim()) return;

  if (recordOriginal || !TEXT_NODE_ORIGINAL.has(node)) {
    TEXT_NODE_ORIGINAL.set(node, current);
  }

  const original = TEXT_NODE_ORIGINAL.get(node) ?? current;
  const { prefix, core, suffix } = normalizeText(original);
  if (!core) return;

  const translated = translate(locale, core);
  node.textContent = `${prefix}${translated}${suffix}`;
}

function applyToAttributes(element: Element, locale: Locale, recordOriginal: boolean) {
  let map = ATTRIBUTE_ORIGINAL.get(element);
  if (!map) {
    map = new Map<string, string>();
    ATTRIBUTE_ORIGINAL.set(element, map);
  }

  for (const attr of ATTRIBUTES) {
    const value = element.getAttribute(attr);
    if (value == null || !value.trim()) continue;

    if (recordOriginal || !map.has(attr)) {
      map.set(attr, value);
    }

    const original = map.get(attr) ?? value;
    element.setAttribute(attr, translate(locale, original));
  }

  if (element instanceof HTMLInputElement) {
    const type = element.type.toLowerCase();
    if (["button", "submit", "reset"].includes(type) && element.value.trim()) {
      if (recordOriginal || !map.has("value")) {
        map.set("value", element.value);
      }
      const original = map.get("value") ?? element.value;
      element.value = translate(locale, original);
    }
  }
}

function walk(node: Node, locale: Locale, recordOriginal: boolean) {
  if (node.nodeType === Node.TEXT_NODE) {
    applyToTextNode(node as Text, locale, recordOriginal);
    return;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return;
  const element = node as Element;
  if (EXCLUDED_TAGS.has(element.tagName)) return;

  applyToAttributes(element, locale, recordOriginal);

  for (const child of Array.from(node.childNodes)) {
    walk(child, locale, recordOriginal);
  }
}

export function localizeDocument(root: ParentNode, locale: Locale, recordOriginal = false) {
  for (const child of Array.from(root.childNodes)) {
    walk(child, locale, recordOriginal);
  }
}
