const ProjectMeta = function ({ project }) {
  return (
    <>
      <div className="relative">
        <button className="absolute top-2 right-2">Members</button>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
        <div>
          <span>{project.tasksCount} Tasks</span>{" "}
          <span>{project.noteCount} Notes</span>
        </div>
      </div>
    </>
  );
};

export default ProjectMeta;
