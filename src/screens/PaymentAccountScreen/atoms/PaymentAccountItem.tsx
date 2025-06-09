import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { CustomTouchableRipple } from '@/components/CustomPaper'
import { ActivityIndicator, Avatar, List } from 'react-native-paper'
import { toIndonesianDate } from '@/helpers/UtilsHelper'
import { ADMIN_URL } from '@env'

interface PaymentAccountItemProps {
  item: {
    id: number
    name: string
    deposit: number
    logo: string
    created_at: Date
    updated_at: Date
  },
  refreshing?: boolean
  handleOnPress: () => void
}

const PaymentAccountItem = (props: PaymentAccountItemProps) => {
  const { item, refreshing, handleOnPress } = props

  return (
    <CustomTouchableRipple onPress={handleOnPress}>
      <List.Item
        title={item.name}
        description={
          refreshing ? '' : `${toIndonesianDate(item.updated_at, { weekday: 'short' })}`
        }
        descriptionStyle={styles.description}
        left={props => (
          <Avatar.Image 
            {...props} 
            source={{ uri: `${ADMIN_URL}/storage/${item.logo}` }} 
            style={styles.listImage}
            size={40} 
          />
        )}
        right={() => (
          <View style={styles.listItemRight}>
            <Text style={styles.depositText}>
              { refreshing ? 'Rp0' : `Rp${item.deposit.toLocaleString('id-ID')}` }
            </Text>
          </View>
        )}
        titleStyle={styles.title}
      />
    </CustomTouchableRipple>
  )
}

export default PaymentAccountItem

const styles = StyleSheet.create({
  container: {},
  listImage: {
    backgroundColor: 'transparent', 
    marginLeft: 16
  },
  listItemRight: {
    marginRight: -6,
    paddingLeft: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 14, 
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12
  },
  depositText: {
    fontWeight: 'bold', 
    fontSize: 14,
    letterSpacing: 0.5,
    textAlign: 'right',
    color: '#0F6F3E',
  },
})
