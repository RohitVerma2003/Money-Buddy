import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import useAuth from '../../context/authContext'
import ProfileImage from '../components/ProfileImage'
import ScreenWrapper from '../utilities/ScreenWrapper'

const Profile = () => {
  const { user, logout } = useAuth()
  const router = useRouter()
  return (
    <ScreenWrapper>
      <View className='w-full flex-1 items-center'>
        <View className='w-full'>
          <Text className='font-flap-stick text-3xl'>Welcome!</Text>
        </View>
        <Animated.View className='mt-10' entering={FadeIn.duration(500)}>
          <ProfileImage />
          <Text className='text-center mt-1 font-doodle text-3xl'>
            {user?.name}
          </Text>
          <Text className='text-center font-doodle text-sm'>{user?.email}</Text>
        </Animated.View>
        <View className='w-full h-full mt-6'>
          <Animated.View className='w-full flex justify-center items-center mb-4 relative' entering={FadeIn.duration(500)}>
            <View className='w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-black absolute right-9 top-1' />
            <TouchableOpacity
              className='w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange'
              onPress={() => router.push('/(modals)/EditProfile')}
            >
              <Text className='font-flap-stick text-xl'>Edit Profile</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View className='w-full flex justify-center items-center mb-4 relative' entering={FadeIn.duration(500)}>
            <View className='w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-black absolute right-9 top-1' />
            <TouchableOpacity
              className='w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange'
              onPress={() => router.push('/(screens)/Settings')}
              
            >
              <Text className='font-flap-stick text-xl'>Settings</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View className='w-full flex justify-center items-center mb-4 relative' entering={FadeIn.duration(500)}>
            <View className='w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-black absolute right-9 top-1' />
            <TouchableOpacity className='w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange'>
              <Text className='font-flap-stick text-xl'>Rate Us</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View className='w-full flex justify-center items-center relative' entering={FadeIn.duration(500)}>
            <View className='w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-black absolute right-9 top-1' />
            <TouchableOpacity
              className='w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-red-600'
              onPress={() => logout()}
            >
              <Text className='font-flap-stick text-xl'>Logout</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Profile
