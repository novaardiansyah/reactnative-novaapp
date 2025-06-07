import { CustomTouchableRipple } from '@/components/CustomPaper';
import { stripHtml, toIndonesianDate } from '@/helpers/UtilsHelper';
import React, { memo, useMemo } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-paper';
import { NoteItemType } from './types';

interface NoteListItemProps {
  onActionPressed: (id: number) => void;
  item: NoteItemType
}

const NoteListItem = (props: NoteListItemProps) => {
  const { item, onActionPressed } = props

  const description = useMemo(() => {
    let desc = stripHtml(item.description);
    if (desc.length > 90) {
      desc = desc.replace(/\n/g, ' ');
      desc = desc.substring(0, 90) + '...';
    }
    return desc;
  }, [item.description]);

  const indonesianDate = useMemo(
    () => toIndonesianDate(item.updated_at),
    [item.updated_at]
  );

  return (
    <CustomTouchableRipple onPress={() => onActionPressed(item.id)}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>
            {indonesianDate}
          </Text>
          <Text style={styles.description}>{description}</Text>
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
  },

  content: {
    flex: 1, 
    paddingHorizontal: 10
  },

  title: {
    fontSize: 14, 
    fontWeight: 'bold'
  },

  description: {
    fontSize: 12
  },

  date: {
    fontSize: 10, 
    marginBottom: 5
  }
});
