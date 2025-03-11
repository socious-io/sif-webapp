import { requestKYB } from 'src/core/api';

import { AdaptorRes, SuccessRes } from '..';

export const verifyOrganization = async (orgId: string, documents: string[]): Promise<AdaptorRes<SuccessRes>> => {
  try {
    await requestKYB(orgId, { documents });
    return {
      data: { message: 'succeed' },
      error: null,
    };
  } catch {
    return {
      data: null,
      error: 'Error in verifying organization API call',
    };
  }
};
