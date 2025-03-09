import { translate } from 'src/core/helpers/utils';
import Avatar from 'src/modules/General/components/Avatar';
import ExpandableText from 'src/modules/General/components/ExpandableText';

import { ProjectCardProps } from './index.types';

const ProjectCard: React.FC<ProjectCardProps> = ({
  coverImg,
  category,
  title,
  description,
  creator,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col rounded-xl border border-solid border-Gray-light-mode-200 overflow-hidden shadow-xs cursor-pointer ${className}`}
      onClick={onClick}
    >
      <img src={coverImg} width="100%" height={144} className="object-cover" />
      <div className="h-[calc(100%-9rem)] flex flex-col justify-between gap-8 p-5 md:px-6 md:py-8">
        <div className="flex flex-col items-stretch gap-1">
          <span className="font-semibold leading-6 text-Brand-600">{category}</span>
          <span className="text-2xl font-medium leading-8 text-Gray-light-mode-900">{title}</span>
          <ExpandableText
            text={description}
            isMarkdown
            seeMoreButton={false}
            customStyle="mt-3 leading-6 text-Gray-light-mode-600"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="leading-6 text-Gray-light-mode-600">
            {translate('projects-by')} <span className="font-medium text-Brand-700">{creator.name}</span>
          </div>
          <Avatar type={creator.type || 'users'} img={creator.img || ''} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
