import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import useTransactions from '../../context/transactionContext'
import Header from "../components/Header"
import transactionConst from '../constants/transactions'
import useTransactionService from '../services/transactionService'
import ScreenWrapper from '../utilities/ScreenWrapper'

const transactionType = transactionConst?.transactionType
const transactionCategories = transactionConst?.transactionCategories

const RegularTransaction = () => {
  const router = useRouter();
  const [isFocus, setIsFocus] = useState(false)
  const [openCalendar, setOpenCalendar] = useState(false)
  const { data, handleChange, handleReset } = useTransactions()
  const [amount, setAmount] = useState('0')
  const [error, setError] = useState({ amount: null, category: null })
  const [loading, setLoading] = useState(false)
  const { regularExpenseTransactionService } = useTransactionService()

  const handleSubmit = async () => {
    if (loading) return
    setLoading(true)
    const finalAmount = parseFloat(amount).toFixed(2)
    if (isNaN(finalAmount) || finalAmount <= 0) {
      setError(prev => ({ ...prev, amount: 'Type a valid amount' }))
      setLoading(false)
      return
    }
    setAmount(finalAmount)
    handleChange('amount', Number(finalAmount))

    if (data?.category === '') {
      setError(prev => ({ ...prev, category: 'Select a category' }))
      setLoading(false)
      return
    }

    const result = await regularExpenseTransactionService(finalAmount)

    if (result.success) {
      console.log(result)
      handleReset()
      router.back();
    } else {
      Alert.alert('Error', result.error)
    }

    setLoading(false)
  }

  return (
    <ScreenWrapper>
      <Header/>
      <View className="mt-3">
        <Text className='w-full font-flap-stick text-3xl mb-5'>
          Regular Transaction
        </Text>
      </View>

      <View className='w-full h-full'>
        <View className='flex flex-row items-center gap-1 mb-2'>
          <Ionicons name='cash' size={25} />
          <Text className='font-doodle text-lg'>Amount</Text>
        </View>
        <TextInput
          className='w-full h-16 border-2 rounded-md bg-light-green font-doodle text-xl'
          keyboardType='decimal-pad'
          value={amount}
          onChangeText={e => {
            setAmount(e)
            setError(prev => ({ ...prev, amount: null }))
          }}
        />

        {error.amount && (
          <Text className='text-sm text-red-600 font-doodle'>
            {error.amount}
          </Text>
        )}

        <View className='flex flex-row items-center gap-1 mb-2 mt-3'>
          <Ionicons name='swap-vertical' size={25} />
          <Text className='font-doodle text-lg'>Type</Text>
        </View>
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={transactionType}
          search={false}
          maxHeight={300}
          labelField='label'
          valueField='value'
          placeholder={!isFocus ? 'Select item' : '...'}
          value={data?.type}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            handleChange('type', item.value)
            setIsFocus(false)
          }}
          renderItem={(item, selected) => (
            <View className='border-b-2 bg-light-green'>
              <Text className='font-doodle p-2 my-2 text-lg'>{item.label}</Text>
            </View>
          )}
          iconColor='black'
        />

        <View className='flex flex-row items-center gap-1 mb-2 mt-3'>
          <Ionicons name='pricetag' size={25} />
          <Text className='font-doodle text-lg'>Category</Text>
        </View>

        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={transactionCategories}
          search={false}
          maxHeight={300}
          labelField='label'
          valueField='value'
          placeholder={!isFocus ? 'Select item' : '...'}
          value={data?.category}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            handleChange('category', item.value)
            setError(prev => ({ ...prev, category: null }))
            setIsFocus(false)
          }}
          renderLeftIcon={() => {
            const selected = transactionCategories.find(
              cat => cat.value === data?.category
            )
            return selected ? (
              <Ionicons
                name={selected.icon}
                size={24}
                style={{ marginRight: 10 }}
              />
            ) : null
          }}
          renderItem={(item, selected) => (
            <View className='border-b-2 flex flex-row gap-2 px-2 items-center bg-light-green'>
              <Ionicons name={item.icon} size={30} />
              <Text className='font-doodle p-2 my-2 text-lg'>{item.label}</Text>
            </View>
          )}
          iconColor='black'
        />
        {error.category && (
          <Text className='text-sm text-red-600 font-doodle'>
            {error.category}
          </Text>
        )}

        <View className='flex flex-row items-center gap-1 mb-2 mt-3'>
          <Ionicons name='document' size={25} />
          <Text className='font-doodle text-lg'>
            Descripiton <Text className='text-sm'>(Optional)</Text>
          </Text>
        </View>

        <TextInput
          className='w-full h-16 border-2 rounded-md bg-light-green font-doodle text-xl'
          value={data?.description}
          onChangeText={e => handleChange('description', e)}
          maxLength={100}
        />

        <View className='flex flex-row items-center gap-1 mb-2 mt-3'>
          <Ionicons name='calendar' size={25} />
          <Text className='font-doodle text-lg'>Date</Text>
        </View>

        <TouchableOpacity
          className='w-full h-16 border-2 rounded-md bg-light-green font-doodle text-xl flex justify-center p-2'
          onPress={() => setOpenCalendar(!openCalendar)}
        >
          <Text className='font-doodle text-lg'>{data?.date.toString()}</Text>
        </TouchableOpacity>

        {openCalendar && (
          <View className='w-full'>
            <DateTimePicker
              value={data?.date}
              mode='date'
              display='calendar'
              onChange={(e, date) => {
                handleChange('date', date)
                setOpenCalendar(false)
              }}
            />
          </View>
        )}

        <View className='w-full flex justify-center items-center mb-3 relative mt-3'>
          <View className='w-full h-16 flex justify-center items-center border-2 rounded-md bg-black absolute left-1 top-1' />
          <TouchableOpacity
            className='w-full h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange'
            onPress={handleSubmit}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text className='font-flap-stick text-xl'>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default RegularTransaction
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
