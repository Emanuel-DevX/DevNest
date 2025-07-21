import LetterIcon from "../../components/LetterIcon";
import { Link } from "react-router-dom";
const ProjectList = function ({ projectList }) {
  return (
    <>
      <div className="flex flex-col md:flex-row w-full flex-wrap justify-between">
        {projectList.map((project) => (
          <ProjectCard key={project._id} projectInfo={project} />
        ))}
      </div>{" "}
    </>
  );
};

const ProjectCard = function ({ projectInfo }) {
  return (
    <>
      <Link to={`/project/${projectInfo._id}`} className="md:w-[48%] lg:w-[32%] gap-4">
        <div className=""> {projectInfo.name}</div>
      </Link>
    </>
  );
};

export default ProjectList;
