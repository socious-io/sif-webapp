import { ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, RouteObject, createBrowserRouter, useRouteError } from 'react-router-dom';
import { Layout } from 'src/modules/Layout';
import { FallBack } from 'src/pages/error/fallback';
import { NotFound } from 'src/pages/error/notFound';
import { RootState } from 'src/store';

import { getProjectAdaptor, getProjectsAdaptor, getRoundsAdaptor } from '../adaptors';
import { getRound } from '../api';

export const blueprint: RouteObject[] = [
  { path: '/', element: <DefaultRoute /> },
  { path: '*', element: <NotFound /> },
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
                  const currentRound = await getRound();
                  if (!currentRound) {
                    return { projects: [], rounds: [] };
                  }
                  const projects = await getProjectsAdaptor(1, 10, { round_id: currentRound.id as string });
                  const rounds = await getRoundsAdaptor();
                  return { projects: projects.data, rounds: rounds.data };
                },
                async lazy() {
                  const { Projects } = await import('src/pages/projects');
                  return { Component: Projects };
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
                  return { Component: ProjectDetail };
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
            path: 'dashboard/:id',
            loader: async ({ params }) => {
              if (params.id) {
                const projects = await getProjectsAdaptor(1, 10, { identity_id: params.id });
                return { projects: projects.data };
              }
            },
            async lazy() {
              const { Dashboard } = await import('src/pages/projects/dashboard');
              return { Component: Protect(Dashboard, 'both') };
            },
          },
          {
            path: 'settings',
            async lazy() {
              const { Settings } = await import('src/pages/settings');
              return { Component: Protect(Settings, 'both') };
            },
          },
          {
            path: 'refer',
            async lazy() {
              const { Refer } = await import('src/pages/refer');
              return { Component: Protect(Refer, 'both') };
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
            path: 'step-5',
            async lazy() {
              const { CreateProjectStep5 } = await import('src/pages/projects/create/step-5');
              return { Component: Protect(CreateProjectStep5, 'organizations') };
            },
          },
          {
            path: 'step-6',
            async lazy() {
              const { CreateProjectStep6 } = await import('src/pages/projects/create/step-6');
              return { Component: Protect(CreateProjectStep6, 'organizations') };
            },
          },
          {
            path: 'step-7',
            async lazy() {
              const { CreateProjectStep7 } = await import('src/pages/projects/create/step-7');
              return { Component: Protect(CreateProjectStep7, 'organizations') };
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
      {
        path: '/referral',
        async lazy() {
          const { Referral } = await import('src/pages/refer/referral');
          return { Component: Referral };
        },
      },
    ],
    errorElement: <ErrorBoundary />,
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
      return <Navigate to="/intro" />;
    }

    if (allowedIdentity === current || allowedIdentity === 'both') {
      return <Component {...props} />;
    } else {
      return <Navigate to="/intro" />;
    }
  };
}

function ErrorBoundary() {
  const error: any = useRouteError();
  if (error?.response?.status === 401) {
    <Navigate to="/intro" />;
    return null;
  }
  return <FallBack />;
}

export const routes = createBrowserRouter(blueprint);
