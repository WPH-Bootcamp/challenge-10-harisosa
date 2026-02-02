import { sanitizeHtml } from "@/utils";


export const pickFirstParagraphHtml = (raw: string): string => {
  const clean = sanitizeHtml(raw);

  const looksHtml = /<\/?[a-z][\s\S]*>/i.test(clean);
  if (!looksHtml) {
    const excerpt = pickUntilSecondDot(clean);
    return excerpt ? `<p>${excerpt}</p>` : "";
  }

  const doc = new DOMParser().parseFromString(clean, "text/html");

  const p = Array.from(doc.querySelectorAll("p")).find(
    (el) => (el.textContent ?? "").trim().length > 0
  );
  if (p) return p.outerHTML;

  const first = Array.from(doc.body.children).find(
    (el) => (el.textContent ?? "").trim().length > 0
  );
  if (first) return first.outerHTML;

  const bodyText = (doc.body.textContent ?? "").trim();
  return bodyText ? `<p>${bodyText}</p>` : "";
};


const pickUntilSecondDot = (text: string): string => {
  const clean = text.trim();
  if (!clean) return "";

  let dotCount = 0;
  let endIndex = clean.length;

  for (let i = 0; i < clean.length; i++) {
    if (clean[i] === ".") {
      dotCount++;
      if (dotCount === 2) {
        endIndex = i + 1;
        break;
      }
    }
  }

  return clean.slice(0, endIndex).trim();
};
