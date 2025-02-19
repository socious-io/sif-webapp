import { useNavigate } from "react-router-dom";

export const useCreateProjectForm = () => {
  const navigate = useNavigate();

  const navigateCreateProject = () => navigate("/create/step-1");
  return { navigateCreateProject };
};
