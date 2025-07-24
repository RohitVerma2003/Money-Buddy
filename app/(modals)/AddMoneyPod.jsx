import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import {
    ActivityIndicator,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import Header from '../components/Header'
import HeadWrapper from '../utilities/HeadWrapper'
import ScreenWrapper from '../utilities/ScreenWrapper'

const AddMoneyPod = () => {
  const [nameError, setNameError] = useState(null)
  const [name, setName] = useState('')
  const [loading , setLoading] = useState(false)

  const handleChange = e => {
    setName(prev => e)
  }

  const handleSubmit = async ()=>{
    setLoading(true)
    if(name === ''){
        setNameError('Please enter the name...')
        setLoading(false)
        return
    }
  }

  return (
    <HeadWrapper>
      <Header heading='Add Money Pod' />
      <ScreenWrapper>
        <View className='flex flex-row items-center gap-1 mb-2 mt-3'>
          <Ionicons name='apps' size={25} />
          <Text className='font-doodle text-lg'>Name</Text>
        </View>

        <TextInput
          className='w-full h-16 border-2 rounded-md bg-light-green font-doodle text-xl'
          maxLength={20}
        />

        <View className='w-full flex justify-center items-center mb-3 relative mt-3'>
          <View className='w-11/12 h-16 flex justify-center items-center border-2 rounded-md bg-black absolute right-3 top-1' />
          <TouchableOpacity className='w-11/12 h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange'>
            {false ? (
              <ActivityIndicator />
            ) : (
              <Text className='font-flap-stick text-xl'>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    </HeadWrapper>
  )
}

export default AddMoneyPod
