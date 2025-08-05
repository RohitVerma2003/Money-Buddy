import { Text, TouchableOpacity, View } from 'react-native'
import useTheme from '../../context/themeContext'

const NaigationButtons = ({ data, active, handleChangeActive }) => {
  const {isDark} = useTheme()
  return (
    <View className='w-full flex justify-center items-center flex-row gap-2 h-16'>
      {data.map(ele => (
        <View className='relative h-full w-1/4' key={ele.value}>
          {ele.value != active && (
            <View className='w-full h-12 bg-black absolute left-1 top-1 rounded-md' />
          )}
          <TouchableOpacity
            className={`${
              ele.value === active ? 'bg-navy-blue mt-1' : 'bg-vintage-orange'
            } p-2 border-2 rounded-md ${isDark && 'border-grey-white'}`}
            onPress={() => handleChangeActive(ele.value)}
          >
            <Text
              className={`font-doodle text-lg ${
                ele.value === active ? 'text-white' : ''
              }`}
            >
              {ele.name}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )
}

export default NaigationButtons
