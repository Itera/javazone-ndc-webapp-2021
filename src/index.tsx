import 'normalize.css';

import App from './App';
import { FirebaseProvider } from './service/firebase';
import { HashRouter } from 'react-router-dom';
import { Logger } from './service/logger';
import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

const logger = new Logger('ApplicationRoot');

const container = document.getElementById('root');

if (container === null) {
  logger.error('Unable to find mounting element with [id=root]');
  throw new Error('React mounting element was not found');
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <FirebaseProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </FirebaseProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
