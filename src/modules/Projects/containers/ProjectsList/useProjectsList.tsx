import { useEffect, useState, useRef } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import { ProjectCategory } from 'src/constants/PROJECT_CATEGORIES';
import { ProjectPreviewRes } from 'src/core/adaptors';
import { translate } from 'src/core/helpers/utils';

export const useProjectsList = (roundId: string) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { projects } = useLoaderData() as { projects: ProjectPreviewRes };
  const isInitialMount = useRef(true);

  const page = parseInt(searchParams.get('page') || '1', 10);
  const categoryFromUrl = searchParams.get('category') || '';
  const searchFromUrl = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState<string>(searchFromUrl);
  const [projectCategory, setProjectCategory] = useState<ProjectCategory>({
    id: '1',
    label: translate('category-all'),
    value: categoryFromUrl,
  });

  const limit = projects?.limit || 10;
  const total = projects?.total || 0;
  const currentList = projects?.items || [];
  const totalPage = Math.ceil(total / limit);

  const roundIdFromUrl = searchParams.get('round_id') || '';

  const buildParams = (
    baseParams: Record<string, string>,
    options?: { category?: string; search?: string },
  ): Record<string, string> => {
    const params = { ...baseParams };
    if (roundIdFromUrl) params.round_id = roundIdFromUrl;
    if (options?.category) params.category = options.category;
    if (options?.search) params.q = options.search;
    return params;
  };

  const onChangePage = (newPage: number) => {
    const params = buildParams({ page: newPage.toString() }, { category: categoryFromUrl, search: searchFromUrl });
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (value: ProjectCategory) => {
    setProjectCategory(value);
    const params = buildParams({ page: '1' }, { category: value.value, search: searchFromUrl });
    setSearchParams(params);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  // Debounce search query and update URL (skip on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timeoutId = setTimeout(() => {
      const params = buildParams({ page: '1' }, { category: categoryFromUrl, search: searchQuery });
      setSearchParams(params);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Sync search query with URL when navigating back/forward
  useEffect(() => {
    if (searchFromUrl !== searchQuery) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchFromUrl]);

  // Sync category with URL when navigating back/forward
  useEffect(() => {
    if (categoryFromUrl !== projectCategory.value) {
      setProjectCategory({
        id: '1',
        label: categoryFromUrl ? translate(categoryFromUrl) : translate('category-all'),
        value: categoryFromUrl,
      });
    }
  }, [categoryFromUrl]);

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
      setProjectCategory: handleCategoryChange,
      setSearchQuery: handleSearchChange,
    },
  };
};
