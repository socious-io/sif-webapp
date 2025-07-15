import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { CurrentIdentity, getProjectsAdaptor, ProjectRes } from 'src/core/adaptors';
import { RootState } from 'src/store';
export const useProjectsList = () => {
  const navigate = useNavigate();
  const { projects } = useLoaderData() as { projects: ProjectRes };
  const [currentProjects, setCurrentProjects] = useState(projects);
  const [page, setPage] = useState(1);
  const limit = currentProjects?.limit || 10;
  const total = currentProjects?.total || 0;
  const currentList = currentProjects?.items || [];
  const totalPage = Math.ceil(total / limit);
  const identities = useSelector<RootState, CurrentIdentity[]>(state => {
    return state.identity.entities;
  });
  const currentIdentity = identities.find(identity => identity.current);
  const location = useLocation();
  const onChangePage = async (newPage: number) => {
    setPage(newPage);
    if (location.pathname.includes('dashboard')) {
      const { data } = await getProjectsAdaptor(1, 10, { identity_id: currentIdentity?.id as string });
      data && setCurrentProjects(data);
    } else {
      const { data } = await getProjectsAdaptor(newPage, limit);
      data && setCurrentProjects(data);
    }
  };
  useEffect(() => {
    // This condition is added bc this component is used for projects list and dashboard and thi rerender is only needed for dashboard
    if (location.pathname.includes('dashboard')) onChangePage(1);
  }, [currentIdentity?.id]);
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
