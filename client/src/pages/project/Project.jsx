import { useParams } from "react-router-dom";

const Project = function(){
      const { id } = useParams();

    return (<>Project with the id will be fetched here idk how yet</>)
}

export default  Project