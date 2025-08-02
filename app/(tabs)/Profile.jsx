import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import useAuth from '../../context/authContext'
import Header from '../components/Header'
import ProfileImage from '../components/ProfileImage'
import HeadWrapper from '../utilities/HeadWrapper'
import ScreenWrapper from '../utilities/ScreenWrapper'

const Profile = () => {
  const { user, logout } = useAuth()
  const router = useRouter()
  return (
    <HeadWrapper>
      <Header heading='Profile' isbackButton={false}/>
    <ScreenWrapper>
      <View className='w-full flex-1 items-center'>
        <View className='mt-3' >
          <ProfileImage />
          <Text className='text-center mt-1 font-doodle text-3xl'>
            {user?.name}
          </Text>
          <Text className='text-center font-doodle text-sm'>{user?.email}</Text>
        </View>
        <View className='w-full h-full mt-6'>
          <View className='w-full flex justify-center items-center mb-4 relative' >
            <View className='w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-black absolute right-9 top-1' />
            <TouchableOpacity
              className='w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange'
              onPress={() => router.push('/(modals)/EditProfile')}
            >
              <Text className='font-flap-stick text-xl'>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <View className='w-full flex justify-center items-center mb-4 relative' >
            <View className='w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-black absolute right-9 top-1' />
            <TouchableOpacity
              className='w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange'
              onPress={() => router.push('/(screens)/Settings')}
              
            >
              <Text className='font-flap-stick text-xl'>Settings</Text>
            </TouchableOpacity>
          </View>
          <View className='w-full flex justify-center items-center mb-4 relative' >
            <View className='w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-black absolute right-9 top-1' />
            <TouchableOpacity className='w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange'>
              <Text className='font-flap-stick text-xl'>Rate Us</Text>
            </TouchableOpacity>
          </View>
          <View className='w-full flex justify-center items-center relative' >
            <View className='w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-black absolute right-9 top-1' />
            <TouchableOpacity
              className='w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-red-600'
              onPress={() => logout()}
            >
              <Text className='font-flap-stick text-xl'>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
    </HeadWrapper>
  )
}

export default Profile
