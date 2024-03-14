import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Detail from 'src/pages/detail/Detail';
import Error from 'src/pages/error/NotFound';
import Home from 'src/pages/home/Home';
import Login from 'src/pages/login/Login';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/detail',
      element: <Detail />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
