import { toRelativeTime } from 'src/core/helpers/relative-time';
import { translate } from 'src/core/helpers/utils';
import Icon from 'src/modules/General/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import { useDonationsList } from './useDonationsList';

const DonationsList = () => {
  const {
    data: { donationsList },
  } = useDonationsList();

  return (
    !!donationsList.length && (
      <div className="flex flex-col items-stretch">
        {donationsList.map(donation => (
          <div
            key={donation.id}
            className="flex items-center justify-between py-4 border-0 border-b border-solid border-Gray-light-mode-200"
          >
            <div className="flex-1 flex items-center gap-3">
              <Icon
                name="heart-hand"
                fontSize={24}
                color={variables.color_grey_500}
                className="p-2 bg-Gray-light-mode-100 rounded-full border-[0.75px] border-solid border-[rgba(0,0,0,0.08)]"
              />
              <div className="flex flex-col items-stretch">
                <span className="font-semibold leading-6">{donation.donated_identity.name}</span>
                <span className="hidden xl:inline text-sm leading-5 text-Gray-light-mode-600">
                  {translate('projects-detail.donated-by')} {toRelativeTime(donation.date)}
                </span>
                <div className="flex items-center gap-1 xl:hidden text-sm leading-5 text-Gray-light-mode-600">
                  <span className="font-medium leading-6 text-Gray-light-mode-900">{donation.donated_price} • </span>
                  {toRelativeTime(donation.date)}
                </div>
              </div>
            </div>
            <div className="hidden xl:flex items-center gap-1 font-medium leading-6">
              {donation.donated_price}
              <span className="font-normal leading-5 text-Gray-light-mode-600">($44.5 USD)</span>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default DonationsList;
