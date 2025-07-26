import { useLocalSearchParams, useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import Header from '../components/Header'
import HeadWrapper from '../utilities/HeadWrapper'
import ScreenWrapper from '../utilities/ScreenWrapper'

const AddMoneyPodTransaction = () => {
  const router = useRouter()
  const { podUid } = useLocalSearchParams()
  return (
    <HeadWrapper>
      <Header heading='Add Transaction' />
      <ScreenWrapper>
        <View className='w-full flex justify-center items-center mb-3 relative'>
          <View className='w-full h-16 flex justify-center items-center border-2 rounded-md bg-black absolute left-1 top-1' />
          <TouchableOpacity
            className='w-full h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange'
            onPress={() => {
              router.push({
                pathname: '/(modals)/RegularMoneyPodTransaction',
                params: { podUid }
              })
            }}
          >
            <Text className='font-flap-stick text-xl'>Regular Transaction</Text>
          </TouchableOpacity>
        </View>
        <View className='w-full flex justify-center items-center mb-3 relative'>
          <View className='w-full h-16 flex justify-center items-center border-2 rounded-md bg-black absolute left-1 top-1' />
          <TouchableOpacity
            className='w-full h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange'
            onPress={() => {
              router.push({
                pathname: '/(modals)/SplitMoneyPodTransaction',
                params: { podUid }
              })
            }}
          >
            <Text className='font-flap-stick text-xl'>Split Transaction</Text>
          </TouchableOpacity>
        </View>
        <View className='w-full flex justify-center items-center mb-3 relative'>
          <View className='w-full h-16 flex justify-center items-center border-2 rounded-md bg-black absolute left-1 top-1' />
          <TouchableOpacity
            className='w-full h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange'
            onPress={() => {
              router.push({
                pathname: '/(modals)/LendMoneyPod',
                params: { podUid }
              })
            }}
          >
            <Text className='font-flap-stick text-xl'>Lend Money</Text>
          </TouchableOpacity>
        </View>
        <View className='w-full flex justify-center items-center mb-3 relative'>
          <View className='w-full h-16 flex justify-center items-center border-2 rounded-md bg-black absolute left-1 top-1' />
          <TouchableOpacity
            className='w-full h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange'
            onPress={() => {
              router.push({
                pathname: '/(modals)/DebtMoneyPod',
                params: { podUid }
              })
            }}
          >
            <Text className='font-flap-stick text-xl'>Debt Money</Text>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    </HeadWrapper>
  )
}

export default AddMoneyPodTransaction
