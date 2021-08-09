import React from 'react';
import {
  TouchableOpacity, ScrollView, View, StyleSheet, Text, Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper'
import { Image } from 'react-native-elements'

function News({ navigation }: any) {

  const list: Array<any> = [
    {
      name: 'Chris Jackson',
      avatarUrl: 'https://s.pstatic.net/static/www/mobile/edit/2021/0806/mobile_143933408119.png',
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
    {
      name: 'hi3',
      avatarUrl: 'https://opgg-static.akamaized.net/images/lol/champion/Gangplank.png?image=c_scale,q_auto,w_140&v=1626880099',
      address: '주소',
      startScore: 3.0,
      count: 100
    },
    {
      name: 'hi4',
      avatarUrl: 'https://opgg-static.akamaized.net/images/lol/champion/Gangplank.png?image=c_scale,q_auto,w_140&v=1626880099',
      address: '주소',
      startScore: 3.0,
      count: 100
    },
    {
      name: 'hi5',
      avatarUrl: 'https://s.pstatic.net/static/www/mobile/edit/2021/0806/mobile_143933408119.png',
      address: '주소',
      startScore: 3.0,
      count: 100
    },
    {
      name: 'hi6',
      avatarUrl: 'https://s.pstatic.net/static/www/mobile/edit/2021/0806/mobile_143933408119.png',
      address: '주소',
      startScore: 3.0,
      count: 100
    },
  ]

  return (
    <ScrollView style={styles.firstWrapper}>
      <View style={styles.swiperWrapper}>
        <Swiper
          style={styles.swiper}
          loadMinimal
          autoplay
          loadMinimalSize={1}
          showsButtons={false}
          dot={<View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 0, }} />}
          activeDot={<View style={{ backgroundColor: '#007aff', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 0, }} />}
          paginationStyle={{
            bottom: 20,
            left: 270,
          }}
          autoplayTimeout={5}
        >
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
        </Swiper>
      </View>
      <View style={styles.buttonContainerWrapper}>
        <View style={styles.topButtonContainer}>
          <TouchableOpacity style={styles.buttonWrapper}>
            <View style={styles.buttonIcon}>
            </View>
            <Text style={styles.buttonText}>캠핑장</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonWrapper}>
            <View style={styles.buttonIcon}>
            </View>
            <Text style={styles.buttonText}>쇼핑</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonWrapper}>
            <View style={styles.buttonIcon}>
            </View>
            <Text style={styles.buttonText}>지도</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonWrapper}>
            <View style={styles.buttonIcon}>
            </View>
            <Text style={styles.buttonText}>캠핑카</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity style={styles.buttonWrapper}>
            <View style={styles.buttonIcon}>
            </View>
            <Text style={styles.buttonText}>캠핑스토리</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonWrapper}>
            <View style={styles.buttonIcon}>
            </View>
            <Text style={styles.buttonText}>차박스토리</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonWrapper}>
            <View style={styles.buttonIcon}>
            </View>
            <Text style={styles.buttonText}>갤러리</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonWrapper}>
            <View style={styles.buttonIcon}>
            </View>
            <Text style={styles.buttonText}>수다</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.newPlaceWrapper}>
        <Text style={styles.placeText}>뉴 플레이스</Text>
        <View style={styles.newPlaceWrapper2}>
          {list.map((l, i) => (
            <TouchableOpacity style={styles.newPlaceContainer}>
              <Image style={styles.newPlaceImg} source={{ uri: l.avatarUrl }} />
              <Text>{l.name}</Text>
              <Text>{l.address}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const width: number = Dimensions.get('window').width;    //스크린 너비
const styles = StyleSheet.create({
  firstWrapper: {
    backgroundColor: 'white',
    width: '100%',
  },
  // 스와이퍼
  swiperWrapper: {
    height: 150,
    marginVertical: 20,
  },
  swiper: {
  },
  slide1: {
    flex: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9DD6EB',
    marginHorizontal: 20
  },
  slide2: {
    flex: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#97CAE5',
    marginHorizontal: 20
  },
  slide3: {
    flex: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#92BBD9',
    marginHorizontal: 20
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  // 버튼 영역
  buttonContainerWrapper: {
    height: 220,
    paddingHorizontal: 15,
    paddingBottom: 20,
    borderBottomWidth: 5,
    borderBottomColor: '#f5f5f5'
  },
  topButtonContainer: {
    height: 100,
    marginVertical: 0,
    flex: 1,
    flexDirection: 'row',
  },
  bottomButtonContainer: {
    height: 100,
    marginVertical: 0,
    flex: 1,
    flexDirection: 'row',
  },
  buttonWrapper: {
    height: 80,
    flex: 1,
    marginTop: 15,
    marginHorizontal: 15,
  },
  buttonIcon: {
    height: 60,
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#f5f5f5'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 13
  },
  // 뉴플레이스
  newPlaceWrapper: {
    // height: 820,
    paddingBottom: 20,
    borderBottomWidth: 5,
    borderBottomColor: '#f5f5f5'
  },
  newPlaceWrapper2: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: 'row'
  },
  placeText: {
    paddingHorizontal: 15,
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10
  },
  newPlaceContainer: {
    minWidth: 150,
    width: width / 2,
    paddingHorizontal: '5%',
    marginBottom: 40,
  },
  newPlaceImg: {
    borderRadius: 8,
    width: '100%',
    height: 230,
    marginBottom: 10,
  }
})

export default News;