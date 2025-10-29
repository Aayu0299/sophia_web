export const sanitizeHtmlTags = () => ({
  validate: (value) =>
    !/<(\/)?[a-z][\s\S]*>/i.test(value) || "HTML tags are not allowed.",
});