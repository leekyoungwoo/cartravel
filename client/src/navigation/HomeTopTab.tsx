
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import News from '~/components/standard/home/News'
import CampingAdminStack from '~/navigation/CampingAdminStack'
import Story from '~/components/standard/home/Story'
import Gallery from '~/components/standard/home/Gallery'
import Talk from '~/components/standard/home/Talk'
import { StyleSheet } from 'react-native'


function HomeTopTab() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#78c8ff",
        tabBarInactiveTintColor: "black",
        tabBarIndicatorStyle: { backgroundColor: '#78c8ff' },
        swipeEnabled: false
      }}
    >
      <Tab.Screen
        name="News"
        component={News}
        options={{
          tabBarLabel: 'NEWS',
        }}
      />
      <Tab.Screen
        name="CampingAdminStack"
        component={CampingAdminStack}
        options={{
          tabBarLabel: '캠핑장',
        }}
      />
      <Tab.Screen
        name="Story"
        component={Story}
        options={{
          tabBarLabel: '스토리',
        }}
      />
      <Tab.Screen
        name="Gallery"
        component={Gallery}
        options={{
          tabBarLabel: '앨범',
        }}
      />
      <Tab.Screen
        name="Talk"
        component={Talk}
        options={{
          tabBarLabel: '수다',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tebBarColor: {
    color: 'white',
  }
})


export default HomeTopTab;