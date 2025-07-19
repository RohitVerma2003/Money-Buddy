import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import Header from '../components/Header'
import ScreenWrapper from '../utilities/ScreenWrapper'

const AddTransaction = () => {
  const router = useRouter()
  return (
    <ScreenWrapper>
      <Header />
      <View className='mt-3'>
        <Text className='w-full font-flap-stick text-3xl mb-5'>
          Add Transaction
        </Text>
      </View>
      <View className='w-full flex justify-center items-center mb-3 relative'>
        <View className='w-full h-16 flex justify-center items-center border-2 rounded-md bg-black absolute left-1 top-1' />
        <TouchableOpacity
          className='w-full h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange'
          onPress={() => {
            router.push('/(modals)/RegularTransaction')
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
            router.push('/(modals)/SplitTransaction')
          }}
        >
          <Text className='font-flap-stick text-xl'>Split Transaction</Text>
        </TouchableOpacity>
      </View>
      <View className='w-full flex justify-center items-center mb-3 relative'>
        <View className='w-full h-16 flex justify-center items-center border-2 rounded-md bg-black absolute left-1 top-1' />
        <TouchableOpacity
          className='w-full h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange'
          onPress={() => {}}
        >
          <Text className='font-flap-stick text-xl'>Lend Money</Text>
        </TouchableOpacity>
      </View>
      <View className='w-full flex justify-center items-center mb-3 relative'>
        <View className='w-full h-16 flex justify-center items-center border-2 rounded-md bg-black absolute left-1 top-1' />
        <TouchableOpacity
          className='w-full h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange'
          onPress={() => {}}
        >
          <Text className='font-flap-stick text-xl'>Debt Money</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  )
}

export default AddTransaction
