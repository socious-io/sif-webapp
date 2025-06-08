import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { createProjectAdaptor, Project } from 'src/core/adaptors';
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
    city,
    country,
    social_cause,
    cover_id,
    website,
    cover_url,
    feasibility,
    category,
    problem_statement,
    solution,
    goals,
    total_requested_amount,
    cost_beakdown,
    video,
  } = projectState;
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );

  const onEditProject = () => navigate(`/create/step-7`);
  const identityType = currentIdentity?.type;
  const onPublish = async () => {
    try {
      const result = await createProjectAdaptor(projectState);
      dispatch(resetProject());
      navigate(`/projects/${result.data?.id}`);
    } catch (error) {
      console.error(error);
    }
  };
  const getYouTubeEmbedUrl = (url: string | undefined): string | undefined => {
    if (!url) return undefined;
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : undefined;
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
      cost_beakdown,
      feasibility,
      video,
      social_cause,
    },
    operations: {
      navigate,
      onEditProject,
      setOpenVerifyModal,
      onPublish,
      getYouTubeEmbedUrl,
    },
  };
};
