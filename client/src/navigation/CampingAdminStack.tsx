
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect } from 'react';
import First from '~/components/standard/home/News'
import CampingPlace from '~/components/standard/home/CampingPlace'
import CampingSigunguStack from '~/navigation/CampingSigunguStack'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { getAdminList } from '~/store/camp';
import { useDispatch, useSelector } from 'react-redux';


function CampingAdminStack() {
  const dispatch = useDispatch();
  const Stack = createStackNavigator();
  const adminData = useSelector((state: any) => state.camp.admin);

  useEffect(() => {
    dispatch(getAdminList());
  }, [])
  return (

    <Stack.Navigator>
      <Stack.Screen 
        name='CampingPlace' 
        component={CampingPlace}
        options={{
          headerShown: false
        }}
       />
      <Stack.Screen 
        name='CapingSigunguStack'
        component={CampingSigunguStack} 
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tebBarColor: {
    color: 'white',
  }
})


export default CampingAdminStack;