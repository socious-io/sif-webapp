import { useNavigate } from 'react-router-dom';
import AvatarGroup from 'src/assets/images/sample-avatars/Avatar-group.png';
import Button from 'src/modules/General/components/Button';
import Chip from 'src/modules/General/components/Chip';

export const Home = () => {
  const navigate = useNavigate();
  //FIXME: not static
  const isIdentityUser = false;
  const roundIsClosed = false;

  return (
    <>
      <div className="flex flex-col items-center md:px-[7rem] md:pt-8 md:pb-[6rem] relative bg-Gray-light-mode-50">
        <div className="w-full flex flex-col items-center gap-6 px-4 py-16 md:p-[6rem] bg-Brand-800 shadow-lg md:rounded-3xl text-xl font-normal leading-8 text-Brand-200 text-center">
          <div className="flex flex-col items-center text-4xl md:text-7xl font-semibold leading-[44px] md:leading-[90px] text-Base-White">
            Make your impact
            <span className="text-Brand-200">Vote and donate</span>
          </div>
          Give everyone the chance to make a difference
          <div className="w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center gap-3 mt-6 mb-8">
            <Button
              color="info"
              customStyle="!h-auto min-w-[9.25rem] !p-3 md:!p-4 !text-Gray-light-mode-700"
              href="https://socious.io/sif"
            >
              Learn more
            </Button>
            <Button
              color="primary"
              customStyle="!h-auto md:min-w-[9.25rem] !p-3 md:!p-4"
              onClick={() => navigate('/projects')}
            >
              Explore
            </Button>
          </div>
        </div>
        <img src="/images/line-pattern.png" className="absolute bottom-[4.25rem] left-0 hidden md:block" />
        <div className="max-w-full md:max-w-[60rem] flex flex-col mx-4 bg-Base-White shadow-md rounded-xl overflow-hidden absolute top-[calc(100%-2rem)] md:top-[calc(100%-9.75rem)]">
          <img src="/images/explorer-cover.png" alt="Explorer" />
          <div className="flex flex-col gap-4 p-6 md:p-8">
            <div className="flex flex-col items-start gap-1">
              {roundIsClosed && <Chip theme="warning" label="This round has ended" />}
              <span className="text-2xl md:text-3xl font-semibold">Round 1: Empowering Change Makers</span>
            </div>
            {!roundIsClosed &&
              (isIdentityUser ? (
                <div className="flex flex-col gap-3 md:gap-1">
                  <div className="text-sm text-Gray-light-mode-600">
                    <span className="font-medium text-Gray-light-mode-700">Proposal submission period: </span>
                    <br className="md:hidden" />
                    2024/01/01 - 2024/01/14
                  </div>
                  <div className="text-sm text-Gray-light-mode-600">
                    <span className="font-medium text-Gray-light-mode-700">Voting Period: </span>
                    <br className="md:hidden" />
                    2024/01/15 - 2024/01/29
                  </div>
                  <div className="text-sm text-Gray-light-mode-600">
                    <span className="font-medium text-Gray-light-mode-700">Voting results announced: </span>
                    <br className="md:hidden" />
                    2024/02/07
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 text-sm text-Gray-light-mode-600 mt-[-0.5rem]">
                  <span>Starts on 2024/01/15 00:00 UTC</span>
                  <span>Ends on 2024/01/29 00:00 UTC</span>
                </div>
              ))}
            <p className="mt-2 leading-6 text-Gray-light-mode-600">
              Thanks to our generous sponsors and partners, we have reached a matching pool of $50,000.Every donation
              made to participating projects will be matched using the quadratic funding formula, amplifying the impact
              of your contributions.By voting and donating, you can help these innovative initiatives gain visibility,
              secure funding, and scale their impact.
            </p>
            <div className="flex flex-col items-stretch md:flex-row md:items-center gap-4 pt-2 md:py-4">
              <div className="flex-1 flex flex-col gap-1 text-sm text-Gray-light-mode-600">
                <span className="text-4xl md:text-5xl font-semibold text-Brand-700">16</span>
                projects
              </div>
              <div className="flex-1 flex flex-col gap-1 text-sm text-Gray-light-mode-600">
                <span className="text-4xl md:text-5xl font-semibold text-Brand-700">160</span>
                days to go
              </div>
              <div className="flex-1 flex flex-col gap-1 text-sm text-Gray-light-mode-600">
                <span className="text-4xl md:text-5xl font-semibold text-Brand-700">$50,000</span>
                matching pool
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col items-stretch gap-12 md:gap-16 ${isIdentityUser ? 'mt-[50rem] md:mt-[31.5rem]' : 'mt-[44rem] md:mt-[28.5rem]'} px-4 py-[7rem] md:px-[5rem] md:pt-[6rem] md:pb-[10rem]`}
      >
        <div className="md:max-w-[60rem] md:px-[6rem] self-center flex flex-col gap-2 leading-6 text-Gray-light-mode-600">
          <span className="text-lg font-medium text-Gray-light-mode-900">What is Socious Innovation Fund (SIF)?</span>
          <p>
            The Socious Innovation Fund (SIF) is an inclusive crowdfunding platform designed to help underrepresented
            founders raise funding. Our goal is to democratize funding, promoting diversity and equitable resource
            distribution, while ensuring a transparent and decentralized decision-making process.
          </p>
          <p>
            To address biases in traditional crowdfunding, we use an advanced quadratic formula. This formula matches
            small individual contributions with larger sums, based on the number of supporters, the supporters&apos;
            impact score, and the donation amount. We&apos;ve introduced an &quot;impact score&quot; for each
            contributor, reflecting their contributions to social and environmental causes. This empowers individuals
            who have a positive societal impact by giving them more influence over funding decisions. For more
            information on quadratic funding, please see here.
          </p>
        </div>
        <div className="flex flex-col items-center gap-8 md:mx-8 p-8 bg-Gray-light-mode-50 border-4 rounded-2xl">
          <img src={AvatarGroup} alt="support" width={120} height={56} />
          <div className="flex flex-col items-center gap-2 text-lg text-Gray-light-mode-600">
            <span className="text-xl font-semibold leading-8 text-Gray-light-mode-900">Have questions?</span>
            Please chat to our friendly team.
          </div>
          <Button color="primary">Get in touch</Button>
        </div>
      </div>
    </>
  );
};
