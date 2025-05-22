import React from 'react';
import { Text, StyleSheet, Linking } from 'react-native';
import { Card, List } from 'react-native-paper';
import { CustomTouchableRipple } from '@/components/CustomPaper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { useNavigation } from '@react-navigation/native';

interface CardListMenuProps {
  listData?: any[];
}

type NavigationProps = NativeStackNavigationProp<RootStackParamList>

const CardListMenu = (props: CardListMenuProps) => {
  const { listData } = props
  const navigation = useNavigation<NavigationProps>()

  return (
    <Card style={styles.card}>
      { 
        listData && listData.map((item, index) => (
          <CustomTouchableRipple key={index} onPress={() => {
            if (item?.detailPage) {
              navigation.navigate(item.detailPage);
              return;
            }
            if (item?.urlView) {
              Linking.openURL(item.urlView);
              return;
            }
            console.log('No action defined for this item.');
          }}>
            <List.Item
              title={item.title}
              right={props => (
                <>
                  <Text>{item?.info || ''}</Text>
                  {item?.hasDetails && (<List.Icon {...props} icon="chevron-right" style={styles.listItemRight} />)}
                </>
              )}
              titleStyle={{ fontSize: 14 , marginLeft: 6 }}
            />
          </CustomTouchableRipple>
        ))
      }
    </Card>
  );
};

export default CardListMenu;

const styles = StyleSheet.create({
  container: {},

  listItemRight: {
    marginRight: -10,
    paddingLeft: 10,
    alignSelf: 'center',
  },

  card: {
    marginBottom: 15,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderRadius: 0
  },
});
