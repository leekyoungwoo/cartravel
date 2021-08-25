import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import NaverMapView, { Marker } from "react-native-nmap";
import { useDispatch, useSelector } from 'react-redux';
import CampingList from '~/components/branch/camping/CampingList';
import BottomDrawer from '~/components/common/BottomDrawer';
import SearchTopBar from '~/components/common/Search';
import { getCampList } from '~/store/camp';


function Map({ navigation }: any) {
  const height = Dimensions.get('window').height
  const ref = useRef<any>(null);
  const dispatch = useDispatch();
  const [clickId, setClickId] = useState<any>({ campNo: 0 });
  const [clickMap, setClickMap] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [zoomType, setZoomType] = useState<number>(2);
  const { sort, filter } = useSelector(
    (state: any) => ({
      sort: state.camp.param.sort,
      filter: state.camp.param.filter,
    })
  );
  const respData = useSelector((state: any) => state.camp.data);

  useEffect(() => {
    ref.current.setLocationTrackingMode(2)
  }, []);

  // 지도 화면 전환
  const changeCamera = async (e: any) => {
    const zoom = e.zoom < 9 ? 0 : e.zoom < 10 ? 1 : 2

    if (!loading) {
      if (zoomType !== zoom) setLoading(true)

      const latitude: Array<any> = []
      const longitude: Array<any> = []
      e.coveringRegion.map((place: any, i: number) => {
        latitude.push(place.latitude)
        longitude.push(place.longitude)
      })

      const params: any = {
        maxXvalue: Math.max.apply(null, longitude),
        maxYvalue: Math.max.apply(null, latitude),
        minXvalue: Math.min.apply(null, longitude),
        minYvalue: Math.min.apply(null, latitude),
        offset: 0,
        limit: 0,
        zoom: e.zoom
      }

      setZoomType(zoom)
      setClickId({ campNo: 0 })
      setVisible(false)

      await dispatch(getCampList(params));
      setLoading(false)
    }
  }

  // 캠핑마커 클릭
  const onClickMarker = (data: any) => {
    setClickId(data)
    setVisible(true)
  }

  // console.log(respData)
  return (
    <View>
      <SearchTopBar />
      <NaverMapView
        style={{ width: '100%', height: height - 130 }}
        ref={ref}
        showsMyLocationButton={true}
        zoomControl={true}
        scaleBar={false}
        minZoomLevel={6}
        maxZoomLevel={18}
        onCameraChange={e => changeCamera(e)}
        useTextureView={true}
        onMapClick={e => {
          setClickId({ campNo: 0 })
          setVisible(false)
          setClickMap(!clickMap)
        }}
      >

        {!loading && respData && respData.map((d: any, i: number) => {
          return (
            <View key={i}>
              {zoomType === 0 ? (
                <Marker
                  coordinate={{ latitude: d.mapY, longitude: d.mapX }}
                  image={require('~/images/transparency.png')}
                  // iconPerspectiveEnabled={false}
                  // isHideCollidedSymbols={false}
                  // isHideCollidedMarkers={false}
                  // isHideCollidedCaptions={false}
                  hidden={true}
                  caption={{
                    text: d.doNm ? `${d.doNm} ${d.campCount}개` : '',
                    textSize: 14,
                    color: '#78c8ff',
                    haloColor: '#ededed'
                  }}
                />
              ) : zoomType === 1 ? (
                <Marker
                  coordinate={{ latitude: d.mapY, longitude: d.mapX }}
                  image={require('~/images/transparency.png')}
                  // iconPerspectiveEnabled={false}
                  // isHideCollidedSymbols={false}
                  // isHideCollidedMarkers={false}
                  // isHideCollidedCaptions={false}
                  hidden={true}
                  caption={{
                    text: d.sigunguNm ? `${d.sigunguNm} ${d.campCount}개` : '',
                    textSize: 14,
                    color: '#78c8ff',
                    haloColor: '#ededed'
                  }}
                />
              ) : (
                <Marker
                  coordinate={{ latitude: d.mapY, longitude: d.mapX }}
                  image={clickId.campNo === d.campNo ? require('~/images/pin.png') : require('~/images/pin_small.png')}
                  onClick={() => onClickMarker(d)}
                  // iconPerspectiveEnabled={false}
                  // isHideCollidedSymbols={false}
                  // isHideCollidedMarkers={false}
                  // isHideCollidedCaptions={false}
                  // hidden={true}
                  {...(clickId.campNo === d.campNo && {
                    caption: {
                      text: d.facltNm,
                      textSize: 10,
                      color: '#78c8ff',
                      haloColor: '#ededed'
                    }
                  })
                  }
                />
              )}
            </View>
          )
        })}
      </NaverMapView>

      {zoomType === 2 && (

        <BottomDrawer
          clickMarker={visible}
          clickMap={clickMap}
          onDrawerStateChange={(e) => console.log(e)}
        >
          <View style={styles.bottomDrawerArea}>
            <View style={styles.bottomDrawerBar} />
          </View>
          <CampingList data={Object.keys(clickId).length > 1 ? [clickId] : respData} />
        </BottomDrawer>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomDrawerArea: {
    height: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomDrawerBar: {
    backgroundColor: 'grey',
    height: 3,
    width: 35,
    borderRadius: 17
  },
})

export default Map;