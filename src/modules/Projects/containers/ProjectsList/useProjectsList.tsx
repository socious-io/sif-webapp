import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { ProjectCategory } from 'src/constants/PROJECT_CATEGORIES';
import { getProjectsAdaptor, ProjectRes } from 'src/core/adaptors';

export const useProjectsList = (roundId: string) => {
  const navigate = useNavigate();
  const { projects } = useLoaderData() as { projects: ProjectRes };
  const [currentProjects, setCurrentProjects] = useState(projects);
  const [page, setPage] = useState(1);
  const limit = currentProjects?.limit || 10;
  const total = currentProjects?.total || 0;
  const currentList = currentProjects?.items || [];
  const totalPage = Math.ceil(total / limit);
  const [projectCategory, setProjectCategory] = useState<ProjectCategory>({ id: '1', label: 'All', value: '' });
  const onChangePage = async (newPage: number) => {
    setPage(newPage);
    const { data } = await getProjectsAdaptor(newPage, limit);
    data && setCurrentProjects(data);
  };
  useEffect(() => {
    const changeRound = async () => {
      if (roundId) {
        const { data } = await getProjectsAdaptor(1, limit, { round_id: roundId, category: projectCategory.value });
        data && setCurrentProjects(data);
      }
    };
    changeRound();
  }, [roundId, projectCategory]);

  return {
    data: {
      projects: currentList,
      total,
      page,
      totalPage,
      projectCategory,
    },
    operations: {
      navigate,
      onChangePage,
      setProjectCategory,
    },
  };
};
