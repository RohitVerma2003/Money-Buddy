import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useRouter } from 'expo-router'
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
import useTransactions from '../../context/transactionContext'
import Header from '../components/Header'
import useTransactionService from '../services/transactionService'
import HeadWrapper from '../utilities/HeadWrapper'
import ScreenWrapper from '../utilities/ScreenWrapper'

const LendMoneyTransaction = () => {
  const { data, handleChange, handleReset } = useTransactions()
  const { lendingMoneyTransactionService } = useTransactionService()
  const { currency } = useCurrency()
  const router = useRouter()
  const {showSuccessAlert , showDangerAlert} = useAlert()

  const [isFocus, setIsFocus] = useState(false)
  const [openCalendar, setOpenCalendar] = useState(false)
  const [amount, setAmount] = useState('0')
  const [error, setError] = useState({ amount: null, lendingTo: null })
  const [loading, setLoading] = useState(false)

  const isValidAmount = () => {
    if (amount === '') return false
    const num = parseFloat(amount)

    if (isNaN(num)) return false
    return true
  }

  const handleBlurAmount = () => {
    if (isValidAmount) {
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

    if (!formattedValue || formattedValue <= 0) {
      if (formattedValue <= 0)
        setError(prev => ({ ...prev, amount: 'Please add some amount...' }))
      setLoading(false)
      return
    }

    if (data?.lendingTo === '') {
      setError(prev => ({
        ...prev,
        lendingTo: 'This field cannot be empty...'
      }))
      setLoading(false)
      return
    }

    const result = await lendingMoneyTransactionService(formattedValue)

    if (result.success) {
      console.log(result)
      handleReset()
      showSuccessAlert("Transaction added successfully...")
      router.back()
    } else {
      showDangerAlert("Error in adding the transactions...")
    }

    setLoading(false)
  }

  return (
    <HeadWrapper>
      <Header heading='Lending Money' />
      <ScreenWrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className='w-full h-full'>
            <View className='flex flex-row items-center gap-1 mb-2'>
              <Ionicons name='cash' size={25} />
              <Text className='font-doodle text-lg'>Amount ({currency})</Text>
            </View>
            <TextInput
              className='w-full h-16 border-2 rounded-md bg-light-green font-doodle text-xl'
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
              <Ionicons name='person' size={25} />
              <Text className='font-doodle text-lg'>Lending to</Text>
            </View>

            <TextInput
              className='w-full h-16 border-2 rounded-md bg-light-green font-doodle text-xl'
              value={data?.lendingTo}
              onChangeText={e => handleChange('lendingTo', e)}
              maxLength={20}
            />

            {error.lendingTo && (
              <Text className='text-sm text-red-600 font-doodle'>
                {error.lendingTo}
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
              <Text className='font-doodle text-lg'>Date of lending</Text>
            </View>

            <TouchableOpacity
              className='w-full h-16 border-2 rounded-md bg-light-green font-doodle text-xl flex justify-center p-2'
              onPress={() => setOpenCalendar(!openCalendar)}
            >
              <Text className='font-doodle text-lg'>
                {data?.date.toString()}
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
                className='w-11/12 h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange'
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

export default LendMoneyTransaction
