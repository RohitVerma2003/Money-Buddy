import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'

const Header = () => {
  const router = useRouter()
  return (
    <TouchableOpacity onPress={() => router.back()}>
      <Ionicons name='arrow-back-circle' size={30} />
    </TouchableOpacity>
  )
}

export default Header
