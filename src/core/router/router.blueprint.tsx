import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import { Layout } from 'src/modules/Layout';

import { getProjectAdaptor, getProjectsAdaptor } from '../adaptors';

export const blueprint: RouteObject[] = [
  { path: '/', element: <DefaultRoute /> },

  {
    path: '*',
    element: <div>Page not found :(</div>,
  },
  {
    path: '/',
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: '/home',
            async lazy() {
              const { Home } = await import('src/pages/home');
              return {
                Component: Home,
              };
            },
          },
          {
            path: '/projects',
            children: [
              {
                path: '',
                loader: async () => {
                  const projects = await getProjectsAdaptor(1, 10);
                  return { projects: projects.data };
                },
                async lazy() {
                  const { Projects } = await import('src/pages/projects');
                  return {
                    Component: Projects,
                  };
                },
              },
              {
                path: ':id',
                loader: async ({ params }) => {
                  if (params.id) {
                    const detail = await getProjectAdaptor(params.id);
                    return { projectDetail: detail.data };
                  }
                },
                async lazy() {
                  const { ProjectDetail } = await import('src/pages/projects/detail');
                  return {
                    Component: ProjectDetail,
                  };
                },
              },
              {
                path: ':id/vote',
                loader: async ({ params }) => {
                  if (params.id) {
                    const detail = await getProjectAdaptor(params.id);
                    return { projectDetail: detail.data };
                  }
                },
                async lazy() {
                  const { VoteProject } = await import('src/pages/projects/vote');
                  return {
                    Component: VoteProject,
                  };
                },
              },
            ],
          },
        ],
      },
      {
        path: '/intro',
        async lazy() {
          const { Intro } = await import('src/pages/intro');
          return {
            Component: Intro,
          };
        },
      },
      {
        path: '/oauth',
        children: [
          {
            path: 'socious',
            async lazy() {
              const { SociousID } = await import('src/pages/oauth/socious');
              return {
                Component: SociousID,
              };
            },
          },
        ],
      },
      {
        path: '/create',
        children: [
          {
            path: '',
            async lazy() {
              const { CreateProject } = await import('src/pages/createProject/landing');
              return {
                Component: CreateProject,
              };
            },
          },
          {
            path: 'step-1',
            async lazy() {
              const { CreateProjectStep1 } = await import('src/pages/createProject/step-1');
              return {
                Component: CreateProjectStep1,
              };
            },
          },
          {
            path: 'step-2',
            async lazy() {
              const { CreateProjectStep2 } = await import('src/pages/createProject/step-2');
              return {
                Component: CreateProjectStep2,
              };
            },
          },
          {
            path: 'step-3',
            async lazy() {
              const { CreateProjectStep3 } = await import('src/pages/CreateProject/step-3');
              return {
                Component: CreateProjectStep3,
              };
            },
          },
          {
            path: 'step-4',
            async lazy() {
              const { CreateProjectStep4 } = await import('src/pages/CreateProject/step-4');
              return {
                Component: CreateProjectStep4,
              };
            },
          },
          {
            path: 'publish',
            async lazy() {
              const { Publish } = await import('src/pages/CreateProject/publish');
              return {
                Component: Publish,
              };
            },
          },
        ],
      },
    ],
  },
];

function DefaultRoute() {
  return <Navigate to="/home" />;
}

const isAuthenticated = async () => {
  // const userResponse = await getUserProfileAdaptor();
  // if (!userResponse.data) return false;
  // else if (userResponse.data) {
  //   store.dispatch(setUserProfile(userResponse.data));
  //   const orgResponse = await getOrgIdAdaptor();
  //   if (orgResponse.error == null && orgResponse.data != null) {
  //     store.dispatch(setOrgProfile(orgResponse.data));
  //   }
  return true;
  // }
};

export const routes = createBrowserRouter(blueprint);
