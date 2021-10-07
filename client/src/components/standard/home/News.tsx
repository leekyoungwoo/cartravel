import React, { useEffect } from 'react';
import {
  TouchableOpacity, ScrollView, View, StyleSheet, Text, Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper'
import { Image } from 'react-native-elements'
import { getNewsData } from '~/store/camp';
import { useDispatch, useSelector } from 'react-redux';
import { fileUrl } from '~/utils/commonValues'


function News({ navigation }: any) {
  const dispatch = useDispatch();
  const campData = useSelector((state: any) => state.camp.news);
  const { sort, filter } = useSelector(
    (state: any) => ({
      sort: state.camp.param.sort,
      filter: state.camp.param.filter,
      limit:  state.camp.param.limit
    })
  );

  useEffect(() => {
    const params: any = {
      filter: JSON.stringify(filter),
      sort: JSON.stringify(sort),
      limit: 8
    }
    dispatch(getNewsData(params));
  }, [])

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
          <TouchableOpacity 
            style={styles.buttonWrapper}
            onPress={() => {
              navigation.navigate('CampingAdminStack')
            }}
          >
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
            <Text style={styles.buttonText}>앨범</Text>
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
          {campData && campData.map((l: any, i: number) => (
            <TouchableOpacity style={styles.newPlaceContainer} key={i}>
              <Image style={styles.newPlaceImg} source={{ uri: `${fileUrl}campImages/${l.campNo}/thumbNail/${l.firstImageUrl}` }} />
              <Text style={{fontSize: 13, fontWeight: '700', marginBottom: 5}}>{l.facltNm}</Text>
              <Text style={{fontSize: 10, fontWeight: '600', marginBottom: 3}}>{l.addr1}</Text>
              <Text style={{fontSize: 10, fontWeight: '600', marginBottom: 3}}>{l.addr2}</Text>
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