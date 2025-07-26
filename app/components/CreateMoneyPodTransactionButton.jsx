import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

const CreateMoneyPodTransactionButton = ({podUid}) => {
    const router = useRouter()
  return (
    <View className='w-16 absolute bottom-1 right-4 z-10 opacity-80'>
      <View className='w-full flex justify-center items-center mb-4 relative'>
        <TouchableOpacity
          className='w-full h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange'
          onPress={() => router.push({pathname:'/(modals)/AddMoneyPodTransaction' , params : {podUid}})}
        >
          <Text className='font-flap-stick text-xl'>
            <Ionicons name='add' size={30} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CreateMoneyPodTransactionButton
