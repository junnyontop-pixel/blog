export function stripMarkdown(text = "") {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`.*?`/g, "")
    .replace(/[#>*_\-\[\]]/g, "")
    .replace(/\n+/g, " ")
    .trim();
}