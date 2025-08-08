import MarkdownViewer from "@/components/MarkdownViewer";
import { Edit3 } from "lucide-react";
import { useEffect, useState } from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";

const NoteViewer = function () {
  const { refresh, notes, basePath } = useOutletContext();
  const { noteId } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const res = notes.filter((note) => String(note._id) === String(noteId));
    if (res.length > 0) {
      setNote(res[0]);
    }
  }, [notes]);

  if (!note) {
    return <>Could not find note</>;
  }
  return (
    <>
      <div className="flex flex-col">
        <header className="flex items-center justify-between gap-3">
          <h2 className="font-bold md:text-xl ">{note.title}</h2>
          <Link to={"edit"} className="flex gap-1 items-center">
            <Edit3 className="h-5 text-teal-400" />
            <span className="hidden md:block font-bold text-lg">Edit</span>
          </Link>
        </header>
        <MarkdownViewer className="" content={note.content} />
      </div>
    </>
  );
};
export default NoteViewer;
