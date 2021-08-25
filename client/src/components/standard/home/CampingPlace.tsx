import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useSelector } from 'react-redux';


function CampingPlace({ navigation }: any) {
  const adminData = useSelector((state: any) => state.camp.admin);

  return (
    <ScrollView style={styles.firstWrapper}>
        {adminData && adminData.map((item: any, i: number) => (
          <ListItem 
            key={i} 
            bottomDivider
            onPress={() => {
              navigation.push('CapingSigunguStack', { doNm: item.doNm })
            }}
          >
          <ListItem.Content>
            <ListItem.Title>{item.doNm}</ListItem.Title>
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

export default CampingPlace;