import React from 'react';
import { Image } from 'react-native-elements'
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Value } from 'react-native-reanimated';

function Gallery({ navigation }: any) {

  return (
    <View style={styles.firstWrapper}>
      <Text>준비 중</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  firstWrapper: {
    width: '100%',
  }
})

export default Gallery;