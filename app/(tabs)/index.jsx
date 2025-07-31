import { Ionicons } from '@expo/vector-icons'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
import useAuth from '../../context/authContext'
import useCurrency from '../../context/currencyContext'
import CreateTransactionButton from '../components/CreateTransactionButton'
import Header from '../components/Header'
import MoneyPodCard from '../components/MoneyPodCard'
import ProfitLossCard from '../components/ProfitLossCard'
import RecentTransaction from '../components/RecentTransaction'
import useMoneyPodsDataService from '../services/moneyPodsDataService'
import useTransactionService from '../services/transactionDataService'
import useWalletService from '../services/walletDataService'
import HeadWrapper from '../utilities/HeadWrapper'
import ScreenWrapper from '../utilities/ScreenWrapper'

const Home = () => {
  const { user } = useAuth()
  const { currency } = useCurrency()
  const { walletAmount, walletData, walletLoading } = useWalletService()
  const { transactionData, transactionLoading } = useTransactionService()
  const { moneyPodsData, moneyPodsLoading } = useMoneyPodsDataService()

  const getAmount = () => {
    const totals = transactionData.reduce(
      (total, item) => {
        if (
          item.kind === 'shared' ||
          item.kind === 'lend' ||
          item.type === 'Expense'
        ) {
          total.expense = total.expense + Number(item.amount)
        } else {
          total.income = total.income + Number(item.amount)
        }
        return total
      },
      { income: 0, expense: 0 }
    )

    return totals
  }

  return (
    <HeadWrapper>
      <Header heading='Money Buddy' isbackButton={false} />
      <ScreenWrapper className='relative'>
        <CreateTransactionButton />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className='w-full mb-4'>
            <Text className='font-flap-stick text-2xl'>
              Welcome! {user?.name}
            </Text>
          </View>
          <View className='w-full border-2 rounded-md bg-light-green h-24 p-2 mb-2'>
            <Text className='w-full font-doodle text-lg text-white'>
              Total Amount:{' '}
            </Text>
            <View className='flex flex-row gap-3 items-center'>
              {!walletLoading ? (
                <Text
                  className={`font-doodle text-4xl ${
                    walletAmount === 0
                      ? 'text-yellow-400'
                      : walletAmount > 0
                      ? 'text-green-700'
                      : 'text-red-700'
                  }`}
                >
                  {currency}
                  {walletAmount}
                </Text>
              ) : (
                <ActivityIndicator />
              )}
              {walletAmount != 0 &&
                (walletAmount > 0 ? (
                  <Ionicons
                    name='arrow-up-circle'
                    color={'#15803d'}
                    size={25}
                  />
                ) : (
                  <Ionicons
                    name='arrow-down-circle'
                    color={'#991b1b'}
                    size={25}
                  />
                ))}
            </View>
          </View>

          <ProfitLossCard
            heading={'Last 30 days transaction amounts: '}
            income={getAmount().income}
            expense={getAmount().expense}
            extra={'*This data is calculated excluding the money pods'}
          />
          
          {moneyPodsData.length > 0 && (
            <View className='w-full'>
              <View className='bg-light-green border-2 rounded-md p-2 mb-3'>
                <Text className='text-2xl font-doodle text-white'>
                  Your Money Pods
                </Text>
              </View>
              {moneyPodsLoading && <ActivityIndicator />}
              {!moneyPodsLoading && moneyPodsData.length === 0 && (
                <Text className='text-center font-doodle mb-3'>
                  No Money Pods Available...
                </Text>
              )}
              {moneyPodsData?.map((data, index) => (
                <MoneyPodCard key={index} data={data} />
              ))}
            </View>
          )}
          <View className='w-full'>
            <View className='bg-light-green border-2 rounded-md p-2 mb-3'>
              <Text className='text-2xl font-doodle text-white'>
                Recent Transactions
              </Text>
            </View>
            {transactionLoading && <ActivityIndicator />}
            {!transactionLoading && transactionData.length === 0 && (
              <Text className='text-center font-doodle'>
                No Transaction Available...
              </Text>
            )}
            {transactionData?.map(data =>
              data ? <RecentTransaction key={data?.id} data={data} /> : ''
            )}
          </View>
        </ScrollView>
      </ScreenWrapper>
    </HeadWrapper>
  )
}

export default Home
