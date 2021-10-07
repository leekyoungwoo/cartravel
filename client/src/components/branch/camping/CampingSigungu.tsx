import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useSelector } from 'react-redux';


function CapningSigungu({ navigation }: any) {
  const sigunguData = useSelector((state: any) => state.camp.sigungu);

  return (
    <ScrollView style={styles.firstWrapper}>
        {sigunguData && sigunguData.map((item: any, i: number) => (
          <ListItem 
            key={i} 
            bottomDivider
            onPress={() => {
              navigation.push('CampList', { sigunguNm: item.sigunguNm })
            }}
          >
          <ListItem.Content>
            <ListItem.Title>{item.sigunguNm}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  firstWrapper: {
    backgroundColor: 'white',
    width: '100%',
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

export default CapningSigungu;