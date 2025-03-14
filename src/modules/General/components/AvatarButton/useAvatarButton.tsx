import { Identity } from 'src/core/api';

import { AccountItem } from '../AvatarLabelGroup/index.types';

export const useAvatarButton = () => {
  const adaptToAccountItem = (entity: Identity): AccountItem => {
    return {
      id: entity.id,
      img: entity.type === 'users' ? entity.meta.avatar?.url || '' : entity.meta.logo?.url || '',
      type: entity.type as 'users' | 'organizations',
      name: entity.type === 'users' ? `${entity.meta.first_name} ${entity.meta.last_name}`.trim() : entity.meta.name,
      email: entity.type === 'users' ? entity.meta.username : entity.meta.shortname,
      selected: entity.current || false,
    };
  };

  return { adaptToAccountItem };
};
