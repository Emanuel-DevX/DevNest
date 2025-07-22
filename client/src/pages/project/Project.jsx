import { useParams } from "react-router-dom";

const Project = function(){
      const { id } = useParams();

    return (<>{id}</>)
}

export default  Project