// components/SimpleNoteEditor.jsx
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import MarkdownViewer from "@/components/sample/MarkdownViewer";

export default function SimpleNoteEditor({
  initialNote = { title: "", content: "" },
  onSave,
  saving = false,
  showPreview = true,
}) {
  const [title, setTitle] = useState(initialNote.title || "");
  const [content, setContent] = useState(initialNote.content || "");
  const [preview, setPreview] = useState(showPreview);

  async function handleSubmit(e) {
    e.preventDefault();
    await onSave?.({ title, content });
  }

  // tiny helpers to insert markdown tokens (optional but handy)
  const insertAtCursor = (text) => {
    const ta = document.getElementById("note-content");
    if (!ta) return;
    const start = ta.selectionStart ?? content.length;
    const end = ta.selectionEnd ?? content.length;
    const next = content.slice(0, start) + text + content.slice(end);
    setContent(next);
    // put cursor after inserted text
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(start + text.length, start + text.length);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Title */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-zinc-800 text-white p-2 rounded border outline-0 focus:ring-1 ring-teal-400 border-zinc-700"
        placeholder="Note title"
      />

      {/* Tiny toolbar (bold, list, code block) */}
      <div className="flex items-center gap-2">
        <div className="">
          <button
            onClick={() => insertAtCursor("**bold**")}
            className="px-2 py-1 text-gray-300 hover:bg-gray-700 rounded text-sm font-bold"
          >
            B
          </button>
          <button
            onClick={() => insertAtCursor("*italic*")}
            className="px-2 py-1 text-gray-300 hover:bg-gray-700 rounded text-sm italic"
          >
            I
          </button>
          <button
            onClick={() => insertAtCursor("```code```")}
            className="px-2 py-1 text-gray-300 hover:bg-gray-700 rounded text-sm font-mono"
          >
            &lt;&gt;
          </button>
          <button
            onClick={() => insertAtCursor("\n- ")}
            className="px-2 py-1 text-gray-300 hover:bg-gray-700 rounded text-sm"
          >
            • List
          </button>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPreview((p) => !p)}
            className="px-2 py-1 text-sm rounded border border-zinc-700 flex items-center"
          >
            {preview ? <EyeOff className="h-4 text-red-400" /> : <Eye className="text-teal-400 h-4" />} Preview
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-3 py-1.5 rounded bg-teal-600 text-white disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {/* Editor + Preview */}
      <div
        className={`grid gap-4 ${preview ? "lg:grid-cols-2" : "grid-cols-1"}`}
      >
        <textarea
          id="note-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={18}
          className="w-full bg-zinc-800 text-white p-3 focus:ring-1 ring-teal-300 outline-0 rounded border border-zinc-700 font-mono tab-size-4"
          placeholder="Write markdown here…"
          spellCheck="false"
        />

        {preview && (
          <div className="p-3 rounded border border-zinc-700 bg-zi overflow-auto">
            <MarkdownViewer content={content} enableLineBreaks />
          </div>
        )}
      </div>
    </form>
  );
}
