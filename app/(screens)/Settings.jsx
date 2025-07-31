import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import useCurrency from '../../context/currencyContext'
import Header from '../components/Header'
import currencyList from '../constants/currency'
import HeadWrapper from '../utilities/HeadWrapper'
import ScreenWrapper from '../utilities/ScreenWrapper'

const data = currencyList

const Settings = () => {
  const { currency, updateCurrency } = useCurrency()
  const [isFocus, setIsFocus] = useState(false)
  return (
    <HeadWrapper>
        <Header heading='Settings'/>
      <ScreenWrapper>
        <View className='w-full flex-1 h-full mt-2'>
          <View className='w-full flex justify-between items-center flex-row mb-3'>
            <View className='w-1/2 flex justify-center items-center relative'>
              <View className='w-11/12 h-16 flex justify-center items-center border-2 rounded-md bg-black absolute right-1 top-1' />
              <View className='w-11/12 h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange'>
                <Text className='font-flap-stick text-xl'>Currency</Text>
              </View>
            </View>
            <View className='w-1/2 flex justify-center items-center relative'>
              <View className='w-11/12 h-16 flex justify-center items-center border-2 rounded-md bg-black absolute right-1 top-1' />
              <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={data}
                search
                maxHeight={300}
                labelField='label'
                valueField='value'
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder='Search...'
                value={currency}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  updateCurrency(item.value)
                  setIsFocus(false)
                }}
                renderItem={(item, selected) => (
                  <View className='border-b-2'>
                    <Text className='font-doodle p-2 my-2 text-lg'>
                      {item.label}
                    </Text>
                  </View>
                )}
                iconColor='black'
              />
            </View>
          </View>
          <View className='w-full flex justify-center items-center mb-3 relative'>
            <View className='w-full h-16 flex justify-center items-center border-2 rounded-md bg-black absolute left-1 top-1' />
            <TouchableOpacity
              className='w-full h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange'
              onPress={() => {}}
            >
              <Text className='font-flap-stick text-xl'>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
          <View className='w-full flex justify-center items-center mb-3 relative'>
            <View className='w-full h-16 flex justify-center items-center border-2 rounded-md bg-black absolute left-1 top-1' />
            <TouchableOpacity
              className='w-full h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange'
              onPress={() => {}}
            >
              <Text className='font-flap-stick text-xl'>
                Terms and Conditions
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View className='w-full flex justify-center items-center mb-3 relative'>
            <View className='w-full h-16 flex justify-center items-center border-2 rounded-md bg-black absolute left-1 top-1' />
            <TouchableOpacity
              className='w-full h-16 flex justify-center items-center border-2 rounded-md bg-red-600'
              onPress={() => {}}
            >
              <Text className='font-flap-stick text-xl'>Delete Account</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </ScreenWrapper>
    </HeadWrapper>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EB5B00',
    fontFamily: 'doodle'
  },
  dropdown: {
    width: '91.666667%',
    height: 56,
    borderWidth: 2,
    borderRadius: 6,
    paddingHorizontal: 8,
    backgroundColor: '#EB5B00',
    fontFamily: 'doodle'
  },
  label: {
    position: 'absolute',
    backgroundColor: '#EB5B00',
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
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: 'doodle'
  }
})
