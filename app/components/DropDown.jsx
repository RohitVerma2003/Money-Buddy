import { StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

const DropDown = ({
  data,
  search,
  value,
  handleChange,
  renderItem,
  isFocus,
  setIsFocus,
  renderLeftIcon = () => {}
}) => {
  return (
    <Dropdown
      style={[styles.dropdown]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={data}
      search={search}
      maxHeight={300}
      labelField='label'
      valueField='value'
      placeholder={!isFocus ? 'Select item' : '...'}
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={handleChange}
      renderItem={renderItem}
      renderLeftIcon={renderLeftIcon}
      iconColor='black'
    />
  )
}

export default DropDown

const styles = StyleSheet.create({
  dropdown: {
    width: '100%',
    height: 56,
    borderWidth: 2,
    borderRadius: 6,
    paddingHorizontal: 8,
    backgroundColor: '#A0C878',
    fontFamily: 'doodle'
  },
  label: {
    position: 'absolute',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    fontFamily: 'doodle'
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'doodle'
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'doodle'
  }
})
