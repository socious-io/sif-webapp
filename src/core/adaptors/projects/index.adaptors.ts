import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';
import { createProjects, editProjects, getProject, getProjects, IdentityType } from 'src/core/api';
import { cleanMarkdown, convertMarkdownToJSX } from 'src/core/helpers/convert-md-to-jsx';
import { removedEmptyProps } from 'src/core/helpers/objects-arrays';
import { translate } from 'src/core/helpers/utils';

import { AdaptorRes, DonateReq, Project, ProjectRes, SuccessRes } from '..';
import { Project as ProjectRaw } from '../../api/projects/index.types';
import { getIdentityMeta } from '../users/index.adaptors';
export const getProjectsAdaptor = async (page = 1, limit = 10): Promise<AdaptorRes<ProjectRes>> => {
  try {
    const { results: projects, total } = await getProjects({ page, limit });
    const items = projects.map(project => {
      const { name, profileImage: img, type = 'organizations' } = getIdentityMeta(project.identity);
      return {
        id: project.id,
        coverImg: project.cover?.url || '',
        category: translate(project.social_cause) || SOCIAL_CAUSES[project.social_cause]?.label,
        title: project.title,
        description: cleanMarkdown(project.description),
        creator: {
          id: project.identity.id,
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
    const { name, username, profileImage: img, type = 'organizations' } = getIdentityMeta(project.identity);
    const data = {
      id: project.id,
      coverImg: project.cover?.url || '',
      category: translate(project.social_cause) || SOCIAL_CAUSES[project.social_cause]?.label,
      title: project.title,
      description: project.description,
      creator: { id: project.identity.id, type: type as IdentityType, name, img, username },
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

export const createProjectAdaptor = async (project): Promise<AdaptorRes<Project>> => {
  try {
    const newProject = await createProjects(removedEmptyProps(project) as Partial<Project>);
    return { data: newProject, error: null };
  } catch (error) {
    console.error('Error in creating project: ', error);
    return { data: null, error: 'Error in creating project' };
  }
};

export const editProjectAdaptor = async (project): Promise<AdaptorRes<SuccessRes>> => {
  try {
    await editProjects(project.id, removedEmptyProps(project) as Partial<Project>);
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in editing project: ', error);
    return { data: null, error: 'Error in editing project' };
  }
};

//Fix should be filtered by identity
export const getUserProjects = async (page = 1, limit = 10): Promise<AdaptorRes<ProjectRes>> => {
  try {
    const { results, page, limit, total } = await getProjects({});
    return { data: { items: results, page, limit, total }, error: null };
  } catch (error) {
    console.error('Error in editing project: ', error);
    return { data: null, error: 'Error in editing project' };
  }
};

export const getRawProjectAdaptor = async (projectId: string): Promise<AdaptorRes<ProjectRaw>> => {
  try {
    const data = await getProject(projectId);
    return {
      data,
      error: null,
    };
  } catch (error) {
    return { data: null, error: 'Error in editing project' };
  }
};
