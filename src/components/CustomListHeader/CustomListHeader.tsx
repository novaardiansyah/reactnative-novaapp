import { } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { CustomAppBar } from '@/components/CustomPaper'
import { Appbar, Tooltip } from 'react-native-paper'

interface CustomListHeaderProps {
  title: string
  onAddPressed: () => void
  setShowSearch: (value: boolean) => void
  closeSearchBar: () => void
  handleSearch: (value: string) => void,
  showSearch?: boolean,
  searchRef?: React.RefObject<TextInput> | null
}

const CustomListHeader = (props: CustomListHeaderProps) => {
  const { title, onAddPressed, setShowSearch, closeSearchBar , handleSearch, searchRef, showSearch } = props

  return (
    <>
      <CustomAppBar title={title}>
        <Appbar.Action icon="plus-circle-outline" onPress={onAddPressed} size={22} />

        { showSearch ? (
            <Tooltip title="Tutup pencarian" enterTouchDelay={200}>
              <Appbar.Action icon="close" onPress={closeSearchBar} size={22} />
            </Tooltip>
          ) : (
            <Tooltip title="Cari data" enterTouchDelay={200}>
              <Appbar.Action icon="magnify" onPress={() => setShowSearch(true)} size={22} />
            </Tooltip>
          )
        }
      </CustomAppBar>

      { showSearch && (
          <View style={styles.searchWrapper}>
            <TextInput
              placeholder="Ketik untuk mencari..."
              autoFocus
              onSubmitEditing={(event) => handleSearch(event.nativeEvent.text)}
              ref={searchRef}
              style={styles.searchBar}
            />
          </View>
        )
      }
    </>
  )
}

export default CustomListHeader

const styles = StyleSheet.create({
  container: {},

  searchWrapper: {
    padding: 10, 
    backgroundColor: '#fff'
  },

  searchBar: {
    height: 40, 
    borderColor: '#ccc', 
    borderWidth: 1, 
    borderRadius: 5, 
    paddingHorizontal: 10 
  }
})
