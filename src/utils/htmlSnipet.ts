import { sanitizeHtml } from "@/utils";

export const pickFirstParagraphHtml = (raw: string): string => {
  const clean = sanitizeHtml(raw);

  // Kalau ternyata bukan HTML, balikin text biasa jadi <p>
  const looksHtml = /<\/?[a-z][\s\S]*>/i.test(clean);
  if (!looksHtml) {
    const text = clean.trim();
    return text ? `<p>${text}</p>` : "";
  }

  // DOMParser cuma ada di browser (client component)
  const doc = new DOMParser().parseFromString(clean, "text/html");

  // Ambil <p> pertama yang ada isi text
  const p = Array.from(doc.querySelectorAll("p")).find(
    (el) => (el.textContent ?? "").trim().length > 0
  );
  if (p) return p.outerHTML;

  // Fallback: ambil elemen pertama yang ada text
  const first = Array.from(doc.body.children).find(
    (el) => (el.textContent ?? "").trim().length > 0
  );
  if (first) return first.outerHTML;

  // Fallback terakhir: ambil textContent body
  const bodyText = (doc.body.textContent ?? "").trim();
  return bodyText ? `<p>${bodyText}</p>` : "";
};
