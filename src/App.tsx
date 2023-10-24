import React from 'react';
import Routes from './routes';
import store from './store';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

const App = () => (
  <Provider store={store}>
    <StatusBar barStyle="light-content" backgroundColor="#312e38"/>
    <Routes />
  </Provider>
)

export default App;

