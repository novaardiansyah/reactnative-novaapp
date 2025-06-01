import { CustomTouchableRipple } from '@/components/CustomPaper';
import { stripHtml, toIndonesianDate } from '@/helpers/UtilsHelper';
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-paper';

interface NoteListItemProps {
  onActionPressed: (id: number) => void;
  item: {
    id: number;
    title: string;
    description: string;
    updated_at: string;
  };
  index?: number;
}

const NoteListItem = (props: NoteListItemProps) => {
  const { index, item, onActionPressed } = props

  let description = stripHtml(item.description);

  if (description.length > 100) {
    description = description.substring(0, 100) + '...';
  }

  return (
    <CustomTouchableRipple onPress={() => onActionPressed(item.id)}>
      <View style={styles.container}>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.title}</Text>
          <Text style={{ fontSize: 10, marginBottom: 5 }}>
            {toIndonesianDate(item.updated_at)}
          </Text>
          <Text style={{ fontSize: 12 }}>{description}</Text>
        </View>

        <Icon source="chevron-right" size={24} />
      </View>

    </CustomTouchableRipple>
  );
};

export default NoteListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    padding: 6
  }
});
