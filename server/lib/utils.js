function extractJSONBlock(text) {
  // Remove triple backticks and any leading/trailing whitespace
  return text.replace(/```json|```/g, "").trim();
}


module.exports = {extractJSONBlock}