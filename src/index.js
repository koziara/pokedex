import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import ErrorPage from './components/Error-page';
import Info from './components/Info.js';
import { RouterProvider, createHashRouter} from "react-router-dom"
import Root from './routes/Root.js';
import About from './components/About.js';

const router = createHashRouter ([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <App/>,
      },
      {
         path: "/about/:pokemonId",
        element: <About />
      },
      {
        path: "/info",
        element: <Info/>
      }
    ],
  },
]);

//const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
