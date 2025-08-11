import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { CurrentIdentity, getProjectsAdaptor, ProjectRes } from 'src/core/adaptors';
import { RootState } from 'src/store';
export const useUsersProjects = () => {
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
    const { data } = await getProjectsAdaptor(newPage, 10, { identity_id: currentIdentity?.id as string });
    data && setCurrentProjects(data);
  };
  useEffect(() => {
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
