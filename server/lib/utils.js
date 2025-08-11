const { notifyMany } = require("../controllers/notificationControllers");

function extractJSONBlock(text) {
  // Remove triple backticks and any leading/trailing whitespace
  return text.replace(/```json|```/g, "").trim();
}



async function sendWelcome(userId, username) {
  if (!userId) return;
  await notifyMany({
    recipientIds: [String(userId)],
    actorId: null,            // system message
    projectId: null,          // not tied to a project
    type: "WELCOME",
    title: `Welcome to DevNest, ${username || "there"}!`,
    link: "/dashboard",
  });
}

module.exports = {  };



module.exports = { extractJSONBlock, sendWelcome };