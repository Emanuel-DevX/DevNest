const ProjectMeta = function ({ project }) {
  return (
    <>
      <div className="bg-zinc-900/80 h-120 w-full">
        <h1>{project.title}</h1>
      </div>
    </>
  );
};

export default ProjectMeta;
