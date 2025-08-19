import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import useAlert from '../../context/alertContext'
import useCurrency from '../../context/currencyContext'
import useMoneyPodTransaction from '../../context/moneyPodTransactionContext'
import useTheme from '../../context/themeContext'
import DropDown from '../components/DropDown'
import Header from '../components/Header'
import transactionConst from '../constants/transactions'
import useMoneyPodTransactionService from '../services/moneyPodTransactionService'
import HeadWrapper from '../utilities/HeadWrapper'
import ScreenWrapper from '../utilities/ScreenWrapper'

const transactionType = transactionConst?.transactionType
const transactionCategories = transactionConst?.transactionCategories

const RegularMoneyPodTransaction = () => {
  const { data, handleChange, handleReset } = useMoneyPodTransaction()
  const { regularMoneyPodExpenseTransactionService } =
    useMoneyPodTransactionService()
  const { currency } = useCurrency()
  const { podUid } = useLocalSearchParams()
  const router = useRouter()
  const { showSuccessAlert, showDangerAlert } = useAlert()
  const { isDark } = useTheme()

  const [isFocus, setIsFocus] = useState(false)
  const [openCalendar, setOpenCalendar] = useState(false)
  const [amount, setAmount] = useState('0')
  const [error, setError] = useState({ amount: null, category: null })
  const [loading, setLoading] = useState(false)

  console.log(data)

  const isValidAmount = () => {
    if (amount === '') return false
    const num = parseFloat(amount)

    if (isNaN(num)) return false
    return true
  }

  const handleBlurAmount = () => {
    if (isValidAmount()) {
      const num = parseFloat(amount)
      const formattedValue = num.toFixed(2)
      handleChange('amount', Number(formattedValue))
      setAmount(formattedValue)
      return formattedValue
    } else {
      setError(prev => ({ ...prev, amount: 'Type a valid amount' }))
      return null
    }
  }

  const handleAmountChange = e => {
    if (e == '') {
      setAmount(e)
      return
    }

    if (/^\d*\.?\d{0,2}$/.test(e)) {
      setAmount(e)
    }
  }

  const handleSubmit = async () => {
    if (loading) return
    setLoading(true)

    const formattedValue = handleBlurAmount()

    if (!formattedValue) {
      setLoading(false)
      return
    }

    if (data?.category === '') {
      setError(prev => ({ ...prev, category: 'Select a category' }))
      setLoading(false)
      return
    }

    const result = await regularMoneyPodExpenseTransactionService(
      formattedValue,
      podUid
    )

    if (result.success) {
      console.log(result)
      handleReset()
      showSuccessAlert('Transaction added succesfully...')
      router.back()
    } else {
      showDangerAlert('Error in adding the transaction...')
    }

    setLoading(false)
  }

  return (
    <HeadWrapper>
      <Header heading='Regular Money Pod' />
      <ScreenWrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className='w-full h-full'>
            <View className='flex flex-row items-center gap-1 mb-2'>
              <Ionicons
                name='cash'
                size={25}
                color={isDark ? 'white' : 'black'}
              />
              <Text className={`font-doodle text-lg ${isDark && 'text-white'}`}>
                Amount ({currency})
              </Text>
            </View>
            <TextInput
              className={`w-full h-16 border-2 rounded-md font-doodle text-xl ${
                isDark
                  ? 'bg-light-dark border-grey-white text-white'
                  : 'bg-light-green'
              }`}
              keyboardType='decimal-pad'
              value={amount}
              onChangeText={e => {
                handleAmountChange(e)
                setError(prev => ({ ...prev, amount: null }))
              }}
              onBlur={handleBlurAmount}
            />

            {error.amount && (
              <Text className='text-sm text-red-600 font-doodle'>
                {error.amount}
              </Text>
            )}

            <View className='flex flex-row items-center gap-1 mb-2 mt-3'>
              <Ionicons
                name='swap-vertical'
                size={25}
                color={isDark ? 'white' : 'black'}
              />
              <Text className={`font-doodle text-lg ${isDark && 'text-white'}`}>
                Type
              </Text>
            </View>
            <DropDown
              data={transactionType}
              search={false}
              value={data?.type}
              isFocus={isFocus}
              setIsFocus={setIsFocus}
              handleChange={item => {
                handleChange('type', item.value)
                setIsFocus(false)
              }}
              renderItem={(item, selected) => (
                <View
                  className={`border-b-2 ${
                    isDark
                      ? 'bg-light-dark border-grey-white'
                      : 'bg-light-green'
                  }`}
                >
                  <Text className={`font-doodle p-2 my-2 text-lg ${isDark && 'text-white'}`}>
                    {item.label}
                  </Text>
                </View>
              )}
            />

            <View className='flex flex-row items-center gap-1 mb-2 mt-3'>
              <Ionicons
                name='pricetag'
                size={25}
                color={isDark ? 'white' : 'black'}
              />
              <Text className={`font-doodle text-lg ${isDark && 'text-white'}`}>
                Category
              </Text>
            </View>

            <DropDown
              data={transactionCategories}
              search={false}
              isFocus={isFocus}
              setIsFocus={setIsFocus}
              handleChange={item => {
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
                <View
                  className={`border-b-2 flex flex-row gap-2 px-2 items-center ${
                    isDark
                      ? 'bg-light-dark border-grey-white'
                      : 'bg-light-green'
                  }`}
                >
                  <Ionicons
                    name={item.icon}
                    size={30}
                    color={isDark ? 'white' : 'black'}
                  />
                  <Text
                    className={`font-doodle p-2 my-2 text-lg ${
                      isDark && 'text-white'
                    }`}
                  >
                    {item.label}
                  </Text>
                </View>
              )}
            />

            {error.category && (
              <Text className='text-sm text-red-600 font-doodle'>
                {error.category}
              </Text>
            )}

            <View className='flex flex-row items-center gap-1 mb-2 mt-3'>
              <Ionicons
                name='document'
                size={25}
                color={isDark ? 'white' : 'black'}
              />
              <Text className={`font-doodle text-lg ${isDark && 'text-white'}`}>
                Descripiton <Text className='text-sm'>(Optional)</Text>
              </Text>
            </View>

            <TextInput
              className={`w-full h-16 border-2 rounded-md font-doodle text-xl ${
                isDark
                  ? 'bg-light-dark border-grey-white text-white'
                  : 'bg-light-green'
              }`}
              value={data?.description}
              onChangeText={e => handleChange('description', e)}
              maxLength={100}
            />

            <View className='flex flex-row items-center gap-1 mb-2 mt-3'>
              <Ionicons
                name='calendar'
                size={25}
                color={isDark ? 'white' : 'black'}
              />
              <Text className={`font-doodle text-lg ${isDark && 'text-white'}`}>
                Date
              </Text>
            </View>

            <TouchableOpacity
              className={`w-full h-16 border-2 rounded-md font-doodle text-xl flex justify-center p-2 ${
                isDark ? 'bg-light-dark border-grey-white' : 'bg-light-green'
              }`}
              onPress={() => setOpenCalendar(!openCalendar)}
            >
              <Text className={`font-doodle text-lg ${isDark && 'text-white'}`}>
                {new Date(data?.date.toString()).toDateString()}
              </Text>
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
              <View className='w-11/12 h-16 flex justify-center items-center border-2 rounded-md bg-black absolute right-3 top-1' />
              <TouchableOpacity
                className={`w-11/12 h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange ${
                  isDark && 'border-grey-white'
                }`}
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
        </ScrollView>
      </ScreenWrapper>
    </HeadWrapper>
  )
}

export default RegularMoneyPodTransaction
