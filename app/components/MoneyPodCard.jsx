import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import useCurrency from '../../context/currencyContext'

const MoneyPodCard = ({data}) => {
  const { currency } = useCurrency()
  const router = useRouter()
  const {name , income , expense , docId} = data;

  const handleRoute = ()=>{
    router.push({pathname : '/(screens)/MoneyPodDetails' , params : {name , docId}})
  }

  return (
    <TouchableOpacity
      className='w-full border-2 rounded-md bg-light-green h-32 p-1 flex items-center mb-2'
      activeOpacity={0.6}
      onPress={handleRoute}
    >
      <View className='h-3/5 w-full flex justify-center'>
        <Text className='font-doodle text-3xl text-center line-clamp-1'>
          {name}
        </Text>
      </View>
      <View className='h-2/5 w-full border-t-2 flex justify-around items-center flex-row'>
        <View className='flex flex-row items-center gap-1'>
          <Text className='font-doodle text-lg'>Income:</Text>
          <Text className='font-doodle text-2xl text-green-600'>
            {currency}{income}
          </Text>
          <Ionicons name='arrow-up-circle' size={20} color={'#16a34a'} />
        </View>
        <View className='flex flex-row items-center gap-1'>
          <Text className='font-doodle text-lg'>Expense:</Text>
          <Text className='font-doodle text-2xl text-red-600'>
            {currency}{expense}
          </Text>
          <Ionicons name='arrow-down-circle' size={20} color={'#dc2626'} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default MoneyPodCard
