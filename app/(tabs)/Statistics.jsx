import { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'
import useCurrency from '../../context/currencyContext'
import Header from '../components/Header'
import NavigationButtons from '../components/NaigationButtons'
import RecentTransaction from '../components/RecentTransaction'
import useTransactionService from '../services/transactionService'
import HeaderWrapper from '../utilities/HeadWrapper'
import ScreenWrapper from '../utilities/ScreenWrapper'

const Statistics = () => {
  const [statsData, setStatsData] = useState([
    { name: 'Weekly', value: 0 },
    { name: 'Monthly', value: 1 },
    { name: 'Yearly', value: 2 }
  ])
  const [activeStats, setActiveStats] = useState(0)
  const { weeklyTransactionStats , monthlyTransactionStats} = useTransactionService()
  const [transactionData, setTransactionData] = useState([])
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(false)
  const { currency } = useCurrency()

  const getWeeklyStats = async () => {
    setLoading(true)
    const data = await weeklyTransactionStats()

    if (data.success) {
      setChartData(data.stats)
      setTransactionData(data.transactionData)
    }
    setLoading(false)
  }

  const getMonthlyStats = async () => {
    setLoading(true)
    const data = await monthlyTransactionStats()

    if (data.success) {
      setChartData(data.stats)
      setTransactionData(data.transactionData)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (activeStats == 0) {
      getWeeklyStats()
    }

    if(activeStats == 1){
      getMonthlyStats()
    }
  }, [activeStats])

  return (
    <HeaderWrapper>
      <Header heading='Statistics' isbackButton={false} />
      <ScreenWrapper>
        <ScrollView className='w-full' showsVerticalScrollIndicator={false}>
          <NavigationButtons
            data={statsData}
            active={activeStats}
            handleChangeActive={setActiveStats}
          />

          <View>
            <Text className='w-full font-doodle text-2xl'>
              {activeStats === 0 && "Last 7 days transactions"}
              {activeStats === 1 && "Last 12 months transactions"}
            </Text>
            <View className='my-2 flex justify-center items-center'>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <BarChart
                  data={chartData}
                  hideRules
                  xAxisThickness={2}
                  yAxisThickness={2}
                  yAxisTextStyle={{ color: 'black', fontFamily: 'doodle' }}
                  noOfSections={5}
                  barBorderWidth={2}
                  barBorderColor={'black'}
                  barBorderTopRightRadius={5}
                  barBorderTopLeftRadius={5}
                  isAnimated={true}
                  renderTooltip={(item, index) => {
                    return (
                      <View className='-mb-8 -ml-1 flex bg-white p-2 rounded-md'>
                        <Text className='font-doodle'>
                          {currency}
                          {item.value}
                        </Text>
                      </View>
                    )
                  }}
                />
              )}
            </View>
            {!loading && transactionData.length === 0 && (
              <Text className='text-center font-doodle'>
                No Transaction Available...
              </Text>
            )}
            {!loading && transactionData?.map(data =>
              data ? <RecentTransaction key={data?.id} data={data} /> : ''
            )}
          </View>
        </ScrollView>
      </ScreenWrapper>
    </HeaderWrapper>
  )
}

export default Statistics
