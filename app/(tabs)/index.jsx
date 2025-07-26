import { Ionicons } from '@expo/vector-icons'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
import useAuth from '../../context/authContext'
import useCurrency from '../../context/currencyContext'
import CreateTransactionButton from '../components/CreateTransactionButton'
import Header from '../components/Header'
import MoneyPodCard from '../components/MoneyPodCard'
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
          <View className='w-full border-2 rounded-md bg-light-green p-2 mb-3 h-32 flex justify-around items-end overflow-hidden '>
            <Text className='w-full font-doodle text-lg text-white'>
              Last 30 days transaction amounts:
            </Text>
            <View className='w-full flex justify-between items-center flex-row'>
              <View className='w-2/5 border-2 rounded-md bg-fade-green h-16 p-2 flex justify-between items-center flex-row'>
                <Text className='text-2xl text-green-700 font-doodle'>
                  {currency}
                  {getAmount().income}
                </Text>
                <Ionicons name='arrow-up-circle' color={'#15803d'} size={22} />
              </View>
              <View className='w-2/5 border-2 rounded-md bg-red-400 h-16 p-2 flex justify-between items-center flex-row'>
                <Text className='text-2xl text-red-800 font-doodle'>
                  {currency}
                  {getAmount().expense}
                </Text>
                <Ionicons
                  name='arrow-down-circle'
                  color={'#991b1b'}
                  size={22}
                />
              </View>
            </View>
          </View>
          <View className='w-full'>
            <View className='bg-light-green border-2 rounded-md p-2 mb-3'>
              <Text className='text-2xl font-doodle text-white'>
                Your Money Pods
              </Text>
            </View>
            {moneyPodsLoading && <ActivityIndicator/>}
            {(!moneyPodsLoading && moneyPodsData.length === 0) && <Text className="text-center font-doodle">No Money Pods Available...</Text>}
            {moneyPodsData?.map(data =>
              data ? <MoneyPodCard key={data?.pod_id} data={data} /> : ''
            )}
          </View>
          <View className='w-full'>
            <View className='bg-light-green border-2 rounded-md p-2 mb-3'>
              <Text className='text-2xl font-doodle text-white'>
                Recent Transactions
              </Text>
            </View>
            {transactionLoading && <ActivityIndicator/>}
            {(!transactionLoading && transactionData.length === 0) && <Text className="text-center font-doodle">No Transaction Available...</Text>}
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
