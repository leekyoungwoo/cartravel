import React from 'react';
import { Image } from 'react-native-elements'
import { ScrollView, TouchableOpacity, Text, StyleSheet, View, FlatList } from 'react-native';
import { fileUrl } from '~/utils/commonValues';

function CampingList({ noMap, data, infinitScroll }: any) {

  return (
    <FlatList
      style={noMap ? styles.firstWrapper : { ...styles.firstWrapper, marginBottom: 120 }}
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={({ item, i }: any) => (
        <TouchableOpacity style={styles.newPlaceContainer} key={i}>
          <Image style={styles.newPlaceAvatar} source={{ uri: `${fileUrl}campImages/${item.campNo}/thumbNail/${item.firstImageUrl}` }} />
          {/* <Image style={styles.newPlaceAvatar} source={{ uri: item.avatarUrl}} /> */}
          {/* <Image style={styles.newPlaceAvatar} source={{ uri: 'http://10.0.2.2:5000/fdata/campImages/273/thumbNail/bfc82262-7515-42e9-9b4e-7d7b9f0e99f5.png'}} /> */}
          <View style={{ maxWidth: 200, maxHeight: 200 }}>
            <Text style={{ fontSize: 13, fontWeight: '700', marginBottom: 5 }}>{item.facltNm}</Text>
            <Text style={{ fontSize: 10, fontWeight: '600', marginBottom: 3 }}>{item.addr1}</Text>
            <Text style={{ fontSize: 10, fontWeight: '600', marginBottom: 3 }}>{item.addr2}</Text>
            <Text style={{ fontSize: 9, fontWeight: '500', marginBottom: 5, color: 'rgba(0,0,0,0.5)' }} numberOfLines={5} ellipsizeMode='tail'>{item.intro}</Text>
            <Text style={{ fontSize: 9, fontWeight: '500', marginBottom: 3, color: 'rgba(0,0,0,0.5)' }} numberOfLines={1} ellipsizeMode='tail'>{item.lineIntro}</Text>
          </View>
        </TouchableOpacity>
      )}
      {...infinitScroll && {
        onEndReached: infinitScroll,
        onEndReachedThreshold: 1
      }}
    />
  );
}

const styles = StyleSheet.create({
  firstWrapper: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  newPlaceContainer: {
    width: '100%',
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
  },
  newPlaceAvatar: {
    borderRadius: 8,
    height: 200,
    width: 150,
    marginRight: 20,
    resizeMode: 'cover'
  }
})

export default CampingList;