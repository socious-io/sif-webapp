import { Divider } from '@mui/material';
import { PROJECT_CATEGORIES, ProjectCategory } from 'src/constants/PROJECT_CATEGORIES';
import { translate } from 'src/core/helpers/utils';
import Icon from 'src/modules/General/components/Icon';
import Input from 'src/modules/General/components/Input';
import Pagination from 'src/modules/General/components/Pagination';
import PaginationMobile from 'src/modules/General/components/PaginationMobile';
import SearchDropdown from 'src/modules/General/components/SearchDropdown';
import ProjectCard from 'src/modules/Projects/components/ProjectCard';

import { ProjectsListProps } from './index.types';
import { useProjectsList } from './useProjectsList';

const ProjectsList: React.FC<ProjectsListProps> = ({ hasTitle = true, roundId }) => {
  const {
    data: { projects, total, page, totalPage, projectCategory, searchQuery },
    operations: { navigate, onChangePage, setProjectCategory, setSearchQuery },
  } = useProjectsList(roundId);

  return (
    <>
      <div className="flex flex-col gap-8 mt-2 text-lg font-semibold">
        {hasTitle && (
          <div className="flex flex-col">
            <span>
              {translate('projects-all')} ({total})
            </span>
            <div className="flex flex-col mt-4 gap-4">
              <span>{translate('filter-by')}</span>
              <div className="flex flex-wrap gap-4">
                <div className="w-[240px]">
                  <SearchDropdown
                    id="projectCategory"
                    options={[{ label: translate('category-all'), value: '' }, ...PROJECT_CATEGORIES]}
                    isSearchable={false}
                    onChange={value => setProjectCategory(value as ProjectCategory)}
                    value={projectCategory}
                    valueStyleObject={{ fontSize: '14px' }}
                  />
                </div>
                <div className="w-[240px]">
                  <Input
                    startIcon={<Icon name="search-lg" fontSize={20} />}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={translate('search-keyword')}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {!!projects.length && (
          <div className="flex flex-wrap mx-[-1.5rem] text-base font-normal">
            {projects.map(project => (
              <ProjectCard
                key={project.id}
                {...project}
                onClick={() => navigate(project.id)}
                className="w-full md:w-[calc((100%/2)-3rem)] lg:w-[calc((100%/3)-3rem)] mx-6 mb-6 md:mb-8"
              />
            ))}
          </div>
        )}
      </div>
      <Divider />
      {!!projects.length && (
        <div className="hidden md:block">
          <Pagination page={page} count={totalPage} onChange={(_, p) => onChangePage(p)} />
        </div>
      )}
      {!!projects.length && (
        <div className="block md:hidden">
          <PaginationMobile page={page} count={totalPage} handleChange={onChangePage} />
        </div>
      )}
    </>
  );
};

export default ProjectsList;
