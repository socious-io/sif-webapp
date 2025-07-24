import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProjectAdaptor, editProjectAdaptor } from 'src/core/adaptors';
import { CurrentIdentity } from 'src/core/adaptors';
import { RootState } from 'src/store';
import { resetProject } from 'src/store/reducers/createProject.reducer';

export const usePublish = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const projectState = useSelector((state: RootState) => state.createProject);
  const {
    title,
    description,
    country,
    social_cause,
    website,
    cover_url,
    feasibility,
    category,
    problem_statement,
    solution,
    goals,
    total_requested_amount,
    cost_breakdown,
    video,
    mode,
    voluntery_contribution,
    impact_assessment,
  } = projectState;
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const identityType = currentIdentity?.type;

  const onEditProject = () => navigate(`/create/step-7`);

  const onPublish = async () => {
    try {
      const { data, error } =
        mode === 'create' ? await createProjectAdaptor(projectState) : await editProjectAdaptor(projectState);
      if (!error && data) {
        dispatch(resetProject());
        navigate(`/projects/${data.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    data: {
      currentIdentity,
      openVerifyModal,
      identityType,
      cover_url,
      category,
      website,
      country,
      title,
      description,
      problem_statement,
      solution,
      goals,
      total_requested_amount,
      cost_breakdown,
      feasibility,
      video,
      social_cause,
      voluntery_contribution,
      impact_assessment,
    },
    operations: {
      navigate,
      onEditProject,
      setOpenVerifyModal,
      onPublish,
    },
  };
};
