import { CustomTouchableRipple } from '@/components/CustomPaper';
import { stripHtml, toIndonesianDate } from '@/helpers/UtilsHelper';
import React, { memo } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-paper';
import { NoteItemType } from './types';

interface NoteListItemProps {
  onActionPressed: (id: number) => void;
  item: NoteItemType
}

const NoteListItem = (props: NoteListItemProps) => {
  const { item, onActionPressed } = props

  let description = stripHtml(item.description);
  
  if (description.length > 90) {
    description = description.replace(/\n/g, ' ');
    description = description.substring(0, 90) + '...';
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

export default memo(NoteListItem, (prevProps, nextProps) => prevProps.item.updated_at === nextProps.item.updated_at)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    padding: 6
  }
});
