import { ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import { Layout } from 'src/modules/Layout';
import { RootState } from 'src/store';

import { getProjectAdaptor, getProjectsAdaptor, getRawProjectAdaptor, getUserProjects } from '../adaptors';

export const blueprint: RouteObject[] = [
  { path: '/', element: <DefaultRoute /> },
  { path: '*', element: <div>Page not found :(</div> },
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
              return { Component: Home };
            },
          },
          {
            path: '/create',
            async lazy() {
              const { CreateProject } = await import('src/pages/projects/create/landing');
              return { Component: Protect(CreateProject, 'both') };
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
                  return { Component: Protect(Projects, 'both') };
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
                  return { Component: Protect(ProjectDetail, 'both') };
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
                  return { Component: Protect(VoteProject, 'both') };
                },
              },
            ],
          },
          {
            path: ':id/projects',
            loader: async ({ params }) => {
              if (params.id) {
                const projects = await getUserProjects();
                return { projects: projects.data };
              }
            },
            async lazy() {
              const { UsersProjects } = await import('src/pages/projects/user');
              return { Component: Protect(UsersProjects, 'both') };
            },
          },
          {
            path: ':id/edit',
            loader: async ({ params }) => {
              if (params.id) {
                const projects = await getRawProjectAdaptor(params.id);
                return { project: projects.data };
              }
            },
            async lazy() {
              const { EditProject } = await import('src/pages/projects/edit');
              return { Component: Protect(EditProject, 'both') };
            },
          },
          {
            path: 'settings',
            async lazy() {
              const { Settings } = await import('src/pages/settings');
              return { Component: Protect(Settings, 'both') };
            },
          },
        ],
      },
      {
        path: '/intro',
        async lazy() {
          const { Intro } = await import('src/pages/intro');
          return { Component: Intro };
        },
      },
      {
        path: '/oauth',
        children: [
          {
            path: 'socious',
            async lazy() {
              const { SociousID } = await import('src/pages/oauth/socious');
              return { Component: SociousID };
            },
          },
        ],
      },
      {
        path: '/create',
        children: [
          {
            path: 'step-1',
            async lazy() {
              const { CreateProjectStep1 } = await import('src/pages/projects/create/step-1');
              return { Component: Protect(CreateProjectStep1, 'organizations') };
            },
          },
          {
            path: 'step-2',
            async lazy() {
              const { CreateProjectStep2 } = await import('src/pages/projects/create/step-2');
              return { Component: Protect(CreateProjectStep2, 'organizations') };
            },
          },
          {
            path: 'step-3',
            async lazy() {
              const { CreateProjectStep3 } = await import('src/pages/projects/create/step-3');
              return { Component: Protect(CreateProjectStep3, 'organizations') };
            },
          },
          {
            path: 'step-4',
            async lazy() {
              const { CreateProjectStep4 } = await import('src/pages/projects/create/step-4');
              return { Component: Protect(CreateProjectStep4, 'organizations') };
            },
          },
          {
            path: 'publish',
            async lazy() {
              const { Publish } = await import('src/pages/projects/create/publish');
              return { Component: Protect(Publish, 'organizations') };
            },
          },
          {
            path: 'select-identity',
            async lazy() {
              const { SelectIdentity } = await import('src/pages/selectIdentity');
              return { Component: Protect(SelectIdentity, 'both') };
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

function Protect<T extends object>(Component: ComponentType<T>, allowedIdentity: string): ComponentType<T> {
  return function ProtectedRoute(props: T) {
    const { status, entities } = useSelector((state: RootState) => state.identity);
    const current = entities.find(identity => identity.current)?.type;

    if (status === 'loading') {
      return <div></div>;
    }

    if (status === 'failed') {
      return <Navigate to="/intro" />;
    }

    if (!current) {
      return <div></div>;
    }

    if (allowedIdentity === current || allowedIdentity === 'both') {
      return <Component {...props} />;
    } else {
      return <Navigate to="/intro" />;
    }
  };
}

export const routes = createBrowserRouter(blueprint);
