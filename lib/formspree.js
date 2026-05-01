export function getFormspreeUrl() {
  const formIdOrUrl = process.env.FORMSPREE_FORM_ID?.trim();

  if (!formIdOrUrl) {
    return null;
  }

  if (formIdOrUrl.startsWith('http://') || formIdOrUrl.startsWith('https://')) {
    return formIdOrUrl;
  }

  return `https://formspree.io/f/${formIdOrUrl}`;
}
