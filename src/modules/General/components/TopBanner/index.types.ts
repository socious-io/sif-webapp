import { ButtonProps } from 'src/modules/General/components/Button/index.types';

export interface TopBannerProps {
  theme: 'success' | 'warning';
  text: string;
  supportingText: string;
  primaryButton?: Partial<ButtonProps>;
  secondaryButton?: Partial<ButtonProps>;
  customStyle?: string;
}
