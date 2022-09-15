import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initializeParse } from '@parse/react';

const parse_server_url = process.env.REACT_APP_PARSE_SERVER_URL;
const parse_app_id = process.env.REACT_APP_PARSE_APP_ID;
const parse_app_js_key = process.env.REACT_APP_PARSE_JS_KEY;
const test_var = process.env.REACT_APP_TEST_VAR;

initializeParse(
  parse_server_url,
  parse_app_id,
  parse_app_js_key
);


console.log("test var: ", test_var);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
