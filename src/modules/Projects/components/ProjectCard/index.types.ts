import { ProjectPreview } from 'src/core/adaptors';

export interface ProjectCardProps extends ProjectPreview {
  onClick?: () => void;
  className?: string;
}
