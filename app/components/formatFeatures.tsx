export const formatFeatures = (text: string) => {
  // If text already contains markdown formatting (bullets, asterisks, headers), preserve it
  if (text.includes('**') || text.includes('###') || text.includes('- ') || text.includes('* ')) {
    return text;
  }
  
  // Otherwise, add basic markdown bullets to plain text
  return text
    .split("\n")
    .filter(line => line.trim() !== '')
    .map((line) => {
      const trimmed = line.trim();
      // If line already has a bullet (•, -, *), convert to markdown bullet
      if (trimmed.startsWith("• ")) {
        return `- ${trimmed.substring(2)}`;
      } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        return trimmed;
      } else {
        return `- ${trimmed}`;
      }
    })
    .join("\n");
};
