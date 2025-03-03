// import { getProjects, getProject, vote, donate } from 'src/core/api';
import { IdentityType } from 'src/core/api';

import { AdaptorRes, DonateReq, Project, ProjectRes, SuccessRes } from '..';

export const getProjectsAdaptor = async (page = 1, limit = 10): Promise<AdaptorRes<ProjectRes>> => {
  try {
    //   const { items, total } = await getProjects({ page, limit });
    //FIXME: mapping from API to adaptor
    const projects = [
      {
        id: '1',
        coverImg: '/images/explorer-cover.png',
        category: 'Gender Equality',
        title: 'Empowering Women Through Education',
        description:
          'This initiative focuses on providing access to quality education and vocational training for women in underserved communities, empowering them to break the cycle of poverty.',
        creator: { type: 'users' as IdentityType, name: 'EduWomen Alliance', img: '' },
      },
      {
        id: '2',
        coverImg: '/images/explorer-cover.png',
        category: 'Food Security',
        title: 'Sustainable Farming Solutions',
        description:
          'This project supports small-scale farmers in adopting sustainable agriculture practices, improving food security, and reducing environmental degradation.',
        creator: { type: 'users' as IdentityType, name: 'Alejandro Torres', img: '' },
      },
      {
        id: '3',
        coverImg: '/images/explorer-cover.png',
        category: 'Health',
        title: 'Accessible Healthcare for Remote Communities',
        description:
          'This initiative aims to establish mobile health clinics and telemedicine services in remote areas, providing access to quality healthcare for underserved populations.',
        creator: { type: 'organizations' as IdentityType, name: 'HealthReach International', img: '' },
      },
      {
        id: '4',
        coverImg: '/images/explorer-cover.png',
        category: 'Environment and Sustainability',
        title: 'Clean Water for All',
        description:
          'This initiative aims to establish mobile health clinics and telemedicine services in remote areas, providing access to quality healthcare for underserved populations.',
        creator: { type: 'users' as IdentityType, name: 'Maria Rodriguez', img: '' },
      },
    ];
    return {
      data: {
        items: projects,
        page,
        limit,
        total: 4,
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
    //   const project = await getProject(id);
    //FIXME: mapping from API to adaptor
    const data = {
      id: '1',
      coverImg: '/images/explorer-cover.png',
      category: 'Gender Equality',
      title: 'Empowering Women Through Education',
      description:
        'This initiative focuses on providing access to quality education and vocational training for women in underserved communities, empowering them to break the cycle of poverty.',
      creator: { type: 'users' as IdentityType, name: 'EduWomen Alliance', username: '@EduWomenAlliance', img: '' },
      website: 'empoweringwomenethiopia.org',
      location: 'Addis Ababa, Ethiopia',
      overview:
        '"Empowering Ethiopia Future" is a project dedicated to providing accessible, high-quality education to children in underprivileged communities across Ethiopia. By establishing community-based learning centers, training local educators, and providing essential educational resources, we aim to bridge the education gap and create opportunities for every child to reach their full potential.',
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
