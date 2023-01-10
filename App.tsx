import React from 'react';
import {Provider} from 'react-native-paper';
import App from './src';
import {theme} from './src/core/theme';
import {RecoilRoot} from "recoil";
import {FirebaseAppProvider} from "./src/client/useFirebaseApp";

const Main = () => (
  <FirebaseAppProvider>
    <RecoilRoot>
      <Provider theme={theme}>
        <App/>
      </Provider>
    </RecoilRoot>
  </FirebaseAppProvider>
);

export default Main;
