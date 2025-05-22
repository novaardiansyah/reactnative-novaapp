import { CustomAppBar } from '@/components/CustomPaper';
import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'

interface GeneralSettingProps {}

const GeneralSetting = (props: GeneralSettingProps) => {
  return (
    <>
      <CustomAppBar title="Pengaturan Umum" />
      
      <ScrollView style={styles.container}>

      </ScrollView>
    </>
  );
};

export default GeneralSetting;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  }
});
