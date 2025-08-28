import { useEffect, useState, useCallback } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { ProjectCategory } from 'src/constants/PROJECT_CATEGORIES';
import { getProjectsPreviewAdaptor, ProjectPreviewRes } from 'src/core/adaptors';
import { translate } from 'src/core/helpers/utils';

export const useProjectsList = (roundId: string) => {
  const navigate = useNavigate();
  const { projects } = useLoaderData() as { projects: ProjectPreviewRes };
  const [currentProjects, setCurrentProjects] = useState(projects);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [projectCategory, setProjectCategory] = useState<ProjectCategory>({
    id: '1',
    label: translate('category-all'),
    value: '',
  });

  const limit = currentProjects?.limit || 10;
  const total = currentProjects?.total || 0;
  const currentList = currentProjects?.items || [];
  const totalPage = Math.ceil(total / limit);

  const debounce = useCallback((fn: (...args: any[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  }, []);

  const fetchProjects = async (pageNum: number, search: string, category: string) => {
    if (roundId) {
      const { data } = await getProjectsPreviewAdaptor(pageNum, limit, {
        round_id: roundId,
        category,
        q: search,
      });
      data && setCurrentProjects(data);
    }
  };

  const debouncedFetchProjects = useCallback(
    debounce((pageNum: number, search: string, category: string) => {
      fetchProjects(pageNum, search, category);
    }, 300),
    [roundId],
  );

  const onChangePage = async (newPage: number) => {
    setPage(newPage);
    await fetchProjects(newPage, searchQuery, projectCategory.value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    debouncedFetchProjects(1, searchQuery, projectCategory.value);
  }, [roundId, projectCategory, searchQuery, debouncedFetchProjects]);

  return {
    data: {
      projects: currentList,
      total,
      page,
      totalPage,
      projectCategory,
      searchQuery,
    },
    operations: {
      navigate,
      onChangePage,
      setProjectCategory,
      setSearchQuery,
    },
  };
};
