import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import useCurrency from '../../context/currencyContext'
import useTheme from '../../context/themeContext'
import transactionConst from '../constants/transactions'

const iconNameMapping = transactionConst?.iconNameMapping

const RecentTransaction = ({ data }) => {
  const { currency } = useCurrency()
  const { isDark } = useTheme()
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
      className={`w-full border-2 rounded-md flex flex-row justify-between items-center h-20 p-2 mb-2 ${
        isDark ? 'bg-light-dark border-grey-white' : 'bg-light-green'
      }`}
      onPress={() =>
        router.push({
          pathname: '../(modals)/TransactionDetails',
          params: { ...data, sharedAmong: JSON.stringify(data.sharedAmong) }
        })
      }
    >
      <View className='w-1/2 flex flex-row items-center gap-3'>
        <View
          className={`w-16 h-16 border-2 rounded-md flex justify-center items-center ${
            isDark ? 'bg-dark-bg border-grey-white' : 'bg-navy-blue'
          }`}
        >
          <Ionicons name={getIconName()} size={30} color={isDark ? '#DFD0B8' : '#A0C878'} />
        </View>
        <View>
          <Text className={`font-doodle text-xl text-clip line-clamp-1 ${isDark && 'text-white'}`}>
            {getTransactionHeading()}
            {data.kind === 'shared' && ' (shared)'}
          </Text>
          <Text className={`font-doodle text-sm ${isDark && 'text-white'}`}>{data.date}</Text>
          <Text className={`font-doodle text-md text-clip line-clamp-1 ${isDark && 'text-white'}`}>
            {data.description}
          </Text>
        </View>
      </View>
      <View className='w-2/5 flex flex-row items-center gap-3 justify-end'>
        <Text
          className={`text-xl ${
            isIncome() ? 'text-green-500' : 'text-red-600'
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
