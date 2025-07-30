import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import useConfirm from '../../context/confirmContext'
import useCurrency from '../../context/currencyContext'
import useMoneyPodsServices from '../services/moneyPodsServices'

const MoneyPodCard = ({data}) => {
  const { currency } = useCurrency()
  const router = useRouter()
  const {confirmBox} = useConfirm()
  const {deleteMoneyPod} = useMoneyPodsServices()

  const {name , income , expense , docId} = data;

  const handleDelete = async ()=>{
    const result = await confirmBox("Do you want to delete it?")
    
    if(result){
      await deleteMoneyPod(docId)
    }
  }

  const handleRoute = ()=>{
    router.push({pathname : '/(screens)/MoneyPodDetails' , params : {name , docId}})
  }

  return (
    <TouchableOpacity
      className='w-full border-2 rounded-md bg-light-green h-32 p-1 flex items-center mb-2 relative'
      activeOpacity={0.6}
      onPress={handleRoute}
    >
      <TouchableOpacity className="absolute top-2 right-2 bg-red-600 rounded-full p-2 z-10" onPress={handleDelete}>
        <Ionicons name='trash-bin' color={'#A0C878'}/>
      </TouchableOpacity>
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
