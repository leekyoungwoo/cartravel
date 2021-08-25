import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';

function Search({ navigation }: any) {
  const [search, setSearch] = useState('');

  return (
    <View >
      <SearchBar
        placeholder="검색"
        onChangeText={(text?: any) => setSearch(text)}
        value={search}
        round
        lightTheme
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    // paddingHorizontal: 10,
    backgroundColor: 'white',
    borderBottomColor: 'white',
  },
  inputStyle: {
    marginTop: 5
  },
  inputContainerStyle: {
    height: 40,
    backgroundColor: '#eeeeee'
  },
  highlight: {
    fontWeight: '700',
    fontSize: 10
  },
});

export default Search;