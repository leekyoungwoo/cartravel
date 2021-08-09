import React from 'react';
import { Image } from 'react-native-elements'
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';

function Story({ navigation }: any) {

  const list: Array<any> = [
    {
      name: 'Chris Jackson',
      avatarUrl: 'https://opgg-static.akamaized.net/images/lol/champion/Gangplank.png?image=c_scale,q_auto,w_140&v=1626880099',
      address: '주소',
      startScore: 3.0,
      count: 100
    },
    {
      name: 'hi2',
      avatarUrl: 'https://opgg-static.akamaized.net/images/lol/champion/Gangplank.png?image=c_scale,q_auto,w_140&v=1626880099',
      address: '주소',
      startScore: 3.0,
      count: 100
    },
  ]

  return (
    <ScrollView style={styles.firstWrapper}>
      <View style={styles.newPlaceWrapper}>
        {list.map((l, i) => (
          <TouchableOpacity style={styles.newPlaceContainer}>
            <Image style={styles.newPlaceAvatar} source={{ uri: l.avatarUrl }}/>
            <Text>{l.name}</Text>
            <Text>{l.address}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  firstWrapper: {
    backgroundColor: 'white',
    width: '100%',
  },
  newPlaceWrapper: {
    // height: 820,
    marginTop: 20,
    paddingHorizontal: 15,
    paddingBottom: 20,
    borderBottomWidth: 5,
    borderBottomColor: '#f5f5f5'
  },
  newPlaceContainer: {
    width: '100%',
    marginBottom: 40,
  },
  newPlaceAvatar: {
    borderRadius: 8,
    height: 230,
    marginBottom: 10,
  }
})

export default Story;