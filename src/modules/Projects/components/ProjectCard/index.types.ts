import { Project } from 'src/core/adaptors';

export interface ProjectCardProps extends Project {
  onClick?: () => void;
  className?: string;
}
