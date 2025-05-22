import { CustomAppBar } from '@/components/CustomPaper';
import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Divider } from 'react-native-paper';
import { appList, otherList, personalList } from './atoms/staticData';
import CardListMenu from './atoms/CardListMenu';

interface GeneralSettingProps {}

const GeneralSetting = (props: GeneralSettingProps) => {
  return (
    <>
      <CustomAppBar title="Pengaturan Umum" />
      <Divider />

      <ScrollView style={styles.container}>
        <CardListMenu listData={personalList} />
        <CardListMenu listData={appList} />
        <CardListMenu listData={otherList} />
      </ScrollView>
    </>
  );
};

export default GeneralSetting;

const styles = StyleSheet.create({
  container: {},
});
