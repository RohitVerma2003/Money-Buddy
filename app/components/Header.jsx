import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

const Header = ({ heading = '', isbackButton = true }) => {
  const router = useRouter()
  return (
    <View className='w-full h-16 bg-light-green flex items-center flex-row gap-3 px-5'>
      {isbackButton && (
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name='arrow-back-circle' size={30} />
        </TouchableOpacity>
      )}
      <View className='w-full h-full flex flex-row items-center'>
        <Text className='font-flap-stick text-3xl line-clamp-1'>{heading}</Text>
        {heading === 'Money Buddy' ? (
          <Image
            source={require('../../assets/Icons/wallet.png')}
            style={{ width: '10%', height: '50%' }}
            contentFit='contain'
          />
        ) : (
          ''
        )}
      </View>
    </View>
  )
}

export default Header
