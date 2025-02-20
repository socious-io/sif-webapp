import { Navigate, RouteObject, createBrowserRouter, useRouteError } from 'react-router-dom';
import { Layout } from 'src/modules/Layout';

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
            path: '/create',
            async lazy() {
              const { CreateProject } = await import('src/pages/CreateProject/landing');
              return {
                Component: CreateProject,
              };
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
              const { CreateProjectStep1 } = await import('src/pages/CreateProject/step-1');
              return {
                Component: CreateProjectStep1,
              };
            },
          },
          {
            path: 'step-2',
            async lazy() {
              const { CreateProjectStep2 } = await import('src/pages/CreateProject/step-2');
              return {
                Component: CreateProjectStep2,
              };
            },
          },
        ],
      },
    ],
  },
];

function DefaultRoute() {
  return <Navigate to="/" />;
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
