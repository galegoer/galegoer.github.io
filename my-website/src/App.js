import './App.css';
import RandomVideo from './components/RandomVideo';

import { initializeParse } from '@parse/react';

const parse_server_url = process.env.REACT_APP_PARSE_SERVER_URL;
const parse_app_id = process.env.REACT_APP_PARSE_APP_ID;
const parse_app_js_key = process.env.REACT_APP_PARSE_JS_KEY;

initializeParse(
  parse_server_url,
  parse_app_id,
  parse_app_js_key
);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Random Video for Today
        <RandomVideo />
      </header>
    </div>
  );
}

export default App;
