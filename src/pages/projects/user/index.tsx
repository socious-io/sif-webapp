import Breadcrumbs from 'src/modules/General/components/Breadcrumbs';
import Button from 'src/modules/General/components/Button';
import ProjectsList from 'src/modules/Projects/containers/ProjectsList';

const breadcrumbs = [
  {
    iconName: 'home-line',
    label: '',
    link: '/',
  },
  {
    label: 'Your Projects',
    link: '#',
  },
];
export const UsersProjects = () => {
  return (
    <div className="container pt-6 pb-16 px-4">
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-col items-start md:flex-row md:items-center justify-between gap-8 pt-5 pb-6">
        <h1 className="text-[30px] font-semibold text-Brand-800">Your Projects</h1>
        <Button color="primary" variant="contained">
          Create New Project
        </Button>
      </div>
      <div className="pt-8 border-t border-t-Gray-light-mode-300 border-solid border-b-0 border-l-0 border-r-0">
        <ProjectsList hasTitle={false} />
      </div>
    </div>
  );
};
