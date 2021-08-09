
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import First from '~/components/standard/home/News'
import CampingPlace from '~/components/standard/home/CampingPlace'
import Story from '~/components/standard/home/Story'
import Gallery from '~/components/standard/home/Gallery'
import Talk from '~/components/standard/home/Talk'
import { StyleSheet } from 'react-native'


function HomeTopTab() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      swipeEnabled={false}
      screenOptions={{
        tabBarActiveTintColor: "#78c8ff",
        tabBarInactiveTintColor: "black",
        tabBarIndicatorStyle: { backgroundColor: '#78c8ff' },
      }}
    >
      <Tab.Screen
        name="News"
        component={First}
        options={{
          tabBarLabel: 'NEWS',
        }}
      />
      <Tab.Screen
        name="CampingPlace"
        component={CampingPlace}
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
          tabBarLabel: '갤러리',
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