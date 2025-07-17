import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { signOut } from 'firebase/auth'
import { Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../../config/firebase'
import ScreenWrapper from '../utilities/ScreenWrapper'

const Home = () => {
  const router = useRouter()
  const handleLogout = async () => {
    await signOut(auth)
  }
  return (
    <ScreenWrapper className='relative'>
      <View className='w-16 absolute bottom-1 right-4'>
        <View className='w-full flex justify-center items-center mb-4 relative'>
          <TouchableOpacity
            className='w-full h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange'
            onPress={() => router.push('/(modals)/AddTransaction')}
          >
            <Text className='font-flap-stick text-xl'>
              <Ionicons name='add' size={30} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text>Home</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  )
}

export default Home
