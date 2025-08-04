import { StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import useTheme from '../../context/themeContext'

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
  const {isDark} = useTheme()
  return (
    <Dropdown
      style={[isDark ? styles.dropdown_dark : styles.dropdown]}
      placeholderStyle={isDark ? styles.placeholderStyleDark : styles.placeholderStyle}
      selectedTextStyle={isDark ? styles.selectedTextDarkStyle : styles.selectedTextStyle}
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
      iconColor={isDark ? '#948979' : 'black'}
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
  dropdown_dark: {
    width: '100%',
    height: 56,
    borderWidth: 2,
    borderRadius: 6,
    paddingHorizontal: 8,
    backgroundColor: '#393E46',
    fontFamily: 'doodle',
    color:'white',
    borderColor : '#948979'
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
    fontFamily: 'doodle',
  },
  placeholderStyleDark: {
    fontSize: 16,
    fontFamily: 'doodle',
    color:'white'
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'doodle'
  },
  selectedTextDarkStyle: {
    fontSize: 16,
    fontFamily: 'doodle',
    color:'white'
  }
})
