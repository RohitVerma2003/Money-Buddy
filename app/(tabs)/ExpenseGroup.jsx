import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Header from '../components/Header'
import MoneyPodCard from '../components/MoneyPodCard'
import useMoneyPodsDataService from '../services/moneyPodsDataService'
import HeadWrapper from '../utilities/HeadWrapper'
import ScreenWrapper from '../utilities/ScreenWrapper'

const ExpenseGroup = () => {
  const [pressed, setPressed] = useState(false)
  const { moneyPodsData, moneyPodsLoading } = useMoneyPodsDataService()

  const router = useRouter()

  const pressIn = () => {
    setPressed(prev => true)
  }

  const pressOut = () => {
    setPressed(prev => false)
    router.push('(modals)/AddMoneyPod')
  }

  return (
    <HeadWrapper>
      <Header heading='Money Pods' isbackButton={false} />
      <ScreenWrapper>
        <View className='w-full flex items-center relative h-24'>
          {!pressed && (
            <View className='w-full h-20 bg-black rounded-md absolute top-1 left-1' />
          )}
          <TouchableOpacity
            activeOpacity={1}
            className={`w-full h-20 border-2 rounded-md bg-vintage-orange flex justify-center items-center ${
              pressed && 'mt-1'
            }`}
            onPressIn={pressIn}
            onPressOut={pressOut}
          >
            <Text className='font-flap-stick text-xl'>Create new group</Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} className='mb-3'>
          {moneyPodsLoading ? (
            <ActivityIndicator />
          ) : moneyPodsData.length > 0 ? (
            moneyPodsData.map((ele, index) => (
              <MoneyPodCard data={ele} key={index} />
            ))
          ) : (
            <Text className="font-doodle text-center">No MoneyPods Created Yet</Text>
          )}
        </ScrollView>
      </ScreenWrapper>
    </HeadWrapper>
  )
}

export default ExpenseGroup
