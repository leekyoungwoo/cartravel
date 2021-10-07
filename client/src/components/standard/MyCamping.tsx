import React, { useEffect } from 'react';
import SearchTopBar from '~/components/common/Search';
import Login from '~/components/standard/Login'

function MyCamping({ navigation }: any) {
  // useEffect(() => {
  //   navigation.navigate('Login')
  // }, [])
  return (
    <>
      <Login />
    </>
  );
}

export default MyCamping;