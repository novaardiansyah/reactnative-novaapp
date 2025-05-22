import { APP_VERSION } from "@env"

interface menuList {
  title: string
  info?: string
  hasDetails?: boolean
  detailPage?: string
  urlView?: string
}

const personalList: menuList[] = [
  {
    title: 'Pengaturan Bahasa',
    info: 'Indonesia',
  },
  {
    title: 'Pengaturan Notifikasi',
    hasDetails: true,
  },
  {
    title: 'Nilai Kami di Play Store',
    hasDetails: true,
  }
]

const appList: menuList[] = [
  {
    title: 'Tentang Aplikasi',
    info: 'Versi ' + APP_VERSION,
  },
  {
    title: 'Kebijakan Privasi',
    hasDetails: true,
    detailPage: 'PrivacyPolicy'
  },
  {
    title: 'Syarat dan Ketentuan',
    hasDetails: true,
  }
]

const otherList: menuList[] = [
  {
    title: 'Pusat Bantuan',
    hasDetails: true,
  },
  {
    title: 'Saran dan Masukan',
    hasDetails: true,
  },
  {
    title: 'Permintaan Hapus Akun',
    hasDetails: true,
  }
]

export { personalList, appList, otherList }