import React from 'react'
import { StyleSheet } from 'react-native'
import { CustomAppBar, CustomDialog } from '../CustomPaper'
import { ActivityIndicator, Appbar, Tooltip } from 'react-native-paper'

type CreateFormHeaderProps = {
  title: string
  formType: 'create'
}

type EditFormHeaderProps = {
  title: string
  formType: 'edit'
  loading: boolean
  confirmDelete: boolean
  setConfirmDelete: (value: boolean) => void
  onDeletePressed: () => void
}

type CustomFormHeaderProps = CreateFormHeaderProps | EditFormHeaderProps

const CustomFormHeader = (props: CustomFormHeaderProps) => {
  const { title, formType = 'create' } = props
  const isEdit = formType === 'edit'

  const { loading, confirmDelete, setConfirmDelete, onDeletePressed } = props as EditFormHeaderProps

  return (
    <>
      <CustomAppBar title={title}>
        {
          isEdit ? (
            loading ? (
              <ActivityIndicator size={18} animating color="#3366FF" style={styles.loading} />
            ) : (
              <Tooltip title="Hapus data" enterTouchDelay={200}>
                <Appbar.Action
                  icon="trash-can-outline"
                  iconColor="#ff4e30"
                  onPress={() => setConfirmDelete(true)}
                  size={22}
                />
              </Tooltip>
            )
          ) : null
        }
      </CustomAppBar>

      {isEdit && (
        <CustomDialog
          textBody="Apakah Anda yakin ingin menghapus catatan ini? data yang dihapus tidak dapat dipulihkan."
          actionText="Hapus"
          visible={confirmDelete}
          setVisible={setConfirmDelete}
          onActionPressed={onDeletePressed}
        />
      )}
    </>
  )
}

export default CustomFormHeader

const styles = StyleSheet.create({
  container: {},
  loading: {
    alignSelf: 'center',
    marginRight: 12,
  },
})
