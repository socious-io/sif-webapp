import { Divider } from '@mui/material';
import { PROJECT_CATEGORIES, ProjectCategory } from 'src/constants/PROJECT_CATEGORIES';
import { translate } from 'src/core/helpers/utils';
import { OptionType } from 'src/modules/General/components/InputDropdown/index.types';
import Pagination from 'src/modules/General/components/Pagination';
import PaginationMobile from 'src/modules/General/components/PaginationMobile';
import SearchDropdown from 'src/modules/General/components/SearchDropdown';
import ProjectCard from 'src/modules/Projects/components/ProjectCard';

import { ProjectsListProps } from './index.types';
import { useProjectsList } from './useProjectsList';

const ProjectsList: React.FC<ProjectsListProps> = ({ hasTitle = true, roundId }) => {
  const {
    data: { projects, total, page, totalPage, projectCategory },
    operations: { navigate, onChangePage, setProjectCategory },
  } = useProjectsList(roundId);
  return (
    <>
      <div className="flex flex-col gap-8 mt-2 text-lg font-semibold">
        {hasTitle && (
          <div className="flex flex-col">
            <span>
              {translate('projects-all')} ({total})
            </span>
            <div className="flex mt-4 items-center">
              <span> {translate('filter-by')} </span>
              <div className="w-[240px] ml-2">
                <SearchDropdown
                  id="projectCategory"
                  options={[{ label: 'All', value: '' }, ...PROJECT_CATEGORIES]}
                  isSearchable={false}
                  onChange={value => setProjectCategory(value as ProjectCategory)}
                  value={projectCategory}
                  valueStyleObject={{ fontSize: '14px' }}
                />
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
