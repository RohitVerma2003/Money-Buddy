import { signOut } from 'firebase/auth'
import { Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../../config/firebase'
import ScreenWrapper from '../utilities/ScreenWrapper'

const Home = () => {
  const handleLogout = async () => {
    await signOut(auth)
  }
  return (
    <ScreenWrapper>
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
