import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import HeadWrapper from '../utilities/HeadWrapper'
import ScreenWrapper from '../utilities/ScreenWrapper'

const welcome = () => {
  const router = useRouter()
  return (
    <HeadWrapper>
      <ScreenWrapper>
        <View className='w-full h-full bg-fade-green flex-1 justify-center items-center'>
          <View className='w-full flex-1 justify-center items-center'>
            <View className='w-full max-h-20 flex-1 justify-center items-center flex-row-reverse'>
              <Image
                source={require('../../assets/Icons/wallet.png')}
                style={{ width: '13%', height: '100%' }}
                contentFit='contain'
              />
              <Text className='font-flap-stick text-5xl'>Money Buddy</Text>
            </View>
            <Text className='text-sm font-doodle'>
              Your personal expense tracker
            </Text>
          </View>
          <View className='w-full flex justify-center items-center mb-10 relative'>
            <View className='w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-black absolute right-9 top-1' />
            <TouchableOpacity
              className='w-4/5 h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange'
              onPress={() => {
                router.push('/(auth)/signup')
              }}
            >
              <Text className='font-flap-stick text-xl'>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScreenWrapper>
    </HeadWrapper>
  )
}

export default welcome
