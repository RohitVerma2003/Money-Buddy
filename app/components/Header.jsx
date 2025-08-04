import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import useTheme from '../../context/themeContext'

const Header = ({ heading = '', isbackButton = true }) => {
  const router = useRouter()
  const {isDark} = useTheme()

  return (
    <View className={`w-full h-16 flex items-center flex-row gap-3 px-5 ${isDark ? 'bg-light-dark' : 'bg-light-green'}`}>
      {isbackButton && (
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name='arrow-back-circle' size={30} color={isDark ? 'white' : 'black'}/>
        </TouchableOpacity>
      )}
      <View className='w-full h-full flex flex-row items-center'>
        <Text className={`font-flap-stick text-3xl line-clamp-1 ${isDark && 'text-white'}`}>{heading}</Text>
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
