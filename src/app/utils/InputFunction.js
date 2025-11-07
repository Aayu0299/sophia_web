export const sanitizeHtmlTags = () => ({
  validate: (value) =>
    !/<(\/)?[a-z][\s\S]*>/i.test(value) || "HTML tags are not allowed.",
});

export const handleKeyPress = (e) => {
  const target = e.target;

  if (e.key === " " && target.selectionStart === 0) {
    e.preventDefault();
  }
};

export const handleSpace = (e) => {
  if (e.key === " ") {
    e.preventDefault();
  }
};
