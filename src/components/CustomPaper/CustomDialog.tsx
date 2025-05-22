import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Dialog, Portal, Text } from 'react-native-paper';

interface CustomDialogProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onActionPressed: () => void;
  actionText?: string;
  textBody?: string;
  actionTextColor?: string;
}

const CustomDialog = (props: CustomDialogProps) => {
  const { visible, actionText, textBody, actionTextColor, setVisible, onActionPressed } = props

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => setVisible(false)} style={{ backgroundColor: '#fff' }}>
        <Dialog.Content>
          <Text variant="bodyMedium">
            {textBody || 'Apakah Anda yakin ingin melanjutkan?'}
          </Text>
        </Dialog.Content>

        <Dialog.Actions>
          <Button onPress={() => setVisible(false)} textColor="#b71c2b">Batal</Button>
          <Button onPress={onActionPressed} textColor={actionTextColor || '#3366FF'}>{actionText || 'Konfirmasi'}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CustomDialog;

const styles = StyleSheet.create({
  container: {}
})
