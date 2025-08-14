import { useOutletContext, useParams } from "react-router-dom";
import NoteCard from "./NoteCard";
import { useMemo } from "react";

const NotesList = function () {
  const { refresh, notes, basePath } = useOutletContext();
  return (
    <>
      <div className="flex flex-col md:flex-row gap-1 mx-auto flex-wrap ">
        {notes.map((note) => (
          <div key={note._id} className="md:w-[48%] lg:w-[32%] w-full">
            <NoteCard basePath={basePath} note={note} />
          </div>
        ))}
      </div>
    </>
  );
};
export default NotesList;
