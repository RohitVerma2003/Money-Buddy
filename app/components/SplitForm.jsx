import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import useTransactions from '../../context/transactionContext'

const SplitForm = () => {
  const { data, addFriend, deleteFriend } = useTransactions()
  const [amount, setAmount] = useState(0)
  const [friend, setFriend] = useState('')
  const [error, setError] = useState({ amount: null })

  const isValidAmount = () => {
    if (amount === '') return false
    const num = parseFloat(amount)

    if (isNaN(num)) return false
    return true
  }

  const handleBlurAmount = () => {
    if (isValidAmount) {
      const num = parseFloat(amount)
      const formattedValue = num.toFixed(2)
      setAmount(formattedValue)
      return formattedValue
    } else {
      setError(prev => ({ ...prev, amount: 'Type a valid amount' }))
      return null
    }
  }

  const handleAmountChange = e => {
    if (e == '') {
      setAmount(e)
      return
    }

    if (/^\d*\.?\d{0,2}$/.test(e)) {
      setAmount(e)
    }
  }

  const handleAddFriend = () => {
    const formattedValue = handleBlurAmount()
    if (!formattedValue) return
    if (friend == '') return

    addFriend(friend, formattedValue)
    setAmount('')
    setFriend('')
  }

  return (
    <View className='w-full flex justify-center gap-2'>
      <View className='w-full flex justify-center gap-2 mb-2'>
        {data?.friends.map((friend, index) => (
          <View
            className='w-full flex flex-row gap-2 justify-between'
            key={index}
          >
            <View className='w-2/5 bg-light-green border-2 rounded-md h-16 flex justify-center p-2'>
              <Text className='text-lg font-doodle'>{friend?.name}</Text>
            </View>
            <TouchableOpacity
              className='w-14 h-16 border-2 rounded-md bg-red-500 flex-1 justify-center items-center'
              onPress={() => deleteFriend(friend?.name)}
            >
              <Ionicons name='trash-bin-outline' size={25} />
            </TouchableOpacity>
            <View className='w-2/5 bg-light-green border-2 rounded-md h-16 flex justify-center p-2'>
              <Text className='text-lg font-doodle'>{friend?.amount}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Form View Section */}
      <View className='w-full flex flex-row gap-2 justify-between'>
        <TextInput
          className='w-2/5 bg-navy-blue border-2 rounded-md h-16 flex justify-center p-2 text-white font-doodle'
          maxLength={20}
          placeholder='Name'
          placeholderTextColor={'white'}
          onChangeText={e => setFriend(e)}
          value={friend}
        />
        <TextInput
          className='w-2/5 bg-navy-blue border-2 rounded-md h-16 flex justify-center p-2 text-white font-doodle'
          maxLength={20}
          placeholder='Amount'
          placeholderTextColor={'white'}
          keyboardType='number-pad'
          onChangeText={e => {
            handleAmountChange(e)
            setError(prev => ({ ...prev, amount: null }))
          }}
          onBlur={handleBlurAmount}
          value={amount}
        />
        <View className='w-14 h-16 border-2 rounded-md bg-vintage-orange'>
          <TouchableOpacity
            className='w-full flex-1 justify-center items-center'
            onPress={handleAddFriend}
          >
            <Text className='font-doodle'>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
      {error.amount && (
        <Text className='text-sm text-red-600 font-doodle'>{error.amount}</Text>
      )}
    </View>
  )
}

export default SplitForm
