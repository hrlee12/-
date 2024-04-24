import { createBrowserRouter} from 'react-router-dom';

import Landing from '../pages/landing/index'
import Example from "../pages/expample";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />
  },
    {
      path: '/example',
      element: <Example />
  },
]);

export default router