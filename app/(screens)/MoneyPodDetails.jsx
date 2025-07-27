import { useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
import CreateMoneyPodTransactionButton from '../components/CreateMoneyPodTransactionButton'
import Header from '../components/Header'
import RecentTransaction from '../components/RecentTransaction'
import useMoneyPodTransactionService from '../services/moneyPodTransactionDataService'
import HeadWrapper from '../utilities/HeadWrapper'
import ScreenWrapper from '../utilities/ScreenWrapper'

const MoneyPodDetails = () => {
  const { name, docId } = useLocalSearchParams()
  const { moneyPodTransactionData, moneyPodTransactionLoading } =
    useMoneyPodTransactionService(docId)
  return (
    <HeadWrapper>
      <Header heading={name} />
      <ScreenWrapper className="relative">
        <CreateMoneyPodTransactionButton podUid={docId} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className='w-full'>
            <View className='bg-light-green border-2 rounded-md p-2 mb-3'>
              <Text className='text-2xl font-doodle text-white'>
                Transactions
              </Text>
            </View>
            {moneyPodTransactionLoading && <ActivityIndicator />}
            {!moneyPodTransactionLoading &&
              moneyPodTransactionData.length === 0 && (
                <Text className='text-center font-doodle'>
                  No Transaction Available...
                </Text>
              )}
            {moneyPodTransactionData?.map(data =>
              data ? <RecentTransaction key={data?.id} data={data} /> : ''
            )}
          </View>
        </ScrollView>
      </ScreenWrapper>
    </HeadWrapper>
  )
}

export default MoneyPodDetails
