import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import useAlert from '../../context/alertContext'
import useCurrency from '../../context/currencyContext'
import Header from '../components/Header'
import useMoneyPodTransactionService from '../services/moneyPodTransactionService'
import useTransactionService from '../services/transactionService'
import HeadWrapper from '../utilities/HeadWrapper'
import ScreenWrapper from '../utilities/ScreenWrapper'

const TransactionDetails = () => {
  const rawData = useLocalSearchParams()
  let data = rawData
  if (rawData.kind === 'shared') {
    data = { ...rawData, sharedAmong: JSON.parse(rawData.sharedAmong) }
  }

  const [loading, setLoading] = useState(false)

  const { currency } = useCurrency()
  const { deleteTransactions } = useTransactionService()
  const { deleteMoneyPodTransaction } = useMoneyPodTransactionService()
  const {showSuccessAlert , showDangerAlert} = useAlert()
  const router = useRouter()

  const isExpense = () => {
    if (data.kind === 'shared' || data.kind === 'lend') return true
    if (data.type === 'Expense') return true
    return false
  }

  const handleDelete = async () => {
    if (loading) return
    setLoading(true)
    const result = data.pod_uid
      ? await deleteMoneyPodTransaction(
          data.amount,
          data.pod_uid,
          data.id,
          isExpense()
        )
      : await deleteTransactions(data.amount, data.id, isExpense())
    setLoading(false)

    if (!result.success) {
      showDangerAlert("Error in deleting the transaction...")
    } else {
      showSuccessAlert("Transaction deleted successfully...")
      router.back()
    }
  }
  console.log(data)
  return (
    <HeadWrapper>
      <Header heading='Transaction Details' />
      <ScreenWrapper>
        <ScrollView>
          <View className='mt-3'>
            <View className='flex flex-row gap-2 items-center mb-2'>
              <Text className='font-doodle text-2xl'>Amount: </Text>
              <Text
                className={`font-doodle text-2xl border-2 rounded-md px-2 ${
                  isExpense() ? 'bg-red-600 text-white' : 'bg-light-green'
                }`}
              >
                {currency}
                {parseFloat(data?.amount).toFixed(2)}
              </Text>
            </View>
            <View className='flex flex-row gap-2 items-center mb-2'>
              <Text className='font-doodle text-2xl'>Category: </Text>
              <Text className='font-doodle text-2xl bg-light-green border-2 rounded-md px-2'>
                {data.category || data.kind}
              </Text>
            </View>
            <View className='flex flex-row gap-2 items-center mb-2'>
              <Text className='font-doodle text-2xl'>Date: </Text>
              <Text className='font-doodle text-2xl bg-light-green border-2 rounded-md px-2'>
                {data.date}
              </Text>
            </View>
            {data?.description && (
              <View className='flex flex-row gap-2 items-center mb-2'>
                <Text className='font-doodle text-2xl'>Description: </Text>
                <Text className='font-doodle text-2xl bg-light-green border-2 rounded-md px-2'>
                  {data.description}
                </Text>
              </View>
            )}
            {data?.sharedAmong && (
              <View>
                <Text className='font-doodle text-2xl'>Sharing: </Text>
              </View>
            )}
            {data?.sharedAmong &&
              data?.sharedAmong.map((ele, index) => (
                <View key={index} className='flex flex-row gap-2 ml-3'>
                  <View className='flex flex-row gap-2 items-center mb-2'>
                    <Text className='font-doodle text-2xl bg-light-green border-2 rounded-md px-2'>
                      {ele.name}
                    </Text>
                  </View>
                  <View className='flex flex-row gap-2 items-center mb-2'>
                    <Text className='font-doodle text-2xl bg-light-green border-2 rounded-md px-2'>
                      {currency}
                      {ele.amount}
                    </Text>
                  </View>
                </View>
              ))}
            <View className='w-full flex justify-center items-center relative mt-3'>
              <View className='w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-black absolute right-9 top-1' />
              <TouchableOpacity
                className='w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-red-600'
                onPress={handleDelete}
              >
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <Text className='font-flap-stick text-xl'>Delete</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ScreenWrapper>
    </HeadWrapper>
  )
}

export default TransactionDetails
