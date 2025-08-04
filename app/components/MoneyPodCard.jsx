import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import useAlert from '../../context/alertContext'
import useConfirm from '../../context/confirmContext'
import useCurrency from '../../context/currencyContext'
import useTheme from '../../context/themeContext'
import useMoneyPodsServices from '../services/moneyPodsServices'

const MoneyPodCard = ({ data }) => {
  const { currency } = useCurrency()
  const { isDark } = useTheme()
  const router = useRouter()
  const { confirmBox } = useConfirm()
  const { deleteMoneyPod } = useMoneyPodsServices()
  const { showSuccessAlert, showDangerAlert } = useAlert()

  const { name, income, expense, docId } = data
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (loading) return
    setLoading(true)
    const confirm = await confirmBox('Do you want to delete it?')

    if (confirm) {
      const result = await deleteMoneyPod(docId)

      if (result.success) {
        showSuccessAlert('Pod deleted successfully...')
      } else {
        showDangerAlert('Error in deleting the pod...')
      }
    }

    setLoading(false)
  }

  const handleRoute = () => {
    router.push({
      pathname: '/(screens)/MoneyPodDetails',
      params: { name, docId }
    })
  }

  return (
    <TouchableOpacity
      className={`w-full border-2 rounded-md h-32 p-1 flex items-center mb-2 relative ${
        isDark ? 'bg-light-dark border-grey-white' : 'bg-light-green'
      }`}
      activeOpacity={0.6}
      onPress={handleRoute}
    >
      <TouchableOpacity
        className='absolute top-2 right-2 bg-red-600 rounded-full p-2 z-10'
        onPress={handleDelete}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Ionicons name='trash-bin' color={isDark ? '#DFD0B8' : '#A0C878'} />
        )}
      </TouchableOpacity>
      <View className='h-3/5 w-full flex justify-center'>
        <Text className={`font-doodle text-3xl text-center line-clamp-1 ${isDark && 'text-white'}`}>
          {name}
        </Text>
      </View>
      <View className={`h-2/5 w-full border-t-2 flex justify-around items-center flex-row ${isDark && 'border-grey-white'}`}>
        <View className='flex flex-row items-center gap-1'>
          <Text className={`font-doodle text-lg ${isDark && 'text-white'}`}>Income:</Text>
          <Text className='font-doodle text-2xl text-green-500'>
            {currency}
            {income}
          </Text>
          <Ionicons name='arrow-up-circle' size={20} color={'#22c55e'} />
        </View>
        <View className='flex flex-row items-center gap-1'>
          <Text className={`font-doodle text-lg ${isDark && 'text-white'}`}>Expense:</Text>
          <Text className='font-doodle text-2xl text-red-600'>
            {currency}
            {expense}
          </Text>
          <Ionicons name='arrow-down-circle' size={20} color={'#dc2626'} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default MoneyPodCard
