import { useOutletContext, useParams } from "react-router-dom";
import NoteCard from "./NoteCard";
import { useMemo } from "react";

const NotesList = function () {
  const { refresh, notes, basePath } = useOutletContext();
  return (
    <>
      <div className="flex flex-col gap-2 md:flex-row w-full flex-wrap justify-center">
        {notes.map((note) => (
          <div key={note._id} className="w-full md:w-[48%] lg:w-[32%]">
            <NoteCard basePath={basePath} note={note} />
          </div>
        ))}
      </div>
    </>
  );
};
export default NotesList;
