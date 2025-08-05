import { useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
import useTheme from '../../context/themeContext'
import CreateMoneyPodTransactionButton from '../components/CreateMoneyPodTransactionButton'
import Header from '../components/Header'
import RecentTransaction from '../components/RecentTransaction'
import useMoneyPodTransactionService from '../services/moneyPodTransactionDataService'
import HeadWrapper from '../utilities/HeadWrapper'
import ScreenWrapper from '../utilities/ScreenWrapper'

const MoneyPodDetails = () => {
  const { name, docId } = useLocalSearchParams()
  const {isDark} = useTheme()
  const { moneyPodTransactionData, moneyPodTransactionLoading } =
    useMoneyPodTransactionService(docId)
  return (
    <HeadWrapper>
      <Header heading={name} />
      <ScreenWrapper className="relative">
        <CreateMoneyPodTransactionButton podUid={docId} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className='w-full'>
            <View className={`border-2 rounded-md p-2 mb-3 ${isDark ? 'bg-light-dark border-grey-white' : 'bg-light-green'}`}>
              <Text className={`text-2xl font-doodle text-white ${isDark && 'text-white'}`}>
                Transactions
              </Text>
            </View>
            {moneyPodTransactionLoading && <ActivityIndicator />}
            {!moneyPodTransactionLoading &&
              moneyPodTransactionData.length === 0 && (
                <Text className={`text-center font-doodle ${isDark && 'text-white'}`}>
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
