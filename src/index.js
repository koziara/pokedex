import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorPage from './Error-page';
import About from './About';
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const routes = [
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>
  },
  {
    path: `/about/:pokemonId`,
    element: <About />
  }
];

const router = createBrowserRouter(routes);

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
