import { CustomTouchableRipple } from '@/components/CustomPaper';
import { safeRequest } from '@/helpers/UtilsHelper';
import { API_URL, APP_DEBUG } from '@env';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ActivityIndicator, Appbar, Card, List, MD2Colors, Text } from 'react-native-paper';

interface NoteListScreenProps {}

const NoteListScreen = (props: NoteListScreenProps) => {
  const navigation = useNavigation();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const result = await safeRequest({
        url: `${API_URL}/notes`,
        method: 'get',
      });

      if (result.status !== 200) {
        if (APP_DEBUG) console.error('Error fetching data:', result)
        return setLoading(false)
      }

      setData(result.data?.data || [])
      setLoading(false)
    };

    fetchData()
  }, []);

  const onBackPressed = () => {
    navigation.goBack();
  }

  const onSearchPressed = () => {
    console.warn('This feature is not available yet');
  }

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]+>/g, '');
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={onBackPressed} size={22} />
        <Appbar.Content title="Daftar Catatan" titleStyle={{ fontSize: 16 }} />
        <Appbar.Action icon="magnify" onPress={onSearchPressed} size={22} />
      </Appbar.Header>

      <ScrollView style={styles.container}>
        {loading ? (
           <ActivityIndicator animating={true} color={MD2Colors.blue500} />
        ) : (
          <Card style={styles.card}>
            {data.map((item, index) => (
              <CustomTouchableRipple key={index} onPress={() => console.log(item.id)}>
                <List.Item
                  title={() => (
                    <>
                      <Text style={{ fontSize: 12, marginBottom: 5 }}>
                        {
                          new Date(item.created_at).toLocaleDateString('id-ID', {
                            weekday: 'long',
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit', 
                          })
                        }
                      </Text>

                      <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.title}</Text>
                    </>
                  )}
                  description={stripHtml(item.description)}
                  descriptionStyle={{ fontSize: 10 }}
                  right={props => <List.Icon {...props} icon="chevron-right" style={styles.listItemRight} />}
                  style={{ borderBottomWidth: .5, borderBottomColor: '#ddd' }}
                />
              </CustomTouchableRipple>
            ))}
          </Card>
        )}
      </ScrollView>
    </>
  );
};

export default NoteListScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 50,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  listItemRight: {
    marginRight: -10,
    paddingLeft: 10,
    alignSelf: 'center',
  }
});
