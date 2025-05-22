import { CustomAppBar } from '@/components/CustomPaper'
import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Divider, List, Text } from 'react-native-paper'

interface PrivacyPolicyProps {}

const PrivacyPolicy = (props: PrivacyPolicyProps) => {
  return (
    <>
      <CustomAppBar title="Kebijakan Privasi" />

      <ScrollView style={styles.container}>
        <Text variant="titleLarge">Kebijakan dan Privasi Aplikasi</Text>
        <Text variant="bodyMedium" style={{ marginTop: 12, textAlign: 'justify' }}>
          Aplikasi ini adalah aplikasi internal yang digunakan untuk utilitas manajemen keuangan pribadi, pencatatan, dan fitur lain yang mendukung kebutuhan internal pengguna. Aplikasi tidak didistribusikan untuk publik dan hanya digunakan oleh pihak yang berwenang.
        </Text>
        
        <Divider style={{ marginVertical: 12 }} />

        <Text variant="titleMedium">Kebijakan Privasi</Text>
        <List.Section>
          <List.Item
            title="Data Pribadi"
            titleStyle={{ marginLeft: -8, fontWeight: 'bold', marginBottom: 6, fontSize: 14 }}
            description="Semua data yang dimasukkan ke dalam aplikasi (seperti catatan keuangan, catatan harian, dan lain-lain) hanya tersimpan secara lokal pada perangkat pengguna. Tidak ada data yang dikirimkan, dibagikan, atau disimpan ke server eksternal tanpa sepengetahuan atau persetujuan pengguna."
            descriptionStyle={{ textAlign: 'justify', lineHeight: 20 }}
            style={{ paddingRight: 2 }}
            descriptionNumberOfLines={100}
          />
          <List.Item
            title="Akses Data"
            titleStyle={{ marginLeft: -8, fontWeight: 'bold', marginBottom: 6, fontSize: 14 }}
            description="Aplikasi tidak mengakses data pribadi lain di perangkat (seperti kontak, galeri, atau lokasi) kecuali fitur tertentu memang membutuhkannya dan hanya dengan izin pengguna. Setiap permintaan akses data akan dijelaskan tujuannya kepada pengguna."
            descriptionStyle={{ textAlign: 'justify', lineHeight: 20 }}
            style={{ paddingRight: 2 }}
            descriptionNumberOfLines={100}
          />
          <List.Item
            title="Keamanan"
            titleStyle={{ marginLeft: -8, fontWeight: 'bold', marginBottom: 6, fontSize: 14 }}
            description="Kami berkomitmen menjaga keamanan data Anda dengan menerapkan enkripsi lokal (jika didukung) dan autentikasi pengguna (PIN/password, jika tersedia). Pengguna bertanggung jawab menjaga keamanan perangkat dan kredensial aplikasi."
            descriptionStyle={{ textAlign: 'justify', lineHeight: 20 }}
            style={{ paddingRight: 2 }}
            descriptionNumberOfLines={100}
          />
          <List.Item
            title="Pembagian Data"
            titleStyle={{ marginLeft: -8, fontWeight: 'bold', marginBottom: 6, fontSize: 14 }}
            description="Tidak ada data yang akan dibagikan kepada pihak ketiga. Data hanya dapat diakses oleh pengguna aplikasi yang memiliki otoritas."
            descriptionStyle={{ textAlign: 'justify', lineHeight: 20 }}
            style={{ paddingRight: 2 }}
            descriptionNumberOfLines={100}
          />
          <List.Item
            title="Penghapusan Data"
            titleStyle={{ marginLeft: -8, fontWeight: 'bold', marginBottom: 6, fontSize: 14 }}
            description="Pengguna dapat menghapus data pribadi kapan saja melalui aplikasi. Penghapusan data bersifat permanen dan tidak dapat dikembalikan."
            descriptionStyle={{ textAlign: 'justify', lineHeight: 20 }}
            style={{ paddingRight: 2 }}
            descriptionNumberOfLines={100}
          />
        </List.Section>

        <Divider style={{ marginVertical: 12 }} />

        <Text variant="titleMedium" style={{ marginBottom: 12 }}>Kebijakan Penggunaan</Text>

        <Text variant="bodyMedium" style={{ textAlign: 'justify', lineHeight: 20, marginLeft: 8 }}>
          Aplikasi hanya digunakan untuk kebutuhan internal dan tidak untuk disebarluaskan kepada publik. Penggunaan aplikasi ini harus sesuai dengan tujuan awal pembuatan dan tidak melanggar hukum ataupun etika.
        </Text>

        <Divider style={{ marginVertical: 12 }} />

        <Text variant="titleMedium" style={{ marginBottom: 12 }}>Perubahan Kebijakan</Text>

        <Text variant="bodyMedium" style={{ textAlign: 'justify', lineHeight: 20, marginLeft: 8 }}>
          Kebijakan privasi ini dapat diperbarui sewaktu-waktu sesuai kebutuhan pengembangan aplikasi. Setiap perubahan akan diinformasikan secara internal.
        </Text>
        
        <Divider style={{ marginVertical: 12 }} />
        
        <Text variant="bodyMedium" style={{ textAlign: 'justify', lineHeight: 20, marginBottom: 40 }}>
          Jika ada pertanyaan atau permintaan terkait privasi dan keamanan data, silakan hubungi pengembang aplikasi melalui saluran komunikasi yang tersedia.
        </Text>
      </ScrollView>
    </>
  )
}

export default PrivacyPolicy

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingLeft: 15,
    paddingRight: 20,
  },
})
