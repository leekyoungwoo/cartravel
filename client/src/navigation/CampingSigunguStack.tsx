
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect } from 'react';
import CampSigunguList from '~/components/branch/camping/CampSigunguList'
import CampingSigungu from '~/components/branch/camping/CampingSigungu'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { getSigunguList } from '~/store/camp';
import { useDispatch, useSelector } from 'react-redux';


function CampingSigunguStack({ navigation, route }: any) {
  const dispatch = useDispatch();
  const Stack = createStackNavigator();
  // const adminData = useSelector((state: any) => state.camp.admin);

  useEffect(() => {
    dispatch(getSigunguList({doName: route.params.doNm}));
  }, [])
  return (

    <Stack.Navigator>
      <Stack.Screen 
        name='CampingSigungu' 
        component={CampingSigungu} 
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name='CampList' 
        component={CampSigunguList}
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


export default CampingSigunguStack;