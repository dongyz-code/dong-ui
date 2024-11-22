import { createBrowserRouter, Navigate } from 'react-router-dom';
import Playground from '../pages/Playground';
import Animation from '../pages/Animation';

type Router = ReturnType<typeof createBrowserRouter>;

export const routes: Router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/animation" replace />,
  },
  {
    path: '/playground',
    element: <Playground />,
  },
  {
    path: '/animation',
    element: <Animation />,
  },
]);
