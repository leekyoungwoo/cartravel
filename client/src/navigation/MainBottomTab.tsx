/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '~/components/standard/Home';
import Shop from '~/components/standard/Shop';
import Map from '~/components/standard/Map';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function MainBottomTab() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={() => ({
        tabBarActiveTintColor: '#78c8ff',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: styles.highlight,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '홈',
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Test"
        component={Shop}
        options={{
          tabBarLabel: '스토어',
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarLabel: '맵',
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Home}
        options={{
          tabBarLabel: '채팅',
          headerShown: false
        }}
      />
      <Tab.Screen
        name="MyCamping"
        component={Home}
        options={{
          tabBarLabel: '나의 캠핑',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
    fontSize: 12
  },

});

export default MainBottomTab;
