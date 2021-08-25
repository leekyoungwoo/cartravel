/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '~/store';
import MainBottomTab from '~/navigation/MainBottomTab';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

function App() {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)))
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainBottomTab />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
