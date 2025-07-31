import { Ionicons } from '@expo/vector-icons'
import { Text, View } from 'react-native'
import useCurrency from '../../context/currencyContext'

const ProfitLossCard = ({heading , income , expense , extra}) => {
    const {currency} = useCurrency()
  return (
    <View className='w-full border-2 rounded-md bg-light-green p-2 mb-3 h-36 flex justify-around items-end overflow-hidden '>
      <Text className='w-full font-doodle text-lg text-white'>
        {heading}
      </Text>
      <View className='w-full flex justify-between items-center flex-row'>
        <View className='w-2/5 border-2 rounded-md bg-fade-green h-16 p-2 flex justify-between items-center flex-row'>
          <Text className='text-2xl text-green-700 font-doodle'>
            {currency}
            {income}
          </Text>
          <Ionicons name='arrow-up-circle' color={'#15803d'} size={22} />
        </View>
        <View className='w-2/5 border-2 rounded-md bg-red-400 h-16 p-2 flex justify-between items-center flex-row'>
          <Text className='text-2xl text-red-800 font-doodle'>
            {currency}
            {expense}
          </Text>
          <Ionicons name='arrow-down-circle' color={'#991b1b'} size={22} />
        </View>
      </View>
      <Text className='w-full font-doodle text-sm text-white'>
        {extra}
      </Text>
    </View>
  )
}

export default ProfitLossCard
