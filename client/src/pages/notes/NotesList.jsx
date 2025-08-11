import { useOutletContext, useParams } from "react-router-dom";
import NoteCard from "./NoteCard";
import { useMemo } from "react";

const NotesList = function () {
  const { refresh, notes, basePath } = useOutletContext();
  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-1 mx-auto ">
        {notes.map((note) => (
          <div
            key={note._id}
            className="break-inside-avoid w-full"
          >
            <NoteCard basePath={basePath} note={note} />
          </div>
        ))}
      </div>
    </>
  );
};
export default NotesList;
