import React from 'react';
import { StyleProp, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

interface CustomCardProps {
  children: React.ReactNode;
  style?: StyleProp<any>;
}

const CustomCard = (props: CustomCardProps) => {
  return (
    <Card style={[styles.card, props.style]}>
      {props.children}
    </Card>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
});
