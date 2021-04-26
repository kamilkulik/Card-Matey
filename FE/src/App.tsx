/* eslint-disable */

import React from 'react';
import axios from 'axios';
import { useTypedSelector } from './hooks/useTypedSelector';
import firebase from './firebase/firebase';
import { useActions } from './hooks/useActions';
import AppRouter from './router/AppRouter';
import ThemeContext from './ThemeContext';
import { checkTimestampAge } from './hooks/useVerifyTimestamp';

const App = () => {
  const { fetching, fetched, fetchErr, startSetCards } = useActions();
  const auth = useTypedSelector((state) => state.auth);
  const [cachedThemes, setCachedThemes] = React.useState([]);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user && checkTimestampAge(auth.timestamp)) {
        const idToken = await firebase.auth().currentUser.getIdToken(true);
        axios.defaults.headers.common.Authorization = idToken;
        fetching();
        const themes = axios.get('http://localhost:3700/themes');
        const cards = startSetCards();
        Promise.all([themes, cards])
          .then((res) => {
            const themesArray = res[0].data;
            setCachedThemes(themesArray);
            fetched();
          })
          .catch((error) => {
            let errorMessage;
            if (!error.response) {
              errorMessage = 'Error: Network error';
            } else {
              errorMessage = error.response.data.message;
            }
            fetchErr(errorMessage);
          });
      }
    });
  }, [auth.timestamp]);

  return (
    <ThemeContext.Provider value={cachedThemes}>
      <AppRouter />
    </ThemeContext.Provider>
  );
};

export default App;
