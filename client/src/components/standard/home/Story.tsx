import React from 'react';
import { Image } from 'react-native-elements'
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';

function Story({ navigation }: any) {

  const list: Array<any> = [
    {
      title: '산음 자연휴양림! 인생 첫 모토캠핑입니다 ',
      avatarUrl: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA5MDlfMzIg%2FMDAxNTk5NjE3OTM3MjU1.7nH40TsrJnsNOzQqrpiaWf-AfdSsSl13lAC6PDIJjrog.ix37s3UBaAgMrj5SXBVWb2D5cJ59nSV3NRmfFbH69_Ig.JPEG.codud1008%2FIMG_7469.jpg&type=a340',
      name: 'Chris Jackson',
      startScore: 3.0,
      addr: 100
    },
    {
      title: '더위 피해서 캠핑왔는데, 여기도 .....',
      avatarUrl: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA2MjVfMTky%2FMDAxNjI0NjAzNzQ4NTgw.RGLqU1JSHu7MDAUhugThqkHdE7EcGulRWJxlfZwHN3cg.NxiMU6dUGBzljO-8qoQP-5zMyiN3QC-l-liZs4MLq4Qg.JPEG.d_lossom%2FIMG_9328.jpg&type=a340',
      name: '이경우',
      startScore: 3.0,
      addr: 100
    },
  ]

  return (
    <ScrollView style={styles.firstWrapper}>
      <View style={styles.newPlaceWrapper}>
        {list.map((l, i) => (
          <TouchableOpacity style={styles.newPlaceContainer} key={i}>
            <Image style={styles.newPlaceAvatar} source={{ uri: l.avatarUrl }}/>
            <Text style={{textAlign: 'center', fontSize: 14, fontWeight: '700'}}>{l.title}</Text>
            <Text style={{textAlign: 'center', fontSize: 12}}>{l.name}</Text>
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