import { requestKYB } from 'src/core/api';

import { AdaptorRes } from '..';
import { VerificationRes } from './index.types';

export const verifyOrganization = async (orgId: string, documents: string[]): Promise<AdaptorRes<VerificationRes>> => {
  try {
    const data = await requestKYB(orgId, { documents });
    return {
      data: { message: 'succeed', status: data.status },
      error: null,
    };
  } catch {
    return {
      data: null,
      error: 'Error in verifying organization API call',
    };
  }
};
