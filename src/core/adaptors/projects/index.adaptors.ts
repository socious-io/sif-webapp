import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';
import { getProjects, getProject, vote, donate } from 'src/core/api';
import { IdentityType } from 'src/core/api';
import { cleanMarkdown, convertMarkdownToJSX } from 'src/core/helpers/convert-md-to-jsx';

import { AdaptorRes, DonateReq, Project, ProjectRes, SuccessRes } from '..';
import { getIdentityMeta } from '../users/index.adaptors';

//FIXME: social causes sync with Iman and add translation
export const getProjectsAdaptor = async (page = 1, limit = 10): Promise<AdaptorRes<ProjectRes>> => {
  try {
    const { results: projects, total } = await getProjects({ page, limit });
    const items = projects.map(project => {
      const { name, profileImage: img, type } = getIdentityMeta(project.identity);
      return {
        id: project.id,
        coverImg: project.cover?.url || '',
        category: SOCIAL_CAUSES[project.social_cause]?.label || project.social_cause,
        title: project.title,
        description: cleanMarkdown(project.description),
        creator: {
          type: type as IdentityType,
          name,
          img,
        },
      };
    });
    return {
      data: {
        items,
        page,
        limit,
        total,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error in getting projects List: ', error);
    return { data: null, error: 'Error in getting projects List' };
  }
};

export const getProjectAdaptor = async (projectId: string): Promise<AdaptorRes<Project>> => {
  try {
    const project = await getProject(projectId);
    const { name, username, profileImage: img, type } = getIdentityMeta(project.identity);
    const data = {
      id: project.id,
      coverImg: project.cover?.url || '',
      category: SOCIAL_CAUSES[project.social_cause]?.label || project.social_cause,
      title: project.title,
      description: project.description,
      creator: { type: type as IdentityType, name, username, img },
      website: project.website || '',
      location: [project.city, project.country].filter(Boolean).join(', ') || 'Worldwide',
      overview: convertMarkdownToJSX(project.description),
      roundStats: { estimatedMatch: 1240.4, donatedAmount: 24.3, votes: 2 },
      donations: [
        {
          id: '1',
          donated_identity: { name: 'Chris Willis' },
          donated_price: '100.00 ADA',
          date: new Date().toString(),
        },
        { id: '2', donated_identity: { name: 'Anonymous' }, donated_price: '200.00 ADA', date: new Date().toString() },
      ],
    };
    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error('Error in getting project detail: ', error);
    return { data: null, error: 'Error in getting project detail' };
  }
};

export const voteOrDonateProjectAdaptor = async (
  projectId: string,
  donatePayload?: DonateReq,
): Promise<AdaptorRes<SuccessRes>> => {
  try {
    if (donatePayload) {
      // await donate(projectId, payload)
    } else {
      // await vote(projectId)
    }
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in voting/donating project: ', error);
    return { data: null, error: 'Error in voting/donating project' };
  }
};
