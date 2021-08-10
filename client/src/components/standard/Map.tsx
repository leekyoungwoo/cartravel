import {
  Button, Text, View
} from 'react-native';
import React, {useState, useEffect} from 'react';
import SearchTopBar from '~/components/common/Search'
import NaverMapView, { Circle, Marker, Path, Polyline, Polygon } from "react-native-nmap"
import Geolocation from 'react-native-geolocation-service';

function Map({ navigation }: any) {
  const [location, setLocation] = useState<any>(undefined);
  
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  const P0 = {latitude: 37.564362, longitude: 126.977011};
  const P1 = {latitude: 37.565051, longitude: 126.978567};
  const P2 = {latitude: 37.565383, longitude: 126.976292};
  return (
    <View>
      <SearchTopBar />
      <NaverMapView style={{ width: '100%', height: '100%' }}
        showsMyLocationButton={true}
        zoomControl={true}
        nightMode={false}
        scrollGesturesEnabled={true}
        zoomGesturesEnabled={true}
        tiltGesturesEnabled={true}
        rotateGesturesEnabled={true}
        stopGesturesEnabled={true}
        useTextureView={true}
        // center={Object.assign(location ? location : P0, { zoom: 12 })}
        center={Object.assign(P0, { zoom: 12 })}
        minZoomLevel={6}
        maxZoomLevel={18}
        // onTouch={(e: any) => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
        onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
        // onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
      >
        {/* <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} />
        <Marker coordinate={P1} pinColor="blue" onClick={() => console.warn('onClick! p1')} />
        <Marker coordinate={P2} pinColor="red" onClick={() => console.warn('onClick! p2')} />
        <Path coordinates={[P0, P1]} onClick={() => console.warn('onClick! path')} width={10} />
        <Polyline coordinates={[P1, P2]} onClick={() => console.warn('onClick! polyline')} />
        <Circle coordinate={P0} color={"rgba(255,0,0,0.3)"} radius={200} onClick={() => console.warn('onClick! circle')} />
        <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} onClick={() => console.warn('onClick! polygon')} /> */}
      </NaverMapView>
    </View>
  );
}

export default Map;