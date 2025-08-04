import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import useTheme from '../../context/themeContext'
import Header from '../components/Header'
import HeadWrapper from '../utilities/HeadWrapper'
import ScreenWrapper from '../utilities/ScreenWrapper'

const AddTransaction = () => {
  const router = useRouter()
  const {isDark} = useTheme()
  return (
    <HeadWrapper>
      <Header heading='Add Transaction' />
      <ScreenWrapper>
        <View className='w-full flex justify-center items-center mb-3 relative'>
          <View className={`w-full h-28 flex justify-center items-center border-2 rounded-md absolute left-1 top-1 bg-black`}/>
          <TouchableOpacity
            className={`w-full h-28 flex flex-row justify-around items-center border-2 rounded-md bg-vintage-orange relative overflow-hidden ${isDark && 'border-grey-white'}`}
            onPress={() => {
              router.push('/(modals)/RegularTransaction')
            }}
          >
            <View className=' h-full w-1/4 opacity-70'>
              <Image
                source={require('../../assets/Icons/transfer.png')}
                style={{ width: '100%', height: '100%' }}
                contentFit='contain'
              />
            </View>
            <Text className='font-flap-stick text-xl'>Regular Transaction</Text>
          </TouchableOpacity>
        </View>
        <View className='w-full flex justify-center items-center mb-3 relative'>
          <View className='w-full h-28 flex justify-center items-center border-2 rounded-md bg-black absolute left-1 top-1' />
          <TouchableOpacity
            className={`w-full h-28 flex flex-row justify-around items-center border-2 rounded-md bg-vintage-orange relative overflow-hidden ${isDark && 'border-grey-white'}`}
            onPress={() => {
              router.push('/(modals)/SplitTransaction')
            }}
          >
            <View className='h-full w-1/4 opacity-70'>
              <Image
                source={require('../../assets/Icons/group-icon.png')}
                style={{ width: '100%', height: '100%' }}
                contentFit='contain'
              />
            </View>
            <Text className='font-flap-stick text-xl'>Split Transaction</Text>
          </TouchableOpacity>
        </View>
        <View className='w-full flex justify-center items-center mb-3 relative'>
          <View className='w-full h-28 flex justify-center items-center border-2 rounded-md bg-black absolute left-1 top-1' />
          <TouchableOpacity
            className={`w-full h-28 flex flex-row justify-around items-center border-2 rounded-md bg-vintage-orange relative overflow-hidden ${isDark && 'border-grey-white'}`}
            onPress={() => {
              router.push('/(modals)/LendMoney')
            }}
          >
            <View className='h-full w-1/4 opacity-70'>
              <Image
                source={require('../../assets/Icons/handshake.png')}
                style={{ width: '100%', height: '100%' }}
                contentFit='contain'
              />
            </View>
            <Text className='font-flap-stick text-xl'>Lend Money</Text>
          </TouchableOpacity>
        </View>
        <View className='w-full flex justify-center items-center mb-3 relative'>
          <View className='w-full h-28 flex justify-center items-center border-2 rounded-md bg-black absolute left-1 top-1' />
          <TouchableOpacity
            className={`w-full h-28 flex flex-row justify-around items-center border-2 rounded-md bg-vintage-orange relative overflow-hidden ${isDark && 'border-grey-white'}`}
            onPress={() => {
              router.push('/(modals)/DebtMoney')
            }}
          >
            <View className='h-full w-1/4 opacity-70'>
              <Image
                source={require('../../assets/Icons/down-arrow.png')}
                style={{ width: '100%', height: '100%' }}
                contentFit='contain'
              />
            </View>
            <Text className='font-flap-stick text-xl'>Debt Money</Text>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    </HeadWrapper>
  )
}

export default AddTransaction
