import { Identity, OrgMeta, UserMeta } from 'src/core/api';

import { IdentityMetaRes } from './index.types';

export const getIdentityMeta = (identity: Identity | UserMeta | OrgMeta | undefined): IdentityMetaRes => {
  if (identity && 'meta' in identity) {
    // 'organizations' | 'users';
    if (identity.type === 'users') {
      const user = identity.meta as UserMeta;
      return {
        username: `@${user.username}`,
        usernameVal: user.username,
        name: `${user.first_name} ${user.last_name}`,
        profileImage: user.avatar?.url || '',
        type: identity.type as 'users',
      };
    }
    const org = identity.meta as OrgMeta;
    return {
      username: `@${org.shortname}`,
      usernameVal: org.shortname,
      name: org.name || org.shortname,
      profileImage: org.logo?.url || '',
      type: identity.type as 'organizations',
    };
  } else {
    return {
      username: '',
      usernameVal: '',
      name: '',
      profileImage: '',
      type: '',
    };
  }
};
