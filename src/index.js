import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";
import { Provider } from 'react-redux'

import { store } from './store'
import './index.css';
import reportWebVitals from './reportWebVitals';

import App from "./App";
import Editor from "./Editor";
import Explorer from "./Explorer";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="Explorer" element={<Explorer />} />
    <Route path="Editor" element={<Editor />} />
  </Route>
));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider future={{ v7_startTransition: true }} router={router} >
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
