import { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
import { BarChart, PieChart } from 'react-native-gifted-charts'
import useCurrency from '../../context/currencyContext'
import useTheme from '../../context/themeContext'
import Header from '../components/Header'
import MoneyPodCard from '../components/MoneyPodCard'
import NavigationButtons from '../components/NaigationButtons'
import RecentTransaction from '../components/RecentTransaction'
import useMoneyPodsDataService from '../services/moneyPodsDataService'
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
  const {
    weeklyTransactionStats,
    monthlyTransactionStats,
    yearlyTransactionStats
  } = useTransactionService()
  const [transactionData, setTransactionData] = useState([])
  const [chartData, setChartData] = useState([])
  const [donutData, setDonutData] = useState([])
  const [loading, setLoading] = useState(false)
  const { currency } = useCurrency()
  const { moneyPodsData, moneyPodsLoading } = useMoneyPodsDataService()
  const { isDark } = useTheme()

  const getDonutData = () => {
    const incomes = transactionData.reduce(
      (total, item) => {
        if (item?.kind === 'regular') {
          if (item?.type === 'Income') total.income += item?.amount
          else total.expense += item?.amount
        } else {
          if (item?.kind === 'debt') total.income += item?.amount
          else total.expense += item?.amount
        }

        return total
      },
      { income: 0, expense: 0 }
    )

    const newDonutData = [
      { value: incomes.income, color: '#A0C878' },
      { value: Number(incomes.expense.toFixed(2)), color: '#ED6665' }
    ]

    setDonutData(newDonutData)
  }

  const getWeeklyStats = async () => {
    setLoading(true)
    const data = await weeklyTransactionStats()

    if (data.success) {
      setChartData(data.stats)
      setTransactionData(data.transactionData)
      getDonutData()
    }
    setLoading(false)
  }

  const getMonthlyStats = async () => {
    setLoading(true)
    const data = await monthlyTransactionStats()

    if (data.success) {
      setChartData(data.stats)
      setTransactionData(data.transactionData)
      getDonutData()
    }
    setLoading(false)
  }

  const getYearlyStats = async () => {
    setLoading(true)
    const data = await yearlyTransactionStats()

    if (data.success) {
      setChartData(data.stats)
      setTransactionData(data.transactionData)
      getDonutData()
    }
    setLoading(false)
  }

  useEffect(() => {
    if (activeStats == 0) {
      getWeeklyStats()
    }

    if (activeStats == 1) {
      getMonthlyStats()
    }

    if (activeStats == 2) {
      getYearlyStats()
    }
  }, [activeStats])

  useEffect(() => {
    if (transactionData.length > 0) {
      getDonutData()
    }
  }, [transactionData])

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
            <Text
              className={`w-full font-doodle text-2xl ${
                isDark && 'text-white'
              }`}
            >
              {activeStats === 0 && 'Last 7 days transactions'}
              {activeStats === 1 && 'Last 12 months transactions'}
              {activeStats === 2 && 'Yearly transactions'}
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
                  yAxisTextStyle={{
                    color: isDark ? 'white' : 'black',
                    fontFamily: 'doodle'
                  }}
                  xAxisColor={isDark ? '#948979' : 'black'}
                  yAxisColor={isDark ? '#948979' : 'black'}
                  noOfSections={5}
                  barBorderWidth={2}
                  barBorderColor={isDark ? '#948979' : 'black'}
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
            <View className='my-2 flex justify-center items-center'>
              {!loading && (
                <PieChart
                  donut
                  radius={70}
                  data={donutData}
                  innerCircleBorderWidth={2}
                  innerCircleBorderColor={isDark ? '#948979' : 'black'}
                  strokeWidth={2}
                  strokeColor={isDark ? '#948979' : 'black'}
                  innerCircleColor={isDark ? '#222831' : '#DDEB9D'}
                  showTooltip
                  tooltipComponent={item => (
                    <Text className='font-doodle text-sm p-2 bg-white rounded-md border-2'>
                      {currency}
                      {donutData[item].value}
                    </Text>
                  )}
                />
              )}
            </View>
            {moneyPodsData.length > 0 && (
              <View className='w-full'>
                {moneyPodsLoading && <ActivityIndicator />}
                {!moneyPodsLoading && moneyPodsData.length === 0 && (
                  <Text className='text-center font-doodle'>
                    No Money Pods Available...
                  </Text>
                )}
                {moneyPodsData?.map((data, index) =>
                  data ? <MoneyPodCard key={index} data={data} /> : ''
                )}
              </View>
            )}
            {!loading && transactionData.length === 0 && (
              <Text className='text-center font-doodle'>
                No Transaction Available...
              </Text>
            )}
            {!loading &&
              transactionData?.map(data =>
                data ? <RecentTransaction key={data?.id} data={data} /> : ''
              )}
          </View>
        </ScrollView>
      </ScreenWrapper>
    </HeaderWrapper>
  )
}

export default Statistics
