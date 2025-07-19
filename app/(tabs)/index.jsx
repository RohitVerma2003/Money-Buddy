import { Ionicons } from '@expo/vector-icons'
import { ScrollView, Text, View } from 'react-native'
import useAuth from '../../context/authContext'
import useCurrency from '../../context/currencyContext'
import CreateTransactionButton from '../components/CreateTransactionButton'
import Header from "../components/Header"
import ScreenWrapper from '../utilities/ScreenWrapper'

const Home = () => {
  const { user } = useAuth()
  const { currency } = useCurrency()
  return (
    <>
    <Header heading='Money Buddy' isbackButton={false}/>
    <ScreenWrapper className='relative'>
      <CreateTransactionButton />
      <View className='w-full mb-4'>
        <Text className='font-flap-stick text-2xl'>Welcome! {user?.name}</Text>
      </View>
      <View className='w-full border-2 rounded-md bg-light-green h-24 p-2 mb-2'>
        <Text className='w-full font-doodle text-lg text-white'>
          Total Amount:{' '}
        </Text>
        <View className="flex flex-row gap-3 items-center">
          <Text className=' font-doodle text-4xl text-green-700'>
            {currency}200000
          </Text>
          <Ionicons name='arrow-up-circle' color={'#15803d'} size={25} />
        </View>
      </View>
      <View className='w-full border-2 rounded-md bg-light-green p-2 mb-3 h-32 flex justify-around items-end overflow-hidden '>
        <Text className='w-full font-doodle text-lg text-white'>
          Last 30 days transaction amounts:
        </Text>
        <View className='w-full flex justify-between items-center flex-row'>
          <View className='w-2/5 border-2 rounded-md bg-fade-green h-16 p-2 flex justify-between items-center flex-row'>
            <Text className='text-2xl text-green-700 font-doodle'>
              {currency}10000
            </Text>
            <Ionicons name='arrow-up-circle' color={'#15803d'} size={22} />
          </View>
          <View className='w-2/5 border-2 rounded-md bg-red-400 h-16 p-2 flex justify-between items-center flex-row'>
            <Text className='text-2xl text-red-800 font-doodle'>
              {currency}10000
            </Text>
            <Ionicons name='arrow-down-circle' color={'#991b1b'} size={22} />
          </View>
        </View>
      </View>
      <View className='w-full'>
        <View className='bg-light-green border-2 rounded-md p-2 mb-3'>
          <Text className='text-2xl font-doodle text-white'>
            Recent Transactions
          </Text>
        </View>
        <ScrollView
          className='w-full h-1/2'
          showsVerticalScrollIndicator={false}
        >
          <View className='w-full border-2 rounded-md flex flex-row justify-between items-center bg-light-green h-20 p-2 mb-2'>
            <View className='w-1/2 flex flex-row items-center gap-3'>
              <View className='w-16 h-16 border-2 rounded-md flex justify-center items-center bg-navy-blue'>
                <Ionicons name='cafe' size={30} color={'#A0C878'} />
              </View>
              <View>
                <Text className='font-doodle text-xl text-clip line-clamp-1'>
                  Coffee
                </Text>
                <Text className='font-doodle text-md text-clip line-clamp-1'>
                  Cappicino coffee
                </Text>
              </View>
            </View>
            <View className='w-2/5 flex flex-row items-center gap-3 justify-end'>
              <Text className='text-xl text-red-800 font-doodle'>
                - {currency}10000
              </Text>
            </View>
          </View>
          <View className='w-full border-2 rounded-md flex flex-row justify-between items-center bg-light-green h-20 p-2 mb-2'>
            <View className='w-1/2 flex flex-row items-center gap-3'>
              <View className='w-16 h-16 border-2 rounded-md flex justify-center items-center bg-navy-blue'>
                <Ionicons name='fast-food' size={30} color={'#A0C878'} />
              </View>
              <View>
                <Text className='font-doodle text-xl text-clip line-clamp-1'>
                  Ydava ji dhaba
                </Text>
                <Text className='font-doodle text-md text-clip line-clamp-1'>
                  Malai chaap
                </Text>
              </View>
            </View>
            <View className='w-2/5 flex flex-row items-center gap-3 justify-end'>
              <Text className='text-xl text-red-800 font-doodle'>
                - {currency}10000
              </Text>
            </View>
          </View>
          <View className='w-full border-2 rounded-md flex flex-row justify-between items-center bg-light-green h-20 p-2 mb-2'>
            <View className='w-1/2 flex flex-row items-center gap-3'>
              <View className='w-16 h-16 border-2 rounded-md flex justify-center items-center bg-navy-blue'>
                <Ionicons name='cash' size={30} color={'#A0C878'} />
              </View>
              <View>
                <Text className='font-doodle text-xl text-clip line-clamp-1'>
                  salary
                </Text>
                <Text className='font-doodle text-md text-clip line-clamp-1'>
                  June month salary
                </Text>
              </View>
            </View>
            <View className='w-2/5 flex flex-row items-center gap-3 justify-end'>
              <Text className='text-xl text-green-700 font-doodle'>
                + {currency}100000
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
    </>
  )
}

export default Home
