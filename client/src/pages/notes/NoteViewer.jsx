import ConfirmationModal from "@/components/ConfirmationModal";
import MarkdownViewer from "@/components/MarkdownViewer";
import fetcher from "@/lib/api";
import { Edit3, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useOutletContext,
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";

const NoteViewer = function () {
  const { refresh, notes, basePath } = useOutletContext();
  const { noteId } = useParams();
  const [note, setNote] = useState(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const res = notes.filter((note) => String(note._id) === String(noteId));
    if (res.length > 0) {
      setNote(res[0]);
    }
  }, [notes]);
  const handleDelete = async () => {
    try {
      const url = `/notes/${noteId}`;
      await fetcher(url, { method: "DELETE" });
      refresh();
      navigate(basePath, { replace: true });
    } catch (err) {
      console.error(err.message);
    }
  };

  if (!note) {
    return <>Could not find note</>;
  }
  return (
    <>
      <div className="flex flex-col">
        <header className="flex items-center justify-between gap-3">
          <h2 className="font-bold md:text-xl ">{note.title}</h2>
          <div className="flex gap-4">
            <Link to={"edit"} className="flex  items-center">
              <Edit3 className="h-5 text-teal-400" />
              <span className="hidden md:block font-bold text-teal-300">
                edit
              </span>
            </Link>
            <button
              onClick={() => setConfirmationModalOpen(true)}
              className="flex  items-center"
            >
              <Trash className="h-5 text-red-400" />
              <span className="hidden md:block font-bold text-red-400">
                delete
              </span>
            </button>
          </div>
        </header>
        <MarkdownViewer className="" content={note.content} />
      </div>
      <ConfirmationModal
        message="Are you sure u wanna delete this note?"
        isOpen={confirmationModalOpen}
        onConfirm={async () => {
          await handleDelete();
          setConfirmationModalOpen(false);
        }}
        onClose={() => setConfirmationModalOpen(false)}
      />
    </>
  );
};
export default NoteViewer;
