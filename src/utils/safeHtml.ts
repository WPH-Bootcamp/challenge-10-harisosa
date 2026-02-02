import DOMPurify from "dompurify";

export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });
};

export const isProbablyHtml = (value: string): boolean => {
  return /<\/?[a-z][\s\S]*>/i.test(value);
};
