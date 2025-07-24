import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import useCurrency from '../../context/currencyContext'
import Header from '../components/Header'
import HeadWrapper from '../utilities/HeadWrapper'
import ScreenWrapper from '../utilities/ScreenWrapper'

const ExpenseGroup = () => {
  const [pressed, setPressed] = useState(false)
  const { currency } = useCurrency()
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
          <TouchableOpacity className='w-full border-2 rounded-md bg-light-green h-32 p-1 flex items-center mb-2' activeOpacity={0.6}>
            <View className='h-3/5 w-full flex justify-center'>
              <Text className='font-doodle text-3xl text-center line-clamp-1'>Goa trip</Text>
            </View>
            <View className='h-2/5 w-full border-t-2 flex justify-around items-center flex-row'>
              <View className='flex flex-row items-center gap-1'>
                <Text className='font-doodle text-lg'>Income:</Text>
                <Text className='font-doodle text-2xl text-green-600'>
                  {currency}2000
                </Text>
                <Ionicons name='arrow-up-circle' size={20} color={'#16a34a'} />
              </View>
              <View className='flex flex-row items-center gap-1'>
                <Text className='font-doodle text-lg'>Expense:</Text>
                <Text className='font-doodle text-2xl text-red-600'>
                  {currency}2000
                </Text>
                <Ionicons
                  name='arrow-down-circle'
                  size={20}
                  color={'#dc2626'}
                />
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </ScreenWrapper>
    </HeadWrapper>
  )
}

export default ExpenseGroup
