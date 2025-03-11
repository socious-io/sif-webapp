import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { getProjectsAdaptor, ProjectRes } from 'src/core/adaptors';

export const useProjectsList = () => {
  const navigate = useNavigate();
  const { projects } = useLoaderData() as { projects: ProjectRes };
  const [currentProjects, setCurrentProjects] = useState(projects);
  const [page, setPage] = useState(1);
  const limit = currentProjects?.limit || 10;
  const total = currentProjects?.total || 0;
  const currentList = currentProjects?.items || [];
  const totalPage = Math.ceil(total / limit);

  const onChangePage = async (newPage: number) => {
    setPage(newPage);
    const { data } = await getProjectsAdaptor(newPage, limit);
    data && setCurrentProjects(data);
  };

  return {
    data: {
      projects: currentList,
      total,
      page,
      totalPage,
    },
    operations: {
      navigate,
      onChangePage,
    },
  };
};
