import {
  Button, Text, View
} from 'react-native';
import React from 'react';
import HomeTopTab from '~/navigation/HomeTopTab'
import SearchTopBar from '~/components/common/Search'

function Home({ navigation }: any) {
  return (
    <>
      <SearchTopBar />
      <HomeTopTab />
    </>
  );
}

export default Home;