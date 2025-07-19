import { Image } from 'expo-image'
import { Text, View } from 'react-native'

const NoInternet = () => {
  return (
    <View className="flex-1 bg-red-400">
      <View className='flex-1 justify-center items-center'>
        <Image source={require('../../assets/Icons/internet.png')} style={{width : 40 , height : 40 , marginBottom : 20}}/>
        <Text className='font-doodle text-white text-2xl'>
          No Internet Connection.
        </Text>
        <Text className='font-doodle text-white text-sm'>
          Connect internet to move forward.
        </Text>
      </View>
    </View>
  )
}

export default NoInternet
