function generateTaskPrompt({
  projectName = "",
  projectDescription = "",
  sprintGoals = "",
  sprintStart = "",
  sprintEnd = "",
  coreFeatures = [],
  completedFeatures = [],
  contributors = 1,
  hoursPerContributor = 5,
  dueDate = "",
} = {}) {
  const totalHours = contributors * hoursPerContributor;

  return `
You are an experienced project manager helping developers plan their sprint.

Based on the following project and sprint context, generate a list of realistic, well-scoped, and achievable tasks for the upcoming sprint.

🔧 Project Name:
${projectName}

📜 Project Description:
${projectDescription}

🎯 Sprint Goals:
${sprintGoals}

🧩 Core Features to Build:
${coreFeatures.join(", ")}

✅ Already Completed Features:
${completedFeatures.join(", ")}

📅 Sprint Duration:
From ${sprintStart} to ${sprintEnd} (Use ${dueDate} as the final due date for each task)

👥 Team Info:
${contributors} contributor(s), ${hoursPerContributor} hours per member (total available time: ${totalHours} hours)

---

🎯 Format the response as a **JSON array of task objects** with the following schema:

[
  {
    "title": "string (3–100 chars, required)",
    "description": "string (optional, keep it concise)",
    "duration": number (estimated time in minutes, required, e.g., 60),
    "dueDate": "ISO string (must be set to ${dueDate})",
    "completed": false,
    "status": "pending"
  },
  ...
]

⚠️ Only return the JSON array — no extra text, explanation, or markdown. 
Make sure the list is reasonable for the time limit and avoids overlapping work. 
Break larger features into multiple sequential tasks if needed.

Ready? Generate now.
  `.trim();
}

module.exports = generateTaskPrompt;
