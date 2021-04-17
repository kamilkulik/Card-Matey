import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import { Provider } from 'react-redux';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from './App';
import configureStore from './state/store/store';
import { saveState } from './state/store/localStorage';

const store = configureStore();
store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
  });
});

const jsx = (
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

serviceWorkerRegistration.register();

ReactDOM.render(jsx, document.getElementById('root'));
