export const formatFeatures = (text: string) => {
  return text
    .split("\n")
    .map((line) => (line.startsWith("• ") ? line : `• ${line.trim()}`))
    .join("\n");
};
