import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import useAlert from '../../context/alertContext'
import useTheme from '../../context/themeContext'
import Header from '../components/Header'
import useMoneyPodsServices from '../services/moneyPodsServices'
import HeadWrapper from '../utilities/HeadWrapper'
import ScreenWrapper from '../utilities/ScreenWrapper'

const AddMoneyPod = () => {
  const [nameError, setNameError] = useState(null)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const { createMoneyPod } = useMoneyPodsServices()
  const router = useRouter()
  const { showSuccessAlert, showDangerAlert } = useAlert()
  const { isDark } = useTheme()

  const handleChange = e => {
    setNameError(false)
    setName(prev => e)
  }

  const handleSubmit = async () => {
    if (loading) return
    setLoading(true)
    const newName = name.trim()
    if (newName === '') {
      setNameError('Please enter the name...')
      setLoading(false)
      return
    }

    const result = await createMoneyPod(newName)

    if (result.success) {
      showSuccessAlert('Money pod added successfully...')
      router.back()
    } else {
      showDangerAlert('Error in adding the money pod...')
    }

    setLoading(false)
  }

  return (
    <HeadWrapper>
      <Header heading='Add Money Pod' />
      <ScreenWrapper>
        <View className='flex flex-row items-center gap-1 mb-2 mt-3'>
          <Ionicons name='apps' size={25} color={isDark ? 'white' : 'black'} />
          <Text className={`font-doodle text-lg ${isDark && 'text-white'}`}>
            Name
          </Text>
        </View>

        <TextInput
          className={`w-full h-16 border-2 rounded-md font-doodle text-xl ${
            isDark
              ? 'bg-light-dark border-grey-white text-white'
              : 'bg-light-green'
          }`}
          maxLength={20}
          value={name}
          onChangeText={handleChange}
        />

        {nameError && (
          <View>
            <Text className='text-sm text-red-600 font-doodle'>
              {nameError}
            </Text>
          </View>
        )}

        <View className='w-full flex justify-center items-center mb-3 relative mt-3'>
          <View className='w-11/12 h-16 flex justify-center items-center border-2 rounded-md bg-black absolute right-3 top-1' />
          <TouchableOpacity
            className={`w-11/12 h-16 flex justify-center items-center border-2 rounded-md bg-vintage-orange ${isDark && 'border-grey-white'}`}
            onPress={handleSubmit}
          >
            {loading ? (
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
