import { Identity, identities, IdentityType, OrgMeta, UserMeta } from 'src/core/api';

import { AdaptorRes } from '..';
import { CurrentIdentity, IdentityMetaRes } from './index.types';

export const getIdentitiesAdaptor = async (): Promise<AdaptorRes<CurrentIdentity[]>> => {
  try {
    const { identities: currentIdentities } = await identities();
    const data = currentIdentities.map(identity => {
      const {
        name = '',
        username = '',
        usernameVal = '',
        type = 'users',
        profileImage = '',
        email = '',
      } = getIdentityMeta(identity);
      return {
        id: identity.id,
        name,
        username,
        usernameVal,
        img: profileImage,
        email,
        type: type as IdentityType,
        current: identity.current || false,
        verified:
          type === 'users' ? !!(identity.meta as UserMeta).identity_verified_at : (identity.meta as OrgMeta).verified,
        status: type === 'organizations' ? (identity.meta as OrgMeta).status : undefined,
        impact_points: type === 'users' ? (identity.meta as UserMeta).impact_points : undefined,
      };
    });
    return { data, error: null };
  } catch {
    return { data: null, error: 'Error is getting Identities' };
  }
};

export const getIdentityMeta = (identity: Identity | UserMeta | OrgMeta | undefined): IdentityMetaRes => {
  if (identity && 'meta' in identity) {
    // 'organizations' | 'users';
    if (identity.type === 'users') {
      const user = identity.meta as UserMeta;
      return {
        username: user.username ? `@${user.username}` : '',
        usernameVal: user.username,
        name: `${user.first_name} ${user.last_name}`,
        profileImage: user.avatar?.url || '',
        email: user.email,
        type: identity.type as 'users',
      };
    }
    const org = identity.meta as OrgMeta;
    return {
      username: org.shortname ? `@${org.shortname}` : '',
      usernameVal: org.shortname,
      name: org.name || org.shortname,
      profileImage: org.logo?.url || '',
      email: org?.email || '',
      type: identity.type as 'organizations',
    };
  } else {
    return {
      username: '',
      usernameVal: '',
      name: '',
      profileImage: '',
      email: '',
      type: '',
    };
  }
};
