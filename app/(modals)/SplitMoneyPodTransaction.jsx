import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
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
import DropDown from '../components/DropDown'
import Header from '../components/Header'
import SplitMoneyPodForm from '../components/SplitMoneyPodForm'
import transactionConst from '../constants/transactions'
import useMoneyPodTransactionService from '../services/moneyPodTransactionService'
import HeadWrapper from '../utilities/HeadWrapper'
import ScreenWrapper from '../utilities/ScreenWrapper'

const transactionCategories = transactionConst?.transactionCategories

const SplitTransaction = () => {
  const { data, handleChange, handleReset } = useMoneyPodTransaction()
  const { sharedMoneyPodExpenseTransactionService } =
    useMoneyPodTransactionService()
  const { currency } = useCurrency()
  const {showSuccessAlert , showDangerAlert} = useAlert()
  const router = useRouter()

  const { podUid } = useLocalSearchParams()
  const [isFocus, setIsFocus] = useState(false)
  const [openCalendar, setOpenCalendar] = useState(false)
  const [amount, setAmount] = useState('0')
  const [error, setError] = useState({
    amount: null,
    category: null,
    userAmount: null,
    share: null
  })
  const [loading, setLoading] = useState(false)
  const [totalFriendAmount, setTotalFriendAmount] = useState(0)

  useEffect(() => {
    let sum = 0
    data?.friends.map(friend => {
      sum += Number(friend?.amount)
    })
    setTotalFriendAmount(sum)
  }, [data?.friends?.length])

  const calculateUserAmount = () => {
    const sharedAmount = parseFloat(totalFriendAmount)
    const totalAmount = parseFloat(String(amount))

    if (isNaN(totalAmount)) {
      setError(prev => ({ ...prev, amount: 'Type a valid amount' }))
      return -1
    }

    return (totalAmount - sharedAmount).toFixed(2)
  }

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

    if (!formattedValue) {
      setLoading(false)
      return
    }

    if (Number(calculateUserAmount()) < 0) {
      setError(prev => ({ ...prev, userAmount: 'Not Valid' }))
      setLoading(false)
      return
    }

    if (data?.friends.length === 0) {
      setError(prev => ({ ...prev, share: 'Add atleast 1 sharing person' }))
      setLoading(false)
      return
    }

    if (data?.category === '') {
      setError(prev => ({ ...prev, category: 'Select a category' }))
      setLoading(false)
      return
    }

    const result = await sharedMoneyPodExpenseTransactionService(
      formattedValue,
      podUid
    )

    if (result.success) {
      console.log(result)
      handleReset()
      showSuccessAlert("Transaction added successfully...")
      router.back()
    } else {
      showDangerAlert("Error in adding the transaction...")
    }

    setLoading(false)
  }

  return (
    <HeadWrapper>
      <Header heading='Split Money Pod' />
      <ScreenWrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className='w-full h-full'>
            {/* Total Amount Section */}
            <View className='flex flex-row items-center gap-1 mb-2'>
              <Ionicons name='cash' size={25} />
              <Text className='font-doodle text-lg'>
                Total Amount ({currency})
              </Text>
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

            {/* Category Section */}
            <View className='flex flex-row items-center gap-1 mb-2 mt-3'>
              <Ionicons name='pricetag' size={25} />
              <Text className='font-doodle text-lg'>Category</Text>
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
                <View className='border-b-2 flex flex-row gap-2 px-2 items-center bg-light-green'>
                  <Ionicons name={item.icon} size={30} />
                  <Text className='font-doodle p-2 my-2 text-lg'>
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

            {/* Descripiton Section  */}

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

            {/* Date Section */}

            <View className='flex flex-row items-center gap-1 mb-2 mt-3'>
              <Ionicons name='calendar' size={25} />
              <Text className='font-doodle text-lg'>Date</Text>
            </View>

            {/* Calendar Section */}

            <TouchableOpacity
              className='w-full h-16 border-2 rounded-md bg-light-green font-doodle text-xl flex justify-center p-2'
              onPress={() => setOpenCalendar(!openCalendar)}
            >
              <Text className='font-doodle text-lg'>
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

            {/* Shared People Section */}

            <View className='flex flex-row items-center gap-1 mb-2 mt-3'>
              <Ionicons name='people' size={25} />
              <Text className='font-doodle text-lg'>Shared People</Text>
            </View>

            <View className='w-full flex justify-center gap-2 mb-2'>
              <View className='w-full flex flex-row gap-2 justify-between'>
                <View className='w-2/5 bg-light-green border-2 rounded-md h-16 flex justify-center p-2'>
                  <Text className='text-lg font-doodle'>You</Text>
                </View>
                <View className='w-2/5 bg-light-green border-2 rounded-md h-16 flex justify-center p-2'>
                  <Text className='text-lg font-doodle'>
                    {calculateUserAmount()}
                  </Text>
                </View>
              </View>
              {error.userAmount && (
                <Text className='text-sm text-red-600 font-doodle'>
                  {error.userAmount}
                </Text>
              )}
              {error.share && (
                <Text className='text-sm text-red-600 font-doodle'>
                  {error.share}
                </Text>
              )}
            </View>
            <SplitMoneyPodForm />

            {/* Submit Button */}

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

export default SplitTransaction
