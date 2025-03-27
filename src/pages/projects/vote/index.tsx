import { translate } from 'src/core/helpers/utils';
import BackLink from 'src/modules/General/components/BackLink';
import VoteDonateCard from 'src/modules/Projects/containers/VoteDonateCard';

export const VoteProject = () => {
  return (
    <div className="flex justify-center py-8 px-4 md:py-16 md:px-20">
      <div className="w-full md:w-[35rem] flex flex-col items-center gap-5 md:gap-8">
        <BackLink title={translate('project-vote-back')} customStyle="!justify-start !p-0" />
        <VoteDonateCard />
      </div>
    </div>
  );
};
