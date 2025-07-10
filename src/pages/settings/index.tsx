import { ReactNode, useState } from 'react';
import { translate } from 'src/core/helpers/utils';
import HorizontalTabs from 'src/modules/General/components/HorizontalTabs';
// import SearchDropdown from 'src/modules/General/components/SearchDropdown';
import Language from 'src/modules/Settings/components/Language';
export const Settings = () => {
  const [content, setContent] = useState<ReactNode>(<Language />);

  const tabs = [
    {
      label: translate(''),
      content: <Language />,
      default: true,
    },
  ];

  const setValue = value => {
    if (value.value === 'Language') return setContent(<Language />);
  };

  return (
    <>
      <div className="container">
        <div className="w-full">
          <div className="p-4 md:px-8">
            <h2 className="gap-5 text-3xl mb-6">{translate('setting-title')}</h2>

            <div className="block md:hidden">
              {/* <SearchDropdown
                required
                id="end-month"
                options={items}
                hasDropdownIcon
                onChange={value => {
                  setValue(value);
                }}
                className="flex-1"
              /> */}

              <div className="mt-6">{content}</div>
            </div>

            <div className="hidden md:block">
              <HorizontalTabs tabs={tabs} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
