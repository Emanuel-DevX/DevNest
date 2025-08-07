import MarkdownViewer from "@/components/sample/MarkdownViewer";
import NoteEditor from "@/components/sample/NoteEditor";
import { useState } from "react";
const exampleNote = `
# Sample Note

This is **markdown** with a code block:

\`\`\`js
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

- Bullet list
- [Link](https://example.com)
`;
const NotesList = function () {
  const [openNoteEditor, setOpenNoteEditor] = useState(false);
  return (
    <>
      Notes List will be here one day idk when
      <div className="p-6 bg-zinc-900 text-white min-h-screen">
        <MarkdownViewer className="" content={exampleNote} />
      </div>
      <button
        className="fixed bottom-20 right-20 bg-zinc-900 p-2 px-3 rounded-xl text-teal-400 hover:text-teal-300 hover:bg-zinc-800 font-bold"
        onClick={() => setOpenNoteEditor(true)}
      >
        Add note
      </button>
      {openNoteEditor && (
        <NoteEditor
          onSave={() => {}}
          onCancel={() => setOpenNoteEditor(false)}
        />
      )}
    </>
  );
};

export default NotesList;
