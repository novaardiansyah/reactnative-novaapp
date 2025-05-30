import { CustomTouchableRipple } from '@/components/CustomPaper';
import { stripHtml, toIndonesianDate } from '@/helpers/UtilsHelper';
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

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

  return (
    <CustomTouchableRipple onPress={() => onActionPressed(item.id)}>
      <List.Item
        title={() => (
          <>
            <Text style={{ fontSize: 12, marginBottom: 5 }}>
              {index}) { toIndonesianDate(item.updated_at) }
            </Text>

            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.title}</Text>
          </>
        )}
        description={stripHtml(item.description)}
        descriptionStyle={{ fontSize: 11 }}
        right={props => <List.Icon {...props} icon="chevron-right" style={styles.listItemRight} />}
        style={{ borderBottomWidth: .5, borderBottomColor: '#ddd' }}
      />
    </CustomTouchableRipple>
  );
};

export default NoteListItem;

const styles = StyleSheet.create({
  listItemRight: {
    marginRight: -10,
    paddingLeft: 10,
    alignSelf: 'center',
  },
});
