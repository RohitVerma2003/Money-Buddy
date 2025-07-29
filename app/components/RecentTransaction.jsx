import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import useCurrency from '../../context/currencyContext'
import transactionConst from '../constants/transactions'

const iconNameMapping = transactionConst?.iconNameMapping

const RecentTransaction = ({ data }) => {
  const { currency } = useCurrency()
  const router = useRouter()

  const isIncome = () => {
    if (
      data.kind === 'shared' ||
      data.kind === 'lend' ||
      data.type === 'Expense'
    ) {
      return false
    }

    return true
  }

  const getIconName = () => {
    if (data.kind === 'lend') return iconNameMapping['lend']
    if (data.kind === 'debt') return iconNameMapping['debt']

    return iconNameMapping[data.category]
  }

  const getTransactionHeading = () => {
    if (data.kind === 'lend') return 'Lend'
    if (data.kind === 'debt') return 'Debt'

    return data.category
  }
  return (
    <TouchableOpacity
      className='w-full border-2 rounded-md flex flex-row justify-between items-center bg-light-green h-20 p-2 mb-2'
      onPress={() =>
        router.push({
          pathname: '../(modals)/TransactionDetails',
          params: {...data , sharedAmong: JSON.stringify(data.sharedAmong)}
        })
      }
    >
      <View className='w-1/2 flex flex-row items-center gap-3'>
        <View className='w-16 h-16 border-2 rounded-md flex justify-center items-center bg-navy-blue'>
          <Ionicons name={getIconName()} size={30} color={'#A0C878'} />
        </View>
        <View>
          <Text className='font-doodle text-xl text-clip line-clamp-1'>
            {getTransactionHeading()}
            {data.kind === 'shared' && ' (shared)'}
          </Text>
          <Text className='font-doodle text-sm'>{data.date}</Text>
          <Text className='font-doodle text-md text-clip line-clamp-1'>
            {data.description}
          </Text>
        </View>
      </View>
      <View className='w-2/5 flex flex-row items-center gap-3 justify-end'>
        <Text
          className={`text-xl ${
            isIncome() ? 'text-green-700' : 'text-red-800'
          } font-doodle`}
        >
          {currency}
          {''}
          {data?.amount}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default RecentTransaction
