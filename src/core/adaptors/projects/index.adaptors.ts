import { categoriesAdaptor } from 'src/constants/PROJECT_CATEGORIES';
import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';
import {
  confirmDonation,
  createProjects,
  editProjects,
  getDonations,
  getProject,
  getProjects,
  getRounds,
  IdentityType,
  Round,
} from 'src/core/api';
import { donate, vote } from 'src/core/api';
import { Project as ProjectRaw } from 'src/core/api/projects/index.types';
import { DonationReq as DonateReqRaw } from 'src/core/api/projects/index.types';
import { cleanMarkdown, convertMarkdownToJSX } from 'src/core/helpers/convert-md-to-jsx';
import { getDateRangeStatus } from 'src/core/helpers/date-converter';
import { removedEmptyProps } from 'src/core/helpers/objects-arrays';
import { translate } from 'src/core/helpers/utils';
import { ProjectState } from 'src/store/reducers/createProject.reducer';

import {
  AdaptorRes,
  Donate,
  DonateReq,
  getIdentityMeta,
  Project,
  ProjectRes,
  SuccessRes,
  ProjectReq,
  VotedOrDonatedRes,
} from '..';

export const getProjectsAdaptor = async (
  page = 1,
  limit = 10,
  filters?: { identity_id?: string; round_id?: string; category?: string },
): Promise<AdaptorRes<ProjectRes>> => {
  try {
    const { results: projects, total } = await getProjects({ page, limit }, filters);
    const items = projects.map(project => {
      const { name, profileImage: img, type = 'organizations' } = getIdentityMeta(project.identity);
      return {
        id: project.id,
        coverImg: project.cover?.url || '',
        socialCause: translate(project.social_cause) || SOCIAL_CAUSES[project.social_cause]?.label,
        title: project.title,
        description: cleanMarkdown(project.description),
        creator: {
          id: project.identity.id,
          type: type as IdentityType,
          name,
          img,
        },
        feasibility: project.feasibility,
        impact_assessment: project.impact_assessment,
        problem_statement: project.problem_statement,
        solution: project.solution,
        total_requested_amount: project.total_requested_amount,
        cost_breakdown: project.cost_breakdown,
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
      socialCause: translate(project.social_cause) || SOCIAL_CAUSES[project.social_cause]?.label,
      category: categoriesAdaptor(project.category) || '',
      title: project.title,
      description: project.description,
      creator: { id: project.identity.id, type: type as IdentityType, name, img, username },
      website: project.website || '',
      location: [project.city, project.country].filter(Boolean).join(', ') || 'Worldwide',
      overview: convertMarkdownToJSX(project.description),
      voted: project.user_voted,
      roundStatus: getDateRangeStatus(project.round.voting_start_at, project.round.voting_end_at),
      roundStats: { donations: project.total_donations || 0, votes: project.total_votes },
      votingStartAt: project.round.voting_start_at,
      donations: [
        {
          id: '1',
          donated_identity: { name: 'Chris Willis' },
          donated_price: '100.00 ADA',
          date: new Date().toString(),
        },
        { id: '2', donated_identity: { name: 'Anonymous' }, donated_price: '200.00 ADA', date: new Date().toString() },
      ],
      total_requested_amount: project.total_requested_amount,
      impact_assessment: project.impact_assessment,
      problem_statement: project.problem_statement,
      solution: project.solution,
      feasibility: project.feasibility,
      video: project.video,
      cost_breakdown: project.cost_breakdown,
      goals: project.goals,
      voluntery_contribution: project.voluntery_contribution,
      status: project.status,
      wallet_address: project.wallet_address,
      wallet_env: project.wallet_env,
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
): Promise<AdaptorRes<VotedOrDonatedRes>> => {
  try {
    if (!donatePayload) {
      await vote(projectId);

      return { data: { message: 'succeed' }, error: null };
    }

    if (donatePayload.type === 'FIAT') {
      const payload: DonateReqRaw = {
        amount: donatePayload.donate,
        payment_type: donatePayload.type,
        card_token: donatePayload.token,
        currency: donatePayload.currency,
        rate: donatePayload.rate,
        anonymous: donatePayload.anonymous,
      };
      const { donation, action_required, client_secret } = await donate(projectId, payload);

      return {
        data: {
          donationId: donation.id,
          is3DSRequired: action_required,
          clientSecret: client_secret || '',
        },
        error: null,
      };
    } else {
      // Crypto
      const payload: DonateReqRaw = {
        amount: donatePayload.donate,
        currency: donatePayload.currency,
        txid: donatePayload.transactionHash,
        wallet_address: donatePayload.wallet_address,
        rate: donatePayload.rate,
        anonymous: donatePayload.anonymous,
      };
      await donate(projectId, payload);

      return { data: { message: 'succeed' }, error: null };
    }
  } catch (error) {
    let customError = '';
    if (!donatePayload) {
      customError = translate('vote-donate.error-modal.vote-error-message');
    } else {
      customError =
        donatePayload.type === 'FIAT'
          ? translate('vote-donate.error-modal.fiat-error-message')
          : translate('vote-donate.error-modal.crypto-error-message');
    }

    console.error('Error in voting/donating project: ', error);
    return { data: null, error: customError };
  }
};

export const confirmDonationAdaptor = async (
  donationId: string,
  paymentIntentId: string,
): Promise<AdaptorRes<SuccessRes>> => {
  try {
    await confirmDonation(donationId, { payment_intent_id: paymentIntentId });
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in confirming donation: ', error);
    return { data: null, error: 'Error in confirming donation' };
  }
};

export const createProjectAdaptor = async (project: ProjectReq): Promise<AdaptorRes<Partial<Project>>> => {
  try {
    const { id } = await createProjects(removedEmptyProps(project) as Partial<ProjectReq>);
    return { data: { id }, error: null };
  } catch (error) {
    console.error('Error in creating project: ', error);
    return { data: null, error: 'Error in creating project' };
  }
};

export const editProjectAdaptor = async (project: ProjectReq): Promise<AdaptorRes<Partial<Project>>> => {
  try {
    const { id } = await editProjects(project.id, removedEmptyProps(project) as Partial<ProjectReq>);
    return { data: { id }, error: null };
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

export const getEditProjectAdaptor = async (projectId: string): Promise<AdaptorRes<Partial<ProjectState>>> => {
  try {
    const project = await getProject(projectId);

    const data = {
      title: project.title,
      wallet_address: project.wallet_address || '',
      cover_id: project.cover.id || '',
      website: project.website || '',
      description: project.description,
      social_cause: project.social_cause,
      city: project.city || '',
      country: project.country || '',
      cover_url: project.cover?.url || '',
      email: project.email,
      linkedin: project.linkedin || '',
      category: project.category,
      problem_statement: project.problem_statement,
      solution: project.solution,
      total_requested_amount: project.total_requested_amount,
      feasibility: project.feasibility,
      goals: project.goals,
      video: project.video || '',
      cost_breakdown: project.cost_breakdown,
      voluntery_contribution: project.voluntery_contribution || '',
      impact_assessment: project.impact_assessment,
    };

    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error('Error in getting project: ', error);
    return {
      data: null,
      error: 'Error in getting project',
    };
  }
};

export const getProjectDonationsAdaptor = async (projectId): Promise<AdaptorRes<Donate[]>> => {
  try {
    const donations = await getDonations(projectId);
    const data = donations.results.map(donation => ({
      id: donation.id,
      amount: donation.amount,
      anonymous: donation.anonymous,
      name: `${donation.user?.first_name} ${donation.user?.last_name}`,
      date: donation.created_at,
      currency: donation.currency || 'USD',
    }));
    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error('Error in getting project donations: ', error);
    return {
      data: null,
      error: 'Error in getting project donations',
    };
  }
};

export const getRoundsAdaptor = async (): Promise<AdaptorRes<Round[]>> => {
  try {
    const { data } = await getRounds();
    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error('Error in getting rounds: ', error);
    return {
      data: null,
      error: 'Error in getting rounds',
    };
  }
};
