/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '~/store';
import MainBottomTab from '~/navigation/MainBottomTab';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import Login from '~/components/standard/Login';

function App() {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)))
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='MainBottomTab'
            component={MainBottomTab}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name='Login'
            component={Login}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
