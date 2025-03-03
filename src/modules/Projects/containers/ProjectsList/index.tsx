import { Divider } from '@mui/material';
import Pagination from 'src/modules/General/components/Pagination';
import PaginationMobile from 'src/modules/General/components/PaginationMobile';
import ProjectCard from 'src/modules/Projects/components/ProjectCard';

import { ProjectsListProps } from './index.types';
import { useProjectsList } from './useProjectsList';

const ProjectsList: React.FC<ProjectsListProps> = ({ hasTitle = true }) => {
  const {
    data: { projects, total, page, totalPage },
    operations: { navigate, onChangePage },
  } = useProjectsList();

  return (
    <>
      <div className="flex flex-col gap-8 mt-2 text-lg font-semibold">
        {hasTitle && <> All projects ({total})</>}
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
